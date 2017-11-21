import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './App.css';
import MultiplicationTable from './components/table/table';
import MultiplicationGame from './components/multiplication-game/multiplication-game';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import reducers from './reducers';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <Router>
                    <Switch>
                        <Route path="/game" component={MultiplicationGame}/>
                        <Route exact={true} path="/" component={MultiplicationTable}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
