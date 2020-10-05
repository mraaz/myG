import React from 'react'
import Uploader from './uploader'
import get from 'lodash.get'
import Dossier from '../Dossier'
import { ignoreFunctions } from '../../../../common/render'
import { openChatByContact } from '../../../../common/chat'
import { showMessengerAlert } from '../../../../common/alert'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false,
    hoveringIcon: false,
  }

  onUpload = (source, key) => this.props.uploadProfileImage(this.props.alias, source, key)

  renderIcon = () => {
    if (this.props.profile.isSelf) {
      return (
        <Uploader onUpload={this.onUpload}>
          <div className='icon clickable' 
            style={{ backgroundImage: `url('${this.props.profile.image}')` }} 
            onMouseEnter={() => this.setState({ hoveringIcon: true })}
            onMouseLeave={() => this.setState({ hoveringIcon: false })}
          >
            {this.state.hoveringIcon && <div className="hover-icon">Update</div>}
          </div>
        </Uploader>
      )
    }
    return (
      <div
        className='icon'
        style={{
          backgroundImage: `url('${this.props.profile.image}'), url('https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png')`,
        }}
      />
    )
  }

  renderInfo = () => {
    const firstName = get(this.props, 'profile.firstName') || ''
    const lastName = get(this.props, 'profile.lastName') || ''
    const name = this.props.profile.isSelf ? '' : `${firstName} ${lastName}`
    return (
      <div className='info'>
        {this.renderIcon()}
        <div className={`status-${this.props.profile.status}`} />
        <div className={`handle ${this.props.profile.isSelf ? 'self' : ''}`}>
          <span className='alias'>@{this.props.profile.alias}</span>
          <span className='name'>{name}</span>
        </div>
      </div>
    )
  }

  unfriend = () => this.props.unfriend(this.props.profile.alias, this.props.profile.profileId)
  unfollow = () => this.props.unfollow(this.props.profile.alias, this.props.profile.profileId)

  renderConnectionButton = () => {
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFriend) {
      return (
        <div className='button clickable' onClick={() => showMessengerAlert('Are you sure mate?', this.unfriend, null, 'Yes')}>
          Remove Friend
        </div>
      )
    }
    if (this.props.profile.hasReceivedFriendRequest) {
      const { alias, profileId, friendRequestId } = this.props.profile
      return (
        <div className='button clickable' onClick={() => this.props.confirmFriendRequest(alias, profileId, friendRequestId)}>
          Accept Friend
        </div>
      )
    }
    if (this.props.profile.hasSentFriendRequest) {
      return <div className='button'>Request Sent</div>
    }
    return (
      <div
        className='button clickable'
        onClick={() => this.props.sendFriendRequest(this.props.profile.alias, this.props.profile.profileId)}>
        Request Connection
      </div>
    )
  }

  renderSendMessageButton = () => {
    if (this.props.profile.isSelf) return null
    if (!this.props.profile.isFriend) return null
    return (
      <div className='send-message-button clickable' onClick={() => openChatByContact(this.props.profile.profileId)}>
        <div
          className='send-message-button-icon'
          style={{ backgroundImage: `url('https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/logo.svg')` }}
        />
        Send Message
      </div>
    )
  }

  renderFollowButton = () => {
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFollower) {
      return (
        <div className='button clickable' onClick={() => showMessengerAlert('Are you sure mate?', this.unfollow, null, 'Yes')}>
          Unfollow
        </div>
      )
    }
    return (
      <div className='button clickable' onClick={() => this.props.follow(this.props.profile.alias, this.props.profile.profileId)}>
        Follow
      </div>
    )
  }

  renderViewFriendsButton = () => {
    if (this.props.profile.isSelf) return null
    return <div className='button clickable'>View Friends</div>
  }

  renderSocialHubButton = () => {
    return <div className='button clickable' onClick={() => this.setState({ editing: 'social-view' })}>Social Hub</div>
  }

  renderSocialHub = () => {
    if (!this.state.editing) return;
    return (
      <Dossier
        profile={this.props.profile}
        updateProfile={this.props.updateProfile}
        isSelf={this.props.isSelf}
        tab={this.state.editing}
        onClose={() => this.setState({ editing: false })}
      />
    )
  }

  render() {
    return (
      <div id='header'>
        {this.renderInfo()}
        <div className='buttons'>
          {this.renderConnectionButton()}
          {this.renderSendMessageButton()}
          {this.renderFollowButton()}
          {this.renderViewFriendsButton()}
          {this.renderSocialHubButton()}
          {this.renderSocialHub()}
        </div>
      </div>
    )
  }
}
