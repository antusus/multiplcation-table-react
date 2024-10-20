import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

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
});
