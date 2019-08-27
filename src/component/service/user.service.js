import {useContext} from 'react';
import UserContext from "../context/UserContext";

import config from 'config';
import {authHeader} from '../util/auth-header';

export const userService = {
    login,
    register,
    logout,
    getAll
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse);
}

function register(username, password, firstName, lastName) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, firstName, lastName})
    };
    return fetch(`${config.apiUrl}/users/register`, requestOptions)
        .then(handleResponse);
}

function logout() {
    // let context = useContext(UserContext);
    // context.deleteUser();
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}