import { store } from '../../../redux/Store';
import { onNewChatAction, onNewMessageAction, onUpdateMessageAction, onInfoUpdatedAction } from '../../../redux/actions/chatAction';
import socket from '../../../common/socket';
import logger from '../../../common/logger';

socket.connect();
let subscriptions = {};

export function closeSubscriptions() {
  Object.keys(subscriptions).forEach(subscriptionKey => subscriptions[`${subscriptionKey}`].close());
  subscriptions = {};
}

export function monitorChats(userId) {
  const subscriptionKey = `user_chat:${userId}`;
  if (subscriptions[`${subscriptionKey}`]) return;
  logger.log('CHAT', `WS`, `Monitoring ${subscriptionKey}`);
  const subscription = socket.subscribe(subscriptionKey, event => {
    logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
    store.dispatch(onNewChatAction(event.data));
  });
  subscriptions[`${subscriptionKey}`] = subscription;
}

export function monitorMessages(chatId) {
  const subscriptionKey = `chat:${chatId}`;
  if (subscriptions[`${subscriptionKey}`]) return;
  logger.log('CHAT', `WS`, `Monitoring ${subscriptionKey}`);
  const subscription = socket.subscribe(subscriptionKey, event => {
    logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
    if (event.type === "chat:newMessage") return store.dispatch(onNewMessageAction(event.data, chatId));
    if (event.type === "chat:updateMessage") return store.dispatch(onUpdateMessageAction(event.data, chatId));
    if (event.type === "chat:info") return store.dispatch(onInfoUpdatedAction(event.data, chatId));
  });
  subscriptions[`${subscriptionKey}`] = subscription;
}

