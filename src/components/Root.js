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
import GuessOptionList from '../containers/GuessOptionList'
import Score from '../containers/Score'
import HistoryCardList from '../containers/HistoryCardList'
import ResultToast from '../containers/ResultToast'
import ResetButton from '../containers/ResetButton'

const Root = () => (
  <div>
    <ResultToast />
    <div className='game-container'>
      <h2 className='game-container__history-title'>History</h2>
      <h2 className='game-container__question-title'>Whence does this come?</h2>
      <section>
        <Score />
        <HistoryCardList />
      </section>
      <Question />
      <ResetButton />
      <GuessOptionList />
    </div>
  </div>
)

export default Root
