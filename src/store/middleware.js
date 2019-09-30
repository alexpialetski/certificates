import appReducer from './reducers'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'

const consoleMessages = store => next => action => {

    let result;

    console.groupCollapsed(`dispatching action => ${action.type}`);
    console.log(`certificates : ${store.getState().currentCertificates.length}
        action.payload: ${JSON.stringify(action.payload)}`);
    result = next(action);

    let {currentCertificates, showUserCertificates, userCertificates, errors, successMessage, pageNumber, entitiesPerPage, user, quantityOfPages, search, filterBody} = store.getState();

    console.log(`
		user: ${JSON.stringify(user)}
		currentCertificates: ${currentCertificates.length}
		userCertificates: ${userCertificates.length}
		entitiesPerPage: ${entitiesPerPage}
		quantityOfPages: ${quantityOfPages}
		pageNumber: ${pageNumber}
		search: ${search}
		filterBody: ${filterBody}
		errors: ${errors.length}
		successMessage: ${successMessage.length}
        showUserCertificates: ${showUserCertificates}
	`);

    console.groupEnd();

    return result
};

export default (initialState = {}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}



