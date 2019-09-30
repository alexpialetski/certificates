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
import store from './store/index'
import {Provider} from 'react-redux'
import {addError} from './actions'
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';


const handleError = error => {
    store.dispatch(
        addError(error.message)
    )
};

//DEBUG VALUES
window.React = React;
window.store = store;
//

window.addEventListener("error", handleError);

configureFakeBackend();

ReactDOM.render(
    <BrowserRouter>
        <CookiesProvider>
            <Provider store={store}>
                {routes}
            </Provider>
        </CookiesProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

module.hot.accept();

