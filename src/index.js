const arr = [1, 2, 3];
const result = () => console.log(...arr);
// check console - Destructuring assignment is a cool feature that came along with ES6
result();

import bsStyles from 'bootstrap/dist/css/bootstrap.min.css';
import bsJs from 'bootstrap/dist/js/bootstrap.min.js';
import appStyles from './styles/homePage.css';
import 'bootstrap';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import './styles/App.css';

import {configureFakeBackend} from './component/util/fake-backend'

configureFakeBackend();

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

module.hot.accept();

