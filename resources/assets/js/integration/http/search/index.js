import axios from 'axios';
import logger from '../../../common/logger';

export function searchGamers(input, online) {
  logger.log('PROFILE', 'HTTP', `Searching Gamers for ${input} and online = ${online}`);
  return axios.get(`/api/search/gamers?query=${input}&online=${online}`).then(response => response.data);
}
