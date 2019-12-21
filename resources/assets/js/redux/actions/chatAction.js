import { fetchChats, fetchInfo, createChat, updateChat, clearChat, sendMessage, editMessage, deleteMessage } from '../../integration/http/chat';

export function onNewChatAction(chat) {
    return {
        type: 'NEW_CHAT',
        payload: { chat }
    }
}

export function onNewMessageAction(message, chatId) {
    return {
        type: 'NEW_MESSAGE',
        payload: { message },
        meta: { chatId },
    }
}

export function onUpdateMessageAction(message, chatId) {
    return {
        type: 'UPDATE_MESSAGE',
        payload: { message },
        meta: { chatId },
    }
}

export function onInfoUpdatedAction(activity, chatId) {
    return {
        type: 'INFO_UPDATED',
        payload: activity,
        meta: { chatId },
    }
}

export function fetchChatsAction(userId) {
    return {
        type: 'FETCH_CHATS',
        payload: fetchChats(userId),
    }
}

export function fetchInfoAction(chatId) {
    return {
        type: 'FETCH_CHAT_INFO',
        payload: fetchInfo(chatId),
        meta: { chatId },
    }
}

export function createChatAction(members) {
    return {
        type: 'CREATE_CHAT',
        payload: createChat(members),
    }
}

export function updateChatAction(chatId, payload) {
    return {
        type: 'UPDATE_CHAT',
        payload: updateChat(chatId, payload),
        meta: { chatId, ...payload },
    }
}

export function clearChatAction(chatId) {
    return {
        type: 'CLEAR_CHAT',
        payload: clearChat(chatId),
        meta: { chatId },
    }
}

export function openChatAction(chatId) {
    return {
        type: 'OPEN_CHAT',
        payload: { chatId },
    }
}

export function closeChatAction(chatId) {
    return {
        type: 'CLOSE_CHAT',
        payload: { chatId },
    }
}

export function sendMessageAction(chatId, userId, content) {
    return {
        type: 'SEND_MESSAGE',
        payload: sendMessage(chatId, userId, content),
        meta: { chatId },
    }
}

export function editMessageAction(chatId, messageId, content) {
    return {
        type: 'EDIT_MESSAGE',
        payload: editMessage(chatId, messageId, content),
        meta: { chatId },
    }
}

export function deleteMessageAction(chatId, messageId, origin) {
    return {
        type: 'DELETE_MESSAGE',
        payload: deleteMessage(chatId, messageId),
        meta: { chatId, messageId, origin },
    }
}