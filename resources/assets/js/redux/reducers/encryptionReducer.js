import logger from '../../common/logger'
import notifyToast from '../../common/toast'
import { storePublicKey, sendEncryptionEmail } from '../../integration/http/user'

const initialState = {
  userId: null,
  pin: null,
  publicKey: null,
  privateKey: null,
  invalidPin: false,
  persist: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_USER_INFO': {
      logger.log('USER', `Redux -> Loading User Info (Encryption): `, state, action.payload)
      const userId = action.payload.id
      if (state.userId && state.userId !== userId) return { ...initialState, userId }
      return {
        ...state,
        userId
      }
    }

    case 'PREPARE_MESSENGER_FULFILLED': {
      if (!action.payload.encryption) return state
      logger.log('USER', `Redux -> Messenger Ready (Encryption): `, state, action.payload)
      const { pin, publicKey, privateKey } = action.payload.encryption
      storePublicKey(publicKey)
      sendEncryptionEmail(publicKey, pin)
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false
      }
    }

    case 'GENERATE_KEYS_FULFILLED': {
      logger.log('USER', `Redux -> Keys Generated: `, action.payload)
      const { pin, publicKey, privateKey } = action.payload.encryption
      storePublicKey(publicKey)
      sendEncryptionEmail(publicKey, pin)
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false
      }
    }

    case 'VALIDATE_PIN_FULFILLED': {
      logger.log('USER', `Redux -> Validating Pin: ${action.meta.pin}`, action.payload)
      const { pin, publicKey, privateKey } = action.payload.encryption
      if (action.meta.publicKey !== publicKey) {
        notifyToast(`The Encryption Key you've entered is not valid.`)
        return state
      }
      storePublicKey(publicKey)
      return {
        ...state,
        pin,
        publicKey,
        privateKey,
        invalidPin: false
      }
    }

    case 'REGISTER_GUEST_FULFILLED': {
      logger.log('GUEST', `Redux -> Guest Registered (Encryption): `, action.payload, action.meta)
      const { publicKey, privateKey } = action.meta
      return {
        ...state,
        publicKey,
        privateKey
      }
    }

    case 'SET_ENCRYPTION_PIN': {
      logger.log('USER', `Redux -> Set Encryption Pin `, action.payload, action.meta)
      return {
        ...state,
        pin: action.payload.pin,
        persist: action.payload.persist
      }
    }

    case 'SET_PERSIST_ENCRYPTION': {
      logger.log('USER', `Redux -> Set Persist Encryption `, action.payload, action.meta)
      return {
        ...state,
        persist: action.payload
      }
    }

    case 'PUBLIC_KEY_UPDATED': {
      logger.log('USER', `Redux -> Public Key Updated (Encryption): `, action.payload, action.meta)
      const { userId: updatedUserId, publicKey } = action.payload
      if (updatedUserId !== state.userId) return state
      if (publicKey === state.publicKey) return state
      notifyToast(`Chat password changed! Please log in again.`)
      logger.log('USER', `Redux -> Key Changed Elsewhere, Logging Out...`)
      return {
        ...state,
        pin: null,
        privateKey: null,
        publicKey
      }
    }

    default:
      return state
  }
}
