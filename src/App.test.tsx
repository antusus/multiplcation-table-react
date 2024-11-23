import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {AnsweredQuestion, GameState, Question} from "./providers/MultiplicationTableStateProvider";

function playGame(selectedNumber: string, container: HTMLElement, failOne = false) {
    let questionLabel = container.querySelector('.question');
    let index = 1;
    do {
        const questionText = questionLabel?.textContent || '';
        const [firstNumber, secondNumber] = questionText.split(' * ');
        expect(firstNumber).toEqual(selectedNumber);
        expect(parseInt(secondNumber)).toBeGreaterThanOrEqual(1);
        expect(parseInt(secondNumber)).toBeLessThan(11);
        let answer = parseInt(firstNumber) * parseInt(secondNumber);
        if(failOne && index === 1) {
            answer = answer - 1;
        }
        let input = container.querySelector('#answer') as HTMLInputElement;
        fireEvent.change(input, {target: {value: answer.toString()}});
        fireEvent.submit(input!);
        input = container.querySelector('#answer') as HTMLInputElement;
        // after last answer the input is removed
        expect(input ? input.value : '').toBe('');
        questionLabel = container.querySelector('.question');
        index++;
    } while (questionLabel);
}

function selectNumber(selectedNumber: string, container: HTMLElement) {
    let number = screen.getByText(selectedNumber);
    fireEvent.click(number);
    fireEvent.click(container.querySelector('#startGame')!);
}

describe('Multiplcation Table Game', () => {
    test('renders initial state', () => {
        const {container} = render(<App/>);
        const numbersContainer = container.querySelector('.numbersContainer');
        expect(numbersContainer).toBeInTheDocument();
        const multiplicationTable = container.querySelector('.multiplicationTable');
        expect(multiplicationTable).not.toBeInTheDocument();
        const actionsBar = container.querySelector('.actionsBar');
        expect(actionsBar).toBeInTheDocument();
    });

    test('plays game', () => {
        const {container} = render(<App/>);
        const selectedNumber = '2';
        selectNumber(selectedNumber, container);
        playGame(selectedNumber, container);
    });

    test('after retaking wrong answers', () => {
        const {container} = render(<App/>);
        const selectedNumber = '2';
        selectNumber(selectedNumber, container);

        playGame(selectedNumber, container, true);

        const retakeButton = container.querySelector('#retake') as HTMLButtonElement;
        expect(retakeButton).toBeInTheDocument();
        fireEvent.click(retakeButton!);
        //
        // let input = container.querySelector('input');
        // expect(input).toBeInTheDocument();
    });
});
