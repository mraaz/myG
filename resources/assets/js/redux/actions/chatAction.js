import { fetchChats, fetchChat, createChat, updateChat, clearChat, checkSelfDestruct, fetchMessages, sendMessage, editMessage, deleteMessage } from '../../integration/http/chat';

export function onNewChatAction(chat, userId) {
    return {
        type: 'NEW_CHAT',
        payload: { chat },
        meta: { userId },
    }
}

export function onNewMessageAction(message) {
    return {
        type: 'NEW_MESSAGE',
        payload: { message },
    }
}

export function onUpdateMessageAction(message) {
    return {
        type: 'UPDATE_MESSAGE',
        payload: { message },
    }
}

export function onDeleteMessagesAction(payload) {
    return {
        type: 'ON_MESSAGES_DELETED',
        payload,
    }
}

export function onMarkAsReadAction(payload, userId) {
    return {
        type: 'MARK_AS_READ',
        payload,
        meta: { userId },
    }
}

export function onSelfDestructAction(payload, userId) {
    return {
        type: 'SELF_DESTRUCT',
        payload,
        meta: { userId },
    }
}

export function onPublicKeyUpdatedAction(payload, userId) {
    return {
        type: 'PUBLIC_KEY_UPDATED',
        payload: payload,
        meta: { userId },
    }
}

export function updateChatStateAction(chatId, state) {
    return {
        type: 'CHAT_STATE_UPDATED',
        payload: state,
        meta: { chatId },
    }
}

export function fetchChatsAction() {
    return {
        type: 'FETCH_CHATS',
        payload: fetchChats()
    }
}

export function fetchChatAction(chatId) {
    return {
        type: 'FETCH_CHAT',
        payload: fetchChat(chatId),
        meta: { chatId },
    }
}

export function createChatAction(contacts, userId) {
    return {
        type: 'CREATE_CHAT',
        payload: createChat(contacts),
        meta: { userId }
    }
}

export function updateChatAction(chatId, payload) {
    return {
        type: 'UPDATE_CHAT',
        payload: updateChat(chatId, payload),
        meta: { chatId, ...payload },
    }
}

export function checkSelfDestructAction(chatId) {
    return {
        type: 'CHECK_SELF_DESTRUCT',
        payload: checkSelfDestruct(chatId),
        meta: { chatId },
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

export function fetchMessagesAction(chatId) {
    return {
        type: 'FETCH_CHAT_MESSAGES',
        payload: fetchMessages(chatId),
        meta: { chatId },
    }
}

export function sendMessageAction(chatId, userId, encrypted, selfDestruct) {
    return {
        type: 'SEND_MESSAGE',
        payload: sendMessage(chatId, userId, encrypted, selfDestruct),
        meta: { chatId },
    }
}

export function editMessageAction(chatId, messageId, encrypted) {
    return {
        type: 'EDIT_MESSAGE',
        payload: editMessage(chatId, messageId, encrypted),
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