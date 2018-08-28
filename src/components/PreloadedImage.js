import React from 'react'
import PropTypes from 'prop-types'

class PreloadedImage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      prevImage: null,
      src: null
    }
    this._imgToLoad = null
  }

  componentDidMount() {
    this._imgToLoad = new Image()
    this._imgToLoad.onload = () => {
      this.setState({ isLoading: false })
      if (this.props.onLoad) this.props.onLoad()
    }

    if (this.props.src) {
      this._imgToLoad.src = this.props.src

      this.setState({
        isLoading: true,
        src: this.props.src
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.src != prevProps.src) {
      // we check for this so that prevImage isn't set to an unloaded image
      if (!this.state.isLoading) {
        this.setState({ prevImage: prevProps.src })
      }

      // preload the new image
      if (this.props.src) this._imgToLoad.src = this.props.src

      this.setState({
        isLoading: true,
        src: this.props.src
      })
    }
  }

  render() {
    const { isLoading, src, prevImage } = this.state
    let imgSrc;

    if (!isLoading && src) {
      imgSrc = src
    } else if (isLoading && prevImage) {
      imgSrc = prevImage
    } else {
      return this.props.PlaceholderComponent ? <this.props.PlaceholderComponent /> : null
    }

    return <img className={this.props.className} style={this.props.style} src={imgSrc}></img>
  }
}

PreloadedImage.propTypes = {
  onLoad: PropTypes.func,
  src: PropTypes.string,
  PlaceholderComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  className: PropTypes.string,
  style: PropTypes.object
}

export default PreloadedImage
