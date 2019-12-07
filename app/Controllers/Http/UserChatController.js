'use strict'

const UserChat = use('App/Models/UserChat');
const UserController = use('./UserController');

class UserChatController {

  async fetchChats({ params }) {
    return UserChat
      .query()
      .where('user_id', params.user_id)
      .fetch();
  }

  async fetchTitle({ auth, params }) {

    const chat = await UserChat
      .query()
      .where('chat_id', params.chat_id)
      .andWhere('user_id', '!=', auth.user.id)
      .first();

    console.log('found chat', chat.toJSON(), 'for params', params)

    const userController = new UserController();
    const friend = await userController.profile({
      auth,
      request: {
        params: {
          id: chat.toJSON().user_id
        }
      }
    });

    console.log(`found friend`, friend);

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
