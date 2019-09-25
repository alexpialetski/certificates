import React from 'react';

import {Header} from '../core/Header'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser} from '../../actions'

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
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(Container)