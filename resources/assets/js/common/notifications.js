import { store } from '../redux/Store'
import { fetchNotificationsAction } from '../redux/actions/notificationAction'

export function fetchNotifications() {
  store.dispatch(fetchNotificationsAction())
}
