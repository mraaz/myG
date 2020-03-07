import axios from 'axios';
import logger from '../../../common/logger';

export function register(publicKey, chatId) {
  logger.log('GUEST', 'HTTP', `Registering Guest in Chat ${chatId}`);
  return axios.post(`/api/guest/`, { publicKey, chatId }).then(response => response.data);
}

export function unregister(guestId, chatId) {
  logger.log('GUEST', 'HTTP', `Unregistering Guest ${guestId} from Chat ${chatId}`);
  return axios.delete(`/api/guest/${guestId}/chat/${chatId}`).then(response => response.data);
}
