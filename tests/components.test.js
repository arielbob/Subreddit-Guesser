import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import QuestionCard from '../src/components/QuestionCard'
import QuestionImage from '../src/components/QuestionImage'

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

  it('renders placeholder when there is no src prop', () => {
    const props = {
      src: ''
    }
    const enzymeWrapper = setup(props)

    expect(
      enzymeWrapper.find('.question-image__container').hasClass('question-image__container--has-placeholder')
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
