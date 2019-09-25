import React from 'react';

import Footer from '../core/certificate/Footer'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addError, addSuccessMessage, paginate, setUpCertificates, updateUserCertificates} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        router: props.router
    });

const mapDispatchToProps = dispatch =>
    ({
        setSuccessMessage(message) {
            dispatch(
                addSuccessMessage(message)
            )
        },
        setErrorMessage(message) {
            dispatch(
                addError(message)
            )
        },
        updateUserCertificates() {
            dispatch(
                updateUserCertificates()
            )
        },
        paginate(pageNumber) {
            dispatch(
                paginate(pageNumber)
            )
        },
        setUpCertificates() {
            dispatch(
                setUpCertificates()
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default withRouter(Container)