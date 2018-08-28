import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className='error'>
      <p className='error__message'>{ message }</p>
      <button className='error__retry-btn' onClick={() => onRetry()}>Retry</button>
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
}

export default ErrorMessage
