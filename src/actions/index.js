export const SELECT_CELL = 'SELECT_CELL';

export function selectCell(row, column) {
    return {
        type: SELECT_CELL,
        payload: {row, column}
    };
}
