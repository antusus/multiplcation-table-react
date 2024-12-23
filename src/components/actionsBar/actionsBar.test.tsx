import {
    AnsweredQuestion,
    GameState,
    MultiplicationTableStateProvider, Question
} from "../../providers/MultiplicationTableStateProvider";
import {fireEvent, render} from "@testing-library/react";
import ActionsBar from "./index";

describe('NumbersSelector component', () => {
    function getUi(selectedNumbers: number[], gameState: GameState = GameState.NotStarted, answers: AnsweredQuestion[] = []) {
        return (
            <MultiplicationTableStateProvider
                selectedNumbers={selectedNumbers}
                gameState={gameState}
                answeredQuestions={answers}>
                <ActionsBar/>
            </MultiplicationTableStateProvider>
        );
    }

    test('renders initial state', () => {
        const {container} = render(getUi([]));
        const startButton = container.querySelector('#startGame');
        expect(startButton).toBeInTheDocument();
        expect(startButton).toBeDisabled();
        expect(startButton).toHaveClass('disabled');
        const restartButton = container.querySelector('#restartGame');
        expect(restartButton).toBeInTheDocument();
        expect(restartButton).toBeDisabled();
        expect(restartButton).toHaveClass('disabled');
        const retakeButton = container.querySelector('#retake');
        expect(retakeButton).not.toBeInTheDocument();
    });

    test('renders enabled start button', () => {
        const {container} = render(getUi([1, 2]));
        const button = container.querySelector('#startGame');
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
        expect(button).not.toHaveClass('disabled');
    });

    test('after clicking start start is disabled and restart enabled', () => {
        const {container} = render(getUi([1, 2]));
        const startButton = container.querySelector('#startGame');
        fireEvent.click(startButton!);
        expect(startButton).toBeDisabled();
        const restartButton = container.querySelector('#restartGame');
        expect(restartButton).not.toBeDisabled();
        expect(restartButton).not.toHaveClass('disabled');
    });

    test('after clicking restart restart is disabled and start enabled', () => {
        const {container} = render(getUi([1, 2]));
        const startButton = container.querySelector('#startGame');
        const restartButton = container.querySelector('#restartGame');
        fireEvent.click(startButton!);
        fireEvent.click(restartButton!);
        expect(startButton).toBeDisabled();
        expect(startButton).toHaveClass('disabled');
        expect(restartButton).toBeDisabled();
        expect(restartButton).toHaveClass('disabled');
    });

    test('when game finished and are wrong answers retake button is shown', () => {
        const {container} = render(getUi([1, 2], GameState.Finished, [new AnsweredQuestion(new Question(1, 2), 3)]));
        const retakeButton = container.querySelector('#retake');
        expect(retakeButton).toBeInTheDocument();
    });
});