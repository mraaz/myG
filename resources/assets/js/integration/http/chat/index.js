import axios from 'axios';

export function fetchChats(userId) {
  console.log('HTTP', `Fetching Chats for User ${userId}`);
  return axios.get(`/api/chats/${userId}`).then(response => ({ chats: response.data }));
}

export function fetchMessages(chatId) {
  console.log('HTTP', `Fetching Messages for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}`).then(response => ({ messages: response.data }));
}

export function fetchInfo(chatId) {
  console.log('HTTP', `Fetching Info for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}/info`).then(response => response.data);
}

export function createChat(members) {
  console.log('HTTP', `Creating Chat for Members`, members);
  return axios.post(`/api/chat/`, { members });
}

export function sendMessage(chatId, userId, content) {
  console.log('HTTP', `Sending Message ${content} from User ${userId} to Chat ${chatId}`);
  return axios.post(`/api/chat/${chatId}/message/`, { userId, content });
}

export function editMessage(chatId, messageId, content) {
  console.log('HTTP', `Editing Message ${messageId} to content ${content} on Chat ${chatId}`);
  return axios.put(`/api/chat/${chatId}/message/${messageId}`, { content });
}

export function deleteMessage(chatId, messageId) {
  console.log('HTTP', `Deleting Message ${messageId} from Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/message/${messageId}`);
}