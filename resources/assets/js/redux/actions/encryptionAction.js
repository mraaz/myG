import { generateKeys } from '../../integration/encryption'

export function generateKeysAction(pin) {
  return {
    type: 'GENERATE_KEYS',
    payload: generateKeys(pin),
    meta: { pin },
  }
}

export function validatePinAction(pin, publicKey) {
  return {
    type: 'VALIDATE_PIN',
    payload: generateKeys(pin),
    meta: { pin, publicKey },
  }
}

export function setEncryptionPinAction(pin, persist) {
  return {
    type: 'SET_ENCRYPTION_PIN',
    payload: { pin, persist },
  }
}

export function togglePersistEncryptionAction(persist) {
  return {
    type: 'SET_PERSIST_ENCRYPTION',
    payload: persist,
  }
}
