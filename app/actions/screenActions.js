import * as types from './actionTypes';

export function change(screenName = 'home') {
  return {
    type: types.CHANGE_SCREEN,
    screenName: screenName
  };
}

export function home() {
    return {
        type: types.CHANGE_SCREEN,
        screenName: 'home'
    }
}
