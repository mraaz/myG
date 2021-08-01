import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class SignUpModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  login = () => {
    window.location.href = '/'
  }

  render() {
    return (
      <div id="guest-modal" onClick={this.props.onClick}>
        <div className="guest-modal-content">
          <span className="guest-modal-title">Create an account or login to continue</span>
          <div className='guest-button-container'>
            <div className='guest-button guest-green guest-join-label' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              Join now
            </div>
            <div className='guest-button clickable' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              <span>Sign in</span>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
