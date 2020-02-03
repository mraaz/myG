
import logger from '../../common/logger';

export default function reducer(state = {
  status: 'online',
  isStatusLocked: false,
  contacts: [],
  friendRequests: [],
}, action) {
  switch (action.type) {

    case "PREPARE_MESSENGER_FULFILLED": {
      logger.log('CHAT', `Redux -> Messenger Ready (User): `, action.payload);
      const { contacts } = action.payload;
      const { value: currentStatus, locked: isStatusLocked } = action.payload.status;
      const status = currentStatus === 'offline' && !isStatusLocked ? 'online' : currentStatus;
      return {
        ...state,
        contacts,
        status, 
        isStatusLocked,
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
      logger.log('CHAT', `Redux -> Public Key Updated (User): `, action.payload, action.meta);
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
      logger.log('CHAT', `Redux -> Fetched Friend Requests: `, action.payload);
      const friendRequests = (action.payload.friendRequests || []).map(request => request.other_user_id);
      return {
        ...state,
        friendRequests,
      };
    }

    default: return state;

  }
}