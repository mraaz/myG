import { store } from '../../../redux/Store';
import { onNewChatAction, onNewMessageAction } from '../../../redux/actions/chatAction';
import socket from '../../../common/socket';
socket.connect();

export function monitorChats(userId) {
  return socket.subscribe(`user_chat:${userId}`, event => {
    console.log('WS', 'New Chat Received', event.data);
    store.dispatch(onNewChatAction(event.data));
  });
}

export function monitorMessages(chatId) {
  return socket.subscribe(`chat:${chatId}`, event => {
    console.log('WS', 'New Message Received', event.data);
    store.dispatch(onNewMessageAction(event.data, chatId));
  });
}

