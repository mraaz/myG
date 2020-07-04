import { fetchContactsPaginated, fetchGroupsPaginated, fetchGamesPaginated, searchPaginated } from '../../integration/http/pagination'

export function fetchContactsPaginatedAction(page, status, gameId) {
  return {
    type: 'PAGINATED_CONTACTS',
    payload: fetchContactsPaginated(page, status, gameId),
  }
}

export function fetchGroupsPaginatedAction(page, gameId) {
  return {
    type: 'PAGINATED_GROUPS',
    payload: fetchGroupsPaginated(page, gameId),
  }
}

export function fetchGamesPaginatedAction(page) {
  return {
    type: 'PAGINATED_GAMES',
    payload: fetchGamesPaginated(page),
  }
}

export function searchPaginatedAction(page, search) {
  return {
    type: 'PAGINATED_SEARCH',
    payload: searchPaginated(page, search),
  }
}
