import React from 'react'

const QuestionImage = ({ imageUrl, isFetching }) => (
  <img src={imageUrl} style={{
    height: '300px',
    width: 'auto',
    opacity: isFetching ? '0.5' : '1'
  }}></img>
)

export default QuestionImage
