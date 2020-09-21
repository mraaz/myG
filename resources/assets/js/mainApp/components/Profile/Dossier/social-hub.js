import React from 'react'
import { copy } from 'superagent'
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
    if (!this.hasChanges()) return
    this.props.updateProfile(this.props.profile.alias, {
      twitch: /^https:\/\/www.twitch.tv\//.test(this.state.twitch) ? this.state.twitch : '',
      discord: /^[A-z]+#\d+$/.test(this.state.discord) ? this.state.discord : '',
      steam: /^https:\/\/steamcommunity.com\/profiles\//.test(this.state.steam) ? this.state.steam : '',
      youtube: /^https:\/\/www.youtube.com\/channel\//.test(this.state.youtube) ? this.state.youtube : '',
      facebook: /^https:\/\/www.facebook.com\//.test(this.state.facebook) ? this.state.facebook : '',
    })
    this.props.onClose()
  }

  hasChanges = () => {
    return (
      /^https:\/\/www.twitch.tv\//.test(this.state.twitch) ||
      /^[A-z]+#\d+$/.test(this.state.discord) ||
      /^https:\/\/steamcommunity.com\/profiles\//.test(this.state.steam) ||
      /^https:\/\/www.youtube.com\/channel\//.test(this.state.youtube) ||
      /^https:\/\/www.facebook.com\//.test(this.state.facebook)
    )
  }

  renderTwitchRow = () => {
    const isEmpty = !this.state.twitch
    const isValid = /^https:\/\/www.twitch.tv\//.test(this.state.twitch)
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
          href={isEmpty ? 'https://www.twitch.tv/profile' : isValid && this.state.twitch}
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
    const isValid = /^https:\/\/steamcommunity.com\/profiles\//.test(this.state.steam)
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
          href={isEmpty ? 'https://steamcommunity.com/my' : isValid && this.state.steam}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderYoutubeRow = () => {
    const isEmpty = !this.state.youtube
    const isValid = /^https:\/\/www.youtube.com\/channel\//.test(this.state.youtube)
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
          href={isEmpty ? 'https://www.youtube.com/my_profile' : isValid && this.state.youtube}
          target='_blank'
          rel='noopener noreferrer'>
          {isEmpty ? 'Find link' : isValid ? 'Go to page' : 'Invalid'}
        </a>
      </div>
    )
  }

  renderFacebookRow = () => {
    const isEmpty = !this.state.facebook
    const isValid = /^https:\/\/www.facebook.com\//.test(this.state.facebook)
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
          href={isEmpty ? 'https://www.facebook.com/me' : isValid && this.state.facebook}
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
    const buttonState = this.hasChanges() ? 'clickable' : 'disabled'
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
          notifyToast('Copied this profile link to the clipboard!')
        }}>
        Share
      </div>
    )
  }

  renderEmpty = () => {
    if (this.props.isSelf) return;
    if (this.hasChanges()) return;
    return(
      <span className="empty-tab">Nothing to show here mate!</span>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className='content small-content'>
          {this.renderTwitchRow()}
          {this.renderDivider()}
          {this.renderDiscordRow()}
          {this.renderDivider()}
          {this.renderSteamRow()}
          {this.renderDivider()}
          {this.renderYoutubeRow()}
          {this.renderDivider()}
          {this.renderFacebookRow()}
          {this.renderSpacer()}
          {this.renderSave()}
          {this.renderShare()}
          {this.renderEmpty()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
