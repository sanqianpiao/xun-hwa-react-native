import * as types from '../actions/actionTypes';

const initialState = {
    currentScreen: 'startup'
};

export default function change(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHANGE_SCREEN:
            var _state = {
                currentScreen: action.screenName
            }
            if(!!action.story) {
                _state.story = action.story
            }
            return _state;
        default:
            return state;
    }
}
