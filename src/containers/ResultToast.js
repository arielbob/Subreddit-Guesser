import { connect } from 'react-redux'
import Toast from '../components/Toast'

const mapStateToProps = (state) => {
  return {
    isVisible: state.isToastVisible,
    text: state.toast.text,
    color: state.toast.color
  }
}

export default connect(mapStateToProps)(Toast)
