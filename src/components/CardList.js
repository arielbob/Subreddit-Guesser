import React from 'react'
import PropTypes from 'prop-types'
import QuestionCard from './QuestionCard'

const CardList = ({ questionIds, currentQuestionId, questionsById }) => {
  const historyIds = questionIds
    .filter(id => id != currentQuestionId)
    .reverse()

  return (
    <div className='question-history'>
      <div className='question-history__list'>
        {
          <ul>
            {historyIds.map(id => (
              <li className='question-history__item' key={id}>
                <QuestionCard {...questionsById[id]} />
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  )
}

CardList.propTypes = {
  questionIds: PropTypes.array.isRequired,
  currentQuestionId: PropTypes.number.isRequired,
  questionsById: PropTypes.objectOf(PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
    guess: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired
}

export default CardList
