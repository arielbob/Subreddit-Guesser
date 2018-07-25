import React from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  // loadPostAndOptions
  loadImageAndOptions,
  resetErrorMessage
} from '../actions'
import NextButton from './NextButton'
import ResetButton from './ResetButton'
import GuessOptionList from './GuessOptionList'
import ErrorMessage from '../components/ErrorMessage'

class Question extends React.Component {
  componentDidMount() {
    const { dispatch, subreddit } = this.props
    dispatch(selectRandomSubreddit())
  }

  componentDidUpdate(prevProps) {
    // this won't loop infinitely since loadPostAndOptions only dispatches actions
    // when either an image doesn't exist or it's invalidated
    // we don't just compare question.subreddit from prevProps to the one in
    // props since it is possible that the same subreddit is chosen multiple times
    // in a row

    const { dispatch } = this.props
    const { subreddit } = this.props.question
    // NOTE: might not need that !imageUrl check, since it already checks it in the thunk
    // i guess this stops us from dispatching a thunk, but it's really the same thing
    // since no action object is actually dispatched if it shouldn't fetch
    if (prevProps.question != this.props.question) {
      dispatch(loadImageAndOptions(subreddit))
    }
    // dispatch(loadPostAndOptions(subreddit))
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
            <img src={imageUrl} style={{
              height: '300px',
              width: 'auto',
              opacity: isFetching ? '0.5' : '1'
            }}></img>
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
