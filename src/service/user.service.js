import config from 'config';
import {specifyRoles} from '../util/authorization';
import {createTokenHeader, postFetch} from "../util/backend-util";
import axios from "axios";

export const userService = {
    login,
    register,
    logout,
    findByToken
};

function login(username, password) {
    const requestOptions = {
        username,
        password,
    };
    return axios.post(`${config.serverUrl}user/authenticate`, {...postFetch, ...requestOptions}).then(handleResponse).then(userWithToken => {
        return {
            user: {
                ...userWithToken.user,
                roles: specifyRoles(userWithToken.user.role)
            },
            token: userWithToken.token
        };
    });
}

function findByToken(token) {
    const requestOptions = {
        token,
    };
    return axios.post(`${config.serverUrl}user/findByToken`, requestOptions, createTokenHeader())
        .then(handleResponse);
}

function register(username, password, firstName, lastName) {
    const requestOptions = {
        username, password, firstName, lastName
    };
    return axios.post(`${config.serverUrl}user/register`, {...postFetch, ...requestOptions}).then(handleResponse);
}

function logout() {
    localStorage.removeItem('token');
}

function handleResponse(response) {
    return response.data;
}