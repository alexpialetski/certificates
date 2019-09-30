import store from '../store/index';

export const postFetch = {
    method: 'POST',
    mode: 'cors',
    crossDomain: true
};

export const getFetch = {
    method: 'GET',
    mode: 'cors',
    crossDomain: true
};

export const createTokenHeader = () => {
    const token = store.getState().token;
    return token ? {headers: {'Authorization': token}} : {};
};
