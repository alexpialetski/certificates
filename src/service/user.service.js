import config from 'config';
import {authHeader, specifyRoles} from '../util/authorization';
import {postFetch} from "../util/backend-util";
import axios from "axios";

export const userService = {
    login,
    register,
    logout,
    findById
};

function login(username, password) {
    const requestOptions = {
        username,
        password
    };
    return axios.post(`${config.serverUrl}user/authenticate`, {...postFetch, ...requestOptions}).then(handleResponse).then(user => {
        return {
            ...user,
            roles: specifyRoles(user.role)
        };
    });
}

async function findById(id, user) {
    const requestOptions = {
        method: 'GET',
        userId: parseInt(id),
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/admin/findById`, requestOptions)
        .then(handleResponse);
}

function register(username, password, firstName, lastName) {
    const requestOptions = {
        username, password, firstName, lastName
    };
    return axios.post(`${config.serverUrl}user/register`, {...postFetch, ...requestOptions}).then(handleResponse);
}

function logout() {
    localStorage.removeItem('id');
}

function handleResponse(response) {
    return response.data;
}