import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  loadRandomPost,
  setOptions,
  makeGuess,
  invalidateImage
} from '../actions'
import Question from './Question'
import Score from './Score'
import QuestionHistory from './QuestionHistory'
import ResultToast from './ResultToast'

// function newQuestion(dispatch) {
//   dispatch(selectRandomSubreddit())
//   dispatch(loadRandomPost())
// }

// TODO: convert to functional component if possible
class Root extends Component {
  componentDidMount() {
    // this.props.dispatch(selectRandomSubreddit())
  }

  render() {
    return (
      <div>
        <ResultToast />
        <Score />
        <Question />
        <QuestionHistory />
      </div>
    )
  }
}

export default connect()(Root)
