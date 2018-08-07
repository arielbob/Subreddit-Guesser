import React from 'react'

const OptionList = ({ options, isVisible, onClick }) => {
  return (
    <div>
      {
        isVisible &&
        <ul className='options'>
          {options.map((option, idx) => {
            return (
              <li key={idx} className='options__option'>
                <button className='options__btn' value={option} onClick={(e) => onClick(e.target.value)}>{option}</button>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default OptionList
