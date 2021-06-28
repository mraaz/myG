import axios from 'axios';
import logger from '../../../common/logger';

export function fetchRecents() {
  logger.log('PAGINATED', 'HTTP', `Fetching Recent Messages`);
  return axios.get('/api/user_chat/recent').then(response => response.data);
}

export function fetchContactsPaginated(page, status, gameId, search) {
  logger.log('PAGINATED', 'HTTP', `Fetching Contacts`);
  const request = `/api/chat/paginated/contact?${page !== undefined ? `&page=${page}` : ''}${status ? `&status=${status}` : ''}${gameId ? `&gameId=${gameId}` : ''}${search ? `&search=${search}` : ''}`;
  return axios.get(request).then(response => response.data);
}

export function fetchGroupsPaginated(page, gameId) {
  logger.log('PAGINATED', 'HTTP', `Fetching Groups`);
  const request = `/api/chat/paginated/groups?${page ? `&page=${page}` : ''}${gameId ? `&gameId=${gameId}` : ''}`;
  return axios.get(request).then(response => response.data);
}

export function fetchGamesPaginated(page) {
  logger.log('PAGINATED', 'HTTP', `Fetching Games`);
  return axios.get(`/api/chat/paginated/games?page=${page}`).then(response => response.data);
}

export function searchPaginated(page, search) {
  logger.log('PAGINATED', 'HTTP', `Searching for ${search}`);
  return axios.get(`/api/chat/paginated/search?page=${page}&search=${search}`).then(response => response.data);
}