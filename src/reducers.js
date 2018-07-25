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

// state = {
//   currentImage: 'http://www.imgur.com/blah.png',
//   currentSubreddit: 'me_irl',
//   score: 0,
//   seenImages: ['http://www.imgur.com/hehe.png', ...],
//   isFetching: false
// }

// function rootReducer(state = {
//   currentImage: '',
//   currentSubreddit: '',
//   score: 0,
//   seenImages: [],
//   isFetching: false
// }, action) {
//   switch(action.type) {
//     case CHANGE_SUBREDDIT:
//       return Object.assign({}, state, { currentSubreddit: action.subreddit })
//     default:
//       return state
//   }
// }

// function currentImage(state = '', action) {
//   switch (action.type) {
//     case RECEIVE_IMAGE:
//       return action.imageUrl
//     default:
//       return state
//   }
// }
//
// function currentSubreddit(state = '', action) {
//   switch (action.type) {
//     case RANDOM_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }

function errorMessage(state = '', action) {
  const { type, error } = action

  if (action.type == RESET_ERROR_MESSAGE) return ''

  if (action.error) {
    return action.error
  }

  return state
}

// TODO: maybe try and figure out some way to make sure the two keys are associated
// with each other, for example, we don't want the image to change if the subreddit
// is still the same as the last question; this would mean that the subreddit is now
// stale
const initialQuestionState = {
  imageUrl: '',
  subreddit: '',
  isInvalidated: false
}
function question(state = initialQuestionState, action) {
  switch (action.type) {
    case RANDOM_SUBREDDIT:
      return Object.assign({}, state, {
        subreddit: action.subreddit
      })
    case SET_IMAGE:
      return Object.assign({}, state, {
        imageUrl: action.imageUrl,
        isInvalidated: false
      })
    case INVALIDATE_IMAGE:
      return Object.assign({}, state, {
        isInvalidated: true
      })
    case RESET_GAME:
      return initialQuestionState
    default:
      return state
  }
}

// TODO: replace RECEIVE_IMAGE in question() to SET_IMAGE
// and maybe rename RECEIVE_IMAGE to RECEIVE_IMAGES
// or maybe use something like SET_UNSEEN

// loadAndSetImage(subreddit) {
//   is the cachedImagesBySubreddit[subreddit].length == 0 ?
//     // fetchUnseenImages dispatches fetchImage()
//     fetchUnseenImages(subreddit).then((images) => {
//       setUnseenPosts(subreddit, posts)
//       dispatch(randomElem())
//     })
//   else {
//     dispatch(setImage())
//   }
// }

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
function history(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION_TO_HISTORY:
      return ([{
        imageUrl: action.imageUrl,
        subreddit: action.subreddit,
        guess: action.guess,
        index: action.index
      }].concat(state))
    case RESET_GAME:
      return []
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
  question,
  cachedImagesBySubreddit,
  options,
  score,
  history,
  isFetching,
  isToastVisible,
  toast,
  errorMessage
})

export default rootReducer
