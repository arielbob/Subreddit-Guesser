import React from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  invalidateImage
} from '../actions'

class NextButton extends React.Component {
  handleNextClick() {
    let { dispatch } = this.props
    dispatch(selectRandomSubreddit())
    dispatch(invalidateImage())
  }

  render() {
    return (
      <button style={{display: 'block'}} onClick={() => this.handleNextClick()}>Next Question</button>
    )
  }
}

export default connect()(NextButton)
