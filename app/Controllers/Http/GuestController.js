'use strict'

const { log } = require('../../Common/logger');
const GuestRepository = require('../../Repositories/Guest');

class GuestController {

  async register({ request, response }) {
    log('GUEST', `Registering Guest`);
    const requestedChatId = request.only(['chatId']).chatId;
    const publicKey = request.only(['publicKey']).publicKey;
    const { guestId, chat } = await GuestRepository.register({ requestedChatId, publicKey });
    return response.send({ guestId, chat });
  }

  async unregister({ params, response }) {
    log('GUEST', `Unregistering Guest`);
    const requestingGuestId = params.guestId;
    const requestedChatId = params.chatId;
    const { success, chat } = await GuestRepository.unregister({ requestingGuestId, requestedChatId });
    return response.send({ success, chat });
  }

}

module.exports = GuestController;
