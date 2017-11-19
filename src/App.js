import React, {Component} from 'react';
import './App.css';
import MultiplicationTable from './components/table/table';

class App extends Component {
    render() {
        return (
            <div className='main'>
                <div className='title'>Tabliczka mnożenia</div>
                <MultiplicationTable/>
            </div>
        );
    }
}

export default App;
