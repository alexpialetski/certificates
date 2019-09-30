import C from '../constants'
import {combineReducers} from 'redux'

export const user = (state = {}, action) => {
    switch (action.type) {
        case C.SET_USER:
            return action.payload;
        case C.CLEAR_USER:
            return {};
        default:
            return state
    }
};

export const token = (state = "", action) => {
    switch (action.type) {
        case C.SET_TOKEN:
            return action.payload;
        case C.CLEAR_TOKEN:
            return "";
        default:
            return state
    }
};

export const errors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_ERROR :
            if (typeof action.payload === 'string') {
                return [
                    ...state,
                    action.payload
                ];
            }else if(typeof action.payload === 'object'){
                if(action.payload.error){
                    return [
                        ...state,
                        action.payload.error
                    ];
                }

            }else{
                return [
                    ...state,
                    ...action.payload
                ];
            }
        case C.CLEAR_ERROR :
            return state.filter((message, i) => i !== action.payload);
        default:
            return state
    }
};

export const successMessage = (state = [], action) => {
    switch (action.type) {
        case C.ADD_SUCCESS_MESSAGE :
            return [
                ...state,
                action.payload
            ];
        case C.CLEAR_SUCCESS_MESSAGE :
            return state.filter((message, i) => i !== action.payload);
        default:
            return state
    }
};

export const search = (state = '', action) => {
    switch (action.type) {
        case C.CHANGE_SEARCH_VARIABLE:
            return action.payload;
        case C.CLEAR_SEARCH_VARIABLE:
            return '';
        default:
            return state
    }
};

export const filterBody = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_FILTER_BODY:
            return action.payload;
        case C.CLEAR_FILTER_BODY:
            return {};
        default:
            return state
    }
};

export const entitiesPerPage = (state = 2, action) =>
    (action.type === C.CHANGE_PER_PAGE_NUMBER) ?
        parseInt(action.payload) :
        state;

export const pageNumber = (state = 1, action) =>
    (action.type === C.CHANGE_PAGE_NUMBER) ?
        parseInt(action.payload) :
        state;

export const quantityOfPages = (state = 1, action) =>
    (action.type === C.CHANGE_QUANTITY_OF_PAGES) ?
        parseInt(action.payload) :
        state;

export const showUserCertificates = (state = false, action) =>
    (action.type === C.SHOW_USER_CERTIFICATES) ?
        action.payload :
        state;

export const currentCertificates = (state = [], action) =>
    (action.type === C.SET_CURRENT_CERTIFICATES) ?
        action.payload :
        state;

export const userCertificates = (state = {}, action) =>
    (action.type === C.SET_USER_CERTIFICATES) ?
        action.payload :
        state;

export default combineReducers({
    user,
    token,
    userCertificates,
    pageNumber,
    entitiesPerPage,
    quantityOfPages,
    errors,
    successMessage,
    currentCertificates,
    showUserCertificates,
    filterBody,
    search
})




