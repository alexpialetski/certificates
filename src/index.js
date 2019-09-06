import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './resources/styles/homePage.css';
import './resources/styles/main.css';

import 'bootstrap';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {configureFakeBackend} from './util/fake-backend'

configureFakeBackend();

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

module.hot.accept();

