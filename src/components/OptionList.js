import React from 'react'

const OptionList = ({ options, isVisible, onOptionClick }) => {
  return (
    isVisible &&
    <ul className='options'>
      {options.map((option, idx) => {
        return (
          <li key={idx} className='options__option'>
            <button className='options__btn' value={option} onClick={(e) => onOptionClick(e.target.value)}>{option}</button>
          </li>
        )
      })}
    </ul>
  )
}

export default OptionList
