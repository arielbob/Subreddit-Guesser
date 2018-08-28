import React from 'react'

const Reset = ({ handleResetClick }) => {
  return (
    <div className='reset'>
      <button className='reset__btn' onClick={() => handleResetClick()}>Reset</button>
    </div>
  )
}

export default Reset
