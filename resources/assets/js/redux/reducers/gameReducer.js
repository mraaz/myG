

import logger from '../../common/logger';

export default function reducer(state = {
  foundGames: [],
}, action) {
  switch (action.type) {

    case "SEARCH_GAME_FULFILLED": {
      logger.log('GAME', `Redux -> Found Games: `, action.payload);
      return {
        ...state,
        foundGames: action.payload.games
      };
    }

    default: return state;

  }
}