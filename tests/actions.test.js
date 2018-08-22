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

describe('async actions', () => {
  global.Math.random = () => 0;

  it('creates FETCH_POSTS, RECEIVE_UNSEEN, and SET_IMAGE when loadImageForQuestion is done', () => {
    fetchMock.get('*', {
      data: {
        children: [
          {
            data: {
              over_18: false,
              url: 'a.png'
            }
          },
          {
            data: {
              over_18: false,
              url: 'b.jpg'
            }
          },
          {
            data: {
              over_18: false,
              url: 'c.gif'
            }
          }
        ]
      }
    })

    const id = 0
    const subreddit = 'pics'
    const expectedActions = [
      { type: types.FETCH_POSTS },
      {
        type: types.RECEIVE_UNSEEN,
        subreddit,
        unseenImages: [
          'a.png',
          'b.jpg',
          'c.gif'
        ]
      },
      {
        type: types.SET_IMAGE,
        imageUrl: 'a.png',
        id,
        subreddit
      }
    ]
    const store = mockStore({
      questionsById: {
        0: {
          subreddit: 'pics',
        }
      },
      cachedImagesBySubreddit: {}
    })

    return store.dispatch(actions.loadImageForQuestion(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
