import axios from 'axios';

export function logToElasticsearch(type, context, message) {
  const environment = window.location.href.includes('localhost') ? 'development' 
    : window.location.href.includes('stage') ? 'staging' 
    : 'production';
  const source = 'frontend';
  return axios.post('/api/logging', {
    environment,
    type,
    source,
    context,
    message,
  }).then(response => response.data);
}
