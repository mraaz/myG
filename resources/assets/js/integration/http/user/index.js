import axios from 'axios';
import logger from '../../../common/logger';

export function storePublicKey(publicKey) {
  logger.log('USER', 'HTTP', `Storing Public Key`);
  return axios.put(`/api/user_chat/publicKey/`, { publicKey }).then(response => response.data);
}

export function fetchContacts() {
  logger.log('USER', 'HTTP', `Fetching Contacts`);
  return axios.get(`/api/user_chat/contact/`).then(response => response.data);
}

export function fetchContact(contactId) {
  logger.log('USER', 'HTTP', `Fetching Contact`);
  return axios.get(`/api/user_chat/contact/${contactId}`).then(response => response.data);
}

export function fetchStatus() {
  logger.log('USER', 'HTTP', `Fetching Status`);
  return axios.get(`/api/user_chat/status/`).then((response => response.data));
}

export function updateStatus(status, forceStatus) {
  logger.log('USER', 'HTTP', `${forceStatus ? 'Forcing' : 'Setting'} Status ${status}`);
  return axios.put(`/api/user_chat/status/`, { status, forceStatus }).then((response => response.data));
}

export function fetchFriendRequests() {
  logger.log('USER', 'HTTP', `Fetching Friend Requests.`);
  return axios.get(`/api/notifications/outgoingFriendRequests`).then((response => response.data));
}

export function addAsFriend(friendId) {
  logger.log('USER', 'HTTP', `User adding ${friendId} as Friend.`);
  return axios.post(`/api/notifications/addFriend`, { other_user_id: friendId }).then((response => response.data));
}