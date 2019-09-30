import React from 'react';

import {Header} from '../core/Header'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearToken, clearUser} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        user: state.user
    });

const mapDispatchToProps = dispatch =>
    ({
        clearUser() {
            dispatch(
                clearUser()
            )
        },
        clearToken() {
            dispatch(
                clearToken()
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(Container)