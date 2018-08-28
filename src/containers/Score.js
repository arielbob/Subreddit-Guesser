import { connect } from 'react-redux'
import Score from '../components/Score'

const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export default connect(mapStateToProps)(Score)
