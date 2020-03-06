

import logger from '../../common/logger';

export default function reducer(state = {
  id: null,
  publicKey: null,
  privateKey: null,
}, action) {
  switch (action.type) {

    case "REGISTER_GUEST_FULFILLED": {
      logger.log('GUEST', `Redux -> Guest Registered: `, action.payload, action.meta);
      const { id } = action.payload;
      const { publicKey, privateKey } = action.meta;
      return {
        ...state,
        id,
        publicKey,
        privateKey,
      };
    }

    default: return state;

  }
}