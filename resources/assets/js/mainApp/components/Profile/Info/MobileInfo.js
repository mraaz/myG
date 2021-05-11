import React from 'react'
import get from 'lodash.get'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import Dossier from '../Dossier'

export default class ProfileInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false
  }

  static getDerivedStateFromProps(props) {
    const isFriend = get(props, 'profile.isFriend') || false
    const isSelf = get(props, 'profile.isSelf') || false
    const visibilityEmail = get(props, 'profile.visibilityEmail') || 'secret'
    const visibilityCountry = get(props, 'profile.visibilityCountry') || 'secret'
    const canShowEmail = visibilityEmail === 'public' || (visibilityEmail === 'friends' && (isFriend || isSelf))
    const canShowCountry = visibilityCountry === 'public' || (visibilityCountry === 'friends' && (isFriend || isSelf))
    const country = canShowCountry ? get(props, 'profile.country') || 'N/A' : 'Hidden'
    const team = get(props, 'profile.team') || 'N/A'
    const email = canShowEmail ? get(props, 'profile.email') || 'N/A' : 'Hidden'
    const relationship = get(props, 'profile.relationship') || 'N/A'
    const languagesArray = get(props, 'profile.languages') || []
    const languages = languagesArray.length ? languagesArray.join(', ') : 'N/A'
    const mostPlayedGamesArray = get(props, 'profile.mostPlayedGames') || []
    const mostPlayedGames = mostPlayedGamesArray.length ? mostPlayedGamesArray.join(', ') : 'N/A'
    return { country, mostPlayedGames, team, email, relationship, languages, isSelf }
  }

  renderPod = (title, value, alignment) => {
    const breakPoint = window.innerWidth <= 575 ? 10 : 25
    return (
      <div className={`pod ${alignment}`}>
        {this.state.hoveringTitle === title && title.length > breakPoint && <div className='hover-value'>{title}</div>}
        {this.state.hoveringValue === value && value.length > breakPoint && <div className='hover-value'>{value}</div>}
        <p
          className='title'
          onMouseOver={() => this.setState({ hoveringTitle: title })}
          onMouseLeave={() => this.setState({ hoveringTitle: null })}
        >
          {title.slice(0, breakPoint)}
          {title.length > breakPoint ? '...' : ''}
        </p>
        <p
          className='value'
          onMouseOver={() => this.setState({ hoveringValue: value })}
          onMouseLeave={() => this.setState({ hoveringValue: null })}
        >
          {value.slice(0, breakPoint)}
          {value.length > breakPoint ? '...' : ''}
        </p>
      </div>
    )
  }

  renderEditButton = () => {
    if (!this.state.isSelf) return null
    return (
      <div className='settings-button-container2'>
        <div
          className='settings-button clickable'
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_settings')})` }}
          onClick={() => this.setState((previous) => ({ editing: !previous.editing }))}
        />
      </div>
    )
  }

  renderEditInfo = () => {
    if (!this.state.isSelf || !this.state.editing) return null
    return (
      <Dossier
        profile={this.props.profile}
        isSelf={this.state.isSelf}
        updateProfile={this.props.updateProfile}
        tab={'info'}
        onClose={() => this.setState({ editing: false })}
      />
    )
  }

  render() {
    return (
      <div id='profile-info'>
        <div className='row'>
          <div className='col-sm-6'>{this.renderPod('Country', this.state.country, 'left')}</div>
          <div className='col-sm-6'>{this.renderPod('Games currently playing', this.state.mostPlayedGames, 'left')}</div>
          <div className='col-sm-6'>{this.renderPod('Professional Team', this.state.team, 'left')}</div>
          <div className='col-sm-6'>{this.renderEditButton()}</div>
        </div>

        {this.renderEditInfo()}
      </div>
    )
  }
}
