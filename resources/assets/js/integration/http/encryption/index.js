import axios from 'axios';
import logger from '../../../common/logger';

export function storePublicKey(publicKey) {
  logger.log('ENCRYPTION', 'HTTP', `Storing Public Key`);
  return axios.put(`/api/user/publicKey`, { publicKey });
}