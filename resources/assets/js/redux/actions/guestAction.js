
import { generateKeysSync } from '../../integration/encryption';
import { register, unregister, fetchChat, fetchMessages, sendMessage, fetchEntryLogs } from '../../integration/http/guest';

export function registerGuestAction(chatId) {
  const { encryption: { publicKey, privateKey } } = generateKeysSync();
  return {
    type: 'REGISTER_GUEST',
    payload: register(publicKey, chatId),
    meta: { publicKey, privateKey, chatId }
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
  const entryLogsRequest = fetchEntryLogs(chatId);
  const requests = [chatRequest, messagesRequest, entryLogsRequest];
  return {
    type: 'PREPARE_CHAT',
    payload: Promise.all(requests).then(([chat, messages, entryLogs]) => ({ ...chat, ...messages, ...entryLogs })),
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