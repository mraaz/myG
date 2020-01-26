
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import chat from './reducers/chatReducer';
import user from './reducers/userReducer';
import encryption from './reducers/encryptionReducer';
import socket from './reducers/socketReducer';

const appReducer = combineReducers({
    user,
    chat,
    encryption,
    socket,
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') state = undefined;
    return appReducer(state, action);
}

export default persistReducer({
    key: 'root',
    storage: storage,
    whitelist: ['user', 'chat', 'encryption']
}, rootReducer);
