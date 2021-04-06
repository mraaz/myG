'use strict'

const ConnectionRepository = require('../../Repositories/Connection')
const { log } = require('../../Common/logger')

class ChatRealtimeController {
  userId = null

  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.userId = auth.user.id;
    log('CHAT', `WS Connection Opened: ${this.socket.topic}`)
    ConnectionRepository.connectUser({ requestingUserId: this.userId });
  }

  onClose() {
    log('CHAT', `WS Connection Closed: ${this.socket.topic}`)
    ConnectionRepository.disconnectUser({ requestingUserId: this.userId });
  }
}

module.exports = ChatRealtimeController
