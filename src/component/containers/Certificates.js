import Certificates from '../core/certificate/Certificates'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {paginate, setUpCertificates, updateUserCertificates} from '../../actions'

const mapStateToProps = (state, props) =>
    ({
        certificates: state.currentCertificates,
        userCertificates: state.userCertificates,
        router: props.router,
        user: state.user
    });

const mapDispatchToProps = dispatch =>
    ({
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

const Container = connect(mapStateToProps, mapDispatchToProps)(Certificates);

export default withRouter(Container)


