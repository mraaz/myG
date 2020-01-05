
import logger from '../../common/logger';

export default function reducer(state = {
  connected: false,
}, action) {
  switch (action.type) {

    case "SOCKET_CONNECTION_STATE_CHANGED": {
      logger.log('SOCKET', `Redux -> Socket ${action.payload.connected ? 'Connected' : 'Disconnected'}`);
      return {
        ...state,
        connected: action.payload.connected,
      };
    }

    default: return state;

  }
}