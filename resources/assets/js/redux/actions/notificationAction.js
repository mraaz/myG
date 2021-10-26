import { fetchNotifications } from '../../integration/http/user'

export function fetchNotificationsAction() {
  return {
    type: 'FETCH_NOTIFICATIONS',
    payload: fetchNotifications()
  }
}

export function onNotificationAction(notifications, userId) {
  return {
    type: 'ON_NOTIFICATION',
    payload: notifications,
    meta: { userId }
  }
}
