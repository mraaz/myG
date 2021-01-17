import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-overlay' />
          <div className='modal-wrapper' aria-modal aria-hidden tabIndex={-1} role='dialog'>
            <div className='modal-content'>
              <button type='button' className='modal-close-button' data-dismiss='modal' aria-label='Close' onClick={hide}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <p>Hello, I'm a modal.</p>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null

export default Modal
