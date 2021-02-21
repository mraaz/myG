import { searchGamers } from '../../integration/http/search'

export function searchGamersAction(input, online, from) {
  return {
    type: 'SEARCH_GAMERS',
    payload: searchGamers(input, online, from),
    meta: { input, online, from },
  }
}
