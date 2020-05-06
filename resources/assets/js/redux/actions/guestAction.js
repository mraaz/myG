
import { generateKeysSync } from '../../integration/encryption';
import { register, unregister, fetchChat, fetchMessages, fetchEncryptionMessages, fetchGroupPrivateKeyRequests,sendMessage, fetchEntryLogs, fetchChatContacts } from '../../integration/http/guest';

export function setGuestLinkAction(guestLink) {
  return {
    type: 'SET_GUEST_LINK',
    payload: guestLink,
  }
}

export function registerGuestAction(chatId, alias) {
  const { encryption: { publicKey, privateKey } } = generateKeysSync();
  return {
    type: 'REGISTER_GUEST',
    payload: register(publicKey, chatId, alias),
    meta: { publicKey, privateKey, chatId, alias }
  }
}

export function unregisterGuestAction(guestId, chatId) {
  return {
    type: 'UNREGISTER_GUEST',
    payload: unregister(guestId, chatId),
    meta: { guestId, chatId }
  }
}

export function prepareChatAction(chatId, userId) {
  const chatRequest = fetchChat(chatId);
  const messagesRequest = fetchMessages(chatId, 1);
  const encryptionMessagesRequest = fetchEncryptionMessages(userId, chatId);
  const privateKeyRequestsRequest = fetchGroupPrivateKeyRequests(chatId);
  const entryLogsRequest = fetchEntryLogs(chatId);
  const contactsRequest = fetchChatContacts(chatId);
  const requests = [chatRequest, messagesRequest, encryptionMessagesRequest, privateKeyRequestsRequest, entryLogsRequest, contactsRequest];
  return {
    type: 'PREPARE_CHAT',
    payload: Promise.all(requests).then(([chat, messages, encryptionMessages, privateKeyRequests, entryLogs, contacts]) => ({ ...chat, ...messages, ...encryptionMessages, ...privateKeyRequests, ...entryLogs, ...contacts })),
    meta: { chatId, userId }
  }
}

export function fetchMessagesAction(chatId, page) {
  return {
    type: 'FETCH_CHAT_MESSAGES',
    payload: fetchMessages(chatId, page),
    meta: { chatId, page },
  }
}

export function sendMessageAction(chatId, userId, alias, encrypted) {
  return {
    type: 'SEND_MESSAGE',
    payload: sendMessage(chatId, userId, alias, encrypted),
    meta: { chatId },
  }
}

export function updateChatStateAction(chatId, state) {
  return {
    type: 'CHAT_STATE_UPDATED',
    payload: state,
    meta: { chatId },
  }
}