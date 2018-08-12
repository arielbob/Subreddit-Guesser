import React from 'react'
import ErrorMessage from './ErrorMessage'

// TODO: fix flash of empty question-image when imageUrl isn't null, but it hasn't loaded yet
// this happens when the game is reset, i.e. there is no previous imageUrl

const QuestionImage = ({ imageUrl, isFetching, error, onRetryClick }) => {
  return (
    <div className={'question-image ' + (!imageUrl && !error ? 'question-image--placeholder' : '')}>
      {
        error ?
        <ErrorMessage message={error} onRetry={onRetryClick} /> :
        <div className='question-image__shimmer-container'>
          {(isFetching || !imageUrl) ? <div className='question-image__shimmer'></div> : null}
          {imageUrl ? <img src={imageUrl} className='question-image__image'></img> : null}
        </div>
      }
    </div>
  )
}

export default QuestionImage
