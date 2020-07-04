import axios from 'axios';
import logger from '../../../common/logger';

export function fetchContactsPaginated(page, status, gameId) {
  logger.log('PAGINATED', 'HTTP', `Fetching Contacts`);
  const request = `/api/chat/paginated/contact?${page ? `&page=${page}` : ''}${status ? `&status=${status}` : ''}${gameId ? `&gameId=${gameId}` : ''}`;
  return axios.get(request).then(response => response.data);
}

export function fetchGroupsPaginated(page, gameId) {
  logger.log('PAGINATED', 'HTTP', `Fetching Groups`);
  const request = `/api/chat/paginated/contact?${page ? `&page=${page}` : ''}${gameId ? `&gameId=${gameId}` : ''}`;
  return axios.get(request).then(response => response.data);
}

export function fetchGamesPaginated(page) {
  logger.log('PAGINATED', 'HTTP', `Fetching Games`);
  return axios.get(`/api/chat/paginated/games?page=${page}`).then(response => response.data);
}

export function searchPaginated(page, search) {
  logger.log('PAGINATED', 'HTTP', `Searching for ${chatId}`);
  return axios.get(`/api/chat/paginated/search?page=${page}&search=${search}`).then(response => response.data);
}