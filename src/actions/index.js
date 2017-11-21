export const SELECT_CELL = 'SELECT_CELL';
export const CONFIRMED_CELL = 'CONFIRMED_CELL';

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