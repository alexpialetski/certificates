import React from 'react';

import Navigation from '../core/Navigation'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {paginate} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        quantity: state.quantityOfPages,
        currentPage: state.pageNumber,
        certificatesPerPage: state.entitiesPerPage
    });

const mapDispatchToProps = dispatch =>
    ({
        paginate(pageNumber) {
            dispatch(
                paginate(pageNumber)
            )
        },
        setCertificatesPerPage(number) {
            dispatch(
                paginate(number)
            )
        },
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default withRouter(Container)