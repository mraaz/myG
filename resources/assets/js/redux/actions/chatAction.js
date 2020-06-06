import {
  fetchChats,
  fetchChat,
  fetchChatContacts,
  addContactsToChat,
  inviteUserToGroup,
  createChat,
  updateChat,
  clearChat,
  deleteChat,
  exitGroup,
  removeFromGroup,
  checkSelfDestruct,
  fetchMessages,
  fetchUnreadMessages,
  fetchEncryptionMessages,
  fetchLinks,
  updateLink,
  fetchEntryLogs,
  sendMessage,
  editMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  fetchBlockedUsers,
  blockUser,
  unblockUser,
  setTyping,
} from '../../integration/http/chat'
import { fetchGroupPrivateKeyRequests } from '../../integration/http/guest'
import { fetchGames, fetchContacts, fetchContact, fetchStatus } from '../../integration/http/user'
import { generateKeys, deserializeKey, getPublicKey } from '../../integration/encryption'

export function onNewChatAction(chat, userId) {
  return {
    type: 'NEW_CHAT',
    payload: { chat },
    meta: { userId },
  }
}

export function onChatUpdatedAction(chat, userId) {
  return {
    type: 'ON_CHAT_UPDATED',
    payload: { chat },
    meta: { userId },
  }
}

export function onGameStartingAction(chatId, userId) {
  return {
    type: 'ON_GAME_STARTING',
    payload: { chatId },
    meta: { userId },
  }
}

export function onNewMessageAction(message, userId) {
  return {
    type: 'NEW_MESSAGE',
    payload: { message },
    meta: { userId },
  }
}

export function onUpdateMessageAction(message) {
  return {
    type: 'UPDATE_MESSAGE',
    payload: { message },
  }
}

export function onDeleteMessagesAction(payload) {
  return {
    type: 'ON_MESSAGES_DELETED',
    payload,
  }
}

export function onChatNotification(payload) {
  return {
    type: 'ON_CHAT_NOTIFICATION',
    payload,
  }
}

export function onReactionAddedAction(payload) {
  return {
    type: 'ON_REACTION_ADDED',
    payload,
  }
}

export function onReactionRemovedAction(payload) {
  return {
    type: 'ON_REACTION_REMOVED',
    payload,
  }
}

export function onDeleteChatAction(payload) {
  return {
    type: 'ON_CHAT_DELETED',
    payload,
  }
}

export function onTypingAction(payload, userId) {
  return {
    type: 'ON_TYPING',
    payload,
    meta: { userId },
  }
}

export function onUserJoinedGroupAction(payload, userId) {
  return {
    type: 'ON_USER_JOINED',
    payload,
    meta: { userId },
  }
}

export function onUserLeftGroupAction(payload, userId) {
  return {
    type: 'ON_USER_LEFT',
    payload,
    meta: { userId },
  }
}

export function onGuestJoinedGroupAction(payload, userId) {
  return {
    type: 'ON_GUEST_JOINED',
    payload,
    meta: { userId },
  }
}

export function onGuestLeftGroupAction(payload, userId) {
  return {
    type: 'ON_GUEST_LEFT',
    payload,
    meta: { userId },
  }
}

export function onMarkAsReadAction(payload, userId) {
  return {
    type: 'MARK_AS_READ',
    payload,
    meta: { userId },
  }
}

export function onSelfDestructAction(payload, userId) {
  return {
    type: 'SELF_DESTRUCT',
    payload,
    meta: { userId },
  }
}

export function onPublicKeyUpdatedAction(payload, userId) {
  return {
    type: 'PUBLIC_KEY_UPDATED',
    payload: payload,
    meta: { userId },
  }
}

export function updateChatStateAction(chatId, state) {
  return {
    type: 'CHAT_STATE_UPDATED',
    payload: state,
    meta: { chatId },
  }
}

export function prepareMessengerAction(userId, alias, pin, privateKey, publicKey) {
  const chatsRequest = fetchChats()
  const gamesRequest = fetchGames(userId)
  const contactsRequest = fetchContacts()
  const statusRequest = fetchStatus()
  let encryptionRequest = Promise.resolve({})
  if (privateKey) privateKey = deserializeKey(privateKey)
  if (privateKey) encryptionRequest = Promise.resolve({ encryption: { pin, privateKey, publicKey: getPublicKey(privateKey) } })
  else if (pin) encryptionRequest = generateKeys(pin)
  else if (!publicKey) encryptionRequest = generateKeys()
  const requests = [chatsRequest, contactsRequest, gamesRequest, statusRequest, encryptionRequest]
  return {
    type: 'PREPARE_MESSENGER',
    payload: Promise.all(requests).then(([chats, contacts, games, status, encryption]) => ({
      ...chats,
      ...contacts,
      ...games,
      ...status,
      ...encryption,
    })),
    meta: { userId, alias },
  }
}

export function prepareChatAction(chatId, userId, contactId, isGroup) {
  const chatRequest = fetchChat(chatId)
  const messagesRequest = fetchMessages(chatId)
  const encryptionMessagesRequest = fetchEncryptionMessages(chatId)
  const privateKeyRequestsRequest = fetchGroupPrivateKeyRequests(chatId)
  const linksRequest = fetchLinks(chatId)
  const entryLogsRequest = fetchEntryLogs(chatId)
  const contactRequest = contactId ? fetchContact(contactId) : Promise.resolve({})
  const contactsRequest = isGroup ? fetchChatContacts(chatId) : Promise.resolve({})
  const requests = [
    chatRequest,
    messagesRequest,
    encryptionMessagesRequest,
    privateKeyRequestsRequest,
    linksRequest,
    entryLogsRequest,
    contactRequest,
    contactsRequest,
  ]
  return {
    type: 'PREPARE_CHAT',
    payload: Promise.all(
      requests
    ).then(([chat, messages, encryptionMessages, privateKeyRequests, links, entryLogs, contact, contacts]) => ({
      ...chat,
      ...messages,
      ...encryptionMessages,
      ...privateKeyRequests,
      ...links,
      ...entryLogs,
      ...contact,
      ...contacts,
    })),
    meta: { chatId, contactId, userId },
  }
}

export function fetchChatsAction() {
  return {
    type: 'FETCH_CHATS',
    payload: fetchChats(),
  }
}

export function fetchChatAction(chatId) {
  return {
    type: 'FETCH_CHAT',
    payload: fetchChat(chatId),
    meta: { chatId },
  }
}

export function createChatAction(contacts, userId, title, icon, encryption, isGroup, individualGameId, gameId) {
  return {
    type: 'CREATE_CHAT',
    payload: createChat(contacts, [userId], title, icon, encryption && encryption.publicKey, isGroup, individualGameId, gameId),
    meta: { userId, encryption },
  }
}

export function updateChatAction(chatId, payload) {
  return {
    type: 'UPDATE_CHAT',
    payload: updateChat(chatId, payload),
    meta: { chatId, ...payload },
  }
}

export function checkSelfDestructAction(chatId) {
  return {
    type: 'CHECK_SELF_DESTRUCT',
    payload: checkSelfDestruct(chatId),
    meta: { chatId },
  }
}

export function clearChatAction(chatId) {
  return {
    type: 'CLEAR_CHAT',
    payload: clearChat(chatId),
    meta: { chatId },
  }
}

export function deleteChatAction(chatId) {
  return {
    type: 'DELETE_CHAT',
    payload: deleteChat(chatId),
    meta: { chatId },
  }
}

export function exitGroupAction(chatId) {
  return {
    type: 'EXIT_GROUP',
    payload: exitGroup(chatId),
    meta: { chatId },
  }
}

export function removeFromGroupAction(chatId, userId) {
  return {
    type: 'REMOVE_FROM_GROUP',
    payload: removeFromGroup(chatId, userId),
    meta: { chatId, userId },
  }
}

export function openChatAction(chatId) {
  return {
    type: 'OPEN_CHAT',
    payload: { chatId },
  }
}

export function closeChatAction(chatId) {
  return {
    type: 'CLOSE_CHAT',
    payload: { chatId },
  }
}

export function fetchMessagesAction(chatId, page) {
  return {
    type: 'FETCH_CHAT_MESSAGES',
    payload: fetchMessages(chatId, page),
    meta: { chatId, page },
  }
}

export function fetchUnreadMessagesAction() {
  return {
    type: 'FETCH_UNREAD_MESSAGES',
    payload: fetchUnreadMessages(),
  }
}

export function clearUnreadIndicatorAction() {
  return { type: 'CLEAR_UNREAD_INDICATOR' }
}

export function sendMessageAction(chatId, userId, alias, encrypted, attachment, replyId, replyContent, replyBackup) {
  return {
    type: 'SEND_MESSAGE',
    payload: sendMessage(chatId, userId, alias, encrypted, null, attachment, replyId, replyContent, replyBackup),
    meta: { chatId, userId },
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

export function addReactionAction(chatId, userId, messageId, reactionId) {
  return {
    type: 'ADD_REACTION',
    payload: addReaction(chatId, userId, messageId, reactionId),
    meta: { chatId, userId, messageId, reactionId },
  }
}

export function removeReactionAction(chatId, userId, messageId, reactionId) {
  return {
    type: 'REMOVE_REACTION',
    payload: removeReaction(chatId, userId, messageId, reactionId),
    meta: { chatId, userId, messageId, reactionId },
  }
}

export function fetchBlockedUsersAction() {
  return {
    type: 'FETCH_BLOCKED_USERS',
    payload: fetchBlockedUsers(),
  }
}

export function blockUserAction(blockedUserId) {
  return {
    type: 'BLOCK_USER',
    payload: blockUser(blockedUserId),
  }
}

export function unblockUserAction(blockedUserId) {
  return {
    type: 'UNBLOCK_USER',
    payload: unblockUser(blockedUserId),
  }
}

export function setTypingAction(chatId, isTyping) {
  return {
    type: 'DELETE_MESSAGE',
    payload: setTyping(chatId, isTyping),
    meta: { chatId, isTyping },
  }
}

export function addContactsToChatAction(userId, chatId, contacts, publicKey, privateKey, userPrivateKey) {
  return {
    type: 'ADD_CONTACTS_TO_CHAT',
    payload: addContactsToChat(userId, chatId, contacts, publicKey, privateKey, userPrivateKey),
    meta: { userId, chatId },
  }
}

export function inviteUserToGroupAction(userId, chatId, contactId, publicKey, privateKey, userPrivateKey) {
  return {
    type: 'INVITE_USER_TO_GROUP',
    payload: inviteUserToGroup(userId, chatId, contactId, publicKey, privateKey, userPrivateKey),
    meta: { userId, chatId },
  }
}

export function updateLinkAction(chatId, uuid, expiry, expire) {
  return {
    type: 'UPDATE_LINK',
    payload: updateLink(chatId, uuid, expiry, expire),
    meta: { chatId, uuid },
  }
}
