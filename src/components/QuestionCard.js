import React from 'react'

const QuestionCard = ({
  imageUrl,
  subreddit,
  guess,
  index
}) => (
  <div className='question-card'>
    <img className='question-card__image' src={imageUrl}></img>
    <div>
      <h3>{subreddit + (subreddit == guess ? '✔️' : '❌')}</h3>
      <p>Guess: {guess}</p>
    </div>
  </div>
)

export default QuestionCard
