
import { store } from '../redux/Store';
import { createChatAction } from '../redux/actions/chatAction';
import { generateKeysSync } from '../integration/encryption';

export function createGameGroup(gameId, title) {
  const { userId } = store.getState().user;
  const { encryption } = generateKeysSync();
  store.dispatch(createChatAction([], userId, title, null, encryption, true, gameId));
}