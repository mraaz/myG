import axios from 'axios';
import logger from '../../../common/logger';

export function searchGamers(input) {
  logger.log('PROFILE', 'HTTP', `Searching Gamers for ${input}`);
  return axios.get(`/api/search/gamers?query=${input}`).then(response => response.data);
}
