import { store } from '../../../redux/Store';
import { onNewChatAction, onChatUpdatedAction, onGameStartingAction, onNewMessageAction, onUpdateMessageAction, onDeleteMessagesAction, onChatNotification, onReactionAddedAction, onReactionRemovedAction, onTypingAction, onDeleteChatAction, onUserJoinedGroupAction, onUserLeftGroupAction, onGuestJoinedGroupAction, onGuestLeftGroupAction, onMarkAsReadAction, onSelfDestructAction, onPublicKeyUpdatedAction } from '../../../redux/actions/chatAction';
import { onStatusChangedAction } from '../../../redux/actions/userAction';
import { onConnectionStateChangedAction } from '../../../redux/actions/socketAction';
import socket from '../../../common/socket';
import logger from '../../../common/logger';

let currentUserId = null;
let hasDisconnected = false;
let ws = null;
let subscription = null;

export function monitorSocketConnection() {
  setInterval(() => {
    if (store.getState().socket.disconnected) attemptSocketConnection();
  }, 1000);
}

export function attemptSocketConnection() {

  ws = socket.connect().ws;

  ws.on('open', () => {
    store.dispatch(onConnectionStateChangedAction(false));
    if (!hasDisconnected) return;
    ws = socket.connect().ws;
    monitorChats(currentUserId);
    hasDisconnected = false;
  });

  ws.on('close', () => {
    store.dispatch(onConnectionStateChangedAction(true));
    hasDisconnected = true;
    closeSubscription();
  });

}

attemptSocketConnection();

export function closeSubscription() {
  if (subscription !== null) subscription.close();
  subscription = null;
}

export function monitorChats(userId, isGuest) {
  currentUserId = userId;
  if (subscription !== null) return;
  const subscriptionKey = `chat${isGuest ? ':guest:' : ':auth:'}${userId}`;
  logger.log('CHAT', `WS`, `Monitoring Chats for User ${userId} with key ${subscriptionKey}`);
  subscription = socket.subscribe(subscriptionKey, event => handleEvent(event, userId));
}

function handleEvent(event, userId) {
  logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
  if (event.type.includes("newChat")) return store.dispatch(onNewChatAction(event.data, userId));
  if (event.type.includes("chatUpdated")) return store.dispatch(onChatUpdatedAction(event.data, userId));
  if (event.type.includes("gameStarting")) return store.dispatch(onGameStartingAction(event.data, userId));
  if (event.type.includes("newMessage")) return store.dispatch(onNewMessageAction(event.data, userId));
  if (event.type.includes("updateMessage")) return store.dispatch(onUpdateMessageAction(event.data, userId));
  if (event.type.includes("deleteMessages")) return store.dispatch(onDeleteMessagesAction(event.data, userId));
  if (event.type.includes("deleteChat")) return store.dispatch(onDeleteChatAction(event.data, userId));
  if (event.type.includes("chatNotification")) return store.dispatch(onChatNotification(event.data, userId));
  if (event.type.includes("reactionAdded")) return store.dispatch(onReactionAddedAction(event.data, userId));
  if (event.type.includes("reactionRemoved")) return store.dispatch(onReactionRemovedAction(event.data, userId));
  if (event.type.includes("typing")) return store.dispatch(onTypingAction(event.data, userId));
  if (event.type.includes("userJoined")) return store.dispatch(onUserJoinedGroupAction(event.data, userId));
  if (event.type.includes("userLeft")) return store.dispatch(onUserLeftGroupAction(event.data, userId));
  if (event.type.includes("guestJoined")) return store.dispatch(onGuestJoinedGroupAction(event.data, userId));
  if (event.type.includes("guestLeft")) return store.dispatch(onGuestLeftGroupAction(event.data, userId));
  if (event.type.includes("markAsRead")) return store.dispatch(onMarkAsReadAction(event.data, userId));
  if (event.type.includes("selfDestruct")) return store.dispatch(onSelfDestructAction(event.data, userId));
  if (event.type.includes("encryption")) return store.dispatch(onPublicKeyUpdatedAction(event.data, userId));
  if (event.type.includes("status")) return store.dispatch(onStatusChangedAction(event.data, userId));
}