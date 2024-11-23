import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import {
    AnsweredQuestion,
    GameState,
    MultiplicationTableStateProvider,
    Question
} from "../../providers/MultiplicationTableStateProvider";
import MultiplicationGame from "./index";

describe('MultiplicationGame component', () => {
    function renderGame(state = GameState.NotStarted, questions = [] as Question[], answers: AnsweredQuestion[] = []) {
        const {container} = render(
            <MultiplicationTableStateProvider
                gameState={state}
                questions={questions}
                currentQuestionIndex={0}
                answeredQuestions={answers}>
                <MultiplicationGame/>
            </MultiplicationTableStateProvider>
        );
        return container;
    }

    test('is hidden if game not started', () => {
        const container = renderGame();

        const gameContainer = container.querySelector('.multiplicationTable');

        expect(gameContainer).not.toBeInTheDocument();
    });

    test('is visible when game is started', () => {
        const container = renderGame(GameState.InProgress);

        const gameContainer = container.querySelector('.multiplicationTable');

        expect(gameContainer).toBeNull();
    });

    test('renders first question', () => {
        const container = renderGame(GameState.InProgress, [new Question(2, 3)]);

        const questionLabel: HTMLLabelElement | null = container.querySelector('.question');

        expect(questionLabel).toBeInTheDocument();
        expect(questionLabel?.textContent).toBe('2 * 3 = ');
    });

    test('after answering all questions game is hidden', () => {
        const container = renderGame(GameState.InProgress, [new Question(2, 3)]);

        let gameContainer = container.querySelector('.multiplicationTable');
        expect(gameContainer).toBeInTheDocument();

        const input = container.querySelector('input');
        expect(input).toBeInTheDocument();
        fireEvent.change(input!, {target: {value: '6'}});
        fireEvent.submit(input!);

        expect(container.querySelector('input')).not.toBeInTheDocument();
    });

    test('shows progress', () => {
        const container = renderGame(GameState.InProgress, [new Question(2, 3), new Question(3, 3)]);

        let progress = container.querySelector('.gameProgress');
        expect(progress).toBeInTheDocument();
        expect(progress?.textContent).toBe('Pozostało pytań: 2');

        const input: HTMLInputElement | null = container.querySelector('input');
        fireEvent.change(input!, {target: {value: '6'}});
        fireEvent.submit(input!);

        progress = container.querySelector('.gameProgress');
        expect(progress?.textContent).toBe('Pozostało pytań: 1');
    });
});