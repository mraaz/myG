import uniq from 'lodash.uniq'
import logger from '../../common/logger'
import notifyToast from '../../common/toast'

const initialState = {
  isStatusLocked: false,
  contactCount: { online: 0, playing: 0, afk: 0, offline: 0 },
  contacts: [],
  games: [],
  friendRequests: [],
  foundUsers: [],
  notificationSoundsDisabled: false,
  mainChannelEnabled: true,
  onlineNotificationsEnabled: true,
  autoSelfDestruct: false,
  pushNotificationsEnabled: true,
  userTransactionStates: { user_level: 1 },
  statsUpdatedFromWebsocket: false,
  statsForAlias: {},
  onlineUsers: [],
  notifiedOnline: []
}

export default function reducer(
  state = {
    userId: null,
    alias: null,
    icon: null,
    language: null,
    isAdmin: false,
    status: 'online',
    ...initialState
  },
  action
) {
  switch (action.type) {
    case 'REACT_ERROR':
      return { ...state, ...initialState }

    case 'LOAD_USER_INFO': {
      logger.log('USER', `Redux -> Loading User Info (User): `, action.payload)
      return {
        ...state,
        userId: action.payload.id,
        alias: action.payload.alias,
        icon: action.payload.profile_img,
        notificationSoundsDisabled: !!action.payload.notification_sounds_disabled,
        autoSelfDestruct: !!action.payload.chat_auto_self_destruct,
        notifiedOnline: [],
        ...action.payload
      }
    }

    case 'PREPARE_MESSENGER_FULFILLED': {
      logger.log('USER', `Redux -> Messenger Ready (User): `, action.payload)
      const { userId, alias } = action.meta
      const contactCount = action.payload.contactCount || { online: 0, playing: 0, afk: 0, offline: 0 }
      const games = action.payload.games || []
      const { value: currentStatus, locked: isStatusLocked } = action.payload.status
      const status = currentStatus === 'offline' && !isStatusLocked ? 'online' : currentStatus
      return {
        ...state,
        userId,
        alias,
        contactCount,
        games,
        status,
        isStatusLocked
      }
    }

    case 'PREPARE_CHAT_FULFILLED': {
      logger.log('USER', `Redux -> Chat ${action.meta.chatId} Ready (User): `, action.payload)
      if (!action.payload.contact) {
        const fullContacts = action.payload.contacts || []
        if (!fullContacts.length) return state
        const contacts = JSON.parse(JSON.stringify(state.contacts))
        fullContacts.forEach((contact) => {
          const hasContact = contacts.find((existing) => existing.contactId === contact.contactId)
          if (!hasContact) contacts.push(contact)
        })
        return {
          ...state,
          contacts
        }
      }
      const { contact: newContact } = action.payload
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      const contact = contacts.find((contact) => contact.contactId === newContact.contactId)
      if (contact) Object.assign(contact, newContact)
      else contacts.push(newContact)
      return {
        ...state,
        contacts
      }
    }

    case 'PAGINATED_CONTACTS_FULFILLED': {
      logger.log('PAGINATION', `Redux -> Counted Contacts: `, action.payload, action.meta)
      if (!action.meta.status) return state
      const contactCount = JSON.parse(JSON.stringify(state.contactCount))
      contactCount[action.meta.status] = action.payload.count
      return {
        ...state,
        contactCount
      }
    }

    case 'FETCH_CONTACT_FULFILLED': {
      logger.log('USER', `Redux -> Fetched Contacts (User): `, action.payload)
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      const contact = contacts.find((contact) => contact.contactId === action.payload.contact.contactId)
      if (contact) Object.assign(contact, action.payload.contact)
      else contacts.push(action.payload.contact)
      return {
        ...state,
        contacts
      }
    }

    case 'FETCH_GAMES_FULFILLED': {
      logger.log('USER', `Redux -> Fetched Games: `, action.payload)
      const { games } = action.payload
      return {
        ...state,
        games
      }
    }

    case 'FETCH_STATUS_FULFILLED': {
      logger.log('USER', `Redux -> Fetch Status: `, action.payload)
      const { value: status, locked: isStatusLocked } = action.payload.status
      return {
        ...state,
        status: status === 'offline' && !isStatusLocked ? 'online' : status,
        isStatusLocked
      }
    }

    case 'UPDATE_STATUS_FULFILLED': {
      logger.log('USER', `Redux -> Update Status: `, action.payload)
      const { value: status, locked: isStatusLocked } = action.payload.status
      return {
        ...state,
        status,
        isStatusLocked
      }
    }

    case 'ON_STATUS_CHANGED': {
      logger.log('USER', `Redux -> On Status Changed: `, action.payload)
      const { contactId, status, lastSeen, alias } = action.payload
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      const notifiedOnline = JSON.parse(JSON.stringify(state.notifiedOnline))
      const existing = contacts.find((contact) => contact.contactId === contactId)
      const contact = existing || { contactId }
      Object.assign(contact, { status, lastSeen })
      if (!existing) contacts.push(contact)
      if (status === 'online' && !notifiedOnline.includes(alias) && state.onlineNotificationsEnabled) {
        notifiedOnline.push(alias)
        notifyToast('has come online', alias)
      }
      return {
        ...state,
        contacts,
        notifiedOnline
      }
    }

    case 'PUBLIC_KEY_UPDATED': {
      logger.log('USER', `Redux -> Public Key Updated (User): `, action.payload, action.meta)
      const { userId: thisUserId } = action.meta
      const { userId: updatedUserId, publicKey } = action.payload
      if (updatedUserId === state.userId) return state
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      const existing = contacts.find((contact) => contact.contactId === updatedUserId)
      const contact = existing || { contactId: updatedUserId }
      if (parseInt(updatedUserId) === parseInt(thisUserId)) return state
      contact.publicKey = publicKey
      if (!existing) contacts.push(contact)
      return {
        ...state,
        contacts
      }
    }

    case 'FETCH_FRIEND_REQUESTS_FULFILLED': {
      logger.log('USER', `Redux -> Fetched Friend Requests: `, action.payload)
      const friendRequests = (action.payload.friendRequests || []).map((request) => request.other_user_id)
      return {
        ...state,
        friendRequests
      }
    }

    case 'SEARCH_USERS_FULFILLED': {
      logger.log('USER', `Redux -> Found Users: `, action.payload)
      return {
        ...state,
        foundUsers: action.payload.users
      }
    }

    case 'FAVORITE_GAME_FULFILLED': {
      logger.log('USER', `Redux -> Favorited Game: `, action.payload, action.meta)
      const games = JSON.parse(JSON.stringify(state.games))
      const game = games.find((game) => game.gameId === action.meta.gameId)
      if (!game) return state
      game.isFavorite = true
      return {
        ...state,
        games
      }
    }

    case 'UNFAVORITE_GAME_FULFILLED': {
      logger.log('USER', `Redux -> Favorited Game: `, action.payload, action.meta)
      const games = JSON.parse(JSON.stringify(state.games))
      const game = games.find((game) => game.gameId === action.meta.gameId)
      if (!game) return state
      game.isFavorite = false
      return {
        ...state,
        games
      }
    }

    case 'UPDATE_GAME_ICON_FULFILLED': {
      logger.log('USER', `Redux -> Updated Game Icon: `, action.payload, action.meta)
      const games = JSON.parse(JSON.stringify(state.games))
      const game = games.find((game) => game.gameId === action.meta.gameId)
      if (!game) return state
      game.icon = action.meta.icon
      return {
        ...state,
        games
      }
    }

    case 'SET_AS_FRIEND': {
      logger.log('USER', `Redux -> Set As Friend: `, action.payload)
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      if (contacts.find((contact) => contact.contactId === action.payload)) return state
      contacts.push({ contactId: action.payload })
      return {
        ...state,
        contacts
      }
    }

    case 'REMOVE_FRIEND': {
      logger.log('USER', `Redux -> Remove Friend: `, action.payload)
      const contacts = JSON.parse(JSON.stringify(state.contacts))
      return {
        ...state,
        contacts: contacts.filter((contact) => contact.contactId !== action.payload)
      }
    }

    case 'TOGGLE_NOTIFICATION_SOUNDS_FULFILLED': {
      logger.log('USER', `Redux -> Toggle Notification Sounds: `, action.meta)
      return {
        ...state,
        notificationSoundsDisabled: action.meta.disabled
      }
    }

    case 'TOGGLE_AUTO_SELF_DESTRUCT_FULFILLED': {
      logger.log('USER', `Redux -> Toggle Auto Self Destruct: `, action.meta)
      return {
        ...state,
        autoSelfDestruct: action.meta.enabled
      }
    }

    case 'FETCH_SETTINGS_FULFILLED': {
      logger.log('USER', `Redux -> Fetched Settings: `, action.payload)
      const { pushNotificationsEnabled } = action.payload.settings
      return {
        ...state,
        pushNotificationsEnabled
      }
    }

    case 'TOGGLE_PUSH_NOTIFICATIONS_FULFILLED': {
      logger.log('USER', `Redux -> Toggled Push Notifications: `, action.payload)
      const { pushNotificationsEnabled } = action.payload.settings
      return {
        ...state,
        pushNotificationsEnabled
      }
    }

    case 'TOGGLE_MAIN_CHANNEL': {
      logger.log('CHAT', `Redux -> Toggled Main Channel`)
      return {
        ...state,
        mainChannelEnabled: !state.mainChannelEnabled
      }
    }

    case 'TOGGLE_ONLINE_NOTIFICATIONS': {
      logger.log('CHAT', `Redux -> Toggled Online Notifications`)
      return {
        ...state,
        onlineNotificationsEnabled: !state.onlineNotificationsEnabled
      }
    }

    case 'FETCH_STATS_FULFILLED': {
      logger.log('USER', `Redux -> Fetched Stats for ${action.meta.alias}: `, action.payload)
      const userTransactionStates = action.payload
      const statsForAlias = JSON.parse(JSON.stringify(state.statsForAlias || {}))
      if (action.meta.alias && action.meta.alias !== state.alias) {
        statsForAlias[action.meta.alias] = userTransactionStates
        return {
          ...state,
          statsForAlias
        }
      }
      return {
        ...state,
        userTransactionStates,
        statsUpdatedFromWebsocket: false
      }
    }

    case 'CHECKED_LEVEL_FULFILLED': {
      logger.log('USER', 'Redux -> Checked Level')
      return {
        ...state,
        leveled_up_offline: false
      }
    }

    case 'FETCH_ONLINE_USERS_FULFILLED': {
      logger.log('USER', 'Redux -> Fetched Online Users: ', action.payload)
      return {
        ...state,
        onlineUsers: action.payload
      }
    }

    case 'ON_ACTIVE_NOW': {
      logger.log('USER', `Redux -> On Active Now: `, action.payload)
      const onlineUsers = JSON.parse(JSON.stringify(state.onlineUsers))
      const hasActiveNow = onlineUsers.find(({ game }) => game === 'Active Now')
      const activeNow = hasActiveNow || { game: 'Active Now', gamers: [] }
      if (!hasActiveNow) onlineUsers.push(activeNow)
      if (action.payload.active) activeNow.gamers = uniq([...activeNow.gamers, action.payload.alias])
      if (!action.payload.active) activeNow.gamers = activeNow.gamers.filter((alias) => alias !== action.payload.alias)
      return {
        ...state,
        onlineUsers
      }
    }

    case 'ON_STATS_UPDATED': {
      logger.log('USER', `Redux -> Stats Updated for ${action.meta.userId}: `, action.payload)
      return {
        ...state,
        userTransactionStates: action.payload,
        statsUpdatedFromWebsocket: true
      }
    }

    case 'SELECT_LANGUAGE': {
      logger.log('USER', `Redux -> Selected Language `, action.payload)
      return {
        ...state,
        language: action.payload
      }
    }

    default:
      return state
  }
}
