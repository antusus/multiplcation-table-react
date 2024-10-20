import React from 'react';
import {render} from "@testing-library/react";
import {MultiplicationTableStateProvider} from "../../providers/MultiplicationTableStateProvider";
import MultiplicationGame from "./index";

describe('MultiplicationGame component', () => {
    function renderGame(gameStarted = false) {
        const {container} = render(
            <MultiplicationTableStateProvider gameStarted={gameStarted}>
                <MultiplicationGame/>
            </MultiplicationTableStateProvider>
        );
        return container;
    }

    test('is hidden if game not started', () => {
        const container = renderGame();

        const gameContainer = container.querySelector('.multiplicationGame');

        expect(gameContainer).not.toBeInTheDocument();
    });

    test('is visible when game is started', () => {
        const container = renderGame(true);

        const gameContainer = container.querySelector('.multiplicationGame');

        expect(gameContainer).toBeNull();
    });
});