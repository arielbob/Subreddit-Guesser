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

const Root = () => (
  <div>
    <ResultToast />
    <Score />
    <div className='game-container'>
      <HistoryCardList />
      <Question />
    </div>
  </div>
)

export default Root
