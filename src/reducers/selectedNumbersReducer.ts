export default function selectedNumbersReducer(selectedNumbers: number[], action: { type: string, payload: number }) {
    switch (action.type) {
        case 'add':
            return [...selectedNumbers, action.payload];
        case 'remove':
            return selectedNumbers.filter(n => n !== action.payload);
        case 'clear':
            return [];
        default:
            return selectedNumbers;
    }
}