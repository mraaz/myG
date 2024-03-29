import {
  favoriteGame,
  unfavoriteGame,
  updateGameIcon,
  fetchContact,
  fetchStatus,
  fetchSettings,
  togglePushNotifications,
  updateStatus,
  fetchFriendRequests,
  addAsFriend,
  searchUsers,
  toggleNotificationSounds,
  toggleAutoSelfDestruct,
  fetchStats,
  fetchBadges,
  redeemBadge,
  checkedLevel,
  fetchOnlineUsers
} from '../../integration/http/user'

export function logoutAction() {
  return {
    type: 'USER_LOGOUT'
  }
}

export function loadUserInfoAction(userInfo) {
  return {
    type: 'LOAD_USER_INFO',
    payload: userInfo || {}
  }
}

export function favoriteGameAction(gameId) {
  return {
    type: 'FAVORITE_GAME',
    payload: favoriteGame(gameId),
    meta: { gameId }
  }
}

export function unfavoriteGameAction(gameId) {
  return {
    type: 'UNFAVORITE_GAME',
    payload: unfavoriteGame(gameId),
    meta: { gameId }
  }
}

export function updateGameIconAction(gameId, icon) {
  return {
    type: 'UPDATE_GAME_ICON',
    payload: updateGameIcon(gameId, icon),
    meta: { gameId, icon }
  }
}

export function fetchContactAction(contactId) {
  return {
    type: 'FETCH_CONTACT',
    payload: fetchContact(contactId)
  }
}

export function fetchStatusAction() {
  return {
    type: 'FETCH_STATUS',
    payload: fetchStatus()
  }
}

export function updateStatusAction(status, forceStatus) {
  return {
    type: 'UPDATE_STATUS',
    payload: updateStatus(status, forceStatus)
  }
}

export function onStatusChangedAction(payload, userId) {
  return {
    type: 'ON_STATUS_CHANGED',
    payload,
    meta: { userId }
  }
}

export function fetchFriendRequestsAction() {
  return {
    type: 'FETCH_FRIEND_REQUESTS',
    payload: fetchFriendRequests()
  }
}

export function addAsFriendAction(friendId) {
  return {
    type: 'ADD_AS_FRIEND',
    payload: addAsFriend(friendId)
  }
}

export function setAsFriendAction(friendId) {
  return {
    type: 'SET_AS_FRIEND',
    payload: friendId
  }
}

export function removeFriendAction(friendId) {
  return {
    type: 'REMOVE_FRIEND',
    payload: friendId
  }
}

export function searchUsersAction(input) {
  return {
    type: 'SEARCH_USERS',
    payload: searchUsers(input)
  }
}

export function toggleNotificationSoundsAction(disabled) {
  return {
    type: 'TOGGLE_NOTIFICATION_SOUNDS',
    payload: toggleNotificationSounds(disabled),
    meta: { disabled }
  }
}

export function toggleAutoSelfDestructAction(enabled) {
  return {
    type: 'TOGGLE_AUTO_SELF_DESTRUCT',
    payload: toggleAutoSelfDestruct(enabled),
    meta: { enabled }
  }
}

export function fetchSettingsAction(userId) {
  return {
    type: 'FETCH_SETTINGS',
    payload: fetchSettings(userId),
    meta: { userId }
  }
}

export function togglePushNotificationsAction(userId) {
  return {
    type: 'TOGGLE_PUSH_NOTIFICATIONS',
    payload: togglePushNotifications(userId),
    meta: { userId }
  }
}

export function toggleMainChannelAction() {
  return {
    type: 'TOGGLE_MAIN_CHANNEL'
  }
}

export function toggleOnlineNotificationsAction() {
  return {
    type: 'TOGGLE_ONLINE_NOTIFICATIONS'
  }
}

export function fetchStatsAction(alias) {
  return {
    type: 'FETCH_STATS',
    payload: fetchStats(alias),
    meta: { alias }
  }
}

export function fetchBadgesAction(alias) {
  return {
    type: 'FETCH_BADGES',
    payload: fetchBadges(alias),
    meta: { alias }
  }
}

export function redeemBadgeAction(alias, type, value) {
  return {
    type: 'REDEEM_BADGE',
    payload: redeemBadge(alias, type, value),
    meta: { alias, type, value }
  }
}

export function onStatsUpdatedAction(stats, userId) {
  return {
    type: 'ON_STATS_UPDATED',
    payload: stats,
    meta: { userId }
  }
}

export function checkedLevelAction() {
  return {
    type: 'CHECKED_LEVEL',
    payload: checkedLevel()
  }
}

export function fetchOnlineUsersAction() {
  return {
    type: 'FETCH_ONLINE_USERS',
    payload: fetchOnlineUsers()
  }
}

export function onActiveNowAction({ alias, active }) {
  return {
    type: 'ON_ACTIVE_NOW',
    payload: { alias, active }
  }
}

export function selectLanguageAction(language) {
  return {
    type: 'SELECT_LANGUAGE',
    payload: language
  }
}
