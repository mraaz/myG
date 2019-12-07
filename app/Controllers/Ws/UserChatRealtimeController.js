'use strict'

class UserChatRealtimeController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = UserChatRealtimeController
