import config from 'config';
import {authHeader} from '../util/authorization';
import axios from 'axios';
import {getFetch, postFetch, createTokenHeader} from "../util/backend-util";


export const certificateService = {
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

async function findById(user, certificateId) {
    return await axios.get(`${config.serverUrl}certificates/${certificateId}`, createTokenHeader()).then(handleResponse);
}

function paginate(limit, offset, filterBody) {
    const requestOptions = {
        ...postFetch,
        filterBody,
    };
    return axios.post(`${config.serverUrl}certificates/paginate/${limit}/${offset}`, requestOptions).then(handleResponse);
}

async function setUpCertificates(limit, filterBody) {
    const requestOptions = {
        ...postFetch,
        filterBody,
    };
    return await axios.post(`${config.serverUrl}certificates/setUp/${limit}`, requestOptions).then(handleResponse);
}

function paginateUserCertificates(user, limit, offset, filterBody) {
    const requestOptions = {
        ...postFetch,
        user,
        filterBody,
    };
    console.log(requestOptions);
    return axios.post(`${config.serverUrl}userCertificate/paginate/${limit}/${offset}`, requestOptions, createTokenHeader()).then(handleResponse);
}

function setUpUserCertificates(user, limit, filterBody) {
    const requestOptions = {
        ...postFetch,
        user,
        filterBody,
    };
    return axios.post(`${config.serverUrl}userCertificate/setUp/${limit}`, requestOptions, createTokenHeader()).then(handleResponse);
}

function buy(certificateId, user) {
    const requestOptions = {
        ...postFetch,
        certificate: certificateId,
        user
    };
    return axios.post(`${config.serverUrl}userCertificate/create`, requestOptions, createTokenHeader())
        .then(handleResponse)
        .then(result => 'Everything went alright!!!');
}

function deleteUserCertificate(certificateId) {
    return axios.delete(`${config.serverUrl}userCertificate/${certificateId}`, createTokenHeader())
        .then(handleResponse)
        .then(result => 'Everything went alright!!!');
}

async function deleteAdminCertificate(certificateId) {
    return axios.delete(`${config.serverUrl}certificates/${certificateId}`, createTokenHeader())
        .then(handleResponse)
        .then(result => 'Everything went alright!!!(ADMIN)');
}

async function createAdminCertificate(user, certificate) {
    const requestOptions = {
        certificate: certificate,
    };
    return axios.post(`${config.apiUrl}/certificates`, requestOptions, createTokenHeader())
        .then(handleResponse);
}

async function editAdminCertificate(user, certificate) {
    const requestOptions = {
        certificate: certificate,
    };
    return axios.post(`${config.apiUrl}/certificates/edit`, requestOptions, createTokenHeader())
        .then(handleResponse);
}

async function getUserCertificates(user) {
    const requestOptions = {
        user
    };
    return axios.post(`${config.serverUrl}userCertificate/array`, requestOptions, createTokenHeader()).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}