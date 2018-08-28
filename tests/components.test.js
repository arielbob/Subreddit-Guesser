import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import QuestionCard from '../src/components/QuestionCard'
import QuestionImage from '../src/components/QuestionImage'
import PreloadedImage from '../src/components/PreloadedImage'
import OptionList from '../src/components/OptionList'
import ErrorMessage from '../src/components/ErrorMessage'
import CardList from '../src/components/CardList'
import Reset from '../src/components/Reset'
import Score from '../src/components/Score'
import Toast from '../src/components/Toast'

Enzyme.configure({ adapter: new Adapter() })

describe('QuestionCard component', () => {
  const setup = (props) => mount(<QuestionCard {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      imageUrl: 'a.png',
      subreddit: 'pics',
      guess: 'oldschoolcool'
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-card').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-card__image').props().src
    ).toBe(props.imageUrl)
    expect(
      enzymeWrapper.find('.question-card__title').at(0).text()
    ).toBe('Subreddit')
    expect(
      enzymeWrapper.find('.question-card__subreddit').text()
    ).toBe('/r/' + props.subreddit)
    expect(
      enzymeWrapper.find('.question-card__title').at(1).text()
    ).toBe('Guess')
    expect(
      enzymeWrapper.find('.question-card__guess').text()
    ).toBe('/r/' + props.guess)
  })

  it('changes classes when a guess is correct/incorrect', () => {
    const props = {
      subreddit: 'pics',
      guess: 'pics'
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-card').hasClass('question-card--correct')
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-card').hasClass('question-card--incorrect')
    ).toBe(false)

    enzymeWrapper.setProps({
      guess: 'oldschoolcool'
    })

    expect(
      enzymeWrapper.find('.question-card').hasClass('question-card--incorrect')
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-card').hasClass('question-card--correct')
    ).toBe(false)
  })
})

describe('QuestionImage component', () => {
  const setup = (props) => mount(<QuestionImage {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      src: 'a.png',
      isFetching: false,
      error: false,
      onRetryClick: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-image').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-image__container').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('PreloadedImage').exists()
    ).toBe(true)
  })

  it('renders error message', () => {
    const props = {
      error: true
    }
    const enzymeWrapper = setup(props)

    expect(enzymeWrapper.find('ErrorMessage').exists()).toBe(true)
  })

  it('renders shimmer', () => {
    const props = {
      isFetching: true
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-image__container').hasClass('question-image__container--shimmer')
    ).toBe(true)

    enzymeWrapper.setProps({isFetching: false})
    enzymeWrapper.setState({isLoading: true})

    expect(
      enzymeWrapper.find('.question-image__container').hasClass('question-image__container--shimmer')
    ).toBe(true)
  })

  it('sets isLoading when src changes', () => {
    const props = {
      src: 'a.jpg',
    }
    const enzymeWrapper = setup(props)

    enzymeWrapper.setProps({ src: 'b.png' })
    expect(
      enzymeWrapper.state().isLoading
    ).toBe(true)
  })

  it('sets state to false when handleLoad is called', () => {
    const enzymeWrapper = setup({})
    enzymeWrapper.setState({ isLoading: true })

    enzymeWrapper.instance().handleLoad()
    expect(
      enzymeWrapper.state().isLoading
    ).toBe(false)
  })
})

describe('PreloadedImage component' , () => {
  const setup = (props) => mount(<PreloadedImage {...props} />)

  it('renders self and subcomponents', () => {
    const enzymeWrapper = setup({
      src: 'a.png'
    })
    enzymeWrapper.setState({ isLoading: false })

    expect(
      enzymeWrapper.find('img').exists()
    ).toBe(true)
  })

  it('renders PlaceholderComponent when there is no src', () => {
    const PlaceholderComponent = () => (<div>Placeholder</div>)
    const enzymeWrapper = setup({
      src: null,
      PlaceholderComponent
    })

    expect(
      enzymeWrapper.find('PlaceholderComponent').exists()
    ).toBe(true)
  })

  it('renders PlaceholderComponent when there is a loading src and no previous image', () => {
    const PlaceholderComponent = () => (<div>Placeholder</div>)
    const enzymeWrapper = setup({
      src: 'a.png',
      PlaceholderComponent
    })

    expect(
      enzymeWrapper.find('PlaceholderComponent').exists()
    ).toBe(true)
  })

  it('renders previous image when src changes and is loading', () => {
    const enzymeWrapper = setup({
      src: 'a.png'
    })
    enzymeWrapper.setState({ isLoading: false })
    enzymeWrapper.setProps({ src: 'b.jpg' })

    expect(
      enzymeWrapper.find('img').props().src
    ).toBe('a.png')
  })

  it('renders src when it is loaded', () => {
    const enzymeWrapper = setup({
      src: 'a.png'
    })
    enzymeWrapper.setState({ isLoading: false })

    expect(
      enzymeWrapper.find('img').props().src
    ).toBe('a.png')
  })

  it('does not set previous image when the current src has not yet been loaded', () => {
    const enzymeWrapper = setup({
      src: 'a.png'
    })
    enzymeWrapper.setState({ isLoading: false })
    enzymeWrapper.setProps({ src: 'b.jpg' })
    enzymeWrapper.setProps({ src: 'c.gif' })

    expect(
      enzymeWrapper.state().prevImage
    ).toBe('a.png')
  })

  it('calls onLoad when the image loads', () => {
    const enzymeWrapper = setup({
      src: 'a.png',
      onLoad: jest.fn()
    })

    enzymeWrapper.instance()._imgToLoad.onload()
    expect(
      enzymeWrapper.props().onLoad.mock.calls.length
    ).toBe(1)
  })
})

describe('OptionList component', () => {
  const setup = (props) => mount(<OptionList {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      options: ['a', 'b', 'c', 'd', 'e'],
      isVisible: true,
      onOptionClick: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.options').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.options__option').length
    ).toBe(5)
    expect(
      enzymeWrapper.find('.options__btn').length
    ).toBe(5)
    enzymeWrapper.find('.options__btn').forEach((button, idx) => {
      expect(button.props().value).toBe(props.options[idx])
      expect(button.text()).toBe(props.options[idx])
    })
  })

  it('does not render when isVisible is false', () => {
    const props = {
      options: ['a', 'b', 'c', 'd', 'e'],
      isVisible: false,
      onOptionClick: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.options').exists()
    ).toBe(false)
  })

  it('calls onOptionClick when an option button is clicked', () => {
    const props = {
      options: ['a', 'b', 'c', 'd', 'e'],
      isVisible: true,
      onOptionClick: jest.fn()
    }
    const enzymeWrapper = setup(props)

    enzymeWrapper.find('button').forEach((button) => {
      button.simulate('click')
    })
    const mockOptionClick = props.onOptionClick
    expect(mockOptionClick.mock.calls.length).toBe(5)
    expect(mockOptionClick.mock.calls[0][0]).toBe('a')
    expect(mockOptionClick.mock.calls[1][0]).toBe('b')
    expect(mockOptionClick.mock.calls[2][0]).toBe('c')
    expect(mockOptionClick.mock.calls[3][0]).toBe('d')
    expect(mockOptionClick.mock.calls[4][0]).toBe('e')
  })
})

describe('ErrorMessage component', () => {
  const setup = (props) => mount(<ErrorMessage {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      message: 'Error',
      onRetry: jest.fn()
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.error').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.error__message').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.error__message').text()
    ).toBe('Error')
    expect(
      enzymeWrapper.find('.error__retry-btn').exists()
    ).toBe(true)
  })

  it('calls onRetry when retry button is clicked', () => {
    const props = {
      message: 'Error',
      onRetry: jest.fn()
    }
    const enzymeWrapper = setup(props)

    enzymeWrapper.find('button').simulate('click')
    expect(props.onRetry.mock.calls.length).toBe(1)
  })
})

describe('CardList component', () => {
  const setup = (props) => mount(<CardList {...props} />)

  it('renders self and subcomponents' , () => {
    const props = {
      questionIds: [0, 1],
      currentQuestionId: 1,
      questionsById: {
        0: {
          subreddit: 'pics',
          guess: 'pics',
          imageUrl: 'a.png',
          id: 0
        },
        1: {
          subreddit: 'pics',
          guess: 'malefashion',
          imageUrl: 'b.jpg',
          id: 1
        }
      }
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-history').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-history__list').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.question-history__item').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('QuestionCard').exists()
    ).toBe(true)
  })

  it('renders all but the current question', () => {
    const props = {
      questionIds: [0, 1, 2],
      currentQuestionId: 2,
      questionsById: {
        0: {
          subreddit: 'pics',
          guess: 'pics',
          imageUrl: 'a.png',
          id: 0
        },
        1: {
          subreddit: 'pics',
          guess: 'malefashion',
          imageUrl: 'b.jpg',
          id: 1
        },
        2: {
          subreddit: 'oldschoolcool',
          guess: 'malefashion',
          imageUrl: 'c.gif',
          id: 2
        }
      }
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-history__item').length
    ).toBe(2)
  })

  it('renders questions in reverse order', () => {
    const props = {
      questionIds: [0, 1, 2],
      currentQuestionId: 2,
      questionsById: {
        0: {
          subreddit: 'pics',
          guess: 'pics',
          imageUrl: 'a.png',
          id: 0
        },
        1: {
          subreddit: 'pics',
          guess: 'malefashion',
          imageUrl: 'b.jpg',
          id: 1
        },
        2: {
          subreddit: 'oldschoolcool',
          guess: 'malefashion',
          imageUrl: 'c.gif',
          id: 2
        }
      }
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('QuestionCard').at(0).props().id
    ).toBe(1)
    expect(
      enzymeWrapper.find('QuestionCard').at(1).props().id
    ).toBe(0)
  })
})

describe('Reset component', () => {
  const setup = (props) => mount(<Reset {...props} />)

  it('renders self and subcomponents', () => {
    const enzymeWrapper = setup({
      handleResetClick: jest.fn()
    })

    expect(
      enzymeWrapper.find('.reset').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.reset__btn').exists()
    ).toBe(true)
  })

  it('calls handleResetClick when reset button is clicked', () => {
    const props = {
      handleResetClick: jest.fn()
    }
    const enzymeWrapper = setup(props)

    enzymeWrapper.find('button').simulate('click')
    expect(props.handleResetClick.mock.calls.length).toBe(1)
  })
})

describe('Score component', () => {
  const setup = (props) => mount(<Score {...props} />)

  it('renders self and subcomponents', () => {
    const enzymeWrapper = setup({
      score: 3
    })

    expect(
      enzymeWrapper.find('.score').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.score__title').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.score__text').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.score__text').text()
    ).toBe('3')
  })
})

describe('Toast component', () => {
  const setup = (props) => mount(<Toast {...props} />)

  it('renders self and subcomponents', () => {
    const props = {
      isVisible: true,
      text: 'Correct!',
      color: 'green'
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.toast').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.toast__message').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.toast__message').hasClass('toast__message--green')
    ).toBe(true)
    expect(
      enzymeWrapper.find('.toast__text').exists()
    ).toBe(true)
    expect(
      enzymeWrapper.find('.toast__text').text()
    ).toBe('Correct!')
  })
})
