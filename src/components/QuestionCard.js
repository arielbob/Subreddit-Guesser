import React from 'react'
import PropTypes from 'prop-types'

const QuestionCard = ({
  imageUrl,
  subreddit,
  guess
}) => {
  const isCorrect = subreddit == guess

  return (
    <div className={'question-card ' + (isCorrect ? 'question-card--correct' : 'question-card--incorrect')}>
      <img className='question-card__image' src={imageUrl}></img>
      <div className='question-card__info'>
        <p className='question-card__title'>Subreddit</p>
        <p className='question-card__subreddit'>/r/{subreddit}</p>
        <p className='question-card__title'>Guess</p>
        <p className='question-card__guess'>/r/{guess}</p>
      </div>
    </div>
  )
}

QuestionCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  subreddit: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired
}

export default QuestionCard
