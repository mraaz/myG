import axios from 'axios';
import logger from '../../../common/logger';

export function fetchStatus() {
  logger.log('USER', 'HTTP', `Fetching Status`);
  return axios.get(`/api/user/status`).then((response => response.data));
}

export function updateStatus(status, forceStatus) {
  logger.log('USER', 'HTTP', `${forceStatus ? 'Forcing' : 'Setting'} Status ${status}`);
  return axios.put(`/api/user/status`, { status, forceStatus }).then((response => response.data));
}