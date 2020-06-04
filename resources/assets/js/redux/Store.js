import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import promise from 'redux-promise-middleware'
import reducer from './Reducer'

const middleware = applyMiddleware(promise)
export const store = createStore(reducer, middleware)
export const persistor = persistStore(store)
