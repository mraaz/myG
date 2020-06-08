import { store } from '../redux/Store'
import { fetchGamesAction } from '../redux/actions/chatAction'

export function refreshGames() {
  store.dispatch(fetchGamesAction(store.getState().user.userId))
}
