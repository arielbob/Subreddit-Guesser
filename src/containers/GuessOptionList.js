import { connect } from 'react-redux'
import {
  addGuess,
  changeQuestionId
} from '../actions'
import OptionList from '../components/OptionList'

const mapStateToProps = (state) => {
  const { subreddit } = state.questionsById[state.currentQuestionId] || {
    subreddit: ''
  }

  return {
    currentQuestionId: state.currentQuestionId,
    options: state.options,
    isVisible: !state.error || !state.isFetching,
    subreddit
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { currentQuestionId, subreddit, options, isVisible } = stateProps
  const { dispatch } = dispatchProps

  return {
    ...ownProps,
    options,
    isVisible,
    onClick: (guessValue) => {
      dispatch(addGuess(currentQuestionId, guessValue))
      dispatch(changeQuestionId(currentQuestionId + 1))
    }
  }
}

export default connect(mapStateToProps, null, mergeProps)(OptionList)
