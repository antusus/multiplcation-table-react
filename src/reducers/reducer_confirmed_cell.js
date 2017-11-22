import {CONFIRMED_CELL} from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case CONFIRMED_CELL: {
            const oldConfirmedRow = state.row;
            const oldConfirmedCol = state.column;
            const newConfirmedRow = action.payload.row;
            const newConfirmedCol = action.payload.column;
            return oldConfirmedCol === newConfirmedCol && oldConfirmedRow === newConfirmedRow? {} : action.payload;
        }
        default:
            return state;
    }
};