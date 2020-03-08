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

export function fetchLink(uuid) {
  logger.log('GUEST', 'HTTP', `Fetching Link ${uuid}`);
  return axios.get(`/api/guest/link/${uuid}`).then(response => response.data);
}

export function sendMessage(chatId, guestId, senderName, encryptedContent) {
  logger.log('GUEST', 'HTTP', `Sending Message from GUEST ${guestId} to Chat ${chatId}`);
  return axios.post(`/api/guest/${guestId}/chat/${chatId}`, { encryptedContent, senderName }).then(response => response.data);
}
