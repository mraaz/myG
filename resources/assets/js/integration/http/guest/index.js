import axios from 'axios';
import logger from '../../../common/logger';

export function register(publicKey) {
  logger.log('GUEST', 'HTTP', `Registering Guest`);
  return axios.post(`/api/guest/`, { publicKey }).then(response => response.data);
}
