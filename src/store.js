import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import invariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import * as reducers from './reducers'

export const configureStore = (initialState) => {
    const enhancer = (__DEV__ === true)
        ? composeWithDevTools({ realtime: true, port: 3001 })(applyMiddleware(invariant(), createLogger(), thunk))
        : applyMiddleware(thunk)

    console.log(reducers, Object.assign(reducers));
    return createStore(combineReducers(reducers), initialState, enhancer);
}
