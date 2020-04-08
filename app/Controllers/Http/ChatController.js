'use strict';

const { log } = require('../../Common/logger');
const ChatRepository = require('../../Repositories/Chat');

class ChatController {

  async fetchChats({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const onlyGroups = request.only('onlyGroups').onlyGroups;
    log('CHAT', `User ${requestingUserId} requesting ${onlyGroups ? 'Groups' : 'Chats'}`);
    const { chats } = await ChatRepository.fetchChats({ requestingUserId, onlyGroups });
    return response.send({ chats });
  }

  async fetchChat({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Chat ${requestedChatId}`);
    const { chat } = await ChatRepository.fetchChat({ requestingUserId, requestedChatId });
    return response.send({ chat });
  }

  async createChat({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const payload = request.only(['contacts', 'owners', 'title', 'icon', 'publicKey', 'isGroup', 'gameId']);
    const { contacts, owners, title, icon, publicKey, isGroup, gameId } = payload;
    log('CHAT', `User ${requestingUserId} creating ${isGroup ? 'Group' : 'Chat'} with ${JSON.stringify(payload)}`);
    const { chat } = await ChatRepository.createChat({ requestingUserId, contacts, owners, title, icon, publicKey, isGroup, gameId });
    return response.send({ chat });
  }

  async updateChat({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const { muted, blocked, blockedUsers, isPrivate, icon, title, owners, moderators, markAsRead, selfDestruct } = request.only(['muted', 'blocked', 'blockedUsers', 'isPrivate', 'icon', 'title', 'owners', 'moderators', 'markAsRead', 'selfDestruct']);
    log('CHAT', `User ${requestingUserId} updating Chat ${requestedChatId} with ${JSON.stringify({ muted, blocked, blockedUsers, isPrivate, icon, title, owners, moderators, markAsRead, selfDestruct })}`);
    const result = await ChatRepository.updateChat({ requestingUserId, requestedChatId, muted, blocked, blockedUsers, isPrivate, icon, title, owners, moderators, markAsRead, selfDestruct });
    return response.send(result);
  }

  async clearChat({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId)  throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} clearing Chat ${requestedChatId}`);
    const result = await ChatRepository.clearChat({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async checkChatDestruction({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} checking destruction for Chat ${requestedChatId}`);
    const result = await ChatRepository.checkChatDestruction({ requestedChatId });
    return response.send(result);
  }

  async deleteChat({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} deleting Chat ${requestedChatId}`);
    const result = await ChatRepository.deleteChat({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async exitGroup({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} exiting Group ${requestedChatId}`);
    const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId });
    return response.send(result);
  }

  async removeFromGroup({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedUserId = params.userId;
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestedUserId} being removed from Group ${requestedChatId} by User ${requestingUserId}`);
    const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId, requestedUserId });
    return response.send(result);
  }

  async fetchChatContacts({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Chat Contacts for ${requestedChatId}`);
    const { contacts } = await ChatRepository.fetchChatContacts({ requestingUserId, requestedChatId });
    return response.send({ contacts });
  }

  async addContactsToChat({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const requestedContacts = request.only(['contacts']).contacts;
    const fromLink = request.only(['fromLink']).fromLink;
    log('CHAT', `User ${requestingUserId} adding ${JSON.stringify(requestedContacts)} to Chat ${requestedChatId}`);
    const { contacts, error } = await ChatRepository.addContactsToChat({ requestingUserId, requestedChatId, contacts: requestedContacts, fromLink });
    return response.send({ contacts, error });
  }

  async fetchMessages({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const requestedPage = request.only(['page']).page || 1;
    log('CHAT', `User ${requestingUserId} requesting Messages for Chat ${requestedChatId}`);
    const { messages } = await ChatRepository.fetchMessages({ requestingUserId, requestedChatId, requestedPage });
    return response.send({ messages });
  }

  async fetchUnreadMessages({ auth, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    log('CHAT', `User ${requestingUserId} requesting Unread Messages`);
    const { unreadMessages } = await ChatRepository.fetchUnreadMessages({ requestingUserId });
    return response.send({ unreadMessages });
  }

  async fetchEncryptionMessages({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Encryption Messages for Chat ${requestedChatId}`);
    const { encryptionMessages } = await ChatRepository.fetchEncryptionMessages({ requestingUserId, requestedChatId });
    return response.send({ encryptionMessages });
  }

  async sendMessage({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const { backup, content } = request.only('encryptedContent').encryptedContent;
    const senderName = request.only('senderName').senderName;
    const keyReceiver = request.only('keyReceiver').keyReceiver;
    log('CHAT', `User ${requestingUserId} sending encrypted ${keyReceiver ? 'Key' : 'Message'} for Chat ${requestedChatId}`);
    const { message } = await ChatRepository.sendMessage({ requestingUserId, requestedChatId, senderName, keyReceiver, backup, content });
    return response.send({ message });
  }

  async editMessage({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
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
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const requestedMessageId = params.messageId;
    log('CHAT', `User ${requestingUserId} deleting Message ${requestedMessageId} for Chat ${requestedChatId}`);
    const { message } = await ChatRepository.deleteMessage({ requestingUserId, requestedChatId, requestedMessageId });
    return response.send({ message });
  }

  async setTyping({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const isTyping = request.only('isTyping').isTyping;
    log('CHAT', `User ${requestingUserId} ${isTyping ? 'Is Typing' : 'Stopped Typing'} on Chat ${requestedChatId}`);
    const result = await ChatRepository.setTyping({ requestingUserId, requestedChatId, isTyping });
    return response.send(result);
  }

  async fetchChatInfo({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Group Info for Chat ${requestedChatId}`);
    const { chat } = await ChatRepository.fetchChatInfo({ requestingUserId, requestedChatId });
    return response.send({ chat });
  }

  async fetchLinks({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Links for Chat ${requestedChatId}`);
    const { links } = await ChatRepository.fetchLinks({ requestingUserId, requestedChatId });
    return response.send({ links });
  }

  async fetchLink({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId)  throw new Error('Auth Error');
    const requestedLinkUuid = params.uuid;
    log('CHAT', `User ${requestingUserId} requesting Link ${requestedLinkUuid}`);
    const { link } = await ChatRepository.fetchLink({ requestedLinkUuid });
    return response.send({ link });
  }

  async updateLink({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId) throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    const requestedLinkUuid = params.uuid;
    const { expiry, expire } = request.only(['expiry', 'expire']);
    log('CHAT', `User ${requestingUserId} updating link ${requestedLinkUuid} for Chat ${requestedChatId} - ${expiry} / ${expire}`);
    const { link } = await ChatRepository.updateLink({ requestedChatId, requestedLinkUuid, expiry, expire });
    return response.send({ link });
  }

  async fetchEntryLogs({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId)  throw new Error('Auth Error');
    const requestedChatId = params.chatId;
    log('CHAT', `User ${requestingUserId} requesting Entry Logs for Chat ${requestedChatId}`);
    const { entryLogs } = await ChatRepository.fetchEntryLogs({ requestedChatId });
    return response.send({ entryLogs });
  }

  async acceptGameGroupInvitation({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    if (!requestingUserId)  throw new Error('Auth Error');
    const requestedUserId = request.only(['userId']).userId;
    const requestedGameId = params.gameId;
    log('CHAT', `User ${requestingUserId} accepting to join Game Group ${requestedGameId}`);
    const { success, error } = await ChatRepository.acceptGameGroupInvitation({ requestedUserId, requestedGameId });
    return response.send({ success, error });
  }

}

module.exports = ChatController;
