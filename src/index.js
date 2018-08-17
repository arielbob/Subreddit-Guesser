import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './components/Root'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {
  selectRandomSubreddit
} from './actions'

import normalize from 'normalize.css'
import style from './styles/style.scss'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
)

// import { generateNewQuestion, loadImageForQuestion, addGuess, changeQuestionId, resetGame } from './actions'
// let currentQuestionId = store.getState().currentQuestionId
// store.dispatch(generateNewQuestion(currentQuestionId))
// store.dispatch(loadImageForQuestion(currentQuestionId))
// store.dispatch(addGuess(currentQuestionId, 'malefashion'))
//
// setTimeout(() => {
//   store.dispatch(changeQuestionId(currentQuestionId + 1))
//   currentQuestionId = store.getState().currentQuestionId
//   store.dispatch(generateNewQuestion(currentQuestionId))
//   store.dispatch(loadImageForQuestion(currentQuestionId))
//   store.dispatch(addGuess(currentQuestionId, 'me_irl'))
// }, 2000)
//
// setTimeout(() => {
//   store.dispatch(changeQuestionId(currentQuestionId + 1))
//   currentQuestionId = store.getState().currentQuestionId
//   store.dispatch(generateNewQuestion(currentQuestionId))
//   store.dispatch(resetGame())
// }, 4000)

// TODO: refactor containers and components to use new state
render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
