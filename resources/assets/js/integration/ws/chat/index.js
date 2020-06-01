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
  logger.log('CHAT', `WS`, `Monitoring Chats for User ${userId}`);
  const subscriptionKey = `chat:${userId}${isGuest ? ':guest' : ''}`;
  subscription = socket.subscribe(subscriptionKey, event => handleEvent(event, userId));
}

function handleEvent(event, userId) {
  logger.log('CHAT', 'WS', `New "${event.type}" Event Received`, event.data);
  if (event.type === "chat:newChat") return store.dispatch(onNewChatAction(event.data, userId));
  if (event.type === "chat:chatUpdated") return store.dispatch(onChatUpdatedAction(event.data, userId));
  if (event.type === "chat:gameStarting") return store.dispatch(onGameStartingAction(event.data, userId));
  if (event.type === "chat:newMessage") return store.dispatch(onNewMessageAction(event.data, userId));
  if (event.type === "chat:updateMessage") return store.dispatch(onUpdateMessageAction(event.data, userId));
  if (event.type === "chat:deleteMessages") return store.dispatch(onDeleteMessagesAction(event.data, userId));
  if (event.type === "chat:deleteChat") return store.dispatch(onDeleteChatAction(event.data, userId));
  if (event.type === "chat:chatNotification") return store.dispatch(onChatNotification(event.data, userId));
  if (event.type === "chat:reactionAdded") return store.dispatch(onReactionAddedAction(event.data, userId));
  if (event.type === "chat:reactionRemoved") return store.dispatch(onReactionRemovedAction(event.data, userId));
  if (event.type === "chat:typing") return store.dispatch(onTypingAction(event.data, userId));
  if (event.type === "chat:userJoined") return store.dispatch(onUserJoinedGroupAction(event.data, userId));
  if (event.type === "chat:userLeft") return store.dispatch(onUserLeftGroupAction(event.data, userId));
  if (event.type === "chat:guestJoined") return store.dispatch(onGuestJoinedGroupAction(event.data, userId));
  if (event.type === "chat:guestLeft") return store.dispatch(onGuestLeftGroupAction(event.data, userId));
  if (event.type === "chat:markAsRead") return store.dispatch(onMarkAsReadAction(event.data, userId));
  if (event.type === "chat:selfDestruct") return store.dispatch(onSelfDestructAction(event.data, userId));
  if (event.type === "chat:encryption") return store.dispatch(onPublicKeyUpdatedAction(event.data, userId));
  if (event.type === "chat:status") return store.dispatch(onStatusChangedAction(event.data, userId));
}