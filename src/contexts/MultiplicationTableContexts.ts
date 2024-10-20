import {createContext, Dispatch} from 'react';

type ActionsContextType = {
    type: string;
    payload: number
}

export const SelectedNumbersContext = createContext([] as number[]);
// I know I'll provide dispatch function later
export const MultiplicationTableActionsContext = createContext<Dispatch<ActionsContextType>>(null!);