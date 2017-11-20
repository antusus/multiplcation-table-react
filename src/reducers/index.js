import {combineReducers} from 'redux';
import SelectedCellReducer from './reducer_selected_cell';
import ConfirmedCellReducer from './reducer_confirmed_cell';

const rootReducer = combineReducers({
    selectedCell : SelectedCellReducer,
    confirmedCell : ConfirmedCellReducer
});

export default rootReducer;
