import React from 'react'
import { showMessengerAlert } from '../../../../common/alert'
import { fetchUser } from '../../../../integration/http/user'
import { ignoreFunctions } from '../../../../common/render'

export default class EncryptionLogin extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    pin: '',
  }

  onKeyPressed = (event) => {
    const code = event.keyCode || event.which
    const enterKeyCode = 13
    if (code === enterKeyCode) {
      event.preventDefault()
      this.validateKey()
    }
  }

  validateKey = () => {
    fetchUser(this.props.userId).then((response) => this.props.validatePin(this.state.pin, response.user[0].public_key))
  }

  render() {
    return (
      <div className='messenger-encryption-login-container'>
        <div className='messenger-encryption-login-icon-container'>
          <div
            className='messenger-encryption-login-icon'
            style={{ backgroundImage: `url("https://myG.gg/platform_images/Dashboard/logo.svg")` }}
          />
        </div>
        <p className='messenger-encryption-login-title'>Enter Chat Password</p>
        <input
          className='messenger-encryption-login-input'
          type='password'
          autoComplete='off'
          placeholder='Chat Password'
          value={this.state.pin}
          onKeyPress={this.onKeyPressed}
          onChange={(event) => this.setState({ pin: event.target.value })}
        />
        <div className='messenger-encryption-login-validate-button clickable' onClick={this.validateKey}>
          LOGIN
        </div>
        <div
          className='messenger-encryption-login-generate-button clickable'
          onClick={() =>
            showMessengerAlert(
              'WARNING!!! Are you sure you wish to create a new key? ALL your chat history will be lost. Check your email for your current encryption key.',
              () => this.props.generateKeys()
            )
          }>
          generate new chat password *
        </div>
        <div className='messenger-encryption-login-divider' />
        <p className='messenger-encryption-login-hint'>* This will allow a new access, but your chat history will be lost.</p>
        <p className='messenger-encryption-login-hint'>* If you don't have access to your Encryption Key, please check your e-mail.</p>
      </div>
    )
  }
}
