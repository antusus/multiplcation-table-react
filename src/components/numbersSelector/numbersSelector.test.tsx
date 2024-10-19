import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import NumbersSelector from "./index";

describe('NumberasSelector component', () => {
    test('renders numbers', () => {
        const {container} = render(<NumbersSelector/>);
        const numbers = container.querySelectorAll('.number');
        expect(numbers).toHaveLength(9)
    });

    test('selects number', () => {
        render(<NumbersSelector/>);
        const number = screen.getByText(6);
        fireEvent.click(number);
        expect(number).toHaveClass('selected');
    });

    test('de-selects number', () => {
        render(<NumbersSelector/>);
        const number = screen.getByText(6);
        fireEvent.click(number);
        fireEvent.click(number);
        expect(number).not.toHaveClass('selected');
    });

    test('renders button to clear selection', () => {
        const {container} = render(<NumbersSelector/>);
        const clearButton = container.querySelector('#clearButton');
        expect(clearButton).toBeInTheDocument();
    });

    test('clears selected numbers', () => {
        const {container} = render(<NumbersSelector/>);
        const number6 = screen.getByText(6);
        fireEvent.click(number6);
        const number9 = screen.getByText(9);
        fireEvent.click(number9);
        const clearButton = container.querySelector('#clearButton');
        fireEvent.click(clearButton!);
        expect(number6).not.toHaveClass('selected');
        expect(number9).not.toHaveClass('selected');
    });
});
