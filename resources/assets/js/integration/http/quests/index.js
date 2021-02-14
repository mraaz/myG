import axios from 'axios';
import logger from '../../../common/logger';

export function fetchDailyQuests() {
  logger.log('USER', 'HTTP', `Requesting Daily Quests`);
  return axios.get(`/api/achievements/daily`).then((response) => response.data);
}

export function fetchWeeklyQuests() {
  logger.log('USER', 'HTTP', `Requesting Weekly Quests`);
  return axios.get(`/api/achievements/weekly`).then((response) => response.data);
}

export function fetchMonthlyQuests() {
  logger.log('USER', 'HTTP', `Requesting Monthly Quests`);
  return axios.get(`/api/achievements/monthly`).then((response) => response.data);
}

export function registerSponsorClick() {
  logger.log('USER', 'HTTP', `Registering Sponsor Click`);
  return axios.post(`/api/achievements/registerSponsorClick`).then((response) => response.data);
}

export function registerAccess() {
  logger.log('USER', 'HTTP', `Registering Access`);
  return axios.post(`/api/achievements/registerAccess`).then((response) => response.data);
}
