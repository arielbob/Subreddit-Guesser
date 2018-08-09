import { connect } from 'react-redux'
import CardList from '../components/CardList'

const mapStateToProps = (state) => ({
  history: state.history
})

export default connect(mapStateToProps)(CardList)
