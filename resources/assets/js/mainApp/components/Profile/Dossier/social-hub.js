import React from 'react'
import { getAssetUrl } from '../../../../common/assets'
import { copyToClipboard } from '../../../../common/clipboard'
import { ignoreFunctions } from '../../../../common/render'
import notifyToast from '../../../../common/toast'

export default class DossierSocialHub extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    twitch: '',
    discord: '',
    steam: '',
    youtube: '',
    facebook: '',
  }

  componentDidMount() {
    this.setState({
      twitch: this.props.profile.twitch || '',
      discord: this.props.profile.discord || '',
      steam: this.props.profile.steam || '',
      youtube: this.props.profile.youtube || '',
      facebook: this.props.profile.facebook || '',
    })
  }

  onSave = () => {
    if (!this.canSave()) return
    this.props.updateProfile(this.props.profile.alias, {
      twitch: /^((https:\/\/)?www.)?twitch.tv\//.test(this.state.twitch) ? this.state.twitch : '',
      discord: /^[A-z]+#\d+$/.test(this.state.discord) ? this.state.discord : '',
      steam: /^((https:\/\/)?)?steamcommunity.com\/profiles\//.test(this.state.steam) ? this.state.steam : '',
      youtube: /^((https:\/\/)?www.)?youtube.com\/channel\//.test(this.state.youtube) ? this.state.youtube : '',
      facebook: /^(((https:\/\/)?www.)?facebook.com\/)|(((https:\/\/)?www.)?fb.me\/)/.test(this.state.facebook) ? this.state.facebook : '',
    })
    this.props.onClose()
  }

  canSave = () => {
    return !(
      this.state.twitch && !/^((https:\/\/)?www.)?twitch.tv\//.test(this.state.twitch) ||
      this.state.discord && !/^[A-z]+#\d+$/.test(this.state.discord) ||
      this.state.steam && !/^((https:\/\/)?)?steamcommunity.com\/profiles\//.test(this.state.steam) ||
      this.state.youtube && !/^((https:\/\/)?www.)?youtube.com\/channel\//.test(this.state.youtube) ||
      this.state.faceb && !/^(((https:\/\/)?www.)?facebook.com\/)|(((https:\/\/)?www.)?fb.me\/)/.test(this.state.facebook)
    )
  }

  forceHttps = (url) => {
    if (url.startsWith('https://')) return url;
    return `https://${url}`;
  }

  renderTwitchRow = () => {
    const isEmpty = !this.state.twitch
    const isValid = /^((https:\/\/)?www.)?twitch.tv\//.test(this.state.twitch)
    if (!this.props.isSelf && (isEmpty || !isValid)) return
    const style = isEmpty || isValid ? 'base-button' : 'invalid-button'
    return (
      <div className='row-center'>
        <div className='transparent-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_twitch_white')})` }} />
        <span className='flow-hint'>Twitch</span>
        <div className='input-container-fill'>
          <input
            className='input'
            value={this.state.twitch}
            disabled={!this.props.isSelf}
            placeholder='Enter link in this format: https://www.twitch.tv/username'
            onChange={(event) => this.setState({ twitch: event.target.value })}></input>
        </div>
        <a
          className={style + ' aligned-button'}
          href={isEmpty ? 'https://www.twitch.tv/profile' : isValid && this.forceHttps(this.state.twitch)}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderDiscordRow = () => {
    const isEmpty = !this.state.discord
    const isValid = /^[A-z]+#\d+$/.test(this.state.discord)
    if (!this.props.isSelf && (isEmpty || !isValid)) return
    const style = isEmpty || isValid ? 'base-button' : 'invalid-button'
    return (
      <div className='row-center'>
        <div className='transparent-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_discord_white')})` }} />
        <span className='flow-hint'>Discord</span>
        <div className='input-container-fill'>
          <input
            className='input'
            value={this.state.discord}
            disabled={!this.props.isSelf}
            placeholder='Enter link in this format: username#tag'
            onChange={(event) => this.setState({ discord: event.target.value })}></input>
        </div>
        <a
          className={style + ' aligned-button ' + (isValid ? 'clickable' : '')}
          href={isEmpty ? 'https://discord.com/channels/@me' : ''}
          onClick={(event) => {
            if (!isValid) return
            copyToClipboard(this.state.discord)
            notifyToast('Discord link copied to clipboard!')
            event.preventDefault()
          }}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Copy Link' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderSteamRow = () => {
    const isEmpty = !this.state.steam
    const isValid = /^((https:\/\/)?)?steamcommunity.com\/profiles\//.test(this.state.steam)
    if (!this.props.isSelf && (isEmpty || !isValid)) return
    const style = isEmpty || isValid ? 'base-button' : 'invalid-button'
    return (
      <div className='row-center'>
        <div className='transparent-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_steam_white')})` }} />
        <span className='flow-hint'>Steam</span>
        <div className='input-container-fill'>
          <input
            className='input'
            value={this.state.steam}
            disabled={!this.props.isSelf}
            placeholder='Enter link in this format: https://steamcommunity.com/profiles/profile-id'
            onChange={(event) => this.setState({ steam: event.target.value })}></input>
        </div>
        <a
          className={style + ' aligned-button'}
          href={isEmpty ? 'https://steamcommunity.com/my' : isValid && this.forceHttps(this.state.steam)}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderYoutubeRow = () => {
    const isEmpty = !this.state.youtube
    const isValid = /^((https:\/\/)?www.)?youtube.com\/channel\//.test(this.state.youtube)
    if (!this.props.isSelf && (isEmpty || !isValid)) return
    const style = isEmpty || isValid ? 'base-button' : 'invalid-button'
    return (
      <div className='row-center'>
        <div className='transparent-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_youtube_white')})` }} />
        <span className='flow-hint'>Youtube</span>
        <div className='input-container-fill'>
          <input
            className='input'
            value={this.state.youtube}
            disabled={!this.props.isSelf}
            placeholder='Enter link in this format: https://www.youtube.com/channel/channel-id'
            onChange={(event) => this.setState({ youtube: event.target.value })}></input>
        </div>
        <a
          className={style + ' aligned-button'}
          href={isEmpty ? 'https://www.youtube.com/my_profile' : isValid && this.forceHttps(this.state.youtube)}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderFacebookRow = () => {
    const isEmpty = !this.state.facebook
    const isValid = /^(((https:\/\/)?www.)?facebook.com\/)|(((https:\/\/)?www.)?fb.me\/)/.test(this.state.facebook)
    if (!this.props.isSelf && (isEmpty || !isValid)) return
    const style = isEmpty || isValid ? 'base-button' : 'invalid-button'
    return (
      <div className='row-center'>
        <div className='transparent-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_facebook_white')})` }} />
        <span className='flow-hint'>Facebook</span>
        <div className='input-container-fill'>
          <input
            className='input'
            value={this.state.facebook}
            disabled={!this.props.isSelf}
            placeholder='Enter link in this format: https://www.facebook.com/profile-id'
            onChange={(event) => this.setState({ facebook: event.target.value })}></input>
        </div>
        <a
          className={style + ' aligned-button'}
          href={isEmpty ? 'https://www.facebook.com/me' : isValid && this.forceHttps(this.state.facebook)}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderDivider = () => {
    if (!this.props.isSelf) return
    return <div className='divider' />
  }

  renderSpacer = () => {
    return <div className='spacer' />
  }

  renderSave = () => {
    if (!this.props.isSelf) return
    const buttonState = this.canSave() ? 'clickable' : 'disabled'
    return (
      <div className='save-container'>
        <div className={`save-button ${buttonState}`} onClick={this.onSave}>
          Save
        </div>
      </div>
    )
  }

  renderClose = () => {
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.props.onClose}
      />
    )
  }

  renderShare = () => {
    return (
      <div
        className='share-button clickable'
        onClick={() => {
          copyToClipboard(window.location.href)
          notifyToast('Profile link copied. Click Click Boom!')
        }}>
        Share
      </div>
    )
  }

  renderEmpty = () => {
    if (this.props.isSelf) return
    if (this.canSave()) return
    return <span className='empty-tab'>Nothing to show here mate!</span>
  }

  renderLinkToFindYourLink = (link) => {
    if (!this.props.isSelf) return
    return (
      <div className="find-link">
        Click <a className="find-link-link" href={link} target="_blank">here</a> to find your link
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='content small-content'>
          <div className='scroll-content'>
            {this.renderTwitchRow()}
            {this.renderLinkToFindYourLink('https://www.twitch.tv/profile')}
            {this.renderDivider()}
            {this.renderDiscordRow()}
            {this.renderLinkToFindYourLink('https://discord.com/channels/@me')}
            {this.renderDivider()}
            {this.renderSteamRow()}
            {this.renderLinkToFindYourLink('https://steamcommunity.com/my')}
            {this.renderDivider()}
            {this.renderYoutubeRow()}
            {this.renderLinkToFindYourLink('https://www.youtube.com/my_profile')}
            {this.renderDivider()}
            {this.renderFacebookRow()}
            {this.renderLinkToFindYourLink('https://www.facebook.com/me')}
            {this.renderEmpty()}
          </div>
          {this.renderSpacer()}
          {this.renderSave()}
          {this.renderShare()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
