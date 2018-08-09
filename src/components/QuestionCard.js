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
        <h3 className='question-card__subreddit'>{subreddit + (subreddit == guess ? '✔️' : '❌')}</h3>
        <p className='question-card__guess'>Guess: {guess}</p>
      </div>
    </div>
  )
}

export default QuestionCard
