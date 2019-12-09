
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import chat from './reducers/chatReducer';
import friend from './reducers/friendReducer';

const appReducer = combineReducers({
    chat,
    friend,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default persistReducer({
    key: 'root',
    storage: storage,
    whitelist: []
}, rootReducer);
