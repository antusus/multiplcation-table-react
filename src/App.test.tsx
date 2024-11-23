import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

function playGame(selectedNumber: string, container: HTMLElement) {
    let questionLabel = container.querySelector('.question');
    do {
        const questionText = questionLabel?.textContent || '';
        const [firstNumber, secondNumber] = questionText.split(' * ');
        expect(firstNumber).toEqual(selectedNumber);
        expect(parseInt(secondNumber)).toBeGreaterThanOrEqual(1);
        expect(parseInt(secondNumber)).toBeLessThan(11);
        const answer = parseInt(firstNumber) * parseInt(secondNumber);
        let input = container.querySelector('#answer') as HTMLInputElement;
        fireEvent.change(input, {target: {value: answer.toString()}});
        fireEvent.submit(input!);
        input = container.querySelector('#answer') as HTMLInputElement;
        // after last answer the input is removed
        expect(input ? input.value : '').toBe('');
        questionLabel = container.querySelector('.question');
    } while (questionLabel);
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
        let number = screen.getByText(selectedNumber);
        fireEvent.click(number);
        fireEvent.click(container.querySelector('#startGame')!);
        playGame(selectedNumber, container);
    });
});
