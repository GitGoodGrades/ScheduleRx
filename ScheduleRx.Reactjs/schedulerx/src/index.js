import React from 'react';
import {render} from 'react-dom';
import './App/index.css';
import App from './App/App';
import { Router } from 'react-router-dom';
import './App/app.css';
import { Provider } from 'react-redux';
import configureStore from './Redux/store/store';
import history from './App/History';

const store = configureStore();

render((
<Provider store={store}>
    <Router className="App" history={history}>
        <App style={{fontfamily: 'Cuprum, sans-serif',}} className="App"/>
    </Router>
</Provider>
), document.getElementById('root'));
