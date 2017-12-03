import {combineReducers} from 'redux';
import SelectedCellReducer from './reducer_selected_cell';
import ConfirmedCellReducer from './reducer_confirmed_cell';
import GameReducer from './reducer_game';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    selectedCell: SelectedCellReducer,
    confirmedCell: ConfirmedCellReducer,
    router : routerReducer,
    game : GameReducer
});

export default rootReducer;
