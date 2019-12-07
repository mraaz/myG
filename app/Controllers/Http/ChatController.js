'use strict';

const uuidv4 = require('uuid/v4');
const Chat = use('App/Models/Chat');
const UserChatController = use('./UserChatController');
const { broadcast } = require('../../Common/socket');

class ChatController {

  async fetchMessages({ params, response }) {

    const chat = await Chat
      .query()
      .where('uuid', params.id)
      .with('messages')
      .first();

    if (!chat) {
      return response.notFound(`Chat ${params.id} was not found.`)
    }

    return chat;

  }

  async create({ request }) {

    const chat = new Chat();
    const uuid = uuidv4();
    chat.uuid = uuid;
    await chat.save();

    const userChatController = new UserChatController();

    const data = request.only(['members']);
    data.members.forEach(async id => {
      await userChatController.create({
        request: {
          chatId: uuid,
          userId: id,
        }
      });
      broadcast('user_chat:*', `user_chat:${id}`, 'user_chat:newChat', uuid);
    });

    return Chat.find(uuid);

  }

  async createMessage({ params, request, response }) {
    const chat = await Chat.find(params.id);
    if (!chat) {
      return response.notFound(`Chat ${params.id} was not found.`)
    }

    const data = request.only(['name', 'content', 'user_id']);
    const message = await chat.messages().create(data);

    broadcast('chat:*', `chat:${chat.uuid}`, 'chat:newMessage', message);

    return message
  }
}

module.exports = ChatController;
