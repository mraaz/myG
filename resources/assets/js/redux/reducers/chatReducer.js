
export default function reducer(state = {
    chats: [],
}, action) {
    switch (action.type) {

        case "FETCH_CHATS_FULFILLED": {
            console.log(`Redux -> Fetched Chats: `, action.payload);
            const chats = action.payload.chats;
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

        case "FETCH_CHAT_TITLE_FULFILLED": {
            console.log(`Redux -> Fetched Chat Title: `, action.payload);
            const chatId = action.meta.chatId;
            const chats = JSON.parse(JSON.stringify(state.chats));
            const chat = chats.find(candidate => candidate.chatId === chatId);
            chat.title = action.payload.title;
            return {
                ...state,
                chats,
            };
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

        default: return state;

    }
}