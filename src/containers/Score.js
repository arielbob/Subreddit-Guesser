import React from 'react'
import { connect } from 'react-redux'

const Score = ({ score }) => {
  return (
    <div className='score'>
      <p className='score__title'>Score</p>
      <p className='score__text'>{score}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export default connect(mapStateToProps)(Score)
