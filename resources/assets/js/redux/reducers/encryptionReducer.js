

import logger from '../../common/logger';
import { storePublicKey } from '../../integration/http/user';

export default function reducer(state = {
  pin: null,
  publicKey: null,
  privateKey: null,
  invalidPin: false,
}, action) {
  switch (action.type) {

    case "GENERATE_KEYS": {
      logger.log('USER', `Redux -> Keys Generated: `, action.payload);
      storePublicKey(action.payload.publicKey);
      return {
        ...state,
        pin: action.payload.pin,
        publicKey: action.payload.publicKey,
        privateKey: action.payload.privateKey,
        invalidPin: false,
      };
    }

    case "VALIDATE_PIN": {
      logger.log('USER', `Redux -> Validating Pin: ${action.meta.pin}`, action.payload);
      if (action.meta.publicKey !== action.payload.publicKey) return { ...state, invalidPin: true }
      storePublicKey(action.payload.publicKey);
      return {
        ...state,
        pin: action.payload.pin,
        publicKey: action.payload.publicKey,
        privateKey: action.payload.privateKey,
        invalidPin: false,
      };
    }

    default: return state;

  }
}