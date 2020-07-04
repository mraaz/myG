import { fetchContactsPaginated, fetchGroupsPaginated, fetchGamesPaginated, searchPaginated } from '../../integration/http/pagination'

export function fetchContactsPaginatedAction(page, status) {
  return {
    type: 'PAGINATED_CONTACTS',
    payload: fetchContactsPaginated(page, status),
  }
}

export function fetchGroupsPaginatedAction(page) {
  return {
    type: 'PAGINATED_GROUPS',
    payload: fetchGroupsPaginated(page),
  }
}

export function fetchGamesPaginatedAction(page) {
  return {
    type: 'PAGINATED_GAMES',
    payload: fetchGamesPaginated(page),
  }
}

export function searchPaginatedAction(page) {
  return {
    type: 'PAGINATED_SEARCH',
    payload: searchPaginated(page),
  }
}
