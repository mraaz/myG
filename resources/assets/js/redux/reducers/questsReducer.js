import logger from '../../common/logger'

const initialState = {
  daily: {
    quests: [],
    collected: false,
    collectable: false,
    completed: 0
  },
  weekly: {
    quests: [],
    collected: false,
    collectable: false,
    completed: 0
  },
  monthly: {
    quests: [],
    collected: false,
    collectable: false,
    completed: 0
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'FETCH_DAILY_QUESTS_FULFILLED': {
      logger.log('User', `Redux -> Fetched Daily Quests: `, action.payload)
      return {
        ...state,
        daily: action.payload
      }
    }

    case 'FETCH_WEEKLY_QUESTS_FULFILLED': {
      logger.log('User', `Redux -> Fetched Weekly Quests: `, action.payload)
      return {
        ...state,
        weekly: action.payload
      }
    }

    case 'FETCH_MONTHLY_QUESTS_FULFILLED': {
      logger.log('User', `Redux -> Fetched Monthly Quests: `, action.payload)
      return {
        ...state,
        monthly: action.payload
      }
    }

    default:
      return state
  }
}
