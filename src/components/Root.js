import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectRandomSubreddit,
  loadRandomPost,
  setOptions,
  makeGuess,
  invalidateImage
} from '../actions'
import Question from '../containers/Question'
import Score from '../containers/Score'
import HistoryCardList from '../containers/HistoryCardList'
import ResultToast from '../containers/ResultToast'
import ResetButton from '../containers/ResetButton'

const Root = () => (
  <div>
    <ResultToast />
    <Score />
    <div className='game-container'>
      <h2 className='game-container__history-title'>History</h2>
      <h2 className='game-container__question-title'>Whence does this come?</h2>
      <HistoryCardList />
      <Question />
      <ResetButton />
    </div>
  </div>
)

export default Root
