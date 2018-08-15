import { connect } from 'react-redux'
import {
  makeGuess,
  invalidateImage,
  selectRandomSubreddit,
  addQuestionToHistory
} from '../actions'
import OptionList from '../components/OptionList'

const mapStateToProps = (state) => {
  return {
    imageUrl: state.question.imageUrl,
    subreddit: state.question.subreddit,
    options: state.options,
    isVisible: !state.error || !state.isFetching,
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { options, isVisible, subreddit, imageUrl } = stateProps
  const { dispatch } = dispatchProps

  return {
    ...ownProps,
    options,
    isVisible,
    onClick: (guessValue) => {
      dispatch(makeGuess(subreddit, guessValue))
      dispatch(addQuestionToHistory(imageUrl, subreddit, guessValue))
      dispatch(selectRandomSubreddit())
      dispatch(invalidateImage())
    }
  }
}

export default connect(mapStateToProps, null, mergeProps)(OptionList)
