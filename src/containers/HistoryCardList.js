import { connect } from 'react-redux'
import CardList from '../components/CardList'

// FIXME: for some REASON this component UPDATES when the toast appears/disappears! it's so strange!
const mapStateToProps = (state) => {
  const { questionIds, currentQuestionId, questionsById } = state
  const history = questionIds
    .filter(id => id != currentQuestionId)
    .map(id => questionsById[id])
    .reverse()

  return {
    history
  }
}

export default connect(mapStateToProps)(CardList)
