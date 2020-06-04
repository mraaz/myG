import logger from '../../common/logger'

export default function reducer(
  state = {
    disconnected: false,
  },
  action
) {
  switch (action.type) {
    case 'SOCKET_CONNECTION_STATE_CHANGED': {
      logger.log('SOCKET', `Redux -> Socket ${action.payload.disconnected ? 'Disconnected' : 'Connected'}`)
      return {
        ...state,
        disconnected: action.payload.disconnected,
      }
    }

    default:
      return state
  }
}
