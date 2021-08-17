import axios from 'axios';

export function createShortLink(link) {
  return axios.post('/api/short_link', { link }).then((response) => `${window.location.origin}/s/${response.data.code}`);
}

export function fetchShortLink(code) {
  return axios.get('/api/short_link', { params: { code } }).then((response) => response.data.link);
}
