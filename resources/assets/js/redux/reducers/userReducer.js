
import logger from '../../common/logger';

export default function reducer(state = {
  status: 'online',
  isStatusLocked: false,
}, action) {
  switch (action.type) {

    case "FETCH_STATUS_FULFILLED": {
      logger.log('USER', `Redux -> Fetch Status: `, action.payload);
      const { status, isStatusLocked } = action.payload;
      return {
        ...state,
        status: status === 'offline' && !isStatusLocked ? 'online' : status,
        isStatusLocked,
      };
    }

    case "UPDATE_STATUS_FULFILLED": {
      logger.log('USER', `Redux -> Update Status: `, action.payload);
      return {
        ...state,
        status: action.payload.status,
        isStatusLocked: action.payload.isStatusLocked,
      };
    }

    case "ON_UPDATE_STATUS": {
      logger.log('USER', `Redux -> On Update Status: `, action.payload);
      return {
        ...state,
        status: action.payload.status,
        isStatusLocked: action.payload.isStatusLocked,
      };
    }

    default: return state;

  }
}