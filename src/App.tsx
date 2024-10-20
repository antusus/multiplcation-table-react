import React from 'react';
import './App.css';
import NumbersSelector from "./components/numbersSelector";
import {
    MultiplicationTableStateProvider,
    useMultiplicationTableContext
} from "./providers/MultiplicationTableStateProvider";
import ActionsBar from "./components/actionsBar";
import MultiplicationGame from "./components/multiplicationGame";

function App() {
    const context = useMultiplicationTableContext();
    return (
        <div className="App">
            <MultiplicationTableStateProvider>
                <NumbersSelector/>
                <MultiplicationGame/>
                <ActionsBar/>
            </MultiplicationTableStateProvider>
        </div>
    );
}

export default App;
