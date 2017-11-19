import {combineReducers} from 'redux';
import SelectedCellReducer from './reducer_selected_cell';

const rootReducer = combineReducers({
    selectedCell : SelectedCellReducer
});

export default rootReducer;
