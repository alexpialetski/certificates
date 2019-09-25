import Search from '../core/Search'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    changeFilterBody,
    changeSearchVariable, clearFilterBody,
    paginate,
    setCurrentCertificates,
    setUpCertificates,
    showUserCertificates
} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        user: state.user,
        certificates: state.currentCertificates,
        userCertificates: state.userCertificates,
        search: state.search,
        router: props.router
    });

const mapDispatchToProps = dispatch =>
    ({
        setSearch(value) {
            dispatch(
                changeSearchVariable(value)
            )
        },
        setFilterBody(value) {
            dispatch(
                changeFilterBody(value)
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
        },
        setCurrentCertificates(certificates) {
            dispatch(
                setCurrentCertificates(certificates)
            )
        },
        clearFilterBody (certificates) {
            dispatch(
                clearFilterBody(certificates)
            )
        },
        showUserCertificates(value){
            dispatch(
                showUserCertificates(value)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Search);

export default withRouter(Container)


