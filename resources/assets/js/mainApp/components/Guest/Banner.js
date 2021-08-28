import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class GuestBanner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }
  constructor(props){
    super(props)
    this.navRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.stickNavigationBar)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickNavigationBar)
  }

  stickNavigationBar = () => {
    this.lastScrollY = window.scrollY
    window.requestAnimationFrame(() => {
      if (!this.navRef.current || !this.navRef.current.style) return
      this.navRef.current.removeAttribute('style')
      if (this.lastScrollY > 10) {
        this.navRef.current.style.top = '0'
        this.navRef.current.style.left = '0'
        this.navRef.current.style.right = '0'
        this.navRef.current.style.position = 'fixed'
        this.navRef.current.style.zIndex = '1001'
        this.navRef.current.style.backgroundColor= '#181a1c'
      }
    })
  }

  login = () => {
    window.location.href = '/'
  }

  searchGames = () => {
    window.location.href = '/find-gamers/search'
  }

  render() {
    return (
      <div id='guest-banner' ref={this.navRef}>
        <div
          className='logo-container'
          onClick={this.login}
          style={{ backgroundImage: 'url(https://myg.gg/platform_images/Login+Screen/Logo_FINAL%402x.png)' }}
        />
        {!this.props.hideSearchGamers && (
          <div className='search-container clickable' onClick={this.searchGames}>
            <span className='input'>Search Gamers</span>
          </div>
        )}
        <div className='guest-button-container'>
          <div className='guest-button guest-green guest-join-label' onClick={this.props.handleGuestModal}>
            Join now
          </div>
          <div className='guest-button clickable' onClick={this.props.handleGuestModal}>
            <span>Sign in</span>
          </div>
        </div>
      </div>
    )
  }
}
