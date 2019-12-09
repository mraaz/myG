import axios from 'axios';

export function fetchFriends() {
  return axios.get(`/api/friends/allmyFriends`).then(response => ({ friends: response.data.showallMyFriends }));
}