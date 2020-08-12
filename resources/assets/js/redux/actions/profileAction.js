import { fetchProfileInfo } from '../../integration/http/profile'

export function fetchProfileInfoAction(alias) {
  return {
    type: 'FETCH_PROFILE_INFO',
    payload: fetchProfileInfo(alias),
    meta: { alias },
  }
}
