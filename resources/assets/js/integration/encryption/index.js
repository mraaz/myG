
import cryptico from 'cryptico';

export function generateKeys(pin) {
  if (!pin) pin = generatePin(12);
  const privateKey = cryptico.generateRSAKey(pin, 1024);
  const publicKey = cryptico.publicKeyString(privateKey);
  return { pin, privateKey, publicKey };
}

export function encryptMessageToSend(senderPrivateKey, receiverPublicKey, message) {
  return cryptico.encrypt(cryptico.encrypt(message, senderPrivateKey).cipher, receiverPublicKey).cipher;
}

export function decryptMessageReceived(senderPublicKey, receiverPrivateKey, message) {
  return cryptico.decrypt(cryptico.decrypt(message, receiverPrivateKey).plaintext, senderPublicKey).plaintext;
}

export function encryptMessageToBackup(senderPublicKey, message) {
  return cryptico.encrypt(message, senderPublicKey).cipher;
}

export function decryptMessageFromBackup(senderPrivateKey, message) {
  return cryptico.decrypt(message, senderPrivateKey).plaintext;
}

function generatePin(length) {
  const getInt = () => Math.floor(Math.random() * 10);
  const getChar = () => (Math.random().toString(36)+'00000000000000000').slice(2, 3);
  const isLower = () => Math.random() >= 0.5;
  const isInt = () => Math.random() >= 0.8;
  const getPin = () => isInt() ? getInt() : isLower() ? getChar() : getChar().toUpperCase();
  return [...Array(length)].map(() => getPin()).reduce((prv, cur) => prv + cur, '');
}