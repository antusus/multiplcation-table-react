import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/table/table.css';
import './components/multiplication-game/multiplication-game.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
