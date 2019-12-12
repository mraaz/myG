
export default function reducer(state = {
    chats: [],
}, action) {
    switch (action.type) {

        case "FETCH_CHATS_FULFILLED": {
            console.log(`Redux -> Fetched Chats: `, action.payload);
            const findChat = chatId => state.chats.find(candidate => candidate.chatId === chatId) || {};
            const chats = action.payload.chats.map(chat => ({ ...chat, ...findChat(chat.chatId) }));
            return {
                ...state,
                chats,
            };
        }

        case "FETCH_MESSAGES_FULFILLED": {
            console.log(`Redux -> Fetched Messages: `, action.payload);
            const chatId = action.meta.chatId;
            const messages = action.payload.messages;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            chat.messages = messages;
            return {
                ...state,
                chats,
            };
        }

        case "FETCH_CHAT_INFO_FULFILLED": {
            console.log(`Redux -> Fetched Chat Info: `, action.payload);
            const chatId = action.meta.chatId;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            chat.icon = action.payload.icon;
            chat.title = action.payload.title;
            chat.subtitle = action.payload.subtitle;
            chat.friendId = action.payload.friendId;
            return {
                ...state,
                chats,
            };
        }

        case "OPEN_CHAT": {
            console.log(`Redux -> Open Chat: `, action.payload);
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
            console.log(`Redux -> Close Chat: `, action.payload);
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
            console.log(`Redux -> New Chat: `, action.payload);
            const chats = JSON.parse(JSON.stringify(state.chats));
            chats.push(action.payload.chat);
            return {
                ...state,
                chats,
            };
        }

        case "NEW_MESSAGE": {
            console.log(`Redux -> New Message: `, action.payload);
            const chatId = action.meta.chatId;
            const message = action.payload.message;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            chat.messages.push(message);
            return {
                ...state,
                chats,
            };
        }

        case "INFO_UPDATED": {
            console.log(`Redux -> Info Updated: `, action.payload);
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