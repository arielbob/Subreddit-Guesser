import * as actions from '../src/actions'
import * as types from '../src/constants/actionTypes'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

describe('actions', () => {
  it('should create an action to add a question', () => {
    const id = 0
    const expectedAction = {
      type: types.ADD_QUESTION,
      id
    }
    expect(actions.addNewQuestion(id)).toEqual(expectedAction)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// async actions
describe('loadImageForQuestion(id) thunk', () => {
  global.Math.random = () => 0;
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
      {type: types.FETCH_POSTS},
      {type: types.RECEIVE_UNSEEN, subreddit, unseenImages: ['a.png', 'b.jpg', 'c.gif']},
      {type: types.SET_IMAGE, imageUrl: 'a.png', id, subreddit}
    ]
    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {}
    })

    return store.dispatch(actions.loadImageForQuestion(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates SET_IMAGE when called with an existing cache for the subreddit', () => {
    const id = 0;
    const expectedActions = [
      {type: types.SET_IMAGE, imageUrl: images[0], id, subreddit}
    ]
    const store = mockStore({
      questionsById: {0: {subreddit}},
      cachedImagesBySubreddit: {pics: [images[0]]}
    })

    // we don't return this since loadImageForQuestion only returns a promise when it fetches
    store.dispatch(actions.loadImageForQuestion(id))
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
      {type: types.FETCH_POSTS},
      {type: types.RECEIVE_UNSEEN, subreddit, unseenImages: [images[3]]},
      {type: types.SET_IMAGE, imageUrl: images[3], id, subreddit}
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

    return store.dispatch(actions.loadImageForQuestion(id)).then(() => {
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
      {type: types.FETCH_POSTS},
      {type: types.FETCH_POSTS_FAIL, error: 'There was an error fetching images.. (Error 500)'}
    ]

    const id = 0
    return store.dispatch(actions.loadImageForQuestion(id)).then(() => {
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
      {type: types.FETCH_POSTS},
      {type: types.FETCH_POSTS_FAIL, error: 'There was an error fetching images.. (Number of tries exceeded)'}
    ]

    const id = 0
    return store.dispatch(actions.loadImageForQuestion(id)).then(() => {
      expect(fetchMock.calls().length).toEqual(20)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
