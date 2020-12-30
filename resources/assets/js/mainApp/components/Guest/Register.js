import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class GuestRegister extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return (
      <div className='card-container'>
        <div className='logo-on-card'>
          <img
            src='https://myG.gg/platform_images/Login+Screen/Card_Logo.svg'
            height='90'
            width='90'
          />
        </div>
        <div className='card-round'>
          <div className='register-hint-container'>
            <p className='register-hint-title'>Create a new Account</p>
            <p className='register-hint-subtitle'>To grant full access</p>
          </div>
          <a href='/login/facebook' className='button facebook-btn'>
            <img
              src='https://myG.gg/platform_images/Login+Screen/Facebook_SSO.svg'
              className='sso-logo'
              height='25'
              width='25'
            />
            <div className='sso-text'>Create with Facebook</div>
          </a>
          <a href='/login/google' className='button google-btn'>
            <img
              src='https://myG.gg/platform_images/Login+Screen/Google_SSO.svg'
              className='sso-logo'
              height='25'
              width='25'
            />
            <div className='sso-text'>Create with Google</div>
          </a>
          <a href='/login/steam' className='button steam-btn'>
            <img
              src='https://myG.gg/platform_images/Login+Screen/Steam_SSO.svg'
              className='sso-logo'
              height='25'
              width='25'
            />
            <div className='sso-text'>Create with Steam</div>
          </a>
          <a href='/login/discord' className='button discord-btn'>
            <img
              src='https://myG.gg/platform_images/Login+Screen/Discord_SSO.svg'
              className='sso-logo'
              height='25'
              width='25'
            />
            <div className='sso-text'>Create with Discord</div>
          </a>
        </div>
      </div>
    )
  }
}
