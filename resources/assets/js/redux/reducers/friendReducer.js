
import logger from '../../common/logger';

export default function reducer(state = {
  friends: [],
}, action) {
  switch (action.type) {

      case "FETCH_FRIENDS_FULFILLED": {
          logger.log('CHAT', `Redux -> Fetched Friends: `, action.payload);
          const friends = action.payload.friends;
          return {
              ...state,
              friends,
          };
      }

      default: return state;

  }
}