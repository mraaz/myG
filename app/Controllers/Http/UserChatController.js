'use strict'

const UserChat = use('App/Models/UserChat');
const UserController = use('./UserController');

class UserChatController {

  async fetchChats({ params }) {
    const chats = await UserChat
      .query()
      .where('user_id', params.userId)
      .fetch();
    return chats.toJSON().map(chat => ({ ...chat, chatId: chat.chat_id }));
  }

  async fetchTitle({ auth, params }) {

    const chat = await UserChat
      .query()
      .where('chat_id', params.chatId)
      .andWhere('user_id', '!=', auth.user.id)
      .first();

    const userController = new UserController();
    const friend = await userController.profile({
      auth,
      request: {
        params: {
          id: chat.toJSON().user_id
        }
      }
    });

    return `${friend.user[0].first_name} ${friend.user[0].last_name}`;

  }

  async create({ request }) {
    const userChat = new UserChat();
    userChat.chat_id = request.chatId;
    userChat.user_id = request.userId;
    await userChat.save();
    return userChat;
  }

}

module.exports = UserChatController
