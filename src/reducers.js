import { combineReducers } from 'redux'

import {
  ADD_QUESTION,
  CHANGE_QUESTION_ID,
  FETCH_POSTS,
  FETCH_POSTS_FAIL,
  RECEIVE_UNSEEN,
  RESET_ERROR_MESSAGE,
  RESET_GAME,
  SET_IMAGE,
  SET_OPTIONS,
  ADD_GUESS,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  SHOW_TOAST,
  HIDE_TOAST
  } from './actions'

function errorMessage(state = '', action) {
  const { type, error } = action

  switch (type) {
    case RESET_ERROR_MESSAGE:
    case RESET_GAME:
      return ''
  }

  if (error) return error

  return state
}

function currentQuestionId(state = 0, action) {
  switch (action.type) {
    case CHANGE_QUESTION_ID:
      return action.id
    case RESET_GAME:
      return 0
    default:
      return state
  }
}

function question(state = {
  subreddit: '',
  imageUrl: '',
  guess: '',
  id: null
}, action) {
  let newState
  switch (action.type) {
    case ADD_QUESTION:
      return {
        subreddit: action.subreddit,
        imageUrl: action.imageUrl,
        guess: action.guess,
        id: action.id
      }
    case ADD_GUESS:
      newState = Object.assign({}, state, {
        guess: action.guess
      })
      return newState
    case SET_IMAGE:
      newState = Object.assign({}, state, {
        imageUrl: action.imageUrl
      })
      return newState
    default:
      return state
  }
}

// we use an object to hold each question object with the key being the id of the question
// indexing questions is much simpler + faster this way and allows us to easily prevent
// race conditions with fetches
function questionsById(state = {}, action) {
  switch (action.type) {
    case ADD_GUESS:
    case ADD_QUESTION:
    case SET_IMAGE:
      let newState = Object.assign({}, state)
      newState[action.id] = question(newState[action.id], action)
      return newState
    case RESET_GAME:
      return {}
    default:
      return state
  }
}

function questionIds(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return state.concat(action.id)
    case RESET_GAME:
      return []
    default:
      return state
  }
}

function cachedImagesBySubreddit(state = {}, action) {
  let newState
  switch (action.type) {
    case RECEIVE_UNSEEN:
      newState = Object.assign({}, state)
      newState[action.subreddit] = action.unseenImages
      return newState
    case SET_IMAGE:
      // remove the image that's being displayed from the cachedImages
      // NOTE: we could also do this when it's being added to the history...
      newState = Object.assign({}, state)
      newState[action.subreddit] = newState[action.subreddit].filter((imageUrl) => {
        return imageUrl !== action.imageUrl
      })
      return newState
    case RESET_GAME:
    // QUESTION: should we reset the cache when the game resets?
    // actually, cache should be fine, but it's just that the history is reset
    // and that's how we knew what images hadn't been seen, but i think it's fine...
    default:
      return state
  }
}

function options(state = [], action) {
  switch (action.type) {
    case SET_OPTIONS:
      return action.options
    default:
      return state
  }
}

function score(state = 0, action) {
  switch (action.type) {
    case INCREMENT_SCORE:
      return state + 1
    case DECREMENT_SCORE:
      return state - 1;
    case RESET_GAME:
      return 0
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return true
    case RECEIVE_UNSEEN:
    case FETCH_POSTS_FAIL:
      return false
    default:
      return state
  }
}

function isToastVisible(state = false, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return true
    case HIDE_TOAST:
      return false
    default:
      return state
  }
}

function toast(state = {
  text: '',
  color: '',
  duration: 1000
}, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        text: action.text,
        color: action.color
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentQuestionId,
  questionsById,
  questionIds,
  cachedImagesBySubreddit,
  options,
  score,
  isFetching,
  isToastVisible,
  toast,
  errorMessage
})

export default rootReducer
