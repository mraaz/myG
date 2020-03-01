import axios from 'axios';
import logger from '../../../common/logger';
import { encryptMessage } from '../../encryption';

export function fetchChats() {
  logger.log('CHAT', 'HTTP', `Fetching Chats`);
  return axios.get(`/api/chat`).then(response => response.data);
}

export function fetchChat(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}`).then(response => response.data);
}

export function createChat(contacts, owners, title, icon, publicKey) {
  logger.log('CHAT', 'HTTP', `Creating Chat: `, { contacts, owners, title, icon, publicKey });
  return axios.post(`/api/chat/`, { contacts, owners, title, icon, publicKey }).then(response => response.data);
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

export function deleteChat(chatId) {
  logger.log('CHAT', 'HTTP', `Deleting Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/delete`).then(response => response.data);
}

export function exitGroup(chatId) {
  logger.log('CHAT', 'HTTP', `Exiting Group ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/exit`).then(response => response.data);
}

export function removeFromGroup(chatId, userId) {
  logger.log('CHAT', 'HTTP', `Removing User ${userId} from Group ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/exit/${userId}`).then(response => response.data);
}

export function fetchChatContacts(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}/contacts`).then(response => response.data);
}

export function addContactsToChat(userId, chatId, contacts, publicKey, privateKey, userPrivateKey) {
  logger.log('CHAT', 'HTTP', `Adding Contacts To Chat ${chatId}: `, contacts);
  return axios.put(`/api/chat/${chatId}/contacts`, { contacts }).then(response => sendGroupPrivateKey(userId, chatId, contacts, publicKey, privateKey, userPrivateKey).then(() => response.data));
}

export function inviteUserToGroup(userId, chatId, contacts, publicKey, privateKey, userPrivateKey) {
  logger.log('CHAT', 'HTTP', `Invite Users ${JSON.stringify(contacts)} To Group ${chatId}`);
  return axios.put(`/api/notifications/inviteToGroup`, { userId: contacts[0], chatId }).then(response => sendGroupPrivateKey(userId, chatId, contacts, publicKey, privateKey, userPrivateKey).then(() => response.data));
}

export function fetchMessages(chatId, page) {
  logger.log('CHAT', 'HTTP', `Fetching Messages for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}/message?page=${page || 1}`).then(response => response.data);
}

export function sendMessage(chatId, userId, encryptedContent, keyReceiver) {
  logger.log('CHAT', 'HTTP', `Sending Message from User ${userId} to Chat ${chatId}`);
  return axios.post(`/api/chat/${chatId}/message/`, { encryptedContent, keyReceiver }).then(response => response.data);
}

export function editMessage(chatId, messageId, encryptedContent, reEncrypting) {
  logger.log('CHAT', 'HTTP', `Editing Message ${messageId} on Chat ${chatId}`);
  return axios.put(`/api/chat/${chatId}/message/${messageId}`, { encryptedContent, reEncrypting }).then(response => response.data);
}

export function deleteMessage(chatId, messageId) {
  logger.log('CHAT', 'HTTP', `Deleting Message ${messageId} from Chat ${chatId}`);
  return axios.delete(`/api/chat/${chatId}/message/${messageId}`).then(response => response.data);
}

export function setTyping(chatId, isTyping) {
  logger.log('CHAT', 'HTTP', `Setting as ${isTyping ? 'Typing' : 'Not Typing'} for Chat ${chatId}`);
  return axios.put(`/api/chat/${chatId}/typing`, { isTyping }).then(response => response.data);
}

export function fetchLinks(chatId) {
  logger.log('CHAT', 'HTTP', `Fetching Links for Chat ${chatId}`);
  return axios.get(`/api/chat/${chatId}/links`).then(response => response.data);
}

function sendGroupPrivateKey(userId, chatId, contacts, publicKey, privateKey, userPrivateKey) {
  const serializedKey = JSON.stringify(privateKey);
  contacts.forEach(contactId => {
    const content = encryptMessage(serializedKey, publicKey, userPrivateKey);
    sendMessage(chatId, userId, { content, backup: '' }, contactId);
  });
  return Promise.resolve();
}