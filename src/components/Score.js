import React from 'react'

const Score = ({ score }) => {
  return (
    <div className='score'>
      <p className='score__title'>Score</p>
      <p className='score__text'>{score}</p>
    </div>
  )
}

export default Score
