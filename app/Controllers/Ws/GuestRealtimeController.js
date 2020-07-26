'use strict'

const GuestRepository = require('../../Repositories/Guest')
const UserRepository = require('../../Repositories/User')
const { log } = require('../../Common/logger')

class GuestRealtimeController {
  constructor({ socket, request }) {
    const userId = parseInt(socket.topic.split(':')[1])
    const isGuest = socket.topic.split(':')[2] === 'guest'
    if (!isGuest) return
    this.socket = socket
    this.request = request
    log('CHAT', `WS Connection Opened: ${this.socket.topic}`)
    UserRepository.updateStatus({ requestingUserId: userId, requestedStatus: 'online', forceStatus: false })
  }

  onClose() {
    if (!this.socket) return
    const userId = parseInt(this.socket.topic.split(':')[1])
    log('CHAT', `WS Connection Closed: ${this.socket.topic}`)
    GuestRepository.unregister({ requestingGuestId: userId })
  }
}

module.exports = GuestRealtimeController
