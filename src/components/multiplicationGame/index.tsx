import './multiplicationGame.css';
import {useMultiplicationTableContext} from '../../providers/MultiplicationTableStateProvider';
import {ChangeEvent, useState} from 'react';

export default function MultiplicationGame() {
    const context = useMultiplicationTableContext();
    const [answer, setAnswer] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setAnswer(e.target.value);
    }

    if (context.gameStarted) {
        return (
            <form>
                <div className={'multiplicationTable'}>
                    <label className={'question'}>1 * 2 = </label>
                    <input
                        type='number'
                        autoComplete={'off'}
                        id={'answer'}
                        onChange={handleChange}
                        value={answer}
                        autoFocus={true}
                    />
                </div>
            </form>
        );
    } else {
        return null;
    }
}