import {houseContants} from '../redux/ActionTypes';

// Action Creator
export const houseDataDoneActionCreator = (data) => {
    return {
        type: houseContants.DATA_DONE,
        data: data,
    };
};

export const houseSubDataDoneActionCreator = (subData) => {
    return {
        type: houseContants.SUB_DATA_DONE,
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
        case houseContants.DATA_DONE:
            return {
                ...state,
                data: action.data,
            };
        case houseContants.SUB_DATA_DONE:
            return {
                ...state,
                subData: action.subData,
            };
        default:
            return state;
    }
};

export default {initState, reducer};

