import logger from '../../common/logger'

export default function reducer(
  state = {
    contacts: [],
    groups: [],
    games: [],
  },
  action
) {
  switch (action.type) {
    case 'FETCH_CONTACTS_PAGINATED_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Contacts: `, action.payload)
      return {
        ...state,
        contacts: action.payload.contacts || [],
      }
    }

    case 'FETCH_GROUPS_PAGINATED_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Groups: `, action.payload)
      return {
        ...state,
        groups: action.payload.groups || [],
      }
    }

    case 'FETCH_GAMES_PAGINATED_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Games: `, action.payload)
      return {
        ...state,
        games: action.payload.games || [],
      }
    }

    default:
      return state
  }
}
