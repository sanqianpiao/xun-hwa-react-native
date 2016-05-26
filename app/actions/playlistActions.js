import * as types from './actionTypes';

export function favourite(id) {
  return {
    type: types.FAVOURITE,
    id: id
  };
}

export function play(playing) {
    return {
        type: types.PLAY,
        playing: playing
    }
}

export function played(id) {
    return {
        type: types.PLAYED,
        id: id
    }
}
