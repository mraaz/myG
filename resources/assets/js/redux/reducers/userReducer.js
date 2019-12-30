
import logger from '../../common/logger';

export default function reducer(state = {
  status: 'online'
}, action) {
  switch (action.type) {

    case "UPDATE_STATUS_FULFILLED": {
      logger.log('USER', `Redux -> Update Status: `, action.payload);
      return {
        ...state,
        status: action.payload.status,
      };
    }

    case "ON_UPDATE_STATUS": {
      logger.log('USER', `Redux -> On Update Status: `, action.payload);
      return {
        ...state,
        status: action.payload.status,
      };
    }

    default: return state;

  }
}