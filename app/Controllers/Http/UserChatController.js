'use strict'

const UserChat = use('App/Models/UserChat');
const UserController = use('./UserController');
const { formatDate } = require('../../Common/date');

class UserChatController {

  async fetchChats({ params }) {
    const chats = await UserChat
      .query()
      .where('user_id', params.userId)
      .fetch();
    return chats.toJSON().map(chat => ({ ...chat, chatId: chat.chat_id, userId: chat.user_id }));
  }

  async fetchInfo({ auth, params }) {

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

    const icon = friend.user[0].profile_img;
    const title = `${friend.user[0].first_name} ${friend.user[0].last_name}`;
    const subtitle = this.getSubtitle(friend.user[0].online, friend.user[0].last_seen);

    return {
      icon,
      title,
      subtitle,
    };

  }

  getSubtitle(online, lastSeen) {
    return online ? 'Online' : `Last seen at ${formatDate(lastSeen)}`;
  }

  async create({ request }) {
    const userChat = new UserChat();
    userChat.chat_id = request.chatId;
    userChat.user_id = request.userId;
    await userChat.save();
    return userChat;
  }

}

module.exports = UserChatController;
