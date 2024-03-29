import axios from 'axios';
import logger from '../../../common/logger';
import notifyToast from '../../../common/toast';
import { setAsFriendRedux, removeFriendRedux } from '../../../common/friend';
import { GoogleAnalytics } from '../../../common/analytics';

export function fetchProfileInfo(alias) {
  logger.log('PROFILE', 'HTTP', `Fetching profile info`);
  return axios.get(`/api/profile/${alias}`).then(response => response.data);
}

export function sendFriendRequest(alias, id) {
  logger.log('PROFILE', 'HTTP', `Sending friend request for ${alias}`);
  return axios.post('/api/notifications_v2/addFriend', { other_user_id: id }).then(response => response.data);
}

export function confirmFriendRequest(alias, id, notificationId) {
  logger.log('PROFILE', 'HTTP', `Confirming friend request from ${alias}`);
  GoogleAnalytics.userFriendMade(id, alias);
  setAsFriendRedux(id)
  return Promise.all([
    axios.get(`/api/notifications/delete/${notificationId}`),
    axios.post('/api/friends/create', { friend_id: id }),
  ]);
}

export function unfriend(alias, id) {
  logger.log('PROFILE', 'HTTP', `Unfriending ${alias}`);
  removeFriendRedux(id)
  return axios.get(`/api/user/${id}/unfriend`).then(response => response.data);
}

export function follow(alias, id) {
  logger.log('PROFILE', 'HTTP', `Following ${alias}`);
  return axios.post('/api/followers/create', { follower_id: id }).then(response => response.data);
}

export function unfollow(alias, id) {
  logger.log('PROFILE', 'HTTP', `Unfollowing ${alias}`);
  return axios.delete(`/api/followers/${id}/delete`).then(response => response.data);
}

export function cancelFriendRequest(alias, id) {
  logger.log('PROFILE', 'HTTP', `Cancelling Friend Request for ${alias}`);
  return axios.get(`/api/user/${id}/cancelFriendRequest`).then(response => response.data);
}

export function uploadProfileImage(profile_img, aws_key) {
  logger.log('PROFILE', 'HTTP', 'Uploading profile image');
  return axios.post('/api/userprofile', { profile_img, aws_key }).then(response => response.data);
}

export function uploadProfileBackground(profile_bg, aws_key) {
  logger.log('PROFILE', 'HTTP', 'Uploading profile background');
  return axios.post('/api/userprofilebg', { profile_bg, aws_key }).then(response => response.data);
}

export function updateProfileInfo(alias, updates) {
  logger.log('PROFILE', 'HTTP', `Uploading profile info for ${alias}, ${JSON.stringify(updates)}`);
  return axios.put(`/api/profile/${alias}`, updates).then(response => response.data);
}

export function updateProfileGame(alias, updates) {
  logger.log('PROFILE', 'HTTP', `Uploading profile game for ${alias}, ${JSON.stringify(updates)}`);
  return axios.put(`/api/profile/${alias}/game`, updates).then(response => response.data);
}

export function fetchGamerSuggestions() {
  logger.log('PROFILE', 'HTTP', `Fetching Gamer Suggestions`);
  return axios.get(`/api/gamer_suggestions`).then(response => response.data);
}

export function fetchDynamicFields(gameId) {
  logger.log('PROFILE', 'HTTP', `Fetching Dynamic Fields for game ${gameId}`);
  return axios.get(`/api/profile_fields/${gameId}`).then(response => response.data);
}

export function commendUser(alias, gameExperienceId) {
  notifyToast('Woohoo! Thanking you kindly!')
  logger.log('PROFILE', 'HTTP', `Commending user ${alias} for game ${gameExperienceId}`);
  return axios.post(`/api/commend/${alias}/${gameExperienceId}`).then(response => response.data);
}

export function deleteExperience(gameExperienceId) {
  logger.log('PROFILE', 'HTTP', `Deleting game experience ${gameExperienceId}`);
  return axios.delete(`/api/game_experience/${gameExperienceId}`).then(response => response.data);
}

export function fetchFriends({ alias, experience, level, page }) {
  logger.log('PROFILE', 'HTTP', `Fetching Friends for profile ${alias}, with experience ${experience} and level ${level}`);
  return axios.get(`/api/profile/${alias}/friends?experience=${experience}&level=${level}&page=${page}`).then(response => response.data);
}
