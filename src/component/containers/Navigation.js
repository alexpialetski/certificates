import React from 'react';

import Navigation from '../core/Navigation'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {paginate, changePerPage} from '../../actions'

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
                changePerPage(number)
            )
        },
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default withRouter(Container)