import React from 'react'
import { connect } from 'react-redux'
import {
  resetGame
} from '../actions'

const ResetButton = ({ handleResetClick }) => {
  return (
    <div className='reset'>
      <button className='reset__btn' onClick={() => handleResetClick()}>Reset</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleResetClick: () => {
    dispatch(resetGame())
  }
})

export default connect(null, mapDispatchToProps)(ResetButton)
