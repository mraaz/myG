
import logger from '../../common/logger';
import { convertUTCDateToLocalDate } from '../../common/date';
import { reEncryptMessages, sendGroupKeys } from '../../common/encryption';
import { decryptMessage, deserializeKey } from '../../integration/encryption';

export default function reducer(state = {
  chats: [],
  contacts: [],
  preparingMessenger: false,
}, action) {
  switch (action.type) {

    case "PREPARE_MESSENGER_PENDING": {
      return {
        ...state,
        preparingMessenger: true,
      };
    }

    case "PREPARE_MESSENGER_FULFILLED": {
      logger.log('CHAT', `Redux -> Messenger Ready (Chat): `, action.payload);
      const chats = action.payload.chats.map(chat => {
        const previousChat = state.chats.find(candidate => candidate.chatId === chat.chatId) || {};
        const previousMessages = previousChat.messages || [];
        return {
          ...chat,
          ...previousChat,
          messages: previousMessages,
          closed: previousChat.closed || !previousMessages.length,
          deletedMessages: chat.deletedMessages,
        }
      });
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
        contacts: action.payload.contacts,
        preparingMessenger: false,
        publicKey: (action.payload.encryption || {}).publicKey,
        privateKey: (action.payload.encryption || {}).privateKey,
      };
    }

    case "PREPARE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat ${action.meta.chatId} Ready (Chat): `, action.payload, action.meta);
      const { chatId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.fullContacts = action.payload.contacts;
      const messages = action.payload.messages
        .filter(message => new Date(message.updatedAt) >= new Date(chat.clearedDate))
        .filter(message => !chat.deletedMessages.includes(message.messageId))
        .filter(message => !message.keyReceiver)
        .sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      const privateKey = receiveGroupKey(chat, action.payload.messages, action.meta.userId, state.privateKey);
      if (privateKey) chat.privateKey = privateKey;
      if (!chat.blocked) {
        Object.assign(chat, action.payload.chat);
        chat.messages = messages;
      }
      return {
        ...state,
        chats,
      };
    }

    case "OPEN_CHAT": {
      logger.log('CHAT', `Redux -> Open Chat: `, action.payload);
      const chatId = action.payload.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.closed = false;
      chat.minimised = false;
      chat.maximised = false;
      const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
      if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
      }
    }

    case "CLOSE_CHAT": {
      logger.log('CHAT', `Redux -> Close Chat: `, action.payload);
      const chatId = action.payload.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.closed = true;
      return {
        ...state,
        chats,
      }
    }

    case "CREATE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Created Chat: `, action.payload, action.meta);
      const encryption = action.meta.encryption || {};
      const created = action.payload.chat;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chatAlreadyExists = chats.map(chat => parseInt(chat.chatId)).includes(parseInt(created.chatId));
      if (!chatAlreadyExists) chats.push(created);
      const chat = chats.find(candidate => candidate.chatId === created.chatId);
      chat.closed = false;
      chat.minimised = false;
      chat.maximised = false;
      Object.assign(chat, encryption);
      prepareGroupKeysToSend(chat, parseInt(action.meta.userId), state.contacts, state.publicKey, state.privateKey);
      const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== created.chatId);
      if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
      };
    }

    case "NEW_CHAT": {
      logger.log('CHAT', `Redux -> New Chat: `, action.payload);
      const { chat } = action.payload;
      chat.closed = (chat.messages || []).length === 0;
      const chats = JSON.parse(JSON.stringify(state.chats));
      if (!chats.map(chat => chat.chatId).includes(chat.chatId)) chats.push(chat);
      const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chat.chatId);
      if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
      };
    }

    case "NEW_MESSAGE": {
      logger.log('CHAT', `Redux -> New Message: `, action.payload, action.meta);
      const message = action.payload.message;
      const userId = action.meta.userId;
      const chatId = message.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      if (!chat.muted && !window.focused && parseInt(message.senderId) !== parseInt(userId)) playMessageSound();
      if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
      if (!chat.muted) {
        chat.closed = false;
        const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
        if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      }
      if (!chat.messages) chat.messages = [];
      if (!message.keyReceiver) chat.messages.push(message);
      const privateKey = receiveGroupKey(chat, [message], userId, state.privateKey);
      if (privateKey) chat.privateKey = privateKey;
      return {
        ...state,
        chats,
      };
    }

    case "UPDATE_MESSAGE": {
      logger.log('CHAT', `Redux -> Update Message: `, action.payload);
      const message = action.payload.message;
      const chatId = message.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      const updated = chat.messages.find(candidate => candidate.messageId === message.messageId);
      if (updated) {
        updated.content = message.content;
        updated.backup = message.backup;
        updated.edited = message.edited;
        updated.deleted = message.deleted;
      }
      else {
        chat.messages.push(message);
      }
      chat.messages = chat.messages.sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      return {
        ...state,
        chats,
      };
    }

    case "ON_MESSAGES_DELETED": {
      logger.log('CHAT', `Redux -> On Messages Deleted: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const messages = action.payload.messages;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      messages.forEach(message => {
        const toDelete = chat.messages.find(candidate => candidate.messageId === message.messageId);
        const index = chat.messages.indexOf(toDelete);
        chat.messages.splice(index, 1);
      });
      return {
        ...state,
        chats,
      };
    }

    case "ON_CHAT_DELETED": {
      logger.log('CHAT', `Redux -> On Chat Deleted: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const chats = JSON.parse(JSON.stringify(state.chats)).filter(chat => parseInt(chat.chatId) !== parseInt(chatId));
      return {
        ...state,
        chats,
      };
    }

    case "UPDATE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat Updated: `, action.meta);
      const { chatId, muted, blocked, markAsRead, selfDestruct } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (blocked !== undefined) chat.blocked = blocked;
      if (muted !== undefined) chat.muted = muted;
      if (selfDestruct !== undefined) chat.selfDestruct = selfDestruct;
      if (markAsRead) chat.readDate = new Date().toISOString().replace("T", " ").split('.')[0];
      return {
        ...state,
        chats,
      };
    }

    case "ADD_CONTACTS_TO_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Contacts Added: `, action.payload, action.meta);
      const { userId, chatId } = action.meta;
      const { contacts } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.contacts = [...chat.contacts, ...contacts.map(contact => contact.contactId)];
      chat.fullContacts = [...chat.fullContacts, ...contacts];
      sendGroupKeys(chatId, parseInt(userId), contacts, chat.privateKey, state.privateKey);
      return {
        ...state,
        chats,
      };
    }

    case "CLEAR_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat Cleared: ${action.meta.chatId}`);
      const chatId = action.meta.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.messages = [];
      return {
        ...state,
        chats,
      };
    }

    case "DELETE_MESSAGE_FULFILLED": {
      logger.log('CHAT', `Redux -> Deleted Message: `, action.meta);
      const { chatId, messageId, origin } = action.meta;
      if (origin === 'sent') return state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.messages = chat.messages.filter(message => message.messageId !== messageId);
      return {
        ...state,
        chats,
      };
    }

    case "MARK_AS_READ": {
      logger.log('CHAT', `Redux -> Mark As Read: `, action.meta, action.payload);
      const { userId: thisUserId } = action.meta;
      const { userId: updatedUserId, chatId, readDate, friendReadDate } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (parseInt(updatedUserId) === parseInt(thisUserId)) {
        if (readDate) chat.readDate = readDate;
        return {
          ...state,
          chats,
        };
      }
      if (friendReadDate) chat.friendReadDate = friendReadDate;
      return {
        ...state,
        chats,
      };
    }

    case "SELF_DESTRUCT": {
      logger.log('CHAT', `Redux -> Self Destruct: `, action.payload);
      const { chatId, selfDestruct } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.selfDestruct = selfDestruct;
      return {
        ...state,
        chats,
      };
    }

    case "PUBLIC_KEY_UPDATED": {
      logger.log('CHAT', `Redux -> Public Key Updated (Chat): `, action.payload, action.meta);
      const { userId: thisUserId } = action.meta;
      const { userId: updatedUserId, chatId, publicKey } = action.payload;
      const { privateKey } = state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (parseInt(updatedUserId) === parseInt(thisUserId)) return state;
      const lastFriendRead = convertUTCDateToLocalDate(new Date(chat.friendReadDate));
      const unreadMessages = [];
      chat.messages.slice(0).reverse().some(message => {
        const messageDate = convertUTCDateToLocalDate(new Date(message.createdAt));
        if (messageDate > lastFriendRead && message.senderId === thisUserId) {
          unreadMessages.push(message);
          return false;
        }
        return true;
      });
      reEncryptMessages(unreadMessages, publicKey, privateKey);
      return {
        ...state,
        chats,
      };
    }

    case "CHAT_STATE_UPDATED": {
      logger.log('CHAT', `Redux -> Chat State Updated: `, action.payload);
      const chatId = action.meta.chatId;
      const { maximised, minimised } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      if (minimised !== undefined) chat.minimised = minimised;
      if (maximised !== undefined) chat.maximised = maximised;
      return {
        ...state,
        chats,
      };
    }

    case "GENERATE_KEYS_FULFILLED": {
      return {
        ...state,
        publicKey: action.payload.encryption.publicKey,
        privateKey: action.payload.encryption.privateKey,
      };
    }

    case "VALIDATE_PIN_FULFILLED": {
      return {
        ...state,
        publicKey: action.payload.encryption.publicKey,
        privateKey: action.payload.encryption.privateKey,
      };
    }

    default: return state;

  }
}

function playMessageSound() {
  try {
    new Audio('/assets/sound/notification.mp3').play();
  } catch (error) {
    console.error('Error While Playing Message Notification:', error);
  }
}

function prepareGroupKeysToSend(group, userId, userContacts, userPublicKey, userPrivateKey) {
  if (group.contacts.length <= 2) return;
  const chatContacts = group.contacts.filter(contactId => userId !== parseInt(contactId));
  const getContact = contactId => userContacts.find(contact => parseInt(contact.contactId) === parseInt(contactId));
  const contacts = chatContacts.map(contactId => getContact(contactId));
  contacts.push({ contactId: userId, publicKey: userPublicKey });
  sendGroupKeys(group.chatId, userId, contacts, group.privateKey, userPrivateKey);
}

function receiveGroupKey(group, messages, userId, userPrivateKey) {
  if (group.contacts.length <= 2) return;
  const message = messages.find(message => parseInt(message.keyReceiver) === parseInt(userId));
  if (!message || !message.content) return;
  const privateKey = decryptMessage(message.content, userPrivateKey);
  if (!privateKey) return;
  return deserializeKey(JSON.parse(privateKey));
}