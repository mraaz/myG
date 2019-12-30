import axios from 'axios';
import logger from '../../../common/logger';

export function updateStatus(status, forceStatus) {
  logger.log('USER', 'HTTP', `${forceStatus ? 'Forcing' : 'Setting'} Status ${status}`);
  return axios.put(`/api/user/status`, { status, forceStatus }).then((response => ({ status: response.data.status })));
}