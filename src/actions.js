import C from './constants'
import {certificateService} from './service/certificates.service'

export const addError = (message) =>
    ({
        type: C.ADD_ERROR,
        payload: message
    });

export const clearError = index =>
    ({
        type: C.CLEAR_ERROR,
        payload: index
    });

export const addSuccessMessage = (message) =>
    ({
        type: C.ADD_SUCCESS_MESSAGE,
        payload: message
    });

export const clearSuccessMessage = index =>
    ({
        type: C.CLEAR_SUCCESS_MESSAGE,
        payload: index
    });

export const setUser = user =>
    ({
        type: C.SET_USER,
        payload: user
    });

export const clearUser = () =>
    ({
        type: C.CLEAR_USER,
    });

export const setToken = token =>
    ({
        type: C.SET_TOKEN,
        payload: token
    });

export const clearToken = () =>
    ({
        type: C.CLEAR_TOKEN,
    });

export const changeSearchVariable = value =>
    ({
        type: C.CHANGE_SEARCH_VARIABLE,
        payload: value
    });

export const clearSearch = () =>
    ({
        type: C.CLEAR_SEARCH_VARIABLE,
    });

export const changeFilterBody = value =>
    ({
        type: C.CHANGE_FILTER_BODY,
        payload: value
    });

export const clearFilterBody = () =>
    ({
        type: C.CLEAR_FILTER_BODY,
    });

export const changePerPage = value =>
    ({
        type: C.CHANGE_PER_PAGE_NUMBER,
        payload: value
    });

export const changePageNumber = value =>
    ({
        type: C.CHANGE_PAGE_NUMBER,
        payload: value
    });

export const changeQuantityOfPages = value =>
    ({
        type: C.CHANGE_QUANTITY_OF_PAGES,
        payload: value
    });

export const setCurrentCertificates = certificates =>
    ({
        type: C.SET_CURRENT_CERTIFICATES,
        payload: certificates
    });

export const setUserCertificates = certificates =>
    ({
        type: C.SET_USER_CERTIFICATES,
        payload: certificates
    });

export const showUserCertificates = (bool = false) =>
    ({
        type: C.SHOW_USER_CERTIFICATES,
        payload: bool
    });

export const paginate = pageNumber => (dispatch, getState) => {
    dispatch(changePageNumber(pageNumber));

    const state = getState();

    state.showUserCertificates ?
        certificateService.paginateUserCertificates(state.user, state.entitiesPerPage, (pageNumber - 1) * state.entitiesPerPage, state.filterBody)
            .then(result => {
                dispatch(setCurrentCertificates(result));
            })
            .catch(error => {
                dispatch(
                    addError(error.message)
                );
            })
        :
        certificateService.paginate(state.entitiesPerPage, (pageNumber - 1) * state.entitiesPerPage, state.filterBody)
            .then(result => {
                dispatch(setCurrentCertificates(result));
            })
            .catch(error => {
                dispatch(
                    addError(error.message)
                );
            });
};

export const setUpCertificates = () => (dispatch, getState) => {
    const state = getState();
    state.showUserCertificates ?
        certificateService.setUpUserCertificates(state.user, state.entitiesPerPage, state.filterBody)
            .then(result => {
                dispatch(changePageNumber(1));
                dispatch(changeQuantityOfPages(result.quantityOfPages));
                dispatch(setCurrentCertificates(result.certificates));
            })
            .catch(error => {
                dispatch(
                    addError(error.message)
                );
            })
        :
        certificateService.setUpCertificates(state.entitiesPerPage, state.filterBody)
            .then(result => {
                dispatch(changePageNumber(1));
                dispatch(changeQuantityOfPages(result.quantityOfPages));
                dispatch(setCurrentCertificates(result.certificates));
            })
            .catch(error => {
                dispatch(
                    addError(error.message)
                );
            });
};

export const updateUserCertificates = () => (dispatch, getState) => {
    const state = getState();

    certificateService.getUserCertificates(state.user)
        .then(result => {
            dispatch(setUserCertificates(result));
        })
        .catch(error => {
            dispatch(
                addError(error.message)
            );
        });
};