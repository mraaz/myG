
import cryptico, { RSAKey } from 'cryptico';
import logger from '../../common/logger';

export function prepareEncryption(pin, privateKey, publicKey) {
  privateKey = deserializeKey(privateKey)
  if (!privateKey && !pin && publicKey) return Promise.resolve({});
  if (privateKey) return Promise.resolve({ encryption: { pin, privateKey, publicKey: getPublicKey(privateKey) } })
  return generateKeys(pin)
}

export function generateKeys(pin) {
  return new Promise(resolve => {
    setTimeout(() => resolve(generateKeysSync(pin)));
  });
}

export function generateKeysSync(pin) {
  logger.log('USER', 'Generating Keys for Pin', pin);
  if (!pin) pin = generatePin(7);
  const privateKey = cryptico.generateRSAKey(pin, 1024);
  const publicKey = cryptico.publicKeyString(privateKey);
  return { encryption: { pin, privateKey, publicKey } };
}

export function getPublicKey(privateKey) {
  return cryptico.publicKeyString(privateKey);
}

export function deserializeKey(key) {
  if (!key) return null;
  if (key instanceof RSAKey) return key;
  const rsaKey = new RSAKey();
  rsaKey.setPrivateEx(key.n, key.e, key.d, key.p, key.q, key.dmp1, key.dmq1, key.coeff);
  return rsaKey;
}

export function encryptMessage(message, publicKey, privateKey) {
  if (!message || !publicKey || !privateKey) return null;
  if (!privateKey.decrypt) privateKey = deserializeKey(privateKey);
  return cryptico.encrypt(message, publicKey, privateKey).cipher;
}

export function decryptMessage(message, privateKey) {
  if (!message || !privateKey) return null;
  if (!privateKey.decrypt) privateKey = deserializeKey(privateKey);
  return cryptico.decrypt(message, privateKey).plaintext;
}

function generatePin(length) {
  const getInt = () => Math.floor(Math.random() * 10);
  const getChar = () => (Math.random().toString(36) + '00000000000000000').slice(2, 3);
  const isLower = () => Math.random() >= 0.5;
  const isInt = () => Math.random() >= 0.8;
  const getPin = () => isInt() ? getInt() : isLower() ? getChar() : getChar().toUpperCase();
  return [...Array(length)].map(() => getPin()).reduce((prv, cur) => prv + cur, '');
}