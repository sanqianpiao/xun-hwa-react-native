import * as types from '../actions/actionTypes';

const initialState = {
    galleries: [{
        pictures:[{title:'歌劇院的舞蹈教室 Dance Class at the Opera', year: '1872 年', material: '油彩．畫布 Oil on canvas', originalSize: '32 x 46 cm', url:{big: 'http://www.ss.net.tw/file/Degas001/file1.jpg'}}]
    }]
};

const viewGallery = (state, action) => {
    return state;
}

export default function handle(state = initialState, action = {}) {
    switch (action.type) {
        case types.VIEW_GALLERY:
            return viewGallery(state, action);
        default:
            return state;
    }
}
