import {LOCATION_CHANGE} from 'react-router-redux';
import {CONFIRMED_CELL, CLEAR_CONFIRMED_CELL} from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case CONFIRMED_CELL: {
            return action.payload;
        }
        case CLEAR_CONFIRMED_CELL : {
            return {};
        }
        case LOCATION_CHANGE: {
            return action.payload.pathname === '/' ? {} : state;
        }
        default:
            return state;
    }
};