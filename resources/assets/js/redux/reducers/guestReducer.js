import logger from '../../common/logger'

const initialState = {
  guestId: null,
  chatId: null,
  publicKey: null,
  privateKey: null,
  chat: null,
  kicked: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'REGISTER_GUEST_FULFILLED': {
      logger.log('GUEST', `Redux -> Guest Registered: `, action.payload, action.meta)
      const {
        guest: { guestId },
        chat,
        chat: { chatId }
      } = action.payload
      const { publicKey, privateKey } = action.meta
      return {
        ...state,
        guestId,
        chatId,
        publicKey,
        privateKey,
        chat
      }
    }

    case 'ON_GUEST_LEFT': {
      logger.log('GUEST', `Redux -> Kicked from Group: `, action.payload, action.meta)
      const { guestId } = action.payload
      if (parseInt(guestId) !== parseInt(state.guestId)) return state
      return {
        guestId: null,
        chatId: null,
        publicKey: null,
        privateKey: null,
        chat: null,
        kicked: true
      }
    }

    default:
      return state
  }
}
