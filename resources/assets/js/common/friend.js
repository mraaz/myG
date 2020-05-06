import { store } from "../redux/Store";
import { setAsFriendAction } from "../redux/actions/userAction";

export function setAsFriendRedux(friendId) {
  store.dispatch(setAsFriendAction(friendId));
}