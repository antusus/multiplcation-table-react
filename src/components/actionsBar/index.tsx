import './actionsBar.css';
import {
    GameState,
    useMultiplicationTableActionsContext,
    useMultiplicationTableContext
} from "../../providers/MultiplicationTableStateProvider";

export default function ActionsBar() {
    const context = useMultiplicationTableContext();
    const dispatch = useMultiplicationTableActionsContext();
    const restartIsDisabled = context.gameState === GameState.NotStarted;
    const startIsDisabled = context.selectedNumbers.length === 0 || !restartIsDisabled;

    function handleStart() {
        dispatch({type: 'start', payload: 0});
    }

    function handleRestart() {
        dispatch({type: 'restart', payload: 0});
    }

    const wrongAnswers = context.gameState === GameState.Finished ? context.answeredQuestions.filter(q => !q.isCorrect) : [];

    return (
        <div className={'actionsBar'}>
            <button id={'startGame'}
                    className={`startGame ${startIsDisabled ? 'disabled' : ''}`}
                    disabled={startIsDisabled}
                    onClick={handleStart}>
                Start
            </button>
            <button id={'restartGame'}
                    className={`restartGame ${restartIsDisabled ? 'disabled' : ''}`}
                    disabled={restartIsDisabled}
                    onClick={handleRestart}>
                Restart
            </button>
            {wrongAnswers.length > 0 &&
                    <button id={'retake'}
                            className={'retake'}
                            onClick={() => dispatch({type: 'retake', payload: 0})}>
                        Powtórz błędne
                    </button>
            }
        </div>
    );
}