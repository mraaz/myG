import axios from 'axios';
import logger from '../../../common/logger';

export function register(publicKey, chatId, alias) {
  logger.log('GUEST', 'HTTP', `Registering Guest in Chat ${chatId, alias}`);
  return axios.post(`/api/guest/`, { publicKey, chatId, alias }).then(response => response.data);
}

export function unregister(guestId, chatId) {
  logger.log('GUEST', 'HTTP', `Unregistering Guest ${guestId} from Chat ${chatId}`);
  return axios.delete(`/api/guest/${guestId}/chat/${chatId}`).then(response => response.data);
}

export function fetchLink(uuid) {
  logger.log('GUEST', 'HTTP', `Fetching Link ${uuid}`);
  return axios.get(`/api/guest/link/${uuid}`).then(response => response.data);
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

export function sendMessage(chatId, guestId, senderName, encryptedContent) {
  logger.log('GUEST', 'HTTP', `Sending Message from GUEST ${guestId} to Chat ${chatId}`);
  return axios.post(`/api/guest/${guestId}/chat/${chatId}`, { encryptedContent, senderName }).then(response => response.data);
}

export function fetchEntryLogs(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Entry Logs for ${chatId}`);
  return axios.get(`/api/guest/chat/${chatId}/entryLogs`).then(response => response.data);
}

export function fetchGroupPrivateKeyRequests(chatId) {
  logger.log('GUEST', 'HTTP', `Fetching Private Key Requests for Group ${chatId}`);
  return axios.get(`/api/guest/privateKey/${chatId}`).then(response => response.data);
}

export function requestGroupPrivateKey(userId, chatId, publicKey) {
  logger.log('GUEST', 'HTTP', `Requesting Group ${chatId} Private key for User ${userId}`);
  return axios.post(`/api/guest/privateKey/${userId}/${chatId}`, { publicKey }).then(response => response.data);
}

export function confirmGroupPrivateKey(userId, chatId) {
  logger.log('GUEST', 'HTTP', `Confirming Group ${chatId} Private key for User ${userId}`);
  return axios.delete(`/api/guest/privateKey/${userId}/${chatId}`).then(response => response.data);
}