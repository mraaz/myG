import axios from 'axios';
import logger from '../../../common/logger';

export function fetchProfileInfo(alias) {
  logger.log('PROFILE', 'HTTP', `Fetching Profile Info`);
  return axios.get(`/api/profile/${alias}`).then(response => response.data);
}
