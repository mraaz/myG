import axios from 'axios';
import logger from '../../../common/logger';

export function fetchChats() {
  logger.log('CHAT', 'HTTP', `Fetching Chats`);
  return axios.get(`/api/chat`).then(response => response.data);
}

export function fetchChat(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}`).then(response => response.data);
}

export function createChat(contacts, title, icon, publicKey) {
  logger.log('CHAT', 'HTTP', `Creating Chat: `, { contacts, title, icon, publicKey });
  return axios.post(`/api/chat/`, { contacts, title, icon, publicKey }).then(response => response.data);
}

export function updateChat(chatId, payload) {
  logger.log('CHAT', 'HTTP', `Updating Chat ${chatId} -> ${JSON.stringify(payload)}`);
  return axios.put(`/api/chat/${chatId}`, payload).then(response => response.data);
}

export function clearChat(chatId) {
  logger.log('CHAT', 'HTTP', `Clearing Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}`).then(response => response.data);
}

export function checkSelfDestruct(chatId) {
  logger.log('CHAT', 'HTTP', `Checking Self Destruct for Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/destruction`).then(response => response.data);
}

export function fetchMessages(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Messages for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}/message/`).then(response => response.data);
}

export function sendMessage(chatId, userId, encryptedContent) {
  logger.log('CHAT', 'HTTP', `Sending Message from User ${userId} to Chat ${chatId}`);
  return axios.post(`/api/chat/${chatId}/message/`, { encryptedContent }).then(response => response.data);
}

export function editMessage(chatId, messageId, encryptedContent, reEncrypting) {
  logger.log('CHAT', 'HTTP', `Editing Message ${messageId} on Chat ${chatId}`);
  return axios.put(`/api/chat/${chatId}/message/${messageId}`, { encryptedContent, reEncrypting }).then(response => response.data);
}

export function deleteMessage(chatId, messageId) {
  logger.log('CHAT', 'HTTP', `Deleting Message ${messageId} from Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/message/${messageId}`).then(response => response.data);
}