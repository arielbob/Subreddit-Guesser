import { connect } from 'react-redux'
import CardList from '../components/CardList'

const mapStateToProps = ({ questions }) => ({
  history: questions.slice(0, questions.length - 1)
})

export default connect(mapStateToProps)(CardList)
