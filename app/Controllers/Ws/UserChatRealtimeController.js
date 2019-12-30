'use strict'

const UserChatController = require('../Http/UserChatController');

class UserChatRealtimeController {

  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    new UserChatController().updateStatus({
      request: {
        status: 'online',
        forceStatus: false,
      },
      auth: {
        user: {
          id: this.socket.topic.split('user_chat:')[1],
        },
      },
    });
  }

  onClose() {
    new UserChatController().updateStatus({
      request: {
        status: 'offline',
        forceStatus: false,
      },
      auth: {
        user: {
          id: this.socket.topic.split('user_chat:')[1],
        },
      },
    });
  }

}

module.exports = UserChatRealtimeController
