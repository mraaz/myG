import { store } from '../../../redux/Store';
import { onNewChatAction, onNewMessageAction, onUpdateMessageAction, onDeleteMessagesAction, onInfoUpdatedAction, onPublicKeyUpdatedAction, fetchChatsAction } from '../../../redux/actions/chatAction';
import { onConnectionStateChangedAction } from '../../../redux/actions/socketAction';
import socket from '../../../common/socket';
import logger from '../../../common/logger';

let currentUserId = null;
let currentChats = [];
let hasDisconnected = false;
let ws = null;
let subscriptions = {};

export function attemptSocketConnection() {

  ws = socket.connect().ws;

  ws.on('open', () => {
    store.dispatch(onConnectionStateChangedAction(true));
    if (!hasDisconnected) return;
    ws = socket.connect().ws;
    store.dispatch(fetchChatsAction(currentUserId));
    monitorChats(currentUserId);
    currentChats.forEach(chatId => monitorMessages(chatId, currentUserId));
    hasDisconnected = false;
  });

  ws.on('close', () => {
    store.dispatch(onConnectionStateChangedAction(false));
    hasDisconnected = true;
    closeSubscriptions();
  });

}

attemptSocketConnection();

export function closeSubscriptions() {
  Object.keys(subscriptions).forEach(subscriptionKey => subscriptions[`${subscriptionKey}`].close());
  subscriptions = {};
}

export function monitorChats(userId) {
  currentUserId = userId;
  const subscriptionKey = `user_chat:${userId}`;
  if (subscriptions[`${subscriptionKey}`]) return;
  logger.log('CHAT', `WS`, `Monitoring ${subscriptionKey}`);
  const subscription = socket.subscribe(subscriptionKey, event => {
    logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
    store.dispatch(onNewChatAction(event.data, userId));
  });
  subscriptions[`${subscriptionKey}`] = subscription;
}

export function monitorMessages(chatId, userId) {
  if (currentChats.indexOf(chatId) === -1) currentChats.push(chatId);
  const subscriptionKey = `chat:${chatId}`;
  if (subscriptions[`${subscriptionKey}`]) return;
  logger.log('CHAT', `WS`, `Monitoring ${subscriptionKey}`);
  const subscription = socket.subscribe(subscriptionKey, event => {
    logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
    if (event.type === "chat:newMessage") return store.dispatch(onNewMessageAction(event.data, chatId, userId));
    if (event.type === "chat:updateMessage") return store.dispatch(onUpdateMessageAction(event.data, chatId, userId));
    if (event.type === "chat:deleteMessages") return store.dispatch(onDeleteMessagesAction(event.data, chatId, userId));
    if (event.type === "chat:info") return store.dispatch(onInfoUpdatedAction(event.data, chatId, userId));
    if (event.type === "chat:encryption") return store.dispatch(onPublicKeyUpdatedAction(event.data, chatId, userId));
  });
  subscriptions[`${subscriptionKey}`] = subscription;
}

