import { updateStatus, fetchStatus } from '../../integration/http/user';

export function logoutAction() {
    return {
        type: 'USER_LOGOUT'
    }
}

export function fetchStatusAction() {
    return {
        type: 'FETCH_STATUS',
        payload: fetchStatus(),
    }
}

export function updateStatusAction(status, forceStatus) {
    return {
        type: 'UPDATE_STATUS',
        payload: updateStatus(status, forceStatus),
    }
}

export function onUpdateStatusAction(status, isStatusLocked) {
    return {
        type: 'ON_UPDATE_STATUS',
        payload: { status, isStatusLocked },
    }
}