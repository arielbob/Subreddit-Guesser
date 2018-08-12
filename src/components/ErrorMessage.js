import React from 'react'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className='error'>
      <p className='error__message'>{ message }</p>
      <button className='error__retry-btn' onClick={() => onRetry()}>Retry</button>
    </div>
  )
}

export default ErrorMessage
