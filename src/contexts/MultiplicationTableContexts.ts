import {createContext, Dispatch} from 'react';

type ActionsContextType = {
    type: string;
    payload: number
}
export type MultiplicationTableContextType = {
    selectedNumbers: number[];
}

export const MultiplicationTableContext = createContext({
    selectedNumbers: []
} as MultiplicationTableContextType);
// I know I'll provide dispatch function later
export const MultiplicationTableActionsContext = createContext<Dispatch<ActionsContextType>>(null!);