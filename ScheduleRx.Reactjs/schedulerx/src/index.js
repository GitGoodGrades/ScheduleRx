import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './scenes/App/App';
import { BrowserRouter } from 'react-router-dom';
import './app.css';



render(
    (
        <BrowserRouter className="App">
         <App className="App"/>
        </BrowserRouter>

    ),
    document.getElementById('root')
);

