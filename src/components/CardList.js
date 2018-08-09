import React from 'react'
import QuestionCard from './QuestionCard'

const CardList = ({ history }) => (
  <div>
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
