import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import './App.css';
import MultiplicationTable from './components/table/table';
import MultiplicationGame from './components/multiplication-game/multiplication-game';
import {Route, Switch} from 'react-router';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createHistory from 'history/createHashHistory';
import reducers from './reducers';


//hash history
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
    )
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {/*<Router>*/}
                    <Switch>
                        <Route path='/game' component={MultiplicationGame}/>
                        <Route exact={true} path="/" component={MultiplicationTable}/>
                    </Switch>
                    {/*</Router>*/}
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
