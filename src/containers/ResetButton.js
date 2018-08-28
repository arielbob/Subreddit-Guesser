import { connect } from 'react-redux'
import {
  resetGame
} from '../actions'
import Reset from '../components/Reset'

const mapDispatchToProps = (dispatch) => ({
  handleResetClick: () => {
    dispatch(resetGame())
  }
})

export default connect(null, mapDispatchToProps)(Reset)
