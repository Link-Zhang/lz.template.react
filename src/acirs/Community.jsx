import {communityConstants} from '../redux/ActionTypes';

// Action Creator
export const communityDataDoneActionCreator = (data) => {
    return {
        type: communityConstants.DATA_DONE,
        data: data,
    };
};

export const communitySubDataDoneActionCreator = (subData) => {
    return {
        type: communityConstants.SUB_DATA_DONE,
        subData: subData,
    }
};

// Init state
const initState = {
    data: [{}],
    subData: [{}],
};

// Reducer
const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case communityConstants.DATA_DONE:
            return {
                ...state,
                data: action.data,
            };

        case communityConstants.SUB_DATA_DONE:
            return {
                ...state,
                subData: action.subData,
            };
        default:
            return state;
    }
};

export default {initState, reducer};

