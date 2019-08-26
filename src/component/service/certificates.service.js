import config from 'config';
import {authHeader} from '../util/auth-header';

export const certificateService = {
    getAll,
    searchByMultipleFilters
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
        for (let i = 0; i < arrayOfFiltersWithWord.length; i++) {
            debugger;
            if (!arrayOfFiltersWithWord[i](certificate)) {
                return false
            }
        }
        return true;
    });
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