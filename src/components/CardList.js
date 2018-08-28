import React from 'react'
import QuestionCard from './QuestionCard'

class CardList extends React.Component {
  render() {
    const { questionIds, currentQuestionId, questionsById } = this.props
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
}

export default CardList
