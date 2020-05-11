
import logger from '../../common/logger';

export default function reducer(state = {
  userId: null,
  alias: null,
  icon: null,
  status: 'online',
  isStatusLocked: false,
  contacts: [],
  games: [],
  friendRequests: [],
  foundUsers: [],
  notificationSoundsDisabled: false,
}, action) {
  switch (action.type) {

    case "LOAD_USER_INFO": {
      logger.log('User', `Redux -> Loading User Info (User): `, action.payload);
      return {
        ...state,
        userId: action.payload.id,
        alias: action.payload.alias,
        icon: action.payload.profile_img,
        notificationSoundsDisabled: !!action.payload.notification_sounds_disabled,
      };
    }

    case "PREPARE_MESSENGER_FULFILLED": {
      logger.log('CHAT', `Redux -> Messenger Ready (User): `, action.payload);
      const { contacts, games } = action.payload;
      const { userId, alias } = action.meta;
      const { value: currentStatus, locked: isStatusLocked } = action.payload.status;
      const status = currentStatus === 'offline' && !isStatusLocked ? 'online' : currentStatus;
      return {
        ...state,
        contacts,
        games,
        status, 
        isStatusLocked,
        userId, 
        alias,
      };
    }

    case "PREPARE_CHAT_FULFILLED": {
      if (!action.payload.contact) return state;
      logger.log('CHAT', `Redux -> Chat ${action.meta.chatId} Ready (User): `, action.payload);
      const { contact: newContact } = action.payload;
      const contacts = JSON.parse(JSON.stringify(state.contacts));
      const contact = contacts.find(contact => contact.contactId === newContact.contactId);
      if (contact) Object.assign(contact, newContact);
      else contacts.push(newContact);
      return {
        ...state,
        contacts,
      };
    }

    case "FETCH_STATUS_FULFILLED": {
      logger.log('USER', `Redux -> Fetch Status: `, action.payload);
      const { value: status, locked: isStatusLocked } = action.payload.status;
      return {
        ...state,
        status: status === 'offline' && !isStatusLocked ? 'online' : status,
        isStatusLocked,
      };
    }

    case "UPDATE_STATUS_FULFILLED": {
      logger.log('USER', `Redux -> Update Status: `, action.payload);
      const { value: status, locked: isStatusLocked } = action.payload.status;
      return {
        ...state,
        status,
        isStatusLocked,
      };
    }

    case "ON_STATUS_CHANGED": {
      logger.log('USER', `Redux -> On Status Changed: `, action.payload);
      const { contactId, status, lastSeen } = action.payload;
      const contacts = JSON.parse(JSON.stringify(state.contacts));
      const contact = contacts.find(contact => contact.contactId === contactId);
      if (contact) Object.assign(contact, { status, lastSeen });
      return {
        ...state,
        contacts,
      };
    }

    case "PUBLIC_KEY_UPDATED": {
      logger.log('USER', `Redux -> Public Key Updated (User): `, action.payload, action.meta);
      const { userId: thisUserId } = action.meta;
      const { userId: updatedUserId, publicKey } = action.payload;
      const contacts = JSON.parse(JSON.stringify(state.contacts));
      const contact = contacts.find(contact => contact.contactId === updatedUserId);
      if (parseInt(updatedUserId) === parseInt(thisUserId)) return state;
      contact.publicKey = publicKey;
      return {
        ...state,
        contacts,
      };
    }

    case "FETCH_FRIEND_REQUESTS_FULFILLED": {
      logger.log('USER', `Redux -> Fetched Friend Requests: `, action.payload);
      const friendRequests = (action.payload.friendRequests || []).map(request => request.other_user_id);
      return {
        ...state,
        friendRequests,
      };
    }

    case "SEARCH_USERS_FULFILLED": {
      logger.log('USER', `Redux -> Found Users: `, action.payload);
      return {
        ...state,
        foundUsers: action.payload.users,
      };
    }

    case "FAVORITE_GAME_FULFILLED": {
      logger.log('USER', `Redux -> Favorited Game: `, action.payload, action.meta);
      const games = JSON.parse(JSON.stringify(state.games));
      const game = games.find(game => game.gameId === action.meta.gameId);
      if (!game) return state;
      game.isFavorite = true;
      return {
        ...state,
        games,
      };
    }

    case "UNFAVORITE_GAME_FULFILLED": {
      logger.log('USER', `Redux -> Favorited Game: `, action.payload, action.meta);
      const games = JSON.parse(JSON.stringify(state.games));
      const game = games.find(game => game.gameId === action.meta.gameId);
      if (!game) return state;
      game.isFavorite = false;
      return {
        ...state,
        games,
      };
    }

    case "UPDATE_GAME_ICON_FULFILLED": {
      logger.log('USER', `Redux -> Updated Game Icon: `, action.payload, action.meta);
      const games = JSON.parse(JSON.stringify(state.games));
      const game = games.find(game => game.gameId === action.meta.gameId);
      if (!game) return state;
      game.icon = action.meta.icon;
      return {
        ...state,
        games,
      };
    }

    case "SET_AS_FRIEND": {
      logger.log('USER', `Redux -> Set As Friend: `, action.payload);
      const contacts = JSON.parse(JSON.stringify(state.contacts));
      if (contacts.find(contact => contact.contactId === action.payload)) return state;
      contacts.push({ contactId: action.payload });
      return {
        ...state,
        contacts
      };
    }

    case "TOGGLE_NOTIFICATION_SOUNDS_FULFILLED": {
      logger.log('USER', `Redux -> Toggle Notification Sounds: `, action.meta);
      return {
        ...state,
        notificationSoundsDisabled: action.meta.disabled,
      }
    }

    default: return state;

  }
}