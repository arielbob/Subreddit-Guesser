export const RANDOM_SUBREDDIT = 'RANDOM_SUBREDDIT'
export const INVALIDATE_IMAGE = 'INVALIDATE_IMAGE'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_FAIL = 'FETCH_POST_FAIL'
export const RECEIVE_UNSEEN = 'RECEIVE_UNSEEN'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const SET_IMAGE = 'SET_IMAGE'
export const SET_OPTIONS = 'SET_OPTIONS'
export const ADD_GUESS = 'ADD_GUESS'
export const MAKE_GUESS = 'MAKE_GUESS'

export const INCREMENT_SCORE = 'INCREMENT_SCORE'
export const RESET_SCORE = 'RESET_SCORE'

export const ADD_QUESTION_TO_HISTORY = 'ADD_QUESTION_TO_HISTORY'

export const SHOW_TOAST = 'SHOW_TOAST'
export const HIDE_TOAST = 'HIDE_TOAST'

export const RESET_GAME = 'RESET_GAME'

const SUBREDDITS = [
  'me_irl',
  'pics',
  'me_irl',
  'oldschoolcool',
  'designporn',
  'malefashion',
  'earthporn'
]

// TODO: implement guessing                             - DONE
// TODO: implement changing the question after guessing - DONE
// TODO: implement question history                     - DONE
//  probably should just be a new action that accepts as an argument state.question
//  action creator should also add a property of isCorrect
// TODO: implement toasts - DONE
// TODO: implement re-checking for posts if none are found - DONE
//  maybe just do while(!posts.length) rather than recursively?
// TODO: implement re-checking for posts if the image has already been seen - DONE
// TODO: add unique keys ot list elements in history - DONE
// TODO: add the ability to reset the game - DONE
// TODO: add error handling, especially in the fetchImagePost function - DONE
//  maybe do it so like if count > some big number, then err() or whatever it is in promises
// TODO: clean up error handling for fetchImagePost and add string constants - DONE
// TODO: go through TODO's in loadImageAndOptions() function - DONE
// TODO: convert functions to arrow functions - DONE
// TODO: remove unused constants, functions, etc. - DONE
// TODO: maybe change the reddit api request to get from hot instead of new? - DONE
//  would maybe filter out some inappropriate posts... lol

export const resetGame = () => (dispatch, getState) => {
  if (!getState().isFetching) {
    dispatch({ type: RESET_GAME })
  }
}

// we are fine in using this
// actions do not necessarily need to be pure
// i think it's just better if they are for testing or something
// but they aren't always pure which can be seen in the cases where we need random numbers or api calls
const randomElem = (arr) => (arr[Math.floor(Math.random() * arr.length)])

// TODO: implement sync actions
// export const selectRandomSubreddit = () => (dispatch, getState) => {
//   if (!getState().isFetching) {
//     dispatch({
//       type: RANDOM_SUBREDDIT,
//       subreddit: randomElem(SUBREDDITS)
//     })
//   }
// }

const generateOptions = (subreddit, numOptions) => {
  if (numOptions > SUBREDDITS.length) numOptions = SUBREDDITS.length

  let removeStr = (str) => (elem) => elem != str
  let options = []
  let subreddits = SUBREDDITS.filter(removeStr(subreddit))  // get new subreddit list without the correct subreddit
  let subIndex = Math.floor(Math.random() * numOptions)     // get a random index to put the correct subreddit into

  for (let i = 0; i < numOptions; i++) {
    if (i == subIndex) {
      options.push(subreddit)
    } else {
      let randSub = randomElem(subreddits)
      subreddits = subreddits.filter(removeStr(randSub))    // remove the selected sub from the eligible subreddit list
      options.push(randSub)
    }
  }

  return options
}

// i think this is good, since we aren't accessing state from within the function
// i.e. the action is still pure, ignoring the generateOptions() part
// instead of accessing state from within, we pass the subreddit as an argument,
// so now setOptions() is independent from the state
// TODO: maybe figure out a better name for this
// setOptions doesn't seem that intuitive
export const setOptions = (subreddit) => ({
  type: SET_OPTIONS,
  options: generateOptions(subreddit, 5)
})

// const addGuess = (guess) => ({
//   type: ADD_GUESS,
//   guess
// })

// export const makeGuess = (subreddit, guess) => (dispatch) => {
//   dispatch(addGuess(guess))
//   if (subreddit == guess) {
//     dispatch(displayToast('Correct!', 'green'))
//     dispatch(incrementScore())
//   } else {
//     dispatch(displayToast('You\'re wrong! The answer was /r/' + subreddit + '...', 'red'))
//   }
// }

// NOTE: not sure if that index thing is fine... lol
// seems good for now
// let questionIndex = 0;
// export const addQuestionToHistory = (imageUrl, subreddit, guess) => (dispatch, getState) => {
//   dispatch({
//     type: ADD_QUESTION_TO_HISTORY,
//     imageUrl,
//     subreddit,
//     guess,
//     index: getState().history.length
//   })
// }

// TODO: this might be weird since we just stop the last one from disappearing
// if we have two toasts overlapping then the second one will just replace the
// text of the first one, with no special animation
// we could fix this by having some type of array or object of current toasts
// with hideToast taking the id of the toast to hide
let toastTimeout;
const displayToast = (text, color, duration = 2000) => (dispatch) => {
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    dispatch(hideToast())
  }, duration)
  dispatch(showToast(text, color))
}

const showToast = (text, color) => ({
  type: SHOW_TOAST,
  text,
  color
})

const hideToast = () => ({
  type: HIDE_TOAST
})

const incrementScore = () => ({
  type: INCREMENT_SCORE
})

const resetScore = () => ({
  type: RESET_SCORE
})

// async actions

const fetchPosts = () => ({
  type: FETCH_POSTS
})

// export const invalidateImage = () => (dispatch, getState) => {
//   if (!getState().isFetching) {
//     dispatch({
//       type: INVALIDATE_IMAGE
//     })
//   }
// }

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})

// const shouldUpdateQuestion = state => {
//   const { isFetching, errorMessage } = state
//   let { imageUrl, isInvalidated } = state.question
//
//   // we check for errorMessage first since isFetching is set to false when we
//   // receive the FETCH_POSTS_FAIL action
//   // having isFetching first would cause an infinite loop due to the dispatch
//   // in componentDidUpdate in the Question container
//   // in essence, this forces us to handle the error before trying to fetch
//   // again
//   if (errorMessage) {
//     return false
//   } else if (isFetching) {
//     return false
//   } else if (!imageUrl) {
//     return true
//   } else {
//     return isInvalidated
//   }
// }

const imagePattern = /\.(jpe?g|png|gif)$/g
const fetchUnseenPosts = (subreddit, history, limit = 50, after, numTries = 20) => {
  return fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=${limit}&after=${after}`)
    .then(res => {
      if (!res.ok) throw Error(`Error ${res.status}`)
      return res
    })
    .then(res => res.json())
    .then(json => {
      let posts = json.data.children.filter(post => {
        let { over_18, url } = post.data
        return imagePattern.test(url) && !over_18;
      })

      const unseenPosts = posts.filter(post => {
        // try to find an entry in history with same image url
        // we only want to keep the post if it cannot find it, i.e. the image has not been seen yet
        return !history.find(question => question.imageUrl == post.data.url)
      })

      if (unseenPosts.length) {
        return unseenPosts
      } else {
        // if we didn't get any valid posts in the chunk we receive,
        // we search the next chunk which is delimited by the after property
        // the after property is the id of the last post of the chunk
        // so passing it into the api request will only give us posts after that post
        if (numTries == 0) throw new Error("Number of tries exceeded")
        const { after } = json.data
        return fetchUnseenPosts(subreddit, history, limit, after, --numTries)
      }
    })
}

// this could have not been a thunk and we could have just passed in the unseen array
// when dispatching this, but i don't think we want to rely on the action always
// just outright setting the cachedImages to the exact same array
// so instead, we use getState to get whatever new state was reduced from
// receiveUnseenImages(subreddit, unseen)
// const setRandomImage = (subreddit) => (dispatch, getState) => {
//   const imageUrl = randomElem(getState().cachedImagesBySubreddit[subreddit])
//   dispatch({
//     type: SET_IMAGE,
//     subreddit,
//     imageUrl
//   })
// }

const receiveUnseenImages = (subreddit, unseenImages) => ({
  type: RECEIVE_UNSEEN,
  subreddit,
  unseenImages
})

// TODO: maybe figure out a way to keep getting posts until the array in the cache
// has a certain number of entries? so that if we only get one image due to the other
// images already being seen... well actually, it would be the same number of requests,
// just at different times, so idk if it would actually help. oh well, just putting this
// here just in case it does

/**
 * Loads and sets a new image and creates the options for the current question.
 * Images are chosen from the cachedImagesBySubreddit object. If the array of cachedImages
 * for the given subreddit is empty, we fetch some new images that have not yet been seen.
 * We save that array in the cachedImages object and then we set a random image from the new
 * state.
 * @param { string } subreddit The current subreddit to load an image from.
 * @return { function } A thunk that dispatches actions for fetching and setting.
 */
// export const loadImageAndOptions = (subreddit) => (dispatch, getState) => {
//   if (shouldUpdateQuestion(getState())) {
//     const cachedImages = getState().cachedImagesBySubreddit[subreddit]
//
//     if (!cachedImages || !cachedImages.length) {
//       dispatch(fetchPosts())
//
//       fetchUnseenPosts(subreddit, getState().history)
//         .then(unseenPosts => {
//           const unseenImages = unseenPosts.map((post) => post.data.url)
//           dispatch(receiveUnseenImages(subreddit, unseenImages))
//           dispatch(setRandomImage(subreddit))
//         })
//         .catch(err => {
//           dispatch({
//             type: FETCH_POSTS_FAIL,
//             error: `There was an error fetching images.. (${err.message})`
//           })
//         })
//     } else {
//       dispatch(setRandomImage(subreddit))
//     }
//
//     dispatch(setOptions(subreddit))
//   }
// }

// BEGIN REFACTOR

export const addGuess = (index, guess) => (dispatch, getState) => {
  dispatch({
    type: ADD_GUESS,
    index,
    guess
  })

  const { subreddit } = getState().questions[index]
  if (subreddit == guess) {
    dispatch(displayToast('Correct!', 'green'))
    dispatch(incrementScore())
  } else {
    dispatch(displayToast('You\'re wrong! The answer was /r/' + subreddit + '...', 'red'))
  }
}

// we pass in subreddit here so that we can remove it from cachedImagesBySubreddit
const setRandomImage = (index, subreddit, images) => ({
    type: 'SET_IMAGE',
    imageUrl: randomElem(images),
    index,
    subreddit
})

export const loadImageForQuestion = (index) => (dispatch, getState) => {
  // TODO: maybe add error handling here?

  const { subreddit } = getState().questions[index]
  const cachedImages = getState().cachedImagesBySubreddit[subreddit]

  if (!cachedImages || !cachedImages.length) {
    dispatch(fetchPosts())

    // TODO: might want to splice out the index when passed into here?
    fetchUnseenPosts(subreddit, getState().questions)
      .then(posts => {
        const images = posts.map(post => post.data.url)
        dispatch(receiveUnseenImages(subreddit, images))    // put them in the cache
        dispatch(setRandomImage(index, subreddit, images))  // set the image for the question
      })
      .catch(err => {
        dispatch({
          type: FETCH_POSTS_FAIL,
          error: `There was an error fetching images.. (${err.message})`
        })
      })
  } else {
    dispatch(setRandomImage(index, subreddit, cachedImages))
  }
}

export const generateNewQuestion = () => {
  return {
    type: 'ADD_QUESTION',
    subreddit: randomElem(SUBREDDITS),
    imageUrl: null,
    guess: null
  }
}
