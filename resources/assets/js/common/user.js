import { store } from '../redux/Store'
import { loadUserInfoAction, selectLanguageAction } from '../redux/actions/userAction'

export function loadUserInfoToReduxStore(userInfo) {
  store.dispatch(loadUserInfoAction(userInfo))
}

export function selectLanguage(language) {
  store.dispatch(selectLanguageAction(language))
}
