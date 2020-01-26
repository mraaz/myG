'use strict'

const UserRepository = require('../../Repositories/User');

class ChatRealtimeController {

  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    const userId = this.socket.topic.split('chat:')[1];
    UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'online', forceStatus: false });
  }

  onClose() {
    const userId = this.socket.topic.split('chat:')[1];
    UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'offline', forceStatus: false });
  }

}

module.exports = ChatRealtimeController
