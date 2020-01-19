
import { editMessage } from '../integration/http/chat';
import { encryptMessage, decryptMessage } from '../integration/encryption';
import logger from './logger';

export function reEncryptMessages(messages, publicKey, privateKey) {
  logger.log('ENCRYPTION', `Re-Encrypting ${messages.length} messages.`);
  if (!messages.length) return;
  messages.slice(0).reverse().forEach(message => {
    const decrypted = decryptMessage(message.backup, privateKey);
    const encrypted = encryptMessage(decrypted, publicKey, privateKey);
    editMessage(message.chat_id, message.id, { content: encrypted, backup: message.backup }, true);
  });
}
