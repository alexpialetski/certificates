import {userService} from "./user.service";
import config from 'config';
import {authHeader} from '../util/auth-header';

export const certificateService = {
    getAll,
    searchByMultipleFilters,
    getUserCertificates,
    buy
};

function getAll(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return fetch(`${config.apiUrl}/certificates/all`, requestOptions).then(handleResponse);
}

async function searchByMultipleFilters(user, arrayOfFilters) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    let array = await fetch(`${config.apiUrl}/certificates/all`, requestOptions).then(handleResponse);
    return array.filter(certificate => {
        for (let i = 0; i < arrayOfFilters.length; i++) {
            if (!arrayOfFilters[i](certificate)) {
                return false
            }
        }
        return true;
    });
}

function buy(certificateId, user) {
    const requestOptions = {
        method: 'GET',
        certificateId,
        userId: user.id,
        headers: authHeader(user)
    };
    return fetch(`${config.apiUrl}/certificates/buy`, requestOptions).then(handleResponse);
}

function getUserCertificates(user) {
    const requestOptions = {
        method: 'GET',
        userId: user.id,
        headers: authHeader(user)
    };
    return fetch(`${config.apiUrl}/certificates/userCertificates`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}