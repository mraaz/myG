

import logger from '../../common/logger';

export default function reducer(state = {
  guestId: null,
  chatId: null,
  publicKey: null,
  privateKey: null,
  chat: null,
}, action) {
  switch (action.type) {

    case "REGISTER_GUEST_FULFILLED": {
      logger.log('GUEST', `Redux -> Guest Registered: `, action.payload, action.meta);
      const { guest: { guestId }, chat, chat: { chatId } } = action.payload;
      const { publicKey, privateKey } = action.meta;
      return {
        ...state,
        guestId,
        chatId,
        publicKey,
        privateKey,
        chat,
      };
    }

    default: return state;

  }
}