import React from 'react';
import './App.css';
import NumbersSelector from "./components/numbersSelector";
import {SelectedNumbersProvider} from "./providers/SelectedNumbersProvider";

function App() {
    return (
        <div className="App">
            <SelectedNumbersProvider>
                <NumbersSelector/>
            </SelectedNumbersProvider>
        </div>
    );
}

export default App;
