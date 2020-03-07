
import { generateKeysSync } from '../../integration/encryption';
import { register, unregister } from '../../integration/http/guest';

export function registerGuestAction(chatId) {
  const { encryption: { publicKey, privateKey } } = generateKeysSync();
  return {
    type: 'REGISTER_GUEST',
    payload: register(publicKey, chatId),
    meta: { publicKey, privateKey, chatId }
  }
}

export function unregisterGuestAction(guestId, chatId) {
  return {
    type: 'UNREGISTER_GUEST',
    payload: unregister(guestId, chatId),
    meta: { guestId, chatId }
  }
}