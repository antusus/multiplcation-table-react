import React, {createContext, Dispatch, useContext, useReducer} from 'react';

type ActionsContextType = {
    type: string;
    payload: number
}

export type MultiplicationTableContextType = {
    gameStarted: boolean;
    selectedNumbers: number[];
}

// I know I'll provide dispatch function later
const MultiplicationTableContext = createContext<MultiplicationTableContextType>({
    gameStarted: false,
    selectedNumbers: []
});
// I know I'll provide dispatch function later
const MultiplicationTableActionsContext = createContext<Dispatch<ActionsContextType>>(null!);

export function MultiplicationTableStateProvider(
    {
        gameStarted = false,
        initialSelectedNumbers = [],
        children
    }: {
        gameStarted?: boolean,
        initialSelectedNumbers?: number[],
        children: React.ReactNode
    }) {
    const [state, dispatch] = useReducer(
        selectedNumbersReducer,
        {
            gameStarted, selectedNumbers: initialSelectedNumbers
        }
    );

    return (
        <MultiplicationTableContext.Provider value={state}>
            <MultiplicationTableActionsContext.Provider value={dispatch}>
                {children}
            </MultiplicationTableActionsContext.Provider>
        </MultiplicationTableContext.Provider>
    );
}

export function useMultiplicationTableContext() {
    return useContext(MultiplicationTableContext);
}

export function useMultiplicationTableActionsContext() {
    return useContext(MultiplicationTableActionsContext);
}

function selectedNumbersReducer(state: MultiplicationTableContextType, action: { type: string, payload: number }) {
    switch (action.type) {
        case 'add':
            return {...state, gameStarted: false, selectedNumbers: [...state.selectedNumbers, action.payload]};
        case 'remove':
            return {
                ...state,
                gameStarted: false,
                selectedNumbers: state.selectedNumbers.filter(n => n !== action.payload)
            };
        case 'clear':
            return {...state, gameStarted: false, selectedNumbers: []};
        case 'start':
            return {...state, gameStarted: true};
        case 'restart':
            return {...state, gameStarted: false, selectedNumbers: []};
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

