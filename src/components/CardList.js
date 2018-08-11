import React from 'react'
import QuestionCard from './QuestionCard'

const CardList = ({ history }) => (
  <div className='question-history'>
    <h2>Question History</h2>
    {
      history.length > 0 &&
      <ul>
        {history.map((question, index) => (
          <li key={index}>
            <QuestionCard {...question} />
          </li>
        ))}
      </ul>
    }
  </div>
)

export default CardList
