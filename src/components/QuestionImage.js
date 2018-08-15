import React from 'react'
import ErrorMessage from './ErrorMessage'

// TODO: maybe move this local state to redux state so that the render function is easier to follow
class QuestionImage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      prevImage: null,
      src: null
    }
    this.imgToLoad = null
  }

  componentDidMount() {
    this.imgToLoad = new Image()
    this.imgToLoad.onload = () => {
      this.setState({ isLoading: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.src != prevProps.src) {
      // we check for this so that prevImage isn't set to an unloaded image
      if (!this.state.isLoading) {
        this.setState({ prevImage: prevProps.src })
      }

      // preload the new image
      this.imgToLoad.src = this.props.src

      this.setState({
        isLoading: true,
        src: this.props.src
      })
    }
  }

  preloadedImage() {
    const { isLoading, src, prevImage } = this.state

    if (!isLoading && src) {
      return <img className='question-image__image' src={src}></img>
    } else if (isLoading && prevImage) {
      return <img className='question-image__image' src={prevImage}></img>
    } else  {
      return null
    }
  }

  showPlaceholder() {
    const { error, src } = this.props

    // FIXME: this is very strange
    // i think i'm having trouble tracking redux state changes and local react state changes
    // tbh idk why this works
    if (error) return false
    if (!this.state.prevImage && (!src || this.state.isLoading)) return true
    // if (isFetching && !this.state.prevImage && !this.state.src) return true
    return false
  }

  render() {
    const { isFetching, error, onRetryClick } = this.props

    return (
      <div className={'question-image ' + (this.showPlaceholder() ? 'question-image--placeholder' : '')}>
        {
          error ?
          <ErrorMessage message={error} onRetry={onRetryClick} /> :
          <div className='question-image__shimmer-container'>
            {(isFetching || this.state.isLoading) ? <div className='question-image__shimmer'></div> : null}
            {this.preloadedImage()}
          </div>
        }
      </div>
    )
  }
}

export default QuestionImage
