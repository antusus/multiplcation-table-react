import {useContext} from 'react';
import './numbersSelector.css';
import {MultiplicationTableActionsContext, SelectedNumbersContext} from '../../contexts/MultiplicationTableContexts';

export default function NumbersSelector() {
    const selectedNumbers = useContext(SelectedNumbersContext)
    const dispatch = useContext(MultiplicationTableActionsContext);

    function onNumberSelect(number: number) {
        if (selectedNumbers.includes(number)) {
            dispatch({type: 'remove', payload: number});
        } else {
            dispatch({type: 'add', payload: number});
        }
    }

    function clearSelectedNumbers() {
        dispatch({type: 'clear', payload: 0});
    }

    return (
        <div className={'numbersContainer'}>
            {[...Array(9)].map((_, i) => (
                <div key={`number_${i + 1}`}
                     className={`number ${selectedNumbers.includes(i + 1) ? 'selected' : ''}`}
                     onClick={() => onNumberSelect(i + 1)}>
                    {i + 1}
                </div>
            ))}
            <button id={'clearButton'} onClick={clearSelectedNumbers}>Wyczyść</button>
        </div>
    );
}