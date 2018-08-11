import React from 'react'
import QuestionCard from './QuestionCard'

const CardList = ({ history }) => (
  <div className='question-history'>
    <div className='question-history__list'>
      {
        history.length > 0 &&
        <ul>
          {history.map((question, index) => (
            <li className='question-history__item' key={index}>
              <QuestionCard {...question} />
            </li>
          ))}
        </ul>
      }
    </div>
  </div>
)

export default CardList
