import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { Question } from '../src/containers/Question'

Enzyme.configure({ adapter: new Adapter() })

describe('Question container', () => {
  const setup = (props) => mount(<Question {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      currentQuestionId: 0,
      question: {
        subreddit: 'pics',
        guess: 'malefashion',
        imageUrl: 'a.png',
        id: 0
      },
      isFetching: false,
      error: '',
      addNewQuestion: jest.fn(),
      generateNewQuestion: jest.fn(),
      loadImageForQuestion: jest.fn(),
      setOptions: jest.fn(),
      resetErrorMessage: jest.fn(),
      changeQuestionId: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('QuestionImage').exists()
    ).toBe(true)

    expect(
      enzymeWrapper.find('QuestionImage').props().src
    ).toBe('a.png')
    expect(
      enzymeWrapper.find('QuestionImage').props().isFetching
    ).toBe(false)
    expect(
      enzymeWrapper.find('QuestionImage').props().error
    ).toBe('')
  })

  it('sets up a new question on mount', () => {
    const props = {
      currentQuestionId: 0,
      question: {
        subreddit: 'pics',
        guess: 'malefashion',
        imageUrl: 'a.png',
        id: 0
      },
      isFetching: false,
      error: '',
      addNewQuestion: jest.fn(),
      generateNewQuestion: jest.fn(),
      loadImageForQuestion: jest.fn(),
      setOptions: jest.fn(),
      resetErrorMessage: jest.fn(),
      changeQuestionId: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(props.addNewQuestion.mock.calls.length).toBe(1)
    expect(props.generateNewQuestion.mock.calls.length).toBe(1)
    expect(props.loadImageForQuestion.mock.calls.length).toBe(1)
    expect(props.setOptions.mock.calls.length).toBe(1)
  })

  it('creates a new question when currentQuestionId changes to an id that has no question', () => {
    const props = {
      currentQuestionId: 0,
      question: {
        subreddit: 'pics',
        guess: 'malefashion',
        imageUrl: 'a.png',
        id: 0
      },
      isFetching: false,
      error: '',
      addNewQuestion: jest.fn(),
      generateNewQuestion: jest.fn(),
      loadImageForQuestion: jest.fn(),
      setOptions: jest.fn(),
      resetErrorMessage: jest.fn(),
      changeQuestionId: jest.fn()
    }
    const enzymeWrapper = setup(props)

    enzymeWrapper.setProps({
      currentQuestionId: 1,
      question: undefined
    })
    expect(props.addNewQuestion.mock.calls.length).toBe(2)
    expect(props.generateNewQuestion.mock.calls.length).toBe(2)
    expect(props.loadImageForQuestion.mock.calls.length).toBe(2)
    expect(props.setOptions.mock.calls.length).toBe(2)
  })
})
