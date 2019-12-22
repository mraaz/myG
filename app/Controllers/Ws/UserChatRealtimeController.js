'use strict'

const User = use('App/Models/User');
const UserChatController = require('../Http/UserChatController');
const { broadcast } = require('../../Common/socket');

class UserChatRealtimeController {

  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    this.updateActivity(this.socket.topic.split('user_chat:')[1], true);
  }

  onClose() {
    this.updateActivity(this.socket.topic.split('user_chat:')[1], false);
  }

  async updateActivity(userId, online) {
    const last_seen = new Date();
    await User.query().where('id', '=', userId).update({ online, last_seen});
    await this.notifyActivity(userId, online, last_seen);
  }

  async notifyActivity(userId, online, lastSeen) {
    const controller = new UserChatController();
    const chats = await controller.fetchChats({ auth: { user: { id: userId } } });
    const subtitle = controller.getSubtitle(online, lastSeen);
    chats.forEach(chat => {
      broadcast('chat:*', `chat:${chat.chatId}`, 'chat:info', {
        userId,
        subtitle,
      });
    });
  }

}

module.exports = UserChatRealtimeController
