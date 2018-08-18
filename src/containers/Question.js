import React from 'react'
import { connect } from 'react-redux'
import {
  addNewQuestion,
  generateNewQuestion,
  loadImageForQuestion,
  setOptions,
  resetErrorMessage,
  changeQuestionId
} from '../actions'
import QuestionImage from '../components/QuestionImage'

class Question extends React.Component {
  componentDidMount() {
    const { dispatch, currentQuestionId } = this.props
    dispatch(addNewQuestion(currentQuestionId))
    this.populateQuestionAndOptions(currentQuestionId)
  }

  componentDidUpdate(prevProps) {
    // now this container is no longer just a container that gets the last question
    // in the array. instead, it has its own questionId which is used to index the
    // questions array
    // we now have more freedom to choose which question we would like to view
    // which will also allow us to easily add question changing features in the future

    // the way new questions are added is that currentQuestionId is changed
    // if there is no question at that id, then we add that id to questionIds and
    // generate a new question at questionsById[id]
    const { dispatch, currentQuestionId, question } = this.props
    if (!this.props.question) {
      dispatch(addNewQuestion(currentQuestionId))
      this.populateQuestionAndOptions(currentQuestionId)
    }
  }

  populateQuestionAndOptions(id) {
    const { dispatch } = this.props
    dispatch(generateNewQuestion(id))
    dispatch(loadImageForQuestion(id))
    dispatch(setOptions(id))
  }

  handleRetry() {
    const { dispatch, currentQuestionId } = this.props
    dispatch(resetErrorMessage())
    this.populateQuestionAndOptions(currentQuestionId)
  }

  render() {
    const { isFetching, error } = this.props
    const { imageUrl } = this.props.question || {
      imageUrl: ''
    }

    return (
      <section className='question'>
        <QuestionImage
          src={imageUrl}
          isFetching={isFetching}
          error={error}
          onRetryClick={() => this.handleRetry()} />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  currentQuestionId: state.currentQuestionId,
  question: state.questionsById[state.currentQuestionId],
  isFetching: state.isFetching,
  error: state.errorMessage
})

export default connect(mapStateToProps)(Question)
