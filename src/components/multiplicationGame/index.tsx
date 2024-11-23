import './multiplicationGame.css';
import {
    GameState,
    useMultiplicationTableActionsContext,
    useMultiplicationTableContext
} from '../../providers/MultiplicationTableStateProvider';
import {ChangeEvent, FormEvent, useState} from 'react';
import AnsweredQuestions from "../answeredQuestions";

export default function MultiplicationGame() {
    const context = useMultiplicationTableContext();
    const dispatch = useMultiplicationTableActionsContext();
    const [answer, setAnswer] = useState('');
    const questions = context.questions;
    const currentQuestionIndex = context.currentQuestionIndex;

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setAnswer(e.target.value);
    }

    function handleSumitAnswer(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch({
            type: 'answer',
            payload: parseInt(answer)
        })
        setAnswer('');
    }

    if (context.gameState && context.gameState === GameState.InProgress && questions.length > 0 && Number.isInteger(currentQuestionIndex)) {
        const question = questions[currentQuestionIndex!];
        return (
            <div className={'multiplicationTable'}>
                <form onSubmit={handleSumitAnswer}>
                    <label className={'question'}>{question.factorOne} * {question.factorTwo} = </label>
                    <input
                        type='number'
                        autoComplete={'off'}
                        id={'answer'}
                        onChange={handleChange}
                        value={answer}
                        autoFocus={true}
                        required={true}
                    />
                </form>
            </div>
        );
    } else if (context.gameState && context.gameState === GameState.Finished) {
        return (
            <div className={'multiplicationTable'}>
                <AnsweredQuestions/>
            </div>
        );
    } else {
        return null;
    }
}