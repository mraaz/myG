'use strict';

const Chat = use('App/Models/Chat');
const UserChat = use('App/Models/UserChat');
const ChatMessage = use('App/Models/ChatMessage');
const { broadcast } = require('../../Common/socket');

class ChatController {

  async fetchMessages(chatId) {

    const chat = await Chat
      .query()
      .where('id', chatId)
      .with('messages')
      .first();

    if (!chat) return [];
    return chat.toJSON().messages;

  }

  async create() {
    const chat = new Chat();
    await chat.save();
    return Chat.find(chat.id);
  }

  async createMessage({ params, request, response }) {

    const chat = await Chat.find(params.chatId);
    if (!chat) return response.notFound(`Chat ${params.chatId} was not found.`);

    const data = request.only(['name', 'encrypted', 'userId', 'selfDestruct']);
    data.user_id = data.userId;
    data.self_destruct = data.selfDestruct;
    data.content = data.encrypted.content;
    data.backup = data.encrypted.backup;
    delete data.encrypted;
    delete data.userId;
    delete data.selfDestruct;

    const message = await chat.messages().create(data);
    message.userId = message.user_id;
    delete message.user_id;

    broadcast('chat:*', `chat:${chat.id}`, 'chat:newMessage', message);

    return message;

  }

  async updateMessage({ params, request, response }) {

    const message = await ChatMessage.find(params.messageId);
    if (!message) return response.notFound(`Message ${params.messageId} was not found.`);

    const data = request.only(['encrypted']);
    message.content = data.encrypted.content;
    message.backup = data.encrypted.backup;
    message.edited = true;
    await message.save();

    broadcast('chat:*', `chat:${params.chatId}`, 'chat:updateMessage', message);

    return message;

  }

  async deleteMessage({ auth, params, response }) {

    const [chat, message] = await Promise.all([
      UserChat.query().where('chat_id', params.chatId).andWhere('user_id', auth.user.id).first(),
      ChatMessage.find(params.messageId)
    ]);
    if (!chat) return response.notFound(`Chat ${params.chatId} was not found.`);
    if (!message) return response.notFound(`Message ${params.messageId} was not found.`);

    message.content = '';
    message.deleted = true;

    if (message.user_id === auth.user.id) {
      await message.save();
      broadcast('chat:*', `chat:${params.chatId}`, 'chat:updateMessage', message);
    }

    else {
      const deletedMessages = JSON.parse(chat.toJSON().deleted_messages);
      deletedMessages.push(params.messageId);
      chat.deleted_messages = JSON.stringify(deletedMessages);
      await chat.save();
    }

    return message;

  }

  async checkSelfDestruct({ params, response }) {

    const chat = await Chat.find(params.chatId);
    if (!chat) return response.notFound(`Chat ${params.chatId} was not found.`);

    const messages = (await chat.messages().fetch()).toJSON() || [];
    const now = new Date(new Date().toISOString().replace("T", " ").split('.')[0]).getTime();
    const timer = 10000;
    const toDelete = [];

    messages
      .filter(message => message.self_destruct)
      .reverse()
      .some((message, index) => {
        const dateDelta = now - new Date(message.created_at).getTime();
        if (dateDelta > timer) {
          toDelete.push({ index, id: message.id });
          return false;
        }
        return true;
      });

    const toDeletePromises = [];
    toDelete.forEach(async ({ index, id }) => {
      messages.splice(index, 1);
      toDeletePromises.push(ChatMessage.query().where('id', id).delete());
    });
    await Promise.all(toDeletePromises);

    broadcast('chat:*', `chat:${params.chatId}`, 'chat:deleteMessages', toDelete);

  }

}

module.exports = ChatController;
