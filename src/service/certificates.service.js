import config from 'config';
import {authHeader} from '../util/authorization';

import axios from 'axios';
import {getFetch} from "../util/backend-util";

export const certificateService = {
    getAll,
    searchByMultipleFilters,
    getUserCertificates,
    buy,
    deleteUserCertificate,
    deleteAdminCertificate,
    createAdminCertificate,
    editAdminCertificate,
    findById,
    paginate,
    setUpCertificates,
    paginateUserCertificates,
    setUpUserCertificates
};

async function getAll(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return await axios.get(`${config.serverUrl}certificates`, getFetch).then(handleResponse);
}

async function findById(user, certificateId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return await axios.get(`${config.serverUrl}certificates/${certificateId}`, requestOptions).then(handleResponse);
}

async function searchByMultipleFilters(user, arrayOfFilters) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return await axios.get(`${config.serverUrl}certificates`, requestOptions)
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

function paginate(user, limit, offset, filterBody) {
    const requestOptions = {
        ...getFetch,
        user,
        filterBody,
    };
    return axios.post(`${config.serverUrl}certificates/paginate/${limit}/${offset}`, requestOptions).then(handleResponse);
}

async function setUpCertificates(user, limit, filterBody) {
    const requestOptions = {
        ...getFetch,
        filterBody,
    };
    return await axios.post(`${config.serverUrl}certificates/setUp/${limit}`, requestOptions).then(handleResponse);
}

function paginateUserCertificates(user, limit, offset, filterBody) {
    const requestOptions = {
        ...getFetch,
        filterBody,
    };
    return axios.post(`${config.serverUrl}userCertificate/paginate/${limit}/${offset}`, requestOptions).then(handleResponse);
}

async function setUpUserCertificates(user, limit, filterBody) {
    const requestOptions = {
        ...getFetch,
        user,
        filterBody,
    };
    return await axios.post(`${config.serverUrl}userCertificate/setUp/${limit}`, requestOptions).then(handleResponse);
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
    return response.data;
}