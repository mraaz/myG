import logger from '../../common/logger'

export default function reducer(
  state = {
    loading: false,
    loadingMore: false,
    online: [],
    playing: [],
    afk: [],
    offline: [],
    groups: [],
    games: [],
    search: {},
  },
  action
) {
  switch (action.type) {
    case 'PAGINATED_CONTACTS_PENDING':
    case 'PAGINATED_GROUPS_PENDING':
    case 'PAGINATED_GAMES_PENDING':
    case 'PAGINATED_SEARCH_PENDING': {
      return {
        ...state,
        loading: action.meta.refresh,
        loadingMore: true,
      }
    }

    case 'PAGINATED_CONTACTS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Contacts: `, action.payload, action.meta)
      const currentContacts = JSON.parse(JSON.stringify(state[action.meta.status]))
      const currentContactIds = currentContacts.map((contact) => contact.contactId)
      const newContacts = action.payload.contacts.filter((contact) => !currentContactIds.includes(contact.contactId))
      const contacts = action.meta.refresh ? action.payload.contacts : [...currentContacts, ...newContacts]
      return {
        ...state,
        loading: false,
        loadingMore: false,
        [action.meta.status]: contacts,
      }
    }

    case 'PAGINATED_GROUPS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Groups: `, action.payload, action.meta)
      const currentGroups = JSON.parse(JSON.stringify(state.groups))
      const currentGroupIds = currentGroups.map((group) => group.chatId)
      const newGroups = action.payload.groups.filter((group) => !currentGroupIds.includes(group.chatId))
      const groups = action.meta.refresh ? newGroups : [...currentGroups, ...newGroups]
      return {
        ...state,
        loading: false,
        loadingMore: false,
        groups,
      }
    }

    case 'PAGINATED_GAMES_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Games: `, action.payload, action.meta)
      const currentGames = JSON.parse(JSON.stringify(state.groups))
      const currentGameIds = currentGames.map((game) => game.gameId)
      const newGames = action.payload.games.filter((game) => !currentGameIds.includes(game.gameId))
      const games = [...currentGames, ...newGames]
      return {
        ...state,
        loading: false,
        loadingMore: false,
        games,
      }
    }

    case 'PAGINATED_SEARCH_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Searched: `, action.payload, action.meta)
      return {
        ...state,
        loading: false,
        loadingMore: false,
        search: action.payload.search || {},
      }
    }

    default:
      return state
  }
}
