import uniqBy from 'lodash.uniqby';
import logger from '../../common/logger'

const initialState = {
  query: '',
  total: 0,
  gamers: [],
  gamersLoading: false,
  gamersError: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'SEARCH_GAMERS_PENDING': {
      return {
        ...state,
        query: action.meta.input,
        gamersLoading: true,
        gamersError: false,
      }
    }

    case 'SEARCH_GAMERS_FULFILLED': {
      logger.log('SEARCH', `Redux -> Searched Gamers for ${action.meta.input}: `, action.payload)
      const gamers = JSON.parse(JSON.stringify(uniqBy(!action.meta.from ? action.payload.gamers : [...state.gamers, ...action.payload.gamers], 'profileId'))); 
      return {
        ...state,
        gamers,
        query: action.meta.input,
        total: action.payload.total,
        gamersLoading: false,
        gamersError: false,
      }
    }

    case 'SEARCH_GAMERS_REJECTED': {
      logger.log('SEARCH', `Redux -> Failed to search gamers for ${action.meta.input}: `, action.payload)
      return {
        ...state,
        query: action.meta.input,
        total: 0,
        gamers: [],
        gamersLoading: false,
        gamersError: true,
      }
    }

    default:
      return state
  }
}