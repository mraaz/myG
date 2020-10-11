import { searchGamers } from '../../integration/http/search'

export function searchGamersAction(input) {
  return {
    type: 'SEARCH_GAMERS',
    payload: searchGamers(input),
    meta: { input },
  }
}
