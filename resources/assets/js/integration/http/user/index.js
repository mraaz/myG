import axios from 'axios';
import logger from '../../../common/logger';

export function prepareMessenger() {
  logger.log('USER', 'HTTP', `Preparing Messenger`);
  return axios.get(`/api/messenger`).then(response => response.data);
}

export function fetchUser(userId) {
  logger.log('USER', 'HTTP', `Fetching User`);
  return axios.get(`/api/user/${userId}`).then(response => response.data);
}

export function storePublicKey(publicKey) {
  logger.log('USER', 'HTTP', `Storing Public Key`);
  return axios.put(`/api/user_chat/publicKey/`, { publicKey }).then(response => response.data);
}

export function sendEncryptionEmail(publicKey, pin) {
  logger.log('USER', 'HTTP', `Sending Encryption Email`);
  return axios.post(`/api/user_chat/encryption_email/`, { publicKey, pin }).then(response => response.data);
}

export function fetchGames(userId) {
  logger.log('USER', 'HTTP', `Fetching Games`);
  return axios.get(`/api/user_chat/game/`).then(response => ({ games: ((response.data || {}).games || {})[userId] }));
}

export function favoriteGame(gameId) {
  logger.log('USER', 'HTTP', `Favoriting Game ${gameId}`);
  return axios.put(`/api/user_chat/game/${gameId}`).then(response => response.data);
}

export function unfavoriteGame(gameId) {
  logger.log('USER', 'HTTP', `Unfavoriting Game ${gameId}`);
  return axios.delete(`/api/user_chat/game/${gameId}`).then(response => response.data);
}

export function updateGameIcon(gameId, icon) {
  logger.log('USER', 'HTTP', `Updating Game Icon`);
  return axios.put(`/api/user_chat/game/${gameId}/icon`, { icon }).then(response => response.data);
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

export function fetchSettings() {
  logger.log('USER', 'HTTP', `Fetching Status`);
  return axios.get(`/api/user_settings`).then((response => response.data));
}

export function togglePushNotifications() {
  logger.log('USER', 'HTTP', `Fetching Status`);
  return axios.post(`/api/user_settings/push_notifications`).then((response => response.data));
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

export function searchUsers(input) {
  logger.log('USER', 'HTTP', `User searching other users with ${input} as Input.`);
  return axios.get(`/api/user_chat/search?query=${input}`).then((response => response.data));
}

export function toggleNotificationSounds(disabled) {
  logger.log('USER', 'HTTP', `Toggling Notification Sounds: ${disabled}`);
  return axios.put(`/api/user/notification_sounds`, { disabled }).then((response => response.data));
}

export function toggleAutoSelfDestruct(enabled) {
  logger.log('USER', 'HTTP', `Toggling Auto Self Destruct: ${enabled}`);
  return axios.put(`/api/user/auto_self_destruct`, { enabled }).then((response => response.data));
}

export function emailEncryptionKey(pin) {
  logger.log('USER', 'HTTP', `Requesting Email for Pin: ${pin}`);
  return axios.post(`/api/encryption`, { pin }).then((response => response.data));
}

export function fetchStats(alias) {
  logger.log('USER', 'HTTP', `Requesting Stats`);
  return axios.get(`/api/userStatTransaction/master_controller${alias ? `?alias=${alias}` : ''}`).then((response) => response.data);
}

export function fetchBadges(alias) {
  logger.log('USER', 'HTTP', `Requesting Badges`);
  return axios.get(`/api/achievements/badges/${alias}`).then((response) => response.data);
}

export function redeemBadge(alias, type, value) {
  logger.log('USER', 'HTTP', `Redeeming Badge ${type}/${value}`);
  return axios.post(`/api/achievements/badges/${alias}`, { type, value }).then((response) => response.data);
}

export function fetchNotifications() {
  logger.log('USER', 'HTTP', `Fetching Notifications`);
  return axios.get(`/api/notifications_v2/count`).then((response) => response.data);
}

export function checkedLevel() {
  return axios.post('/api/userStatTransaction/checkedLevel').then((response) => response.data);
}
