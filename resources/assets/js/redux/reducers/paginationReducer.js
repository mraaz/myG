import logger from '../../common/logger'

const initialState = {
  contactsLoading: false,
  groupsLoading: false,
  gamesLoading: false,
  searchLoading: false,
  recentsLoading: false,
  contactsLoadingMore: false,
  groupsLoadingMore: false,
  gamesLoadingMore: false,
  searchLoadingMore: false,
  online: [],
  playing: [],
  afk: [],
  offline: [],
  foundContacts: [],
  contactsCount: 0,
  groups: [],
  games: [],
  recents: [],
  search: {
    contacts: [],
    groups: [],
    games: []
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'PAGINATED_CONTACTS_PENDING': {
      logger.log('PAGINATION', `Redux -> Fetching Contacts: `, action.payload, action.meta)
      return {
        ...state,
        contactsLoading: action.meta.refresh,
        contactsLoadingMore: true
      }
    }

    case 'PAGINATED_GROUPS_PENDING': {
      return {
        ...state,
        groupsLoading: action.meta.refresh,
        groupsLoadingMore: true
      }
    }

    case 'PAGINATED_GAMES_PENDING': {
      return {
        ...state,
        gamesLoading: action.meta.refresh,
        gamesLoadingMore: true
      }
    }

    case 'PAGINATED_SEARCH_PENDING': {
      return {
        ...state,
        searchLoading: action.meta.refresh,
        searchLoadingMore: true
      }
    }

    case 'PAGINATED_CONTACTS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Contacts: `, action.payload, action.meta)
      if (!action.meta.status) {
        return {
          ...state,
          contactsLoading: false,
          contactsLoadingMore: false,
          contactsCount: action.payload.count,
          foundContacts: action.payload.contacts
        }
      }
      const currentContacts = JSON.parse(JSON.stringify(state[action.meta.status]))
      const currentContactIds = currentContacts.map((contact) => contact.contactId)
      const newContacts = action.payload.contacts.filter((contact) => !currentContactIds.includes(contact.contactId))
      const contacts = action.meta.refresh ? action.payload.contacts : [...currentContacts, ...newContacts]
      return {
        ...state,
        contactsLoading: false,
        contactsLoadingMore: false,
        contactsCount: action.payload.count,
        [action.meta.status]: contacts
      }
    }

    case 'PAGINATED_GROUPS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Fetched Groups: `, action.payload, action.meta)
      const currentGroups = JSON.parse(JSON.stringify(state.groups))
      const currentGroupIds = currentGroups.map((group) => group.chatId)
      const newGroups = action.payload.groups.filter((group) => !currentGroupIds.includes(group.chatId))
      const groups = action.meta.refresh ? action.payload.groups : [...currentGroups, ...newGroups]
      return {
        ...state,
        groupsLoading: false,
        groupsLoadingMore: false,
        groups
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
        gamesLoading: false,
        gamesLoadingMore: false,
        games
      }
    }

    case 'PAGINATED_SEARCH_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Searched: `, action.payload, action.meta)
      return {
        ...state,
        searchLoading: false,
        searchLoadingMore: false,
        search: action.payload || {}
      }
    }

    case 'RECENTS_PENDING': {
      logger.log('PAGINATION', `Redux -> Loading Recents`)
      return {
        ...state,
        recentsLoading: true
      }
    }

    case 'RECENTS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Recents: `, action.payload)
      return {
        ...state,
        recents: (action.payload.messages || []).sort((m1, m2) => m2.messageId - m1.messageId),
        recentsLoading: false
      }
    }

    case 'NEW_MESSAGE': {
      logger.log('CHAT', `Redux -> Paginating Message: `, action.payload, action.meta)
      const newMessage = action.payload.message
      if (newMessage.keyReceiver) return state
      const existingRecentMessages = JSON.parse(JSON.stringify(state.recents))
      const recentMessages = existingRecentMessages.filter((message) => message.chatId !== newMessage.chatId)
      const recents = [...recentMessages, newMessage].sort((m1, m2) => m2.messageId - m1.messageId)
      return {
        ...state,
        recents
      }
    }

    case 'NEW_CHAT': {
      if (!action.payload.chat.isGroup) return state
      logger.log('PAGINATION', `Redux -> New Chat: `, action.payload)
      const groups = JSON.parse(JSON.stringify(state.groups))
      const groupsIds = groups.map((group) => group.chatId)
      if (groupsIds.includes(action.payload.chat.chatId)) return state
      groups.push(action.payload.chat)
      return {
        ...state,
        groups
      }
    }

    case 'ON_CHAT_DELETED': {
      logger.log('PAGINATION', `Redux -> On Chat Deleted: `, action.payload)
      const groups = JSON.parse(JSON.stringify(state.groups)).filter((chat) => parseInt(chat.chatId) !== parseInt(action.payload.chatId))
      return {
        ...state,
        groups
      }
    }

    default:
      return state
  }
}
