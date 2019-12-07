'use strict'

class ChatRealtimeController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
}

module.exports = ChatRealtimeController
