import React from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  loadImageAndOptions,
  resetErrorMessage
} from '../actions'
import NextButton from './NextButton'
import ResetButton from './ResetButton'
import GuessOptionList from './GuessOptionList'
import ErrorMessage from '../components/ErrorMessage'
import QuestionImage from '../components/QuestionImage'

class Question extends React.Component {
  componentDidMount() {
    const { dispatch, subreddit } = this.props
    dispatch(selectRandomSubreddit())
  }

  componentDidUpdate(prevProps) {
    // this won't loop infinitely since loadPostAndOptions only dispatches actions
    // when either an image doesn't exist or it's invalidated
    // we compare question only since our fetch conditions don't depend on isFetching
    // or error
    const { dispatch } = this.props
    const { subreddit } = this.props.question
    if (prevProps.question != this.props.question) {
      dispatch(loadImageAndOptions(subreddit))
    }
  }

  handleRetry() {
    const { dispatch } = this.props
    const { subreddit } = this.props.question

    dispatch(resetErrorMessage())
    dispatch(loadImageAndOptions(subreddit))
  }

  render() {
    const { dispatch, isFetching, error } = this.props
    const { imageUrl, subreddit } = this.props.question
    return (
      <div>
        {
          error ?
          <ErrorMessage message={error} onRetry={() => this.handleRetry()}/> :
          <div>
            {isFetching && <p>Loading...</p>}
            <QuestionImage imageUrl={imageUrl} isFetching={isFetching} />
            <NextButton />
            <ResetButton />
            <GuessOptionList />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
  isFetching: state.isFetching,
  error: state.errorMessage
})

export default connect(mapStateToProps)(Question)
