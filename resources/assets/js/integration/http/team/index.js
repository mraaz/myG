import axios from 'axios';
import logger from '../../../common/logger';

export function createTeam(payload) {
  logger.log('TEAM', 'HTTP', `Creating Team`, payload);
  return axios.post(`/api/team`, payload).then(response => response.data);
}

export function fetchTeams(filterByRequestingUser) {
  logger.log('TEAM', 'HTTP', `Fetching Teams`);
  return axios.get(`/api/team`, { params: { filterByRequestingUser } }).then(response => response.data);
}
