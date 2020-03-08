'use strict'

const { log } = require('../../Common/logger');
const GuestRepository = require('../../Repositories/Guest');

class GuestController {

  async register({ request, response }) {
    log('GUEST', `Registering Guest`);
    const requestedChatId = request.only(['chatId']).chatId;
    const publicKey = request.only(['publicKey']).publicKey;
    const { guest, chat } = await GuestRepository.register({ requestedChatId, publicKey });
    return response.send({ guest, chat });
  }

  async fetchLink({ params, response }) {
    const requestedLinkUuid = params.uuid;
    log('CHAT', `Guest requesting Link ${requestedLinkUuid}`);
    const { link } = await GuestRepository.fetchLink({ requestedLinkUuid });
    return response.send({ link });
  }

  async sendMessage({ params, request, response }) {
    const requestedChatId = params.chatId;
    const guestId = params.guestId;
    const { backup, content } = request.only('encryptedContent').encryptedContent;
    const senderName = request.only('senderName').senderName;
    log('CHAT', `Guest ${guestId} sending encrypted Message for Chat ${requestedChatId}`);
    const { message } = await GuestRepository.sendMessage({ requestedChatId, senderName, guestId, backup, content });
    return response.send({ message });
  }

}

module.exports = GuestController;
