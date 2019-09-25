import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './resources/styles/homePage.css';
import './resources/styles/main.css';
import './resources/styles/loading.css';

import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {configureFakeBackend} from './util/fake-backend'
import routes from './routes'
import sampleData from './initialState'
import storeFactory from './store'
import {Provider} from 'react-redux'
import {addError} from './actions'
import {BrowserRouter} from "react-router-dom";

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData;

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState());

const handleError = error => {
    store.dispatch(
        addError(error.message)
    )
};

const store = storeFactory(initialState);
store.subscribe(saveState);

window.React = React;
window.store = store;

window.addEventListener("error", handleError);

configureFakeBackend();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {routes}
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

module.hot.accept();

