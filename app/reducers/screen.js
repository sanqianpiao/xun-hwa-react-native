import * as types from '../actions/actionTypes';

const initialState = {
    currentScreen: 'startup'
};

export default function change(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHANGE_SCREEN:
        return {
            ...state,
            currentScreen: action.screenName
        };
        default:
            return state;
    }
}
