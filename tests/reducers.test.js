import * as Types from '../src/constants/actionTypes'
import * as reducers from '../src/reducers/reducers'

describe('errorMessage reducer', () => {
  const reducer = reducers.errorMessage
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual('')
  })

  it('handles FETCH_POSTS', () => {
    expect(
      reducer('error', {type: Types.FETCH_POSTS})
    ).toEqual('')
  })

  it('handles RESET_ERROR_MESSAGE', () => {
    expect(
      reducer('error', {type: Types.RESET_ERROR_MESSAGE})
    ).toEqual('')
  })

  it('handles RESET_GAME', () => {
    expect(
      reducer('error', {type: Types.RESET_GAME})
    ).toEqual('')
  })

  it('handles action with error', () => {
    expect(
      reducer('', {type: Types.FETCH_POSTS_FAIL, error: 'Error fetching posts'})
    ).toEqual('Error fetching posts')
  })
})

describe('currentQuestionId reducer', () => {
  const reducer = reducers.currentQuestionId
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(0)
  })

  it('handles CHANGE_QUESTION_ID', () => {
    expect(
      reducer(0, {type: Types.CHANGE_QUESTION_ID, id: 1})
    ).toEqual(1)
  })

  it('handles RESET_GAME', () => {
    expect(
      reducer(1, {type: Types.RESET_GAME})
    ).toEqual(0)
  })
})

describe('questionsById reducer', () => {
  const reducer = reducers.questionsById
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('handles GENERATE_QUESTION', () => {
    // empty original state
    expect(
      reducer({}, {
        type: Types.GENERATE_QUESTION,
        subreddit: 'pics',
        id: 0
      })
    ).toEqual({
      0: {
        subreddit: 'pics',
        imageUrl: '',
        guess: '',
        id: 0
      }
    })

    // filled original state
    const state = {
      0: {subreddit: 'pics', imageUrl: '', guess: '', id: 0}
    }
    expect(
      reducer(state, {
        type: Types.GENERATE_QUESTION,
        subreddit: 'oldschoolcool',
        id: 1
      })
    ).toEqual({
      0: {subreddit: 'pics', imageUrl: '', guess: '', id: 0},
      1: {subreddit: 'oldschoolcool', imageUrl: '', guess: '', id: 1}
    })
  })

  it('handles ADD_GUESS', () => {
    expect(
      reducer({
        0: {subreddit: 'pics', imageUrl: '', guess: '', id: 0}
      }, {type: Types.ADD_GUESS, guess: 'me_irl', id: 0})
    ).toEqual({
      0: {
        subreddit: 'pics',
        imageUrl: '',
        guess: 'me_irl',
        id: 0
      }
    })

    expect(
      reducer({
        0: {subreddit: 'pics', imageUrl: '', guess: 'me_irl', id: 0},
        1: {subreddit: 'oldschoolcool', imageUrl: '', guess: '', id: 1}
      }, {type: Types.ADD_GUESS, guess: 'oldschoolcool', id: 1})
    ).toEqual({
      0: {subreddit: 'pics', imageUrl: '', guess: 'me_irl', id: 0},
      1: {subreddit: 'oldschoolcool', imageUrl: '', guess: 'oldschoolcool', id: 1}
    })
  })

  it('handles SET_IMAGE', () => {
    expect(
      reducer({
        0: {subreddit: 'pics', imageUrl: '', guess: '', id: 0}
      }, {type: Types.SET_IMAGE, imageUrl: 'a.jpg', id: 0})
    ).toEqual({
      0: {
        subreddit: 'pics',
        imageUrl: 'a.jpg',
        guess: '',
        id: 0
      }
    })

    expect(
      reducer({
        0: {subreddit: 'pics', imageUrl: 'a.jpg', guess: 'me_irl', id: 0},
        1: {subreddit: 'oldschoolcool', imageUrl: '', guess: '', id: 1}
      }, {type: Types.SET_IMAGE, imageUrl: 'b.png', id: 1})
    ).toEqual({
      0: {subreddit: 'pics', imageUrl: 'a.jpg', guess: 'me_irl', id: 0},
      1: {subreddit: 'oldschoolcool', imageUrl: 'b.png', guess: '', id: 1}
    })
  })

  it('handles RESET_GAME', () => {
    expect(
      reducer({
        0: {subreddit: 'pics', imageUrl: 'a.jpg', guess: 'me_irl', id: 0},
        1: {subreddit: 'oldschoolcool', imageUrl: 'b.png', guess: '', id: 1}
      }, {type: Types.RESET_GAME})
    ).toEqual({})
  })
})

describe('questionIds reducer', () => {
  const reducer = reducers.questionIds
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('handles ADD_QUESTION', () => {
    expect(
      reducer([], {type: Types.ADD_QUESTION, id: 0})
    ).toEqual([0])

    expect(
      reducer([0, 1, 2], {type: Types.ADD_QUESTION, id: 3})
    ).toEqual([0, 1, 2, 3])

    expect(
      reducer([0, 1, 2], {type: Types.ADD_QUESTION, id: 1})
    ).toEqual([0, 1, 2])
  })

  it('handles RESET_GAME', () => {
    expect(
      reducer([1, 2, 3], {type: Types.RESET_GAME})
    ).toEqual([])
  })
})

describe('cachedImagesBySubreddit reducer', () => {
  const reducer = reducers.cachedImagesBySubreddit
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('handles RECEIVE_UNSEEN', () => {
    expect(
      reducer({}, {
        type: Types.RECEIVE_UNSEEN,
        subreddit: 'pics',
        unseenImages: ['a.jpg', 'b.png']
      })
    ).toEqual({
      pics: ['a.jpg', 'b.png']
    })

    expect(
      reducer({
        oldschoolcool: ['c.gif']
      }, {
        type: Types.RECEIVE_UNSEEN,
        subreddit: 'pics',
        unseenImages: ['a.jpg', 'b.png']
      })
    ).toEqual({
      oldschoolcool: ['c.gif'],
      pics: ['a.jpg', 'b.png']
    })
  })

  it('handles SET_IMAGE', () => {
    expect(
      reducer({
        'pics': ['a.jpg', 'b.png']
      }, {type: Types.SET_IMAGE, subreddit: 'pics', imageUrl: 'b.png'})
    ).toEqual({
      'pics': ['a.jpg']
    })

    expect(
      reducer({
        'pics': ['c.gif']
      }, {type: Types.SET_IMAGE, subreddit: 'pics', imageUrl: 'c.gif'})
    ).toEqual({
      'pics': []
    })
  })
})

describe('options reducer', () => {
  const reducer = reducers.options
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('handles SET_OPTIONS', () => {
    expect(
      reducer([], {
        type: Types.SET_OPTIONS,
        options: ['me_irl', 'pics', 'oldschoolcool', 'malefashion', 'earthporn']
      })
    ).toEqual(['me_irl', 'pics', 'oldschoolcool', 'malefashion', 'earthporn'])

    expect(
      reducer(['me_irl', 'pics', 'oldschoolcool', 'malefashion', 'earthporn'], {
        type: Types.SET_OPTIONS,
        options: ['pics', 'malefashion', 'earthporn', 'me_irl', 'oldschoolcool']
      })
    ).toEqual(['pics', 'malefashion', 'earthporn', 'me_irl', 'oldschoolcool'])
  })
})

describe('score reducer', () => {
  const reducer = reducers.score
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(0)
  })

  it('handles INCREMENT_SCORE', () => {
    expect(
      reducer(0, {type: Types.INCREMENT_SCORE})
    ).toEqual(1)
  })

  it('handles RESET_GAME', () => {
    expect(
      reducer(3, {type: Types.RESET_GAME})
    ).toEqual(0)
  })
})

describe('isFetching reducer', () => {
  const reducer = reducers.isFetching
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(false)
  })

  it('handles FETCH_POSTS', () => {
    expect(
      reducer(false, {type: Types.FETCH_POSTS})
    ).toEqual(true)
  })

  it('handles RECEIVE_UNSEEN', () => {
    expect(
      reducer(true, {
        type: Types.RECEIVE_UNSEEN,
        subreddit: 'pics',
        unseenImages: ['a.jpg', 'b.png', 'c.gif']
      })
    ).toEqual(false)
  })

  it('handles FETCH_POSTS_FAIL', () => {
    expect(
      reducer(true, {
        type: Types.FETCH_POSTS_FAIL,
        error: 'Error fetching posts..'
      })
    ).toEqual(false)
  })
})

describe('isToastVisible reducer', () => {
  const reducer = reducers.isToastVisible
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(false)
  })

  it('handles SHOW_TOAST', () => {
    expect(
      reducer(false, {
        type: Types.SHOW_TOAST,
        text: 'Correct!',
        color: 'green'
      })
    ).toEqual(true)
  })

  it('handles HIDE_TOAST', () => {
    expect(
      reducer(true, {
        type: Types.HIDE_TOAST
      })
    ).toEqual(false)
  })
})

describe('toast reducer', () => {
  const reducer = reducers.toast
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      text: '',
      color: ''
    })
  })

  it('handles SHOW_TOAST', () => {
    expect(
      reducer({}, {
        type: Types.SHOW_TOAST,
        text: 'Correct!',
        color: 'green'
      })
    ).toEqual({
      text: 'Correct!',
      color: 'green'
    })

    expect(
      reducer({
        text: 'Correct!',
        color: 'green'
      }, {
        type: Types.SHOW_TOAST,
        text: 'Incorrect..',
        color: 'red'
      })
    ).toEqual({
      text: 'Incorrect..',
      color: 'red'
    })
  })
})
