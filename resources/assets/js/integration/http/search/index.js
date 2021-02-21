import axios from 'axios';
import logger from '../../../common/logger';

export function searchGamers(input, online, from) {
  logger.log('PROFILE', 'HTTP', `Searching Gamers for ${input} and online = ${online} and from = ${from}`);
  return axios.get(`/api/search/gamers?query=${input}&online=${online}&from=${from}&size=${3}`).then(response => response.data);
}
