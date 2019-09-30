import React from 'react';

import Footer from '../core/certificate/Footer'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addError, addSuccessMessage, paginate, setUpCertificates, updateUserCertificates} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        user: state.user,
        router: props.router,
        userCertificates: state.userCertificates
    });

const mapDispatchToProps = dispatch =>
    ({
        addSuccessMessage(message) {
            dispatch(
                addSuccessMessage(message)
            )
        },
        addError(message) {
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