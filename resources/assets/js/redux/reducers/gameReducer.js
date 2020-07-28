import logger from '../../common/logger'

const initialState = { foundGames: [] }
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'SEARCH_GAME_FULFILLED': {
      logger.log('GAME', `Redux -> Found Games: `, action.payload)
      return {
        ...state,
        foundGames: action.payload.games,
      }
    }

    default:
      return state
  }
}
