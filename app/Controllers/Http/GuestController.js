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
    log('GUEST', `Guest requesting Link ${requestedLinkUuid}`);
    const { link } = await GuestRepository.fetchLink({ requestedLinkUuid });
    return response.send({ link });
  }

  async fetchChat({ params, response }) {
    const requestedChatId = params.chatId;
    log('GUEST', `Guest requesting Chat ${requestedChatId}`);
    const { chat } = await GuestRepository.fetchChat({ requestedChatId });
    return response.send({ chat });
  }

  async fetchMessages({ params, request, response }) {
    const requestedChatId = params.chatId;
    const requestedPage = request.only(['page']).page || 1;
    log('GUEST', `Guestrequesting Messages for Chat ${requestedChatId}`);
    const { messages } = await GuestRepository.fetchMessages({ requestedChatId, requestedPage });
    return response.send({ messages });
  }

  async sendMessage({ params, request, response }) {
    const requestedChatId = params.chatId;
    const guestId = params.guestId;
    const { backup, content } = request.only('encryptedContent').encryptedContent;
    const senderName = request.only('senderName').senderName;
    log('GUEST', `Guest ${guestId} sending encrypted Message for Chat ${requestedChatId}`);
    const { message } = await GuestRepository.sendMessage({ requestedChatId, senderName, guestId, backup, content });
    return response.send({ message });
  }

  async fetchEntryLogs({ params, response }) {
    const requestedChatId = params.chatId;
    log('GUEST', `Guest requesting Entry Logs for Chat ${requestedChatId}`);
    const { entryLogs } = await GuestRepository.fetchEntryLogs({ requestedChatId });
    return response.send({ entryLogs });
  }

}

module.exports = GuestController;
