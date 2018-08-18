import { connect } from 'react-redux'
import CardList from '../components/CardList'

const mapStateToProps = ({ questionIds, currentQuestionId, questionsById }) => ({
  questionIds,
  currentQuestionId,
  questionsById
})

export default connect(mapStateToProps)(CardList)
