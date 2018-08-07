import React from 'react'
import { connect } from 'react-redux'
import {
  resetGame,
  selectRandomSubreddit
} from '../actions'

const ResetButton = ({ handleResetClick }) => {
  return (
    <button className='reset-btn' onClick={() => handleResetClick()}>Reset</button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleResetClick: () => {
    dispatch(resetGame())
    dispatch(selectRandomSubreddit())
  }
})

export default connect(null, mapDispatchToProps)(ResetButton)
