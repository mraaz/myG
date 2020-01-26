
import cryptico from 'cryptico';
import logger from '../../common/logger';

export function generateKeys(pin) {
  logger.log('USER', 'Generating Keys for Pin', pin);
  if (!pin) pin = generatePin(12);
  const privateKey = cryptico.generateRSAKey(pin, 1024);
  const publicKey = cryptico.publicKeyString(privateKey);
  return { pin, privateKey, publicKey };
}

export function encryptMessage(message, publicKey, privateKey) {
  if (!message || !publicKey || !privateKey) return null;
  return cryptico.encrypt(message, publicKey, privateKey).cipher;
}

export function decryptMessage(message, privateKey) {
  if (!message || !privateKey) return null;
  return cryptico.decrypt(message, privateKey).plaintext;
}

function generatePin(length) {
  const getInt = () => Math.floor(Math.random() * 10);
  const getChar = () => (Math.random().toString(36)+'00000000000000000').slice(2, 3);
  const isLower = () => Math.random() >= 0.5;
  const isInt = () => Math.random() >= 0.8;
  const getPin = () => isInt() ? getInt() : isLower() ? getChar() : getChar().toUpperCase();
  return [...Array(length)].map(() => getPin()).reduce((prv, cur) => prv + cur, '');
}