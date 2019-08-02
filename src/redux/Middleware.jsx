import {userConstants} from './ActionTypes';

export const localStorageMiddleware = store => next => action => {
    if (action.type === userConstants.LOGIN_SUCCESS) {
        window.localStorage.setItem('jwt', action.token);
    } else if (action.type === userConstants.LOGOUT_SUCCESS) {
        window.localStorage.clear();
    }
    next(action);
};
