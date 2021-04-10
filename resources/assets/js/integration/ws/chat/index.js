import { store } from '../../../redux/Store';
import { onNewChatAction, onChatUpdatedAction, onGameStartingAction, onNewMessageAction, onUpdateMessageAction, onDeleteMessagesAction, onChatNotification, onReactionAddedAction, onReactionRemovedAction, onTypingAction, onDeleteChatAction, onUserJoinedGroupAction, onUserLeftGroupAction, onGuestJoinedGroupAction, onGuestLeftGroupAction, onMarkAsReadAction, onSelfDestructAction, onPublicKeyUpdatedAction } from '../../../redux/actions/chatAction';
import { onStatusChangedAction, onStatsUpdatedAction, onActiveNowAction } from '../../../redux/actions/userAction';
import { onConnectionStateChangedAction } from '../../../redux/actions/socketAction';
import { onNotificationAction } from '../../../redux/actions/notificationAction';
import socket from '../../../common/socket';
import logger from '../../../common/logger';

const subscriptions = [];
const connections = [];

export function monitorSocketConnection() {
  setInterval(() => {
    if (store.getState().socket.disconnected) connectToSocket();
  }, 1000);
}

function connectToSocket() {
  const ws = socket.connect().ws;
  ws.on('open', () => {
    store.dispatch(onConnectionStateChangedAction(false));
  });
  ws.on('close', () => {
    store.dispatch(onConnectionStateChangedAction(true));
  });
}

connectToSocket();

export function attemptSocketConnections() {
  subscriptions.forEach(({ id, userId }) => {
    logger.log('CHAT', `WS`, `Monitoring Socket ${id} for user ${userId}`);
    connections.push(socket.subscribe(id, event => handleEvent(event, userId)));
  });
}

export function closeSubscriptions() {
  connections.forEach((connection) => connection.close())
}

export function monitorChats(userId, isGuest) {
  monitorSocket(`chat${isGuest ? ':guest:' : ':auth:'}${userId}`, userId);
}

export function monitorChannel(userId, channelId) {
  if (!userId || !channelId) return;
  monitorSocket(`chat:channel:${channelId}`, userId);
}

export function monitorSocket(id, userId) {
  if (subscriptions.find((subscription) => subscription.id === id)) return;
  subscriptions.push({ id, userId });
  attemptSocketConnections();
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
  if (event.type.includes("userStats")) return store.dispatch(onStatsUpdatedAction(event.data, userId));
  if (event.type.includes("notification")) return store.dispatch(onNotificationAction(event.data, userId));
  if (event.type.includes("activeNow")) return store.dispatch(onActiveNowAction(event.data, userId));
}