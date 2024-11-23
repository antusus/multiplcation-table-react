import React from 'react';
import './App.css';
import NumbersSelector from "./components/numbersSelector";
import {
    MultiplicationTableStateProvider
} from "./providers/MultiplicationTableStateProvider";
import ActionsBar from "./components/actionsBar";
import MultiplicationGame from "./components/multiplicationGame";

function App() {
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
