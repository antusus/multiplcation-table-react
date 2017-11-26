import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './App.css';
import MultiplicationTable from './components/table/table';
import MultiplicationGame from './components/multiplication-game/multiplication-game';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import reducers from './reducers';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
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
