import React from 'react'
import PropTypes from 'prop-types'

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

OptionList.propTypes = {
  options: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onOptionClick: PropTypes.func.isRequired
}

export default OptionList
