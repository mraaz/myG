
import { generateKeys, encryptMessageToSend, encryptMessageToBackup, decryptMessageReceived, decryptMessageFromBackup } from '../../integration/encryption';

export function generateKeysAction(pin) {
  return {
      type: 'GENERATE_KEYS',
      payload: generateKeys(pin),
      meta: { pin }
  }
}