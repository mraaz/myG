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

  async fetchChat({ params, response }) {
    const requestedChatId = params.chatId;
    log('CHAT', `Guest requesting Chat ${requestedChatId}`);
    const { chat } = await GuestRepository.fetchChat({ requestedChatId });
    return response.send({ chat });
  }

  async fetchMessages({ params, request, response }) {
    const requestedChatId = params.chatId;
    const requestedPage = request.only(['page']).page || 1;
    log('CHAT', `Guestrequesting Messages for Chat ${requestedChatId}`);
    const { messages } = await GuestRepository.fetchMessages({ requestedChatId, requestedPage });
    return response.send({ messages });
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
