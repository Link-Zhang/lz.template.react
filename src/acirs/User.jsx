import {userConstants} from "../redux/ActionTypes";

// Action Creator
export const loginSuccessActionCreator = (username, token) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        username: username,
        token: token,
    };
};

export const logoutSuccessActionCreator = () => {
    return {
        type: userConstants.LOGOUT_SUCCESS
    };
};

// Init state
const initState = {
    authorization: false,
    username: '未登录',
    token: null,
};

// Reducer
const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case  userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                authorization: true,
                username: action.username,
                token: action.token,
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                authorization: false,
                username: initState.username,
                token: initState.token,
            };
        default:
            return state;
    }
};

export default {initState, reducer};
