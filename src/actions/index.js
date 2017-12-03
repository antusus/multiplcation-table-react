export const SELECT_CELL = 'SELECT_CELL';
export const CONFIRMED_CELL = 'CONFIRMED_CELL';
export const CLEAR_CONFIRMED_CELL = 'CLEAR_CONFIRMED_CELL';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function selectCell(row, column) {
    return {
        type: SELECT_CELL,
        payload: {row, column}
    };
}

export function confirmCell(row, column) {
    return {
        type: CONFIRMED_CELL,
        payload: {row, column}
    };
}

export function clearConfirmedCell() {
    return {
        type: CLEAR_CONFIRMED_CELL,
        payload: {}
    };
}

export function answerQuestion(question, answer) {
    const expectedAnswer = parseInt(question.row, 10) * parseInt(question.column, 10);
    return {
        type: ANSWER_QUESTION,
        payload: {
            question,
            correct: expectedAnswer === parseInt(answer, 10),
            expectedAnswer,
            answer: parseInt(answer, 10)
        }
    };
}
