import { fetchFriends } from '../../integration/http/friend';

export function fetchFriendsAction() {
    return {
        type: 'FETCH_FRIENDS',
        payload: fetchFriends()
    }
}