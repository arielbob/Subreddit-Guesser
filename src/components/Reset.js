import React from 'react'
import PropTypes from 'prop-types'

const Reset = ({ onResetClick }) => {
  return (
    <div className='reset'>
      <button className='reset__btn' onClick={() => onResetClick()}>Reset</button>
    </div>
  )
}

Reset.propTypes = {
  onResetClick: PropTypes.func.isRequired
}

export default Reset
