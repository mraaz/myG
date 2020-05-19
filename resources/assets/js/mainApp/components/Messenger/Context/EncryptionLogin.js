import React from 'react'
import { showMessengerAlert } from '../../../../common/alert'
import { fetchUser } from '../../../../integration/http/user'

export default class EncryptionLogin extends React.PureComponent {
  state = {
    pin: '',
  }

  render() {
    return (
      <div className='messenger-encryption-login-container'>
        <div className='messenger-encryption-login-icon-container'>
          <div
            className='messenger-encryption-login-icon'
            style={{ backgroundImage: `url("https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg")` }}
          />
        </div>
        <p className='messenger-encryption-login-title'>Enter Encryption Key</p>
        <input
          className='messenger-encryption-login-input'
          type='text'
          placeholder='Encryption Key'
          value={this.state.pin}
          onChange={(event) => this.setState({ pin: event.target.value })}
        />
        <div
          className='messenger-encryption-login-validate-button clickable'
          onClick={() => fetchUser(this.props.userId).then(response => this.props.validatePin(this.state.pin, response.user[0].public_key))}>
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
          generate new key *
        </div>
        <div className='messenger-encryption-login-divider' />
        <p className='messenger-encryption-login-hint'>* This will allow a new access, but your chat history will be lost.</p>
        <p className='messenger-encryption-login-hint'>* If you don't have access to your Encryption Key, please check your e-mail.</p>
      </div>
    )
  }
}
