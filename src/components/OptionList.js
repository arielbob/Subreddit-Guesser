import React from 'react'

const OptionList = ({ options, isVisible, onClick }) => {
  return (
    <div>
      {
        isVisible &&
        <ul>
          {options.map((option, idx) => {
            return (
              <li key={idx}>
                <button value={option} onClick={(e) => onClick(e.target.value)}>{option}</button>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default OptionList
