
import axios from 'axios';
import logger from '../../../common/logger';

export function searchGame(name) {
  logger.log('GAME', 'HTTP', `Searching Game ${name}`);
  return axios.get(`/api/game?name=${name}`).then(response => response.data);
}
