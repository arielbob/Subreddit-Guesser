import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score }) => {
  return (
    <div className='score'>
      <p className='score__title'>Score</p>
      <p className='score__text'>{score}</p>
    </div>
  )
}

Score.propTypes = {
  score: PropTypes.number.isRequired
}

export default Score
