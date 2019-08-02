import {appConstants} from '../redux/ActionTypes';

// Action Creator
export const appLoadedActionCreator = () => {
    return {type: appConstants.LOADED};
};

// Init state
const initState = {
    loading: true,
};

// Reducer
const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case appConstants.LOADED:
            return {...state, loading: false};
        default:
            return state;
    }
};

export default {initState, reducer};

