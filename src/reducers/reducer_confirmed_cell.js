import {CONFIRMED_CELL} from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case CONFIRMED_CELL: {
            console.log('confirmed', action);
            return action.payload;
        } default:
            return state;
    }
};