import logger from '../../common/logger'

const initialState = {
  approvals: 0,
  alerts: 0,
  chats: 0,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'FETCH_NOTIFICATIONS_FULFILLED': {
      logger.log('NOTIFICATIONS', `Redux -> Notifications Fetched: `, action.payload)
      return { ...state, ...action.payload }
    }

    case 'ON_NOTIFICATION': {
      logger.log('NOTIFICATIONS', `Redux -> Notification Received: `, action.payload)
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
}
