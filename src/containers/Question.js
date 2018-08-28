import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addNewQuestion,
  generateNewQuestion,
  loadImageForQuestion,
  setOptions,
  resetErrorMessage,
  changeQuestionId
} from '../actions'
import QuestionImage from '../components/QuestionImage'

export class Question extends React.Component {
  componentDidMount() {
    const { addNewQuestion, currentQuestionId } = this.props
    addNewQuestion(currentQuestionId)
    this._populateQuestionAndOptions(currentQuestionId)
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
    const { addNewQuestion, currentQuestionId, question } = this.props
    if (!question) {
      addNewQuestion(currentQuestionId)
      this._populateQuestionAndOptions(currentQuestionId)
    }
  }

  _populateQuestionAndOptions(id) {
    const { generateNewQuestion, loadImageForQuestion, setOptions } = this.props
    generateNewQuestion(id)
    loadImageForQuestion(id)
    setOptions(id)
  }

  handleRetry() {
    const { resetErrorMessage, currentQuestionId } = this.props
    resetErrorMessage()
    this._populateQuestionAndOptions(currentQuestionId)
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addNewQuestion,
  generateNewQuestion,
  loadImageForQuestion,
  setOptions,
  resetErrorMessage,
  changeQuestionId
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Question)
