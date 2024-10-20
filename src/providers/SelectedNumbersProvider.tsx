import selectedNumbersReducer from '../reducers/selectedNumbersReducer';
import React, {useReducer} from 'react';
import {SelectedNumbersContext, MultiplicationTableActionsContext} from '../contexts/MultiplicationTableContexts';

export function SelectedNumbersProvider({children}: { children: React.ReactNode }) {
    const [selectedNumbers, dispatch] = useReducer(selectedNumbersReducer, [])

    return (
        <SelectedNumbersContext.Provider value={selectedNumbers}>
            <MultiplicationTableActionsContext.Provider value={dispatch}>
                {children}
            </MultiplicationTableActionsContext.Provider>
        </SelectedNumbersContext.Provider>
    );
}