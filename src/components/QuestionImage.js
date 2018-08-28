import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import PreloadedImage from './PreloadedImage'

class QuestionImage extends React.Component {
  constructor() {
    super()
    this.state = { isLoading: false }
  }

  handleLoad() {
    this.setState({ isLoading: false })
  }

  componentDidUpdate(prevProps) {
    if (this.props.src != prevProps.src) this.setState({ isLoading: true })
  }

  render() {
    const { src, isFetching, error, onRetryClick } = this.props

    return (
      <div className='question-image'>
        {
          error ?
          <ErrorMessage message={error} onRetry={onRetryClick} /> :
          <div className={
            'question-image__container ' +
            (isFetching || this.state.isLoading ? 'question-image__container--shimmer ' : '')}>
            <PreloadedImage
              src={src}
              className='question-image__image'
              onLoad={() => this.handleLoad()}
              PlaceholderComponent={() => <div className='question-image__placeholder'></div>} />
          </div>
        }
      </div>
    )
  }
}

QuestionImage.propTypes = {
  src: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onRetryClick: PropTypes.func.isRequired
}

export default QuestionImage
