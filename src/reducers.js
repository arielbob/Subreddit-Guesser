import { combineReducers } from 'redux'

import {
  RANDOM_SUBREDDIT,
  FETCH_POSTS,
  FETCH_POSTS_FAIL,
  RECEIVE_UNSEEN,
  INVALIDATE_IMAGE,
  SET_IMAGE,
  SET_OPTIONS,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  RESET_SCORE,
  ADD_QUESTION_TO_HISTORY,
  SHOW_TOAST,
  HIDE_TOAST,
  RESET_GAME,
  RESET_ERROR_MESSAGE
} from './actions'

// state = {
//   question: {
//     image: 'http://www.imgur.com/blah.png',
//     subreddit: 'me_irl'
//   },
//   options: ['me_irl', 'pics', ...],
//   score: 0,
//   prevQuestions: [
//     {
//       image: 'http://www.imgur.com/prevblah.png',
//       subreddit: 'pics',
//       guess: 'me_irl'
//     },
//     ...
//   ],
//   isFetching: false
// }

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

// TODO: maybe try and figure out some way to make sure the two keys are associated
// with each other, for example, we don't want the image to change if the subreddit
// is still the same as the last question; this would mean that the subreddit is now
// stale
// const initialQuestionState = {
//   imageUrl: '',
//   subreddit: '',
//   isInvalidated: false
// }
// function question(state = initialQuestionState, action) {
//   switch (action.type) {
//     case RANDOM_SUBREDDIT:
//       return Object.assign({}, state, {
//         subreddit: action.subreddit
//       })
//     case SET_IMAGE:
//       return Object.assign({}, state, {
//         imageUrl: action.imageUrl,
//         isInvalidated: false
//       })
//     case INVALIDATE_IMAGE:
//       return Object.assign({}, state, {
//         isInvalidated: true
//       })
//     case RESET_GAME:
//       return initialQuestionState
//     default:
//       return state
//   }
// }

// BEGIN REFACTOR

function numQuestions(state = 0, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return state + 1;
    case RESET_GAME:
      return 0;
    default:
      return state;
  }
}

function questions(state = [], action) {
  switch (action.type) {
    case 'ADD_GUESS':
      return state.map(question => {
        if (question.index == action.index) {
          return Object.assign({}, question, {
            guess: action.guess
          })
        }
        return question
      })
    case 'ADD_QUESTION':
      return state.concat({
        subreddit: action.subreddit,
        imageUrl: action.imageUrl,
        guess: action.guess,
        index: state.length
      })
    case 'SET_IMAGE':
      return state.map(question => {
        if (question.index == action.index) {
          return Object.assign({}, question, {
            imageUrl: action.imageUrl
          })
        }
        return question
      })
    case RESET_GAME:
      return []
    default:
      return state
  }
}

// END REFACTOR

function cachedImagesBySubreddit(state = {}, action) {
  let newState;
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

// TODO: might want to add an id key here
// NOTE: new questions are added to the start of the array
// this just helps with rendering the list in reverse chronological order
// function history(state = [], action) {
//   switch (action.type) {
//     case ADD_QUESTION_TO_HISTORY:
//       return ([{
//         imageUrl: action.imageUrl,
//         subreddit: action.subreddit,
//         guess: action.guess,
//         index: action.index
//       }].concat(state))
//     case RESET_GAME:
//       return []
//     default:
//       return state
//   }
// }

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
  numQuestions,
  questions,
  cachedImagesBySubreddit,
  options,
  score,
  isFetching,
  isToastVisible,
  toast,
  errorMessage
})

export default rootReducer
