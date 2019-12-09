'use strict';

const Chat = use('App/Models/Chat');
const UserChatController = use('./UserChatController');
const { broadcast } = require('../../Common/socket');

class ChatController {

  async fetchMessages({ params, response }) {

    const chat = await Chat
      .query()
      .where('id', params.chatId)
      .with('messages')
      .first();

    if (!chat) return response.notFound(`Chat ${params.chatId} was not found.`);
    return chat.toJSON().messages;

  }

  async create({ auth, request }) {

    const chat = new Chat();
    await chat.save();

    const userChatController = new UserChatController();

    const data = request.only(['members']);
    data.members.forEach(async id => {
      await userChatController.create({
        request: {
          chatId: chat.id,
          userId: id,
        }
      });
      broadcast('user_chat:*', `user_chat:${id}`, 'user_chat:newChat', { chatId: chat.id, userId: auth.user.id });
    });

    return Chat.find(chat.id);

  }

  async createMessage({ params, request, response }) {

    const chat = await Chat.find(params.chatId);
    if (!chat) return response.notFound(`Chat ${params.chatId} was not found.`);

    const data = request.only(['name', 'content', 'userId']);
    data.user_id = data.userId;
    delete data.userId;

    const message = await chat.messages().create(data);
    message.userId = message.user_id;
    delete message.user_id;

    broadcast('chat:*', `chat:${chat.id}`, 'chat:newMessage', message);

    return message;

  }
}

module.exports = ChatController;
