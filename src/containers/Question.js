import React from 'react'
import { connect } from 'react-redux'
import {
  generateNewQuestion,
  selectRandomSubreddit,
  loadImageAndOptions,
  resetErrorMessage
} from '../actions'
import NextButton from './NextButton'
import QuestionImage from '../components/QuestionImage'

class Question extends React.Component {
  componentDidMount() {
    // might not need this
    this.props.dispatch(generateNewQuestion(currentQuestionId))
  }

  componentDidUpdate(prevProps) {
    // now this container is no longer just a container that gets the last question
    // in the array. instead, it has its own questionId which is used to index the
    // questions array
    // we now have more freedom to choose which question we would like to view
    // which will also allow us to easily add question changing features in the future
    const { dispatch, currentQuestionId, question } = this.props
    if (currentQuestionId != prevProps.currentQuestionId) {
      if (!this.props.question) {
        dispatch(generateNewQuestion(currentQuestionId))
      }
      // TODO: should check in function if it needs an image
      dispatch(loadImageForQuestion(currentQuestionId))
    }
  }

  handleRetry() {
    const { dispatch, currentQuestionId } = this.props
    dispatch(resetErrorMessage())
    dispatch(generateNewQuestion(currentQuestionId))
    dispatch(loadImageForQuestion(currentQuestionId))
  }

  render() {
    const { dispatch, isFetching, error } = this.props
    const { imageUrl } = this.props.question
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
