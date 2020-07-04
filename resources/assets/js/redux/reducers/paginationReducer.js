import logger from '../../common/logger'

export default function reducer(
  state = {
    contacts: [],
    groups: [],
    games: [],
    search: {},
  },
  action
) {
  switch (action.type) {
    case 'PAGINATED_CONTACTS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Contacts: `, action.payload, action.meta)
      const currentContacts = JSON.parse(JSON.stringify(state.contacts))
      const currentContactIds = contacts.map((contact) => contact.contactId)
      const newContacts = action.payload.contacts.filter((contact) => !currentContactIds.includes(contact.contactId))
      const contacts = action.meta.refresh ? newContacts : [...currentContacts, ...newContacts]
      return {
        ...state,
        contacts,
      }
    }

    case 'PAGINATED_GROUPS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Groups: `, action.payload, action.meta)
      const currentGroups = JSON.parse(JSON.stringify(state.groups))
      const currentGroupIds = groups.map((group) => group.chatId)
      const newGroups = action.payload.groups.filter((group) => !currentGroupIds.includes(group.chatId))
      const groups = action.meta.refresh ? newGroups : [...currentGroups, ...newGroups]
      return {
        ...state,
        groups,
      }
    }

    case 'PAGINATED_GAMES_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Games: `, action.payload, action.meta)
      const currentGames = JSON.parse(JSON.stringify(state.groups))
      const currentGameIds = games.map((game) => game.gameId)
      const newGames = action.payload.games.filter((game) => !currentGameIds.includes(game.gameId))
      const games = [...currentGames, ...newGames]
      return {
        ...state,
        games,
      }
    }

    case 'PAGINATED_SEARCH_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Searched: `, action.payload, action.meta)
      return {
        ...state,
        search: action.payload.search || {},
      }
    }

    default:
      return state
  }
}
