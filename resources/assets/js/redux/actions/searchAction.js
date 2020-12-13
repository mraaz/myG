import { searchGamers } from '../../integration/http/search'

export function searchGamersAction(input, online) {
  return {
    type: 'SEARCH_GAMERS',
    payload: searchGamers(input, online),
    meta: { input, online },
  }
}
