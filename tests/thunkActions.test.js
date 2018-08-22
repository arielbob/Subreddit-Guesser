import * as Actions from '../src/actions'
import * as Types from '../src/constants/actionTypes'
import Subreddits from '../src/constants/subreddits'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// make Math.random() deterministic
const origRandom = global.Math.random
global.Math.random = () => 0
afterAll(() => { global.Math.random = origRandom })

describe('loadImageForQuestion thunk', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  const images = ['a.png', 'b.jpg', 'c.gif', 'd.jpeg']
  const subreddit = 'pics'

  it('creates FETCH_POSTS, RECEIVE_UNSEEN, and SET_IMAGE when called with no cache', () => {
    fetchMock.getOnce('*', {
      data: {
        children: [
          {data: {over_18: false, url: images[0]}},
          {data: {over_18: false, url: images[1]}},
          {data: {over_18: false, url: images[2]}}
        ]
      }
    })

    const id = 0
    const expectedActions = [
      {type: Types.FETCH_POSTS},
      {type: Types.RECEIVE_UNSEEN, subreddit, unseenImages: ['a.png', 'b.jpg', 'c.gif']},
      {type: Types.SET_IMAGE, imageUrl: 'a.png', id, subreddit}
    ]
    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {}
    })

    return store.dispatch(Actions.loadImageForQuestion(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates SET_IMAGE when called with an existing cache for the subreddit', () => {
    const id = 0;
    const expectedActions = [
      {type: Types.SET_IMAGE, imageUrl: images[0], id, subreddit}
    ]
    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {pics: [images[0]]}
    })

    // we don't return this since loadImageForQuestion only returns a promise when it fetches
    store.dispatch(Actions.loadImageForQuestion(id))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates FETCH_POSTS, RECEIVE_UNSEEN, and SET_IMAGE after a fetch that returned images that had already been seen', () => {
    const after = 1;
    const limit = 50;
    fetchMock.getOnce(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=${limit}`, {
      data: {
        after,
        children: [
          {data: {over_18: false, url: images[0]}},
          {data: {over_18: false, url: images[1]}},
          {data: {over_18: false, url: images[2]}}
        ]
      }
    })
    fetchMock.getOnce(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=${limit}&after=${after}`, {
      data: {
        children: [
          {data: {over_18: false, url: images[3]}}
        ]
      }
    })

    const id = 3
    const expectedActions = [
      {type: Types.FETCH_POSTS},
      {type: Types.RECEIVE_UNSEEN, subreddit, unseenImages: [images[3]]},
      {type: Types.SET_IMAGE, imageUrl: images[3], id, subreddit}
    ]
    const store = mockStore({
      questionsById: {
        0: {subreddit, imageUrl: images[0]},
        1: {subreddit, imageUrl: images[1]},
        2: {subreddit, imageUrl: images[2]},
        3: {subreddit}
      },
      cachedImagesBySubreddit: {}
    })

    return store.dispatch(Actions.loadImageForQuestion(id)).then(() => {
      expect(fetchMock.calls().length).toEqual(2)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_POSTS_FAIL on response errors', () => {
    fetchMock.getOnce('*', 500)

    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {}
    })
    const expectedActions = [
      {type: Types.FETCH_POSTS},
      {type: Types.FETCH_POSTS_FAIL, error: 'There was an error fetching images.. (Error 500)'}
    ]

    const id = 0
    return store.dispatch(Actions.loadImageForQuestion(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_POSTS_FAIL when no posts are found within 20 fetches', () => {
    fetchMock.get('*', {
      data: {
        children: []
      }
    }, {repeat: 20})

    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {}
    })
    const expectedActions = [
      {type: Types.FETCH_POSTS},
      {type: Types.FETCH_POSTS_FAIL, error: 'There was an error fetching images.. (Number of tries exceeded)'}
    ]

    const id = 0
    return store.dispatch(Actions.loadImageForQuestion(id)).then(() => {
      expect(fetchMock.calls().length).toEqual(20)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('addGuess thunk', () => {
  beforeEach(() => jest.useFakeTimers())
  const id = 0
  const subreddit = 'pics'

  it('creates ADD_GUESS, SHOW_TOAST, INCREMENT_SCORE, and, after 2 seconds, HIDE_TOAST when the guess is correct', () => {
    const store = mockStore({
      questionsById: {0: {subreddit}}
    })
    const beforeTimeout = [
      {type: Types.ADD_GUESS, id, guess: subreddit},
      {type: Types.SHOW_TOAST, text: 'Correct!', color: 'green'},
      {type: Types.INCREMENT_SCORE}
    ]
    const afterTimeout = [
      {type: Types.HIDE_TOAST}
    ]

    store.dispatch(Actions.addGuess(id, subreddit))
    expect(store.getActions()).toEqual(beforeTimeout)
    jest.runAllTimers()
    expect(store.getActions()).toEqual(beforeTimeout.concat(afterTimeout))
  })

  it('creates ADD_GUESS, SHOW_TOAST, and, after 2 seconds, HIDE_TOAST when the guess is incorrect', () => {
    const wrongGuess = 'me_irl'
    const store = mockStore({
      questionsById: {0: {subreddit}}
    })
    const beforeTimeout = [
      {type: Types.ADD_GUESS, id, guess: wrongGuess},
      {type: Types.SHOW_TOAST, text: 'You\'re wrong! The answer was /r/' + subreddit + '...', color: 'red'},
    ]
    const afterTimeout = [
      {type: Types.HIDE_TOAST}
    ]

    store.dispatch(Actions.addGuess(id, wrongGuess))
    expect(store.getActions()).toEqual(beforeTimeout)
    jest.runAllTimers()
    expect(store.getActions()).toEqual(beforeTimeout.concat(afterTimeout))
  })
})

describe('setOptions thunk', () => {
  it('creates SET_OPTIONS with a randomized array of 5 subreddits including the question\'s subreddit', () => {
    const store = mockStore({
      questionsById: {0: {subreddit: Subreddits[0]}}
    })
    const expectedActions = [
      {type: Types.SET_OPTIONS, options: [Subreddits[0], Subreddits[1], Subreddits[2], Subreddits[3], Subreddits[4]]}
    ]

    const id = 0
    store.dispatch(Actions.setOptions(id))
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('reset thunk', () => {
  it('creates an action to reset the game when it is not fetching', () => {
    const store = mockStore({
      isFetching: false
    })
    const expectedActions = [
      {type: Types.RESET_GAME}
    ]

    store.dispatch(Actions.resetGame())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('does not create an action to reset the game if it is fetching', () => {
    const store = mockStore({
      isFetching: true
    })
    const expectedActions = []

    store.dispatch(Actions.resetGame())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
