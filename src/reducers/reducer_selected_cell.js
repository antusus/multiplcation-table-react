import {SELECT_CELL} from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case SELECT_CELL:
            return action.payload;
        default:
            return state;
    }
};