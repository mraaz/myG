
import { store } from '../redux/Store';
import { loadUserInfoAction } from '../redux/actions/userAction';

export function loadUserInfoToReduxStore(userInfo) {
  store.dispatch(loadUserInfoAction(userInfo));
}