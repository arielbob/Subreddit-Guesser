import React from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  loadImageAndOptions,
  resetErrorMessage
} from '../actions'
import NextButton from './NextButton'
import GuessOptionList from './GuessOptionList'
import QuestionImage from '../components/QuestionImage'

class Question extends React.Component {
  componentDidMount() {
    const { dispatch, subreddit } = this.props
    dispatch(selectRandomSubreddit())
  }

  componentDidUpdate(prevProps) {
    // this won't loop infinitely since loadPostAndOptions only dispatches actions
    // when either an image doesn't exist or it's invalidated
    const { dispatch } = this.props
    const { subreddit } = this.props.question
    // we compare the whole question object rather than just the subreddit
    // since it's possible for the same subreddit to be selected consecutively
    if (prevProps.question != this.props.question) {
      dispatch(loadImageAndOptions(subreddit))
    }
  }

  handleRetry() {
    const { dispatch } = this.props
    const { subreddit } = this.props.question

    dispatch(resetErrorMessage())
    dispatch(selectRandomSubreddit())
  }

  render() {
    const { dispatch, isFetching, error } = this.props
    const { imageUrl, subreddit } = this.props.question
    return (
      <div className='question'>
        <QuestionImage
          src={imageUrl}
          isFetching={isFetching}
          error={error}
          onRetryClick={() => this.handleRetry()} />
        {
          error || isFetching ?
          null :
          <div>
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
