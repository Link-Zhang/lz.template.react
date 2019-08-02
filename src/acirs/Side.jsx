import {sideConstants} from '../redux/ActionTypes';

// Action Creator
export const sideCollapseActionCreator = () => {
    return {type: sideConstants.COLLAPSE};
};

// Init state
const initState = {
    collapse: false,
};

// Reducer
const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case sideConstants.COLLAPSE:
            return {...state, collapse: !state.collapse};
        default:
            return state;
    }
};

export default {initState, reducer};

