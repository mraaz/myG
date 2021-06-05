'use strict'

const ConnectionRepository = require('../../Repositories/Connection')
const UserRepository = require('../../Repositories/User')
const { log } = require('../../Common/logger')

class ChatRealtimeController {
  userId = null

  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.userId = auth.user.id;
    this.connectUser().then(this.setUserAsOnline);
  }

  onClose() {
    return this.disconnectUser().then(this.setUserAsOffline);
  }

  connectUser = () => {
    log('CHAT', `WS Try to Connect User: ${this.socket.topic}`)
    return ConnectionRepository.connectUser({ requestingUserId: this.userId }).then(() => {
      log('CHAT', `WS User Connected: ${this.socket.topic}`)
    });
  }

  disconnectUser = () => {
    log('CHAT', `WS Try to Disconnect User: ${this.socket.topic}`)
    return ConnectionRepository.disconnectUser({ requestingUserId: this.userId }).then(() => {
      log('CHAT', `WS User Disconnected: ${this.socket.topic}`)
    });
  }

  setUserAsOnline = () => {
    log('CHAT', `WS Try to Set User as Online: ${this.userId}`);
    return UserRepository.updateStatus({ requestingUserId: this.userId, requestedStatus: 'online', forceStatus: false }).then(() => {
      log('CHAT', `WS Did Set User as Online: ${this.userId}`);
    });
  }

  setUserAsOffline = () => {
    log('CHAT', `WS Try to Set User as Offline: ${this.userId}`);
    return UserRepository.updateStatus({ requestingUserId: this.userId, requestedStatus: 'offline', forceStatus: false }).then(() => {
      log('CHAT', `WS Did Set User as Offline: ${this.userId}`);
    });
  }
}

module.exports = ChatRealtimeController
