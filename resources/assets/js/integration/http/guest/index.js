import axios from 'axios';
import logger from '../../../common/logger';

export function register(publicKey, chatId, alias, uuid) {
  logger.log('GUEST', 'HTTP', `Registering Guest in Chat ${JSON.stringify({ chatId, alias, uuid })}`);
  return axios.post(`/api/guest/`, { publicKey, chatId, alias, uuid }).then(response => response.data);
}

export function unregister(guestId, chatId) {
  logger.log('GUEST', 'HTTP', `Unregistering Guest ${guestId} from Chat ${chatId}`);
  return axios.delete(`/api/guest/${guestId}/chat/${chatId}`).then(response => response.data);
}

export function fetchLink(uuid) {
  logger.log('GUEST', 'HTTP', `Fetching Link ${uuid}`);
  return axios.get(`/api/guest/link/${uuid}`).then(response => response.data);
}

export function fetchGame(uuid) {
  logger.log('GUEST', 'HTTP', `Fetching Game ${uuid}`);
  return axios.get(`/api/guest/game/${uuid}`).then(response => response.data);
}

export function fetchChat(chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Chat ${chatId}`);
  return axios.get(`/api/guest/chat/${chatId}`).then(response => response.data);
}

export function fetchMessages(chatId, page) {
  logger.log('GUEST', 'HTTP', `Fetching Page ${page} of Messages for Chat ${chatId}`);
  return axios.get(`/api/guest/chat/${chatId}/message?page=${page || 1}`).then(response => response.data);
}

export function fetchEncryptionMessages(guestId, chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Encryption Messages for Chat ${chatId}`);
  return axios.get(`/api/guest/${guestId}/chat/${chatId}/message/encryption`).then(response => response.data);
}

export function sendMessage(chatId, guestId, senderName, encryptedContent, keyReceiver, attachment, replyId, replyContent, replyBackup, uuid) {
  logger.log('GUEST', 'HTTP', `Sending Message from Guest ${guestId} to Chat ${chatId}`);
  return axios.post(`/api/guest/${guestId}/chat/${chatId}/message/`, { encryptedContent, keyReceiver, attachment, senderName, replyId, replyContent, replyBackup, uuid }).then(response => response.data);
}

export function editMessage(chatId, guestId, messageId, encryptedContent, reEncrypting) {
  logger.log('GUEST', 'HTTP', `Editing Message ${messageId} on Chat ${chatId}`);
  return axios.put(`/api/guest/${guestId}/chat/${chatId}/message/${messageId}`, { encryptedContent, reEncrypting }).then(response => response.data);
}

export function deleteMessage(chatId, guestId, messageId) {
  logger.log('GUEST', 'HTTP', `Deleting Message ${messageId} from Chat ${chatId}`);
  return axios.delete(`/api/guest/${guestId}/chat/${chatId}/message/${messageId}`).then(response => response.data);
}

export function addReaction(chatId, guestId, messageId, reactionId, senderName) {
  logger.log('GUEST', 'HTTP', `Adding Reaction ${reactionId} to Message ${messageId} in Chat ${chatId}`);
  return axios.post(`/api/guest/${guestId}/chat/${chatId}/message/${messageId}/reaction`, { reactionId, senderName }).then(response => response.data);
}

export function removeReaction(chatId, guestId, messageId, reactionId) {
  logger.log('GUEST', 'HTTP', `Removing Reaction ${reactionId} to Message ${messageId} in Chat ${chatId}`);
  return axios.delete(`/api/guest/${guestId}/chat/${chatId}/message/${messageId}/reaction/${reactionId}`).then(response => response.data);
}

export function fetchEntryLogs(chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Entry Logs for ${chatId}`);
  return axios.get(`/api/guest/chat/${chatId}/entryLogs`).then(response => response.data);
}

export function fetchChatContacts(chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Entry Logs for ${chatId}`);
  return axios.get(`/api/guest/chat/${chatId}/contacts`).then(response => response.data);
}

export function fetchGroupPrivateKeyRequests(chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Private Key Requests for Group ${chatId}`);
  return axios.get(`/api/guest/privateKey/${chatId}`).then(response => response.data);
}

export function requestGroupPrivateKey(guestId, chatId, publicKey) {
  logger.log('GUEST', 'HTTP', `Requesting Group ${chatId} Private key for Guest ${guestId}`);
  return axios.post(`/api/guest/privateKey/${guestId}/${chatId}`, { publicKey }).then(response => response.data);
}

export function confirmGroupPrivateKey(guestId, chatId) {
  logger.log('GUEST', 'HTTP', `Confirming Group ${chatId} Private key for Guest ${guestId}`);
  return axios.delete(`/api/guest/privateKey/${guestId}/${chatId}`).then(response => response.data);
}

export function markLastReadGuest(chatId, guestId) {
  logger.log('GUEST', 'HTTP', `Guest ${guestId} marking last read for chat ${chatId}`);
  return axios.post(`/api/guest/lastRead/${guestId}/${chatId}`).then(response => response.data);
}

export function fetchProfile(alias) {
  logger.log('GUEST', 'HTTP', `Fetching Profile for ${alias}`);
  return axios.get(`/api/guest/profile/${alias}`).then(response => response.data);
}
