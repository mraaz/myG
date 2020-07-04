import axios from 'axios';
import logger from '../../../common/logger';

export function fetchContactsPaginated(page, status) {
  logger.log('PAGINATED', 'HTTP', `Fetching Contacts`);
  return axios.get(`/api/chat/paginated?page=${page}&status=${status}`).then(response => response.data);
}

export function fetchGroupsPaginated(page) {
  logger.log('PAGINATED', 'HTTP', `Fetching Groups`);
  return axios.get(`/api/chat/paginated?page=${page}`).then(response => response.data);
}

export function fetchGamesPaginated(page) {
  logger.log('PAGINATED', 'HTTP', `Fetching Games`);
  return axios.get(`/api/chat/paginated?page=${page}`).then(response => response.data);
}

export function searchPaginated(page, search) {
  logger.log('PAGINATED', 'HTTP', `Searching for ${chatId}`);
  return axios.get(`/api/chat/paginated?page=${page}`).then(response => response.data);
}