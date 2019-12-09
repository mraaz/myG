import { fetchChats, fetchMessages, fetchInfo, createChat, sendMessage } from '../../integration/http/chat';

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

export function fetchMessagesAction(chatId) {
    return {
        type: 'FETCH_MESSAGES',
        payload: fetchMessages(chatId),
        meta: { chatId },
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

export function sendMessageAction(chatId, userId, content) {
    return {
        type: 'SEND_MESSAGE',
        payload: sendMessage(chatId, userId, content),
        meta: { chatId },
    }
}