import * as types from '../actions/actionTypes';

const initialState = {
    list: [
        {id: 1, title: '都市印象 - 窦加', url: 'http://localhost:8080/%E8%92%8B%E5%8B%8B%20-%20%E9%83%BD%E5%B8%82.%E5%8D%B0%E8%B1%A1-%E7%AA%A6%E5%8A%A0.mp3', status: {favourite: true, played: true}},
        {id: 2, title: '都市印象 - 寂寞都会', url: 'http://localhost:8080/%E8%92%8B%E5%8B%8B%20-%20%E9%83%BD%E5%B8%82.%E5%8D%B0%E8%B1%A1-%E5%AF%82%E5%AF%9E%E9%83%BD%E4%BC%9A.mp3', status: {favourite: false, played: false}},
        {id: 3, title: '都市印象 - 城市生活描绘', url: 'http://localhost:8080/%E8%92%8B%E5%8B%8B%20-%20%E9%83%BD%E5%B8%82.%E5%8D%B0%E8%B1%A1-%E5%9F%8E%E5%B8%82%E7%94%9F%E6%B4%BB%E6%8F%8F%E7%BB%98.mp3', status: {favourite: false, played: false}},
        {id: 4, title: '都市印象 - 雷诺瓦', url: 'http://localhost:8080/%E8%92%8B%E5%8B%8B%20-%20%E9%83%BD%E5%B8%82.%E5%8D%B0%E8%B1%A1-%E9%9B%B7%E8%AF%BA%E7%93%A6.mp3', status: {favourite: false, played: false}},
    ],
    playing: {id: 2, title: '都市印象 - 寂寞都会', url: 'http://localhost:8080/%E8%92%8B%E5%8B%8B%20-%20%E9%83%BD%E5%B8%82.%E5%8D%B0%E8%B1%A1-%E5%AF%82%E5%AF%9E%E9%83%BD%E4%BC%9A.mp3', status: {favourite: false, played: false}},
};

const favourite = (state, action) => {
    let _state = {...state};
    for(let [idx, row] of _state.list.entries()) {
        if(row.id === action.id) {
            row.status.favourite = !row.status.favourite;
            break;
        }
    }
    return _state;
}

const played = (state, action) => {
    let _state = {...state};
    for(let [idx, row] of _state.list.entries()) {
        if(row.id == action.id) {
            row.status.played = true;
            break;
        }
    }
    return _state;
}

const play = (state, action) => {
    return {
        ...state,
        playing: action.playing
    }
}

export default function handle(state = initialState, action = {}) {
    switch (action.type) {
        case types.PLAY:
            return play(state, action);
        case types.FAVOURITE:
            return favourite(state, action);
        case types.PLAYED:
            return played(state, action);
        default:
            return state;
    }
}
