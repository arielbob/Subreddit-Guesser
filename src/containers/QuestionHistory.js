import React from 'react'
import { connect } from 'react-redux'

const QuestionList = ({ history }) => (
  <div>
    {
      history.length > 0 &&
      <ul>
        {history.map((question) => {
          const { imageUrl, subreddit, guess, index } = question

          return (
            <li key={index}>
              <img src={imageUrl} style={{
                maxWidth: '100px',
                maxHeight: '100px'
              }}></img>
              <h3>{subreddit + (subreddit == guess ? '✔️' : '❌')}</h3>
              <p>Guess: {guess}</p>
            </li>
          )
        })}
      </ul>
    }
  </div>
)

const mapStateToProps = (state) => ({
  history: state.history
})

export default connect(mapStateToProps)(QuestionList)
