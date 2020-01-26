
import logger from '../../common/logger';
import { convertUTCDateToLocalDate } from '../../common/date';
import { reEncryptMessages } from '../../common/encryption';

export default function reducer(state = {
  chats: [],
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
        preparingMessenger: false,
      };
    }

    case "PREPARE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat ${action.meta.chatId} Ready (Chat): `, action.payload);
      const { chatId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const messages = action.payload.messages
        .filter(message => new Date(message.updatedAt) >= new Date(chat.clearedDate))
        .filter(message => !chat.deletedMessages.includes(message.messageId))
        .sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      if (!chat.blocked) {
        Object.assign(chat, action.payload.chat);
        chat.messages = messages;
      }
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_CHATS_FULFILLED": {
      logger.log('CHAT', `Redux -> Fetched Chats: `, action.payload);
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
      };
    }

    case "FETCH_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Fetched Chat: `, action.payload);
      const chatId = action.meta.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) delete action.payload.chat.messages;
      Object.assign(chat, action.payload.chat);
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_CHAT_MESSAGES_FULFILLED": {
      logger.log('CHAT', `Redux -> Fetched Chat Messages: `, action.payload);
      const chatId = action.meta.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      const messages = action.payload.messages
        .filter(message => new Date(message.updatedAt) >= new Date(chat.clearedDate))
        .filter(message => !chat.deletedMessages.includes(message.messageId))
        .sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      chat.messages = messages;
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
      logger.log('CHAT', `Redux -> Created Chat: `, action.payload);
      const created = action.payload.chat;
      const chats = JSON.parse(JSON.stringify(state.chats));
      if (!chats.map(chat => chat.chatId).includes(created.chatId)) chats.push(created);
      const chat = chats.find(candidate => candidate.chatId === created.chatId);
      chat.closed = false;
      chat.minimised = false;
      chat.maximised = false;
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
      logger.log('CHAT', `Redux -> New Message: `, action.payload);
      const message = action.payload.message;
      const chatId = message.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      if (!chat.muted && !window.focused) new Audio('/assets/sound/notification.mp3').play();
      if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
      if (!chat.muted) {
        chat.closed = false;
        const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
        if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      }
      if (!chat.messages) chat.messages = [];
      chat.messages.push(message);
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

    case "GENERATE_KEYS": {
      return {
        ...state,
        privateKey: action.payload.privateKey,
      };
    }

    case "VALIDATE_PIN": {
      return {
        ...state,
        privateKey: action.payload.privateKey,
      };
    }

    default: return state;

  }
}