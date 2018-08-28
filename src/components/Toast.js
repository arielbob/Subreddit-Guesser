import React from 'react'
import PropTypes from 'prop-types'

import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group'

const Toast = ({ isVisible, text, color }) => {
  return (
    <CSSTransition
      classNames='toast'
      timeout={300}
      in={isVisible}
      unmountOnExit>
      <div className='toast'>
        <div className={'toast__message ' + (color ? 'toast__message--' + color : '')}>
          <p className='toast__text'>{text}</p>
        </div>
      </div>
    </CSSTransition>
  )
}

Toast.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Toast
