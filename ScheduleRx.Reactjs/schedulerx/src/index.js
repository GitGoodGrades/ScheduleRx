import React from 'react';
import {render} from 'react-dom';
import './Base Componenets/index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import './Base Componenets/app.css';
import { Provider } from 'react-redux';
import configureStore from './Redux/store/store';

const store = configureStore();

render((
<Provider store={store}>
    <BrowserRouter className="App">
        <App style={{fontfamily: 'Cuprum, sans-serif',}} className="App"/>
    </BrowserRouter>
</Provider>
), document.getElementById('root'));
