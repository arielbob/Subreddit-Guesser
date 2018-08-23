import * as Actions from '../src/actions'
import * as Types from '../src/constants/actionTypes'
import Subreddits from '../src/constants/subreddits'

// make Math.random() deterministic
const origRandom = global.Math.random
global.Math.random = () => 0
afterAll(() => { global.Math.random = origRandom })

describe('actions', () => {
  it('creates an action to add a question', () => {
    const id = 0
    const expectedAction = {
      type: Types.ADD_QUESTION,
      id
    }

    expect(Actions.addNewQuestion(id)).toEqual(expectedAction)
  })

  it('creates an action to generate a new question with a random subreddit', () => {
    const id = 0
    const expectedAction = {
      type: Types.GENERATE_QUESTION,
      subreddit: Subreddits[0],
      id
    }

    expect(Actions.generateNewQuestion(id)).toEqual(expectedAction)
  })

  it('creates an action to reset the error message', () => {
    const expectedAction = {
      type: Types.RESET_ERROR_MESSAGE
    }

    expect(Actions.resetErrorMessage()).toEqual(expectedAction)
  })

  it('creates an action to change the current question id', () => {
    const id = 0
    const expectedAction = {
      type: Types.CHANGE_QUESTION_ID,
      id
    }

    expect(Actions.changeQuestionId(id)).toEqual(expectedAction)
  })
})
