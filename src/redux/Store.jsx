import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import history from './History';
import {localStorageMiddleware} from './Middleware';
import preloadedState from './PreloadedState';
import createRootReducer from './Reducer';
import globalConfig from '../config';

const getMiddleware = () => {
    if (globalConfig.debug) {
        return applyMiddleware(localStorageMiddleware, createLogger())
    } else {
        return applyMiddleware(localStorageMiddleware);
    }
};

const enhancer = composeWithDevTools(getMiddleware());

export default createStore(
    createRootReducer(history),
    preloadedState,
    enhancer
);
