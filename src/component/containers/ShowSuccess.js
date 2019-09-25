import ShowSuccessfulMessages from '../core/ShowSuccessfulMessages'
import {clearError, clearSuccessMessage} from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		success: state.successMessage
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onClearSuccess(index) {
			dispatch(
				clearSuccessMessage(index)
			)
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(ShowSuccessfulMessages)
