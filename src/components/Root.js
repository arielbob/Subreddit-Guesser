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
    <div className='game-container'>
      <section>
        <h2 className='game-container__history-title'>History</h2>
        <Score />
        <HistoryCardList />
        <ResetButton />
      </section>
      <section>
        <h2 className='game-container__question-title'>Whence does this come?</h2>
        <Question />
      </section>
    </div>
  </div>
)

export default Root
