

import logger from '../../common/logger';
import { storePublicKey } from '../../integration/http/encryption';

export default function reducer(state = {
  pin: null,
  publicKey: null,
  privateKey: null,
}, action) {
  switch (action.type) {

    case "GENERATE_KEYS": {
      logger.log('ENCRYPTION', `Redux -> Keys Generated: `, action.payload);
      storePublicKey(action.payload.publicKey);
      return {
        ...state,
        pin: action.payload.pin,
        publicKey: action.payload.publicKey,
        privateKey: action.payload.privateKey,
      };
    }

    default: return state;

  }
}