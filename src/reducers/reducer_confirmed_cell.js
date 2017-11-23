import {CONFIRMED_CELL, CLEAR_CONFIRMED_CELL} from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case CONFIRMED_CELL: {
            return action.payload;
        }
        case CLEAR_CONFIRMED_CELL : {
            return {};
        }
        default:
            return state;
    }
};