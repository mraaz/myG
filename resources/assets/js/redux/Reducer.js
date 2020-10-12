import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import alert from './reducers/alertReducer'
import chat from './reducers/chatReducer'
import user from './reducers/userReducer'
import guest from './reducers/guestReducer'
import game from './reducers/gameReducer'
import pagination from './reducers/paginationReducer'
import encryption from './reducers/encryptionReducer'
import socket from './reducers/socketReducer'
import profile from './reducers/profileReducer'
import search from './reducers/searchReducer'

const appReducer = combineReducers({
  alert,
  user,
  chat,
  guest,
  game,
  pagination,
  encryption,
  socket,
  profile,
  search,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') state = undefined
  return appReducer(state, action)
}

export default persistReducer(
  {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'guest', 'chat', 'encryption'],
  },
  rootReducer
)
