import React from 'react'
import { connect } from 'react-redux'
import {
  generateNewQuestion,
  loadImageForQuestion,
  setOptions,
  resetErrorMessage,
  changeQuestionId
} from '../actions'
import QuestionImage from '../components/QuestionImage'

class Question extends React.Component {
  componentDidMount() {
    this.createNewQuestion()
  }

  componentDidUpdate(prevProps) {
    // now this container is no longer just a container that gets the last question
    // in the array. instead, it has its own questionId which is used to index the
    // questions array
    // we now have more freedom to choose which question we would like to view
    // which will also allow us to easily add question changing features in the future
    const { dispatch, currentQuestionId, question } = this.props
    if (!this.props.question) this.createNewQuestion()
  }

  handleRetry() {
    dispatch(resetErrorMessage())
    this.createNewQuestion()
  }

  createNewQuestion() {
    const { dispatch, currentQuestionId, question } = this.props
    dispatch(generateNewQuestion(currentQuestionId))
    dispatch(loadImageForQuestion(currentQuestionId))
    dispatch(setOptions(currentQuestionId))
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
