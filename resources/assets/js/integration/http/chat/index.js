import axios from 'axios';
import logger from '../../../common/logger';

export function fetchChats(userId) {
  logger.log('CHAT', 'HTTP', `Fetching Chats for User ${userId}`);
  return axios.get(`/api/chat`).then(response => ({ chats: response.data }));
}

export function fetchInfo(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Info for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}`).then(response => response.data);
}

export function createChat(members) {
  logger.log('CHAT', 'HTTP', `Creating Chat for Members`, members);
  return axios.post(`/api/chat/`, { members }).then(response => response.data);
}

export function updateChat(chatId, payload) {
  logger.log('CHAT', 'HTTP', `Updating Chat ${chatId} -> ${JSON.stringify(payload)}`);
  return axios.put(`/api/chat/${chatId}`, payload);
}

export function checkSelfDestruct(chatId) {
  logger.log('CHAT', 'HTTP', `Checking Self Destruct for Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/selfDestruct`);
}

export function clearChat(chatId) {
  logger.log('CHAT', 'HTTP', `Clearing Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}`);
}

export function sendMessage(chatId, userId, encrypted, selfDestruct) {
  logger.log('CHAT', 'HTTP', `Sending Message from User ${userId} to Chat ${chatId}`);
  return axios.post(`/api/chat/${chatId}/message/`, { userId, encrypted, selfDestruct });
}

export function editMessage(chatId, messageId, encrypted) {
  logger.log('CHAT', 'HTTP', `Editing Message ${messageId} on Chat ${chatId}`);
  return axios.put(`/api/chat/${chatId}/message/${messageId}`, { encrypted });
}

export function deleteMessage(chatId, messageId) {
  logger.log('CHAT', 'HTTP', `Deleting Message ${messageId} from Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/message/${messageId}`);
}