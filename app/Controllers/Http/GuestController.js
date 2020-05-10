'use strict'

const { log } = require('../../Common/logger');
const GuestRepository = require('../../Repositories/Guest');

class GuestController {

  async register({ request, response }) {
    log('GUEST', `Registering Guest`);
    const requestedChatId = request.only(['chatId']).chatId;
    const requestedAlias = request.only(['alias']).alias;
    const publicKey = request.only(['publicKey']).publicKey;
    const { guest, chat } = await GuestRepository.register({ requestedChatId, requestedAlias, publicKey });
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
    log('GUEST', `Guest requesting Messages for Chat ${requestedChatId}`);
    const { messages } = await GuestRepository.fetchMessages({ requestedChatId, requestedPage });
    return response.send({ messages });
  }

  async fetchEncryptionMessages({ params, response }) {
    const requestingGuestId = params.guestId;
    const requestedChatId = params.chatId;
    log('GUEST', `Guest ${requestingGuestId} requesting Messages for Chat ${requestedChatId}`);
    const { encryptionMessages } = await GuestRepository.fetchEncryptionMessages({ requestingGuestId, requestedChatId });
    return response.send({ encryptionMessages });
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

  async fetchChatContacts({ params, response }) {
    const requestedChatId = params.chatId;
    log('GUEST', `Guest requesting Contacts for Chat ${requestedChatId}`);
    const { contacts } = await GuestRepository.fetchChatContacts({ requestedChatId });
    return response.send({ contacts });
  }

  async fetchGroupPrivateKeyRequests({ params, response }) {
    const { chatId } = params;
    log('CHAT', `Fetching Private Key Requests for Group ${chatId}`);
    const { requests } = await GuestRepository.fetchGroupPrivateKeyRequests({ chatId });
    return response.send({ requests });
  }

  async requestGroupPrivateKey({ params, request, response }) {
    const { userId, chatId } = params;
    const { publicKey } = request.only(['publicKey']);
    log('CHAT', `User ${userId} requesting Group ${chatId} Private Key`);
    const { success, error } = await GuestRepository.requestGroupPrivateKey({ userId, chatId, publicKey });
    return response.send({ success, error });
  }

  async confirmGroupPrivateKey({ params, response }) {
    const { userId, chatId } = params;
    log('CHAT', `User ${userId} confirming Group ${chatId} Private Key`);
    const { success, error } = await GuestRepository.confirmGroupPrivateKey({ userId, chatId });
    return response.send({ success, error });
  }

}

module.exports = GuestController;
