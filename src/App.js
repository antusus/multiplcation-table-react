import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './App.css';
import MultiplicationTable from './components/table/table';
import reducers from './reducers';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <div className='main'>
                    <div className='title'>Tabliczka mnożenia</div>
                    <MultiplicationTable/>
                </div>
            </Provider>
        );
    }
}

export default App;
