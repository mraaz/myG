

import logger from '../../common/logger';
import notifyToast from '../../common/toast';
import { storePublicKey, sendEncryptionEmail } from '../../integration/http/user';

export default function reducer(state = {
  pin: null,
  publicKey: null,
  privateKey: null,
  invalidPin: false,
}, action) {
  switch (action.type) {

    case "PREPARE_MESSENGER_FULFILLED": {
      if (!action.payload.encryption) return state;
      logger.log('USER', `Redux -> Messenger Ready (Encryption): `, action.payload);
      const { pin, publicKey, privateKey } = action.payload.encryption;
      storePublicKey(publicKey);
      sendEncryptionEmail(publicKey, pin);
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false,
      };
    }

    case "GENERATE_KEYS_FULFILLED": {
      logger.log('USER', `Redux -> Keys Generated: `, action.payload);
      const { pin, publicKey, privateKey } = action.payload.encryption;
      storePublicKey(publicKey);
      sendEncryptionEmail(publicKey, pin);
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false,
      };
    }

    case "VALIDATE_PIN_FULFILLED": {
      logger.log('USER', `Redux -> Validating Pin: ${action.meta.pin}`, action.payload);
      const { pin, publicKey, privateKey } = action.payload.encryption;
      if (action.meta.publicKey !== publicKey) {
        notifyToast(`The Encryption Key you've entered is not valid.`);
        return state;
      }
      storePublicKey(publicKey);
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false,
      };
    }

    case "REGISTER_GUEST_FULFILLED": {
      logger.log('GUEST', `Redux -> Guest Registered (Encryption): `, action.payload, action.meta);
      const { publicKey, privateKey } = action.meta;
      return {
        ...state,
        publicKey,
        privateKey,
      };
    }

    default: return state;

  }
}