import React from 'react'
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group'
import { connect } from 'react-redux'

// i think i might actually have to do the toast array thing
// rather than just having one or else if the user changes the toast while
// one is showing, it just flashes to another thing, which is not very appealing
// i would prefer it to disappear and then reappear with the next one
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

const mapStateToProps = (state) => {
  return {
    isVisible: state.isToastVisible,
    text: state.toast.text,
    color: state.toast.color
  }
}

export default connect(mapStateToProps)(Toast)
