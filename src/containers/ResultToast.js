import React from 'react'
import { connect } from 'react-redux'

const Toast = ({ isVisible, text, color }) => {
  if (isVisible) {
    return (
      <div style={{
        display: 'inline-block',
        backgroundColor: color
      }}>
        <p>{text}</p>
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return {
    isVisible: state.isToastVisible,
    text: state.toast.text,
    color: state.toast.color
  }
}

export default connect(mapStateToProps)(Toast)
