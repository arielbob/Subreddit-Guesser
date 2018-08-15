import React from 'react'

class PreloadedImage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      prevImage: null,
      src: null
    }
    this.imageToLoad = null
  }

  componentDidMount() {
    this.imgToLoad = new Image()
    this.imgToLoad.onload = () => {
      this.setState({ isLoading: false })
      if (this.props.onLoad) this.props.onLoad()
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

export default PreloadedImage
