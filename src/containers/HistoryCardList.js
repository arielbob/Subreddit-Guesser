import { connect } from 'react-redux'
import CardList from '../components/CardList'

// we should have an array storing the correct order of the questions
// but this should be fine for now since right now the question IDs go up in the
// same order that they are added
const mapStateToProps = ({ questions }) => ({
  history: Object.values(questions).slice(0, questions.length - 1).reverse()
})

export default connect(mapStateToProps)(CardList)
