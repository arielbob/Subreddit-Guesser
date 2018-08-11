import React from 'react'

const QuestionCard = ({
  imageUrl,
  subreddit,
  guess,
  index
}) => {
  const isCorrect = subreddit == guess

  return (
    <div className={'question-card ' + (isCorrect ? 'question-card--correct' : 'question-card--incorrect')}>
      <img className='question-card__image' src={imageUrl}></img>
      <div>
        <p className='question-card__title'>Subreddit</p>
        <p className='question-card__subreddit'>/r/{subreddit}</p>
        <p className='question-card__title'>Guess</p>
        <p className='question-card__guess'>/r/{guess}</p>
      </div>
    </div>
  )
}

export default QuestionCard
