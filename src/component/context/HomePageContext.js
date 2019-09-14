import React from 'react';

export default React.createContext({
    certificates: [],
    currentPage: 1,
    certificatesPerPage: 2,
    errorMessage: '',
    successMessage: '',
    userCertificates: [],
    search: '',
    loading: false,
    setCertificates: (certificates) => {
    },
    setCurrentPage: (page) => {
    },
    setErrorMessage: (message) => {
    },
    setSuccessMessage: (message) => {
    },
    setLoading: (bool) => {
    },
    setCertificatesPerPage: (number) => {
    },
    setUserCertificates: (number) => {
    },
    setSearch: (number) => {
    },
    paginate: (number) => {
    }
});