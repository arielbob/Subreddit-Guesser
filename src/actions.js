import {
  ADD_QUESTION,
  GENERATE_QUESTION,
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
} from './constants/actionTypes'
import SUBREDDITS from './constants/subreddits'

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

// we are fine in using this
// actions do not necessarily need to be pure
// i think it's just better if they are for testing or something
// but they aren't always pure which can be seen in the cases where we need random numbers or api calls
const randomElem = (arr) => (arr[Math.floor(Math.random() * arr.length)])

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

export const resetGame = () => (dispatch, getState) => {
  if (!getState().isFetching) {
    dispatch({ type: RESET_GAME })
  }
}

export const addNewQuestion = (id) => ({
  type: ADD_QUESTION,
  id
})

export const generateNewQuestion = (id) => {
  return {
    type: GENERATE_QUESTION,
    subreddit: randomElem(SUBREDDITS),
    imageUrl: null,
    guess: null,
    id
  }
}

export const setOptions = (id) => (dispatch, getState) => {
  const { subreddit } = getState().questionsById[id] || {
    subreddit: ''
  }

  dispatch({
    type: SET_OPTIONS,
    options: generateOptions(subreddit, 5)
  })
}

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

export const changeQuestionId = (id) => {
  return {
    type: CHANGE_QUESTION_ID,
    id
  }
}

export const addGuess = (id, guess) => (dispatch, getState) => {
  dispatch({
    type: ADD_GUESS,
    id,
    guess
  })

  const { subreddit } = getState().questionsById[id]
  if (subreddit == guess) {
    dispatch(displayToast('Correct!', 'green'))
    dispatch(incrementScore())
  } else {
    dispatch(displayToast('You\'re wrong! The answer was /r/' + subreddit + '...', 'red'))
  }
}

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})

// async actions

const fetchPosts = () => ({
  type: FETCH_POSTS
})

const imagePattern = /\.(jpe?g|png|gif)$/
const fetchUnseenPosts = (subreddit, seenImages, limit = 50, after, numTries = 20) => {
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

      // returns an array of posts with posts that have images we've seen filtered out
      const unseenPosts = posts.filter(post => !seenImages.includes(post.data.url))

      if (unseenPosts.length) {
        return unseenPosts
      } else {
        // if we didn't get any valid posts in the chunk we receive,
        // we search the next chunk which is delimited by the after property
        // the after property is the id of the last post of the chunk
        // so passing it into the api request will only give us posts after that post
        if (numTries == 0) throw new Error("Number of tries exceeded")
        const { after } = json.data
        return fetchUnseenPosts(subreddit, seenImages, limit, after, --numTries)
      }
    })
}

const receiveUnseenImages = (subreddit, unseenImages) => ({
  type: RECEIVE_UNSEEN,
  subreddit,
  unseenImages
})

// we pass in subreddit here so that we can remove it from cachedImagesBySubreddit
const setRandomImage = (id, subreddit, images) => ({
  type: SET_IMAGE,
  imageUrl: randomElem(images),
  id,
  subreddit
})

/**
 * Loads and sets a new image for the question with the passed in ID.
 * Images are chosen from the cachedImagesBySubreddit object. If the array of cachedImages
 * for the given subreddit is empty, we fetch some new images that have not yet been seen.
 * We save that array in the cachedImages object and set the question's image to an image
 * from that array.
 * @param { string } subreddit The current subreddit to load an image from.
 * @return { function } A thunk that dispatches actions for fetching and setting.
 */
export const loadImageForQuestion = (id) => (dispatch, getState) => {
  // TODO: maybe add error handling here?
  // eg: if there is no question, if there already is an image, etc.
  const { subreddit } = getState().questionsById[id]
  const cachedImages = getState().cachedImagesBySubreddit[subreddit]
  // convert the array of question objects to an array of all the images
  const seenImages = Object.values(getState().questionsById)
    .map(question => question.imageUrl)

  if (!cachedImages || !cachedImages.length) {
    dispatch(fetchPosts())

    // TODO: might want to splice out the current id when passed into here?
    return fetchUnseenPosts(subreddit, seenImages)
      .then(posts => {
        const images = posts.map(post => post.data.url)
        dispatch(receiveUnseenImages(subreddit, images))  // put them in the cache
        dispatch(setRandomImage(id, subreddit, images))   // set the image for the question
      })
      .catch(err => {
        dispatch({
          type: FETCH_POSTS_FAIL,
          error: `There was an error fetching images.. (${err.message})`
        })
      })
  } else {
    dispatch(setRandomImage(id, subreddit, cachedImages))
  }
}
