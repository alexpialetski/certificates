import React from 'react';

import {App} from '../index'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setToken, setUser} from '../../actions'

const mapDispatchToProps = dispatch =>
    ({
        setUser(user) {
            dispatch(
                setUser(user)
            )
        },
        setToken(token) {
            dispatch(
                setToken(token)
            )
        }
    });

const Container = connect(null, mapDispatchToProps)(App);

export default withRouter(Container)