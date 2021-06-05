'use strict'

const GuestRepository = require('../../Repositories/Guest')
const UserRepository = require('../../Repositories/User')
const { log } = require('../../Common/logger')

class GuestRealtimeController {
  constructor({ socket, request }) {
    const isGuest = socket.topic.split(':')[2] === 'guest'
    if (!isGuest) return
    this.socket = socket
    this.request = request
    this.connectGuest();
  }

  onClose() {
    if (!this.socket) return
    return this.disconnectGuest();
  }

  connectGuest = () => {
    const userId = parseInt(this.socket.topic.split(':')[1]);
    log('CHAT', `WS Try to Connect Guest: ${this.socket.topic}`);
    return UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'online', forceStatus: false }).then(() => {
      log('CHAT', `WS Guest Connected: ${this.socket.topic}`);
    });
  }

  disconnectGuest = () => {
    const userId = parseInt(this.socket.topic.split(':')[1]);
    log('CHAT', `WS Try to Disconnect Guest: ${this.socket.topic}`);
    return GuestRepository.unregister({ requestingGuestId: userId }).then(() => {
      log('CHAT', `WS Guest Disconnected: ${this.socket.topic}`);
    });
  }
}

module.exports = GuestRealtimeController
