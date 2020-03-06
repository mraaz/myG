
import { generateKeysSync } from '../../integration/encryption';
import { register } from '../../integration/http/guest';

export function registerGuestAction() {
  const { encryption: { publicKey, privateKey } } = generateKeysSync();
  return {
    type: 'REGISTER_GUEST',
    payload: register(publicKey),
    meta: { publicKey, privateKey }
  }
}