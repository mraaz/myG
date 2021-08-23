import React from 'react'
import { ignoreFunctions } from '../../../common/render'
export default class SignUpModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  login = () => {
    window.location.href = '/'
  } 
  escFunction =(event)=>{
    if(event.keyCode === 27) {
      this.props.handleShowModal()
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  

  render() {
    return (
      <div id="guest-modal" className="login-container welcome-page">
        <div className="guest-modal-content">
          {/* <span className="guest-modal-title">Create an account or login to continue</span> */}
          {/* <div className='guest-button-container'>
            <div className='guest-button guest-green guest-join-label' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              Join now
            </div>
            <div className='guest-button clickable' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              <span>Sign in</span>
            </div>
          </div> */}
          <div className="container">
            {/* <div className="logo-container">
              <img src="https://myG.gg/platform_images/Login+Screen/Logo_FINAL%402x.png" height="90" width="161"/>
            </div> */}
            <div className="card-container">
                <div className="logo-on-card">
                  <img src="https://myG.gg/platform_images/Login+Screen/Card_Logo.svg" height="90" width="90" />
                </div> 
                <div className=" card-round">
                  <div className="slogan-under-card">
                    <b>The Gamer's Platform</b>
                  </div>
                  <div className="slogan-under-under-card">
                    Engineered to enhance your gaming!
                  </div>
                  <br/>
                  <br/>
                  <a href="/login/facebook" className="button facebook-btn">
                    <img src="https://myG.gg/platform_images/Login+Screen/Facebook_SSO.svg" className="sso-logo" height="25" width="25"/>
                    <div className="sso-text">Log in with Facebook</div>
                  </a>
                  <a href="/login/google" className="button google-btn">
                    <img src="https://myG.gg/platform_images/Login+Screen/Google_SSO.svg" className="sso-logo" height="25" width="25"/>
                    <div className="sso-text">Log in with Google</div>
                  </a>
                  <a href="/login/steam" className="button steam-btn">
                    <img src="https://myG.gg/platform_images/Login+Screen/Steam_SSO.svg" className="sso-logo" height="25" width="25"/>
                    <div className="sso-text">Log in with Steam</div>
                  </a>
                  <a href="/login/discord" className="button discord-btn">
                    <img src="https://myG.gg/platform_images/Login+Screen/Discord_SSO.svg" className="sso-logo" height="25" width="25"/>
                    <div className="sso-text">Log in with Discord</div>
                  </a>
                  <div id="cfiblinks">
                    <a href="/login/" className="button discord-btn">
                      <img src="https://myG.gg/platform_images/Login+Screen/Discord_SSO.svg" className="sso-logo" height="25" width="25"/>
                      <div className="sso-text">Log in with Email (Dev use ONLY)</div>
                    </a>
                  </div>
                </div>      
                <div className="card-round">
                  <div className="register-message">
                  myG © 2021 · <a href="/terms">
                    Terms of Use
                  </a>
                  · <a href="/privacy_policy">
                    Privacy Policy ·
                  </a>
                  </div>
                </div>
            </div>
          </div>

          {/* <GuestLink/> */}
        </div>
      </div >
    );
  }
}
