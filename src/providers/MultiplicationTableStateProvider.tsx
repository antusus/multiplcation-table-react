import React, {createContext, Dispatch, useContext, useReducer} from 'react';

type ActionsContextType = {
    type: string;
    payload: number
    question?: Question;
}

export class Question {
    private readonly _factorOne: number;
    private readonly _factorTwo: number;

    public constructor(factorOne: number, factorTwo: number) {
        this._factorOne = factorOne;
        this._factorTwo = factorTwo;
    }

    public get factorOne(): number {
        return this._factorOne;
    }

    public get factorTwo(): number {
        return this._factorTwo;
    }
}

export enum GameState {
    NotStarted,
    InProgress,
    Finished
}

export type MultiplicationTableContextType = {
    gameState: GameState;
    selectedNumbers: number[];
    questions: Question[];
    currentQuestionIndex?: number;
    answeredQuestions: Question[];
}

const MultiplicationTableContext = createContext<MultiplicationTableContextType>({
    gameState: GameState.NotStarted,
    selectedNumbers: [],
    questions: [],
    answeredQuestions: []
});

// I know I'll provide dispatch function later
const MultiplicationTableActionsContext = createContext<Dispatch<ActionsContextType>>(null!);

export function MultiplicationTableStateProvider(
    {
        gameState = GameState.NotStarted,
        selectedNumbers = [],
        questions = [],
        currentQuestionIndex,
        children
    }: {
        gameState?: GameState,
        selectedNumbers?: number[],
        questions?: Question[],
        currentQuestionIndex?: number,
        children: React.ReactNode
    }) {
    const [state, dispatch] = useReducer(
        selectedNumbersReducer,
        {
            gameState,
            selectedNumbers,
            questions,
            answeredQuestions: [] as Question[],
            ...(currentQuestionIndex !== undefined ? {currentQuestionIndex} : {})
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

const numbers = [1,2,3,4,5,6,7,8,9,10];

function generateQuestions(selectedNumbers: number[]) {
    return selectedNumbers.flatMap(n => numbers.map(m => {
        return new Question(n, m + 1)
    }));
}

function questionWasAnswered(state: MultiplicationTableContextType, payload: number) {
    const currentQuestion = state.questions[state.currentQuestionIndex!];
    const answeredQuestions = [...state.answeredQuestions, currentQuestion];
    const questions = state.questions.filter(q => q !== currentQuestion);
    const gameState = questions.length === 0 ? GameState.Finished : state.gameState;
    return {...state, gameState, questions, answeredQuestions};
}

function selectedNumbersReducer(state: MultiplicationTableContextType, action: { type: string, payload: number }) {
    switch (action.type) {
        case 'add':
            return {...state, selectedNumbers: [...state.selectedNumbers, action.payload]};
        case 'remove':
            return {
                ...state,
                selectedNumbers: state.selectedNumbers.filter(n => n !== action.payload)
            };
        case 'clear':
            return {...state, gameState: GameState.NotStarted, selectedNumbers: []};
        case 'start':
            return {...state, gameState: GameState.InProgress, questions: generateQuestions(state.selectedNumbers), currentQuestionIndex: 0};
        case 'restart':
            return {...state, gameState: GameState.NotStarted, selectedNumbers: []};
        case 'answer':
            return questionWasAnswered(state, action.payload);
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

