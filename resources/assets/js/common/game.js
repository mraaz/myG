import axios from 'axios'
import get from 'lodash.get'
import { store } from '../redux/Store'
import { fetchGamesAction } from '../redux/actions/chatAction'

export function refreshGames() {
  store.dispatch(fetchGamesAction(store.getState().user.userId))
}

export function fetchGameInfo(id) {
  if (!id) return Promise.resolve({})
  return axios.get(`/api/ScheduleGame/getHeader_ALL/${id}`).then((response) => get(response, 'data.additional_info_data', {}))
}
