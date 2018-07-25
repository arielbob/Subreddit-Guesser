// import { createStore, applyMiddleware } from 'redux'
// import { createLogger } from 'redux-logger'
// import rootReducer from './reducers'
// import {
//   loadRandomPost,
//   selectRandomSubreddit,
//   setOptions,
//   makeGuess
// } from './actions'
//
// const loggerMiddleware = createLogger()
// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     loggerMiddleware
//   )
// )
//
// store.dispatch(selectRandomSubreddit())
// // TODO: i think i'll have to figure out how i can get the state using redux functions when i implement react components
// // since i don't think we want the components to have access to the store object itself; we only want it to have access
// // to the actual state object
// let { question } = store.getState()
// loadRandomPost(store.dispatch, question.subreddit, 10)
// store.dispatch(setOptions(question.subreddit))
// makeGuess(store.dispatch, question.subreddit, 'me_irl')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './containers/Root'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {
  selectRandomSubreddit
} from './actions'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
