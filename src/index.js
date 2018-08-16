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

import { generateNewQuestion, loadImageForQuestion, addGuess, resetGame } from './actions'
store.dispatch(generateNewQuestion())
let index = store.getState().numQuestions - 1
store.dispatch(loadImageForQuestion(index))
store.dispatch(addGuess(index, 'malefashion'))

setTimeout(() => {
  store.dispatch(generateNewQuestion())
  index = store.getState().numQuestions - 1
  store.dispatch(loadImageForQuestion(index))
  store.dispatch(addGuess(index, 'me_irl'))
}, 2000)

setTimeout(() => {
  index = store.getState().numQuestions - 1
  store.dispatch(generateNewQuestion())
  store.dispatch(resetGame())
}, 4000)

// render(
//   <Provider store={store}>
//     <Root />
//   </Provider>,
//   document.getElementById('root')
// )
