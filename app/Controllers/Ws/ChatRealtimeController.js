'use strict'

const UserRepository = require('../../Repositories/User')
const { log } = require('../../Common/logger')

class ChatRealtimeController {
  userId = null

  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.userId = auth.user.id;
    log('CHAT', `WS Connection Opened: ${this.socket.topic}`)
    UserRepository.updateStatus({ requestingUserId: this.userId, requestedStatus: 'online', forceStatus: false })
  }

  onClose() {
    log('CHAT', `WS Connection Closed: ${this.socket.topic}`)
    UserRepository.updateStatus({ requestingUserId: this.userId, requestedStatus: 'offline', forceStatus: false })
  }
}

module.exports = ChatRealtimeController
