import {
  fetchRecents,
  fetchContactsPaginated,
  fetchGroupsPaginated,
  fetchGamesPaginated,
  searchPaginated
} from '../../integration/http/pagination'

export function fetchRecentsAction() {
  return {
    type: 'RECENTS',
    payload: fetchRecents()
  }
}

export function fetchContactsPaginatedAction(page, status, gameId, search, refresh) {
  return {
    type: 'PAGINATED_CONTACTS',
    payload: fetchContactsPaginated(page, status, gameId, search),
    meta: { status, refresh }
  }
}

export function fetchGroupsPaginatedAction(page, gameId, refresh) {
  return {
    type: 'PAGINATED_GROUPS',
    payload: fetchGroupsPaginated(page, gameId),
    meta: { refresh }
  }
}

export function fetchGamesPaginatedAction(page, refresh) {
  return {
    type: 'PAGINATED_GAMES',
    payload: fetchGamesPaginated(page),
    meta: { refresh }
  }
}

export function searchPaginatedAction(page, search, refresh) {
  return {
    type: 'PAGINATED_SEARCH',
    payload: searchPaginated(page, search),
    meta: { refresh }
  }
}
