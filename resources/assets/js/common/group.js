
import { store } from '../redux/Store';
import { createChatAction, exitGroupAction } from '../redux/actions/chatAction';
import { generateKeysSync } from '../integration/encryption';

export function createGameGroup(gameId, gameSchedule, title) {
  const { userId } = store.getState().user;
  const { encryption } = generateKeysSync();
  store.dispatch(createChatAction([], userId, title, null, encryption, true, gameId, gameSchedule));
}

export function exitGameGroup(gameId) {
  const chats = JSON.parse(JSON.stringify(store.getState().chat.chats));
  const chat = chats.find(chat => chat.gameId === gameId);
  if (chat) store.dispatch(exitGroupAction(chat.chatId));
}