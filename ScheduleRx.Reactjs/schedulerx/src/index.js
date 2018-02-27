import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './scenes/App/App';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';

const store = configureStore();

render((
<Provider store={store}>
    <BrowserRouter className="App">
        <App className="App"/>
    </BrowserRouter>
</Provider>
), document.getElementById('root'));

