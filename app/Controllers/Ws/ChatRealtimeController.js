'use strict'

const GuestRepository = require('../../Repositories/Guest');
const UserRepository = require('../../Repositories/User');
const { log } = require('../../Common/logger');

class ChatRealtimeController {

  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    const userId = parseInt(this.socket.topic.split(':')[1]);
    log('CHAT', `WS Connection Opened: ${this.socket.topic}`);
    UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'online', forceStatus: false });
  }

  onClose() {
    log('CHAT', `WS Connection Closed: ${this.socket.topic}`);
    const userId = parseInt(this.socket.topic.split(':')[1]);
    const isGuest = this.socket.topic.split(':')[2] === 'guest';
    if (isGuest) GuestRepository.unregister({ requestingGuestId: userId });
    else UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'offline', forceStatus: false });
  }

}

module.exports = ChatRealtimeController
