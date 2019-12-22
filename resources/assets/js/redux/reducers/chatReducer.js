
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
            chats.forEach(chat => monitorMessages(chat.chatId));
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
            chat.friendId = action.payload.friendId;
            chat.muted = action.payload.muted;
            chat.blocked = action.payload.blocked;
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

        case "NEW_CHAT": {
            logger.log('CHAT', `Redux -> New Chat: `, action.payload);
            const chats = JSON.parse(JSON.stringify(state.chats));
            chats.push(action.payload.chat);
            monitorMessages(action.payload.chat.chatId);
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
            if (!chat.muted && (window.document.hidden || chat.closed)) new Audio('/assets/sound/notification.ogg').play();
            if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
            if (!chat.muted) chat.closed = false;
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
            updated.edited = message.edited;
            updated.deleted = message.deleted;
            return {
                ...state,
                chats,
            };
        }

        case "UPDATE_CHAT_FULFILLED": {
            logger.log('CHAT', `Redux -> Deleted Message: `, action.meta);
            const chatId = action.meta.chatId;
            const muted = action.meta.muted;
            const blocked = action.meta.blocked;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            if (blocked !== undefined) chat.blocked = blocked;
            if (muted !== undefined) chat.muted = muted;
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
            logger.log('CHAT', `Redux -> Info Updated: `, action.payload);
            const chatId = action.meta.chatId;
            const { userId, subtitle } = action.payload;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            if (chat.userId === userId) return state;
            chat.subtitle = subtitle;
            return {
                ...state,
                chats,
            };
        }

        default: return state;

    }
}