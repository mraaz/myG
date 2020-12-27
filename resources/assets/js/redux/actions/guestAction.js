import { v4 as uuidv4 } from 'uuid';
import { generateKeysSync } from '../../integration/encryption'
import {
  register,
  unregister,
  fetchChat,
  fetchMessages,
  fetchEncryptionMessages,
  fetchGroupPrivateKeyRequests,
  sendMessage,
  editMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  fetchEntryLogs,
  fetchChatContacts,
  markLastReadGuest,
} from '../../integration/http/guest'

export function setGuestLinkAction(guestLink) {
  return {
    type: 'SET_GUEST_LINK',
    payload: guestLink,
  }
}

export function registerGuestAction(chatId, alias, uuid) {
  const {
    encryption: { publicKey, privateKey },
  } = generateKeysSync()
  return {
    type: 'REGISTER_GUEST',
    payload: register(publicKey, chatId, alias, uuid),
    meta: { publicKey, privateKey, chatId, alias, uuid },
  }
}

export function unregisterGuestAction(guestId, chatId) {
  return {
    type: 'UNREGISTER_GUEST',
    payload: unregister(guestId, chatId),
    meta: { guestId, chatId },
  }
}

export function prepareChatAction(chatId, userId) {
  const chatRequest = fetchChat(chatId)
  const messagesRequest = fetchMessages(chatId, 1)
  const encryptionMessagesRequest = fetchEncryptionMessages(userId, chatId)
  const privateKeyRequestsRequest = fetchGroupPrivateKeyRequests(chatId)
  const entryLogsRequest = fetchEntryLogs(chatId)
  const contactsRequest = fetchChatContacts(chatId)
  const requests = [chatRequest, messagesRequest, encryptionMessagesRequest, privateKeyRequestsRequest, entryLogsRequest, contactsRequest]
  return {
    type: 'PREPARE_CHAT',
    payload: Promise.all(requests).then(([chat, messages, encryptionMessages, privateKeyRequests, entryLogs, contacts]) => ({
      ...chat,
      ...messages,
      ...encryptionMessages,
      ...privateKeyRequests,
      ...entryLogs,
      ...contacts,
    })),
    meta: { chatId, userId },
  }
}

export function fetchMessagesAction(chatId, page) {
  return {
    type: 'FETCH_CHAT_MESSAGES',
    payload: fetchMessages(chatId, page),
    meta: { chatId, page },
  }
}

export function sendMessageAction(chatId, userId, alias, encrypted, attachment, replyId, replyContent, replyBackup, unencryptedContent) {
  const uuid = uuidv4()
  return {
    type: 'SEND_MESSAGE',
    payload: sendMessage(chatId, userId, alias, encrypted, null, attachment, replyId, replyContent, replyBackup, uuid),
    meta: { chatId, userId, alias, encrypted, attachment, replyId, replyContent, replyBackup, uuid, unencryptedContent },
  }
}

export function editMessageAction(chatId, userId, messageId, encrypted) {
  return {
    type: 'EDIT_MESSAGE',
    payload: editMessage(chatId, userId, messageId, encrypted),
    meta: { chatId, userId },
  }
}

export function deleteMessageAction(chatId, userId, messageId, origin) {
  return {
    type: 'DELETE_MESSAGE',
    payload: deleteMessage(chatId, userId, messageId),
    meta: { chatId, userId, messageId, origin },
  }
}

export function addReactionAction(chatId, userId, messageId, reactionId, senderName) {
  return {
    type: 'ADD_REACTION',
    payload: addReaction(chatId, userId, messageId, reactionId, senderName),
    meta: { chatId, userId, messageId, reactionId, senderName },
  }
}

export function removeReactionAction(chatId, userId, messageId, reactionId) {
  return {
    type: 'REMOVE_REACTION',
    payload: removeReaction(chatId, userId, messageId, reactionId),
    meta: { chatId, userId, messageId, reactionId },
  }
}

export function updateChatStateAction(chatId, state) {
  return {
    type: 'CHAT_STATE_UPDATED',
    payload: state,
    meta: { chatId },
  }
}

export function markLastReadGuestAction(chatId, guestId) {
  return {
    type: 'GUEST_MARK_LAST_READ',
    payload: markLastReadGuest(chatId, guestId),
    meta: { chatId, guestId },
  }
}
