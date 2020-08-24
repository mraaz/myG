import { fetchProfileInfo, sendFriendRequest, confirmFriendRequest, unfriend, follow, unfollow, uploadProfileImage, uploadProfileBackground, updateProfileInfo } from '../../integration/http/profile'

export function fetchProfileInfoAction(alias) {
  return {
    type: 'FETCH_PROFILE_INFO',
    payload: fetchProfileInfo(alias),
    meta: { alias },
  }
}

export function sendFriendRequestAction(alias, id) {
  return {
    type: 'SEND_FRIEND_REQUEST',
    payload: sendFriendRequest(alias, id),
    meta: { alias, id },
  }
}

export function confirmFriendRequestAction(alias, id, notificationId) {
  return {
    type: 'CONFIRM_FRIEND_REQUEST',
    payload: confirmFriendRequest(alias, id, notificationId),
    meta: { alias, id, notificationId },
  }
}

export function unfriendAction(alias, id) {
  return {
    type: 'UNFRIEND',
    payload: unfriend(alias, id),
    meta: { alias, id },
  }
}

export function followAction(alias, id) {
  return {
    type: 'FOLLOW',
    payload: follow(alias, id),
    meta: { alias, id },
  }
}

export function unfollowAction(alias, id) {
  return {
    type: 'UNFOLLOW',
    payload: unfollow(alias, id),
    meta: { alias, id },
  }
}


export function uploadProfileImageAction(alias, image, key) {
  return {
    type: 'UPLOAD_PROFILE_IMAGE',
    payload: uploadProfileImage(image, key),
    meta: { image, alias },
  }
}

export function uploadProfileBackgroundAction(alias, background, key) {
  return {
    type: 'UPLOAD_PROFILE_BACKGROUND',
    payload: uploadProfileBackground(background, key),
    meta: { background, alias },
  }
}

export function updateProfileInfoAction(alias, updates) {
  return {
    type: 'UPDATE_PROFILE_INFO',
    payload: updateProfileInfo(alias, updates),
    meta: { alias, updates },
  }
}
