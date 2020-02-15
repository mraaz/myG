'use strict';

const { log } = require('../../Common/logger');
const ChatRepository = require('../../Repositories/Chat');

class ChatController {

  async fetchChats({ auth, response }) {
    const requestingUserId = auth.user.id;
    log('CHAT', `User ${requestingUserId} requesting Chats`);
    const { chats } = await ChatRepository.fetchChats({ requestingUserId });
    return response.send({ chats });
  }

  async fetchChat({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Chat ${requestedChatId}`);
    const { chat } = await ChatRepository.fetchChat({ requestingUserId, requestedChatId });
    return response.send({ chat });
  }

  async createChat({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    const payload = request.only(['contacts', 'owners', 'title', 'icon', 'publicKey']);
    const { contacts, owners, title, icon, publicKey } = payload;
    log('CHAT', `User ${requestingUserId} creating Chat with ${JSON.stringify(payload)}`);
    const { chat } = await ChatRepository.createChat({ requestingUserId, contacts, owners, title, icon, publicKey });
    return response.send({ chat });
  }

  async updateChat({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const { muted, blocked, icon, title, owners, markAsRead, selfDestruct } = request.only(['muted', 'blocked', 'icon', 'title', 'owners', 'markAsRead', 'selfDestruct']);
    log('CHAT', `User ${requestingUserId} updating Chat ${requestedChatId} with ${JSON.stringify({ muted, blocked, icon, title, owners, markAsRead, selfDestruct })}`);
    const result = await ChatRepository.updateChat({ requestingUserId, requestedChatId, muted, blocked, icon, title, owners, markAsRead, selfDestruct });
    return response.send(result);
  }

  async clearChat({ auth, params, response }) {
    const requestingUserId = auth.user.id; 
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} clearing Chat ${requestedChatId}`);
    const result = await ChatRepository.clearChat({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async checkChatDestruction({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} checking destruction for Chat ${requestedChatId}`);
    const result = await ChatRepository.checkChatDestruction({ requestedChatId });
    return response.send(result);
  }

  async deleteChat({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} deleting Chat ${requestedChatId}`);
    const result = await ChatRepository.deleteChat({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async exitGroup({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} exiting Group ${requestedChatId}`);
    const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async removeFromGroup({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedUserId = params.userId;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestedUserId} being removed from Group ${requestedChatId} by User ${requestingUserId}`);
    const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId, requestedUserId });
    return response.send(result);
  }

  async fetchChatContacts({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Chat Contacts for ${requestedChatId}`);
    const { contacts } = await ChatRepository.fetchChatContacts({ requestingUserId, requestedChatId });
    return response.send({ contacts });
  }

  async addContactsToChat({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const requestedContacts = request.only(['contacts']).contacts;
    log('CHAT', `User ${requestingUserId} adding ${JSON.stringify(requestedContacts)} to Chat ${requestedChatId}`);
    const { contacts } = await ChatRepository.addContactsToChat({ requestingUserId, requestedChatId, contacts: requestedContacts });
    return response.send({ contacts });
  }

  async fetchMessages({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Messages for Chat ${requestedChatId}`);
    const { messages } = await ChatRepository.fetchMessages({ requestingUserId, requestedChatId });
    return response.send({ messages });
  }

  async sendMessage({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const { backup, content } = request.only('encryptedContent').encryptedContent;
    const keyReceiver = request.only('keyReceiver').keyReceiver;
    log('CHAT', `User ${requestingUserId} sending encrypted ${keyReceiver ? 'Key' : 'Message'} for Chat ${requestedChatId}`);
    const { message } = await ChatRepository.sendMessage({ requestingUserId, requestedChatId, keyReceiver, backup, content });
    return response.send({ message });
  }

  async editMessage({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const requestedMessageId = params.messageId;
    const { backup, content } = request.only('encryptedContent').encryptedContent;
    const reEncrypting = request.only('reEncrypting').reEncrypting;
    log('CHAT', `User ${requestingUserId} ${reEncrypting ? 're-encrypting' : 'editing'} Message ${requestedMessageId} for Chat ${requestedChatId}`);
    const { message } = await ChatRepository.editMessage({ requestingUserId, requestedChatId, requestedMessageId, backup, content, reEncrypting });
    return response.send({ message });
  }

  async deleteMessage({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const requestedMessageId = params.messageId;
    log('CHAT', `User ${requestingUserId} deleting Message ${requestedMessageId} for Chat ${requestedChatId}`);
    const { message } = await ChatRepository.deleteMessage({ requestingUserId, requestedChatId, requestedMessageId });
    return response.send({ message });
  }

  async setTyping({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedChatId = params.chatId;
    const isTyping = request.only('isTyping').isTyping;
    log('CHAT', `User ${requestingUserId} ${isTyping ? 'Is Typing' : 'Stopped Typing'} on Chat ${requestedChatId}`);
    const result = await ChatRepository.setTyping({ requestingUserId, requestedChatId, isTyping });
    return response.send(result);
  }

}

module.exports = ChatController;
