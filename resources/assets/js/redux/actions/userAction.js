import { fetchContacts, fetchContact, fetchStatus, updateStatus, addAsFriend } from '../../integration/http/user';

export function logoutAction() {
  return {
    type: 'USER_LOGOUT'
  }
}

export function fetchContactsAction() {
  return {
    type: 'FETCH_CONTACTS',
    payload: fetchContacts(),
  }
}

export function fetchContactAction(contactId) {
  return {
    type: 'FETCH_CONTACT',
    payload: fetchContact(contactId),
  }
}

export function fetchStatusAction() {
  return {
    type: 'FETCH_STATUS',
    payload: fetchStatus(),
  }
}

export function updateStatusAction(status, forceStatus) {
  return {
    type: 'UPDATE_STATUS',
    payload: updateStatus(status, forceStatus),
  }
}


export function onStatusChangedAction(payload, userId) {
  return {
    type: 'ON_STATUS_CHANGED',
    payload,
    meta: { userId },
  }
}

export function addAsFriendAction(friendId) {
  return {
    type: 'ADD_AS_FRIEND',
    payload: addAsFriend(friendId)
  }
}