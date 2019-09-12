import {userService} from "./user.service";
import config from 'config';
import {authHeader} from '../util/authorization';
import {postFetch} from "../util/backend-util";

export const certificateService = {
    getAll,
    searchByMultipleFilters,
    getUserCertificates,
    buy,
    deleteUserCertificate,
    deleteAdminCertificate,
    createAdminCertificate,
    editAdminCertificate,
    findById
};

async function getAll(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/all`, requestOptions).then(handleResponse);
    // return await fetch(`${config.tomcatUrl}/user/allCertificates`, {...postFetch()}).then(handleResponse);
}

async function findById(user, certificateId) {
    const requestOptions = {
        method: 'GET',
        certificateId,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/findById`, requestOptions).then(handleResponse);
}

async function searchByMultipleFilters(user, arrayOfFilters) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    // return await fetch(`${config.tomcatUrl}/user/allCertificates`, {...postFetch(), ...requestOptions})
    return await fetch(`${config.apiUrl}/certificates/all`, requestOptions)
        .then(handleResponse)
        .then(array => {
            return array.filter(certificate => {
                for (let i = 0; i < arrayOfFilters.length; i++) {
                    if (!arrayOfFilters[i](certificate)) {
                        return false
                    }
                }
                return true;
            })
        });
}

async function buy(certificateId, user) {
    const requestOptions = {
        method: 'GET',
        certificateId,
        userId: user.id,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/buy`, requestOptions)
        .then(handleResponse)
        .then(result => 'Everything went alright!!!');
}

async function deleteUserCertificate(certificateId, user) {
    const requestOptions = {
        method: 'GET',
        certificateId,
        userId: user.id,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/delete`, requestOptions)
        .then(handleResponse)
        .then(result => 'Everything went alright!!!');
}

async function deleteAdminCertificate(certificateId, user) {
    const requestOptions = {
        method: 'GET',
        certificateId,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/admin/delete`, requestOptions)
        .then(handleResponse)
        .then(result => 'Everything went alright!!!(ADMIN)');
}

async function createAdminCertificate(user, certificate) {
    const requestOptions = {
        method: 'GET',
        certificate: certificate,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/admin/create`, requestOptions)
        .then(handleResponse);
}

async function editAdminCertificate(user, certificate) {
    const requestOptions = {
        method: 'GET',
        certificate: certificate,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/admin/edit`, requestOptions)
        .then(handleResponse);
}

async function getUserCertificates(user) {
    const requestOptions = {
        method: 'GET',
        userId: user.id,
        headers: authHeader(user)
    };
    return await fetch(`${config.apiUrl}/certificates/userCertificates`, requestOptions).then(handleResponse);
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