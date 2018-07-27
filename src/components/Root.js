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
import QuestionHistory from '../containers/QuestionHistory'
import ResultToast from '../containers/ResultToast'

const Root = () => (
  <div>
    <ResultToast />
    <Score />
    <Question />
    <QuestionHistory />
  </div>
)

export default Root
