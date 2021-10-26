import {
  fetchProfileInfo,
  sendFriendRequest,
  confirmFriendRequest,
  unfriend,
  follow,
  unfollow,
  cancelFriendRequest,
  uploadProfileImage,
  uploadProfileBackground,
  updateProfileInfo,
  updateProfileGame,
  fetchGamerSuggestions,
  commendUser,
  deleteExperience
} from '../../integration/http/profile'

export function fetchProfileInfoAction(alias) {
  return {
    type: 'FETCH_PROFILE_INFO',
    payload: fetchProfileInfo(alias),
    meta: { alias }
  }
}

export function sendFriendRequestAction(alias, id) {
  return {
    type: 'SEND_FRIEND_REQUEST',
    payload: sendFriendRequest(alias, id),
    meta: { alias, id }
  }
}

export function confirmFriendRequestAction(alias, id, notificationId) {
  return {
    type: 'CONFIRM_FRIEND_REQUEST',
    payload: confirmFriendRequest(alias, id, notificationId),
    meta: { alias, id, notificationId }
  }
}

export function unfriendAction(alias, id) {
  return {
    type: 'UNFRIEND',
    payload: unfriend(alias, id),
    meta: { alias, id }
  }
}

export function followAction(alias, id) {
  return {
    type: 'FOLLOW',
    payload: follow(alias, id),
    meta: { alias, id }
  }
}

export function unfollowAction(alias, id) {
  return {
    type: 'UNFOLLOW',
    payload: unfollow(alias, id),
    meta: { alias, id }
  }
}

export function cancelFriendRequestAction(alias, id) {
  return {
    type: 'CANCEL_FRIEND_REQUEST',
    payload: cancelFriendRequest(alias, id),
    meta: { alias, id }
  }
}

export function uploadProfileImageAction(alias, image, key) {
  return {
    type: 'UPLOAD_PROFILE_IMAGE',
    payload: uploadProfileImage(image, key),
    meta: { image, alias }
  }
}

export function uploadProfileBackgroundAction(alias, background, key) {
  return {
    type: 'UPLOAD_PROFILE_BACKGROUND',
    payload: uploadProfileBackground(background, key),
    meta: { background, alias }
  }
}

export function updateProfileInfoAction(alias, updates) {
  return {
    type: 'UPDATE_PROFILE_INFO',
    payload: updateProfileInfo(alias, updates),
    meta: { alias, updates }
  }
}

export function updateProfileGameAction(alias, updates) {
  return {
    type: 'UPDATE_PROFILE_GAME',
    payload: updateProfileGame(alias, updates),
    meta: { alias, updates }
  }
}

export function fetchGamerSuggestionsAction() {
  return {
    type: 'FETCH_GAMER_SUGGESTIONS',
    payload: fetchGamerSuggestions()
  }
}

export function commendUserAction(alias, gameExperienceId) {
  return {
    type: 'COMMEND_USER',
    payload: commendUser(alias, gameExperienceId),
    meta: { alias, gameExperienceId }
  }
}

export function deleteExperienceAction(alias, gameExperienceId) {
  return {
    type: 'DELETE_GAME_EXPERIENCE',
    payload: deleteExperience(gameExperienceId),
    meta: { alias, gameExperienceId }
  }
}
