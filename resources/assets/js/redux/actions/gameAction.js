import { searchGame } from '../../integration/http/game'

export function searchGameAction(name) {
  return {
    type: 'SEARCH_GAME',
    payload: searchGame(name),
    meta: { name },
  }
}
