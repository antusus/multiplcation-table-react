import './numbersSelector.css';
import {
    useMultiplicationTableActionsContext,
    useMultiplicationTableContext
} from "../../providers/MultiplicationTableStateProvider";

export default function NumbersSelector() {
    const context = useMultiplicationTableContext();
    const dispatch = useMultiplicationTableActionsContext();

    function onNumberSelect(number: number) {
        if (context.selectedNumbers.includes(number)) {
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
            {[...Array(10)].map((_, i) => (
                <div key={`number_${i + 1}`}
                     className={`number ${context.selectedNumbers.includes(i + 1) ? 'selected' : ''}`}
                     onClick={() => onNumberSelect(i + 1)}>
                    {i + 1}
                </div>
            ))}
            <button id={'clearButton'} onClick={clearSelectedNumbers}>Wyczyść</button>
        </div>
    );
}