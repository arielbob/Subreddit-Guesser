import React from 'react'
import { connect } from 'react-redux'

const Score = ({ score }) => {
  return (
    <h2>{score}</h2>
  )
}

const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export default connect(mapStateToProps)(Score)
