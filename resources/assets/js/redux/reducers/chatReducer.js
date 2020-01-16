
import { monitorMessages } from '../../integration/ws/chat'
import logger from '../../common/logger';

export default function reducer(state = {
  chats: [],
}, action) {
  switch (action.type) {

    case "FETCH_CHATS_FULFILLED": {
      logger.log('CHAT', `Redux -> Fetched Chats: `, action.payload);
      const findChat = chatId => state.chats.find(candidate => candidate.chatId === chatId) || {};
      const chats = action.payload.chats.map(chat => ({ ...chat, ...findChat(chat.chatId) }));
      chats.forEach(chat => monitorMessages(chat.chatId, action.meta.userId));
      chats.forEach(chat => chat.closed = (chat.messages || []).length === 0);
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_CHAT_INFO_FULFILLED": {
      logger.log('CHAT', `Redux -> Fetched Chat Info: `, action.payload);
      const chatId = action.meta.chatId;
      const messages = action.payload.messages;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.icon = action.payload.icon;
      chat.title = action.payload.title;
      chat.subtitle = action.payload.subtitle;
      chat.status = action.payload.status;
      chat.publicKey = action.payload.publicKey;
      chat.friendId = action.payload.friendId;
      chat.muted = action.payload.muted;
      chat.blocked = action.payload.blocked;
      chat.selfDestruct = action.payload.selfDestruct;
      chat.readDate = action.payload.readDate;
      chat.friendReadDate = action.payload.friendReadDate;
      chat.clearedDate = action.payload.clearedDate;
      chat.messages = chat.blocked ? chat.messages || [] : messages;
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
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
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
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
      monitorMessages(chat.chatId, chat.userId);
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
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
      monitorMessages(chat.chatId, chat.userId);
      return {
        ...state,
        chats,
      };
    }

    case "NEW_MESSAGE": {
      logger.log('CHAT', `Redux -> New Message: `, action.payload);
      const chatId = action.meta.chatId;
      const message = action.payload.message;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      if (!chat.muted && !window.document.hasFocus()) new Audio('/assets/sound/notification.ogg').play();
      if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
      if (!chat.muted) {
        chat.closed = false;
        const openChats = chats.filter(candidate => !candidate.closed);
        if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
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
      const chatId = action.meta.chatId;
      const message = action.payload.message;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      const updated = chat.messages.find(candidate => candidate.id === message.id);
      updated.content = message.content;
      updated.backup = message.backup;
      updated.edited = message.edited;
      updated.deleted = message.deleted;
      return {
        ...state,
        chats,
      };
    }

    case "ON_MESSAGES_DELETED": {
      logger.log('CHAT', `Redux -> On Messages Deleted: `, action.payload);
      const chatId = action.meta.chatId;
      const messages = action.payload.messages;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      messages.forEach(message => {
        const toDelete = chat.messages.find(candidate => candidate.id === message.id);
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
      const chatId = action.meta.chatId;
      const messageId = action.meta.messageId;
      const origin = action.meta.origin;
      if (origin === 'sent') return state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.messages = chat.messages.filter(message => message.id !== messageId);
      return {
        ...state,
        chats,
      };
    }

    case "INFO_UPDATED": {
      const { chatId, userId: thisUserId } = action.meta;
      const { subtitle, selfDestruct, readDate, friendReadDate, userId: updatedUserId } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (selfDestruct !== undefined) chat.selfDestruct = selfDestruct;
      if (parseInt(updatedUserId) === parseInt(thisUserId)) {
        if (readDate) chat.readDate = readDate;
        return {
          ...state,
          chats,
        };
      }
      logger.log('CHAT', `Redux -> Info Updated: `, action.meta, action.payload);
      if (subtitle) chat.subtitle = subtitle;
      if (friendReadDate) chat.friendReadDate = friendReadDate;
      return {
        ...state,
        chats,
      };
    }

    case "PUBLIC_KEY_UPDATED": {
      logger.log('CHAT', `Redux -> Public Key Updated: `, action.payload);
      const { userId: thisUserId, chatId } = action.meta;
      const { userId: updatedUserId, publicKey } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (parseInt(updatedUserId) === parseInt(thisUserId)) return state;
      chat.publicKey = publicKey;
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

    default: return state;

  }
}