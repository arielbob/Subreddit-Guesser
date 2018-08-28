import { connect } from 'react-redux'
import Score from '../components/Score'

const mapStateToProps = (state) => ({
  score: state.score
})

export default connect(mapStateToProps)(Score)
