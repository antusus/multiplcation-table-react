import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import {GameState, MultiplicationTableStateProvider, Question} from "../../providers/MultiplicationTableStateProvider";
import MultiplicationGame from "./index";

describe('MultiplicationGame component', () => {
    function renderGame(gameStarted = GameState.NotStarted, questions = [] as Question[], currentQuestionIndex = 0) {
        const {container} = render(
            <MultiplicationTableStateProvider
                gameState={gameStarted}
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}>
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

        const input: HTMLInputElement | null = container.querySelector('input');
        fireEvent.change(input!, {target: {value: '6'}});
        fireEvent.submit(input!);

        expect(container.querySelector('input')).not.toBeInTheDocument();
    });
});