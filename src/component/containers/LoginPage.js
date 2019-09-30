import {LoginPage} from '../page/LoginPage'
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

export default connect(null, mapDispatchToProps)(LoginPage)


