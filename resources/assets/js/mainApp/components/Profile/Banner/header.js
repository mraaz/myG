import React from 'react'
import Uploader from '../../common/Uploader'
import get from 'lodash.get'
import Dossier from '../Dossier'
import ViewFriends from '../ViewFriends'
import { ignoreFunctions } from '../../../../common/render'
import { openChatByContact } from '../../../../common/chat'
import { showMessengerAlert } from '../../../../common/alert'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false,
    viewingFriends: false,
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
          backgroundImage: `url('${this.props.profile.image}'), url('https://myG.gg/default_user/new-user-profile-picture.png')`,
        }}
      />
    )
  }

  renderInfo = () => {
    const firstName = get(this.props, 'profile.firstName') || ''
    const lastName = get(this.props, 'profile.lastName') || ''
    const { isFriend, isSelf, visibilityName } = this.props.profile;
    const name = visibilityName === 'secret' || visibilityName === 'friends' && !isFriend && !isSelf ? '' : `${firstName} ${lastName}`
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
  cancelFriendRequest = () => this.props.cancelFriendRequest(this.props.profile.alias, this.props.profile.profileId)

  renderConnectionButton = () => {
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFriend) {
      return (
        <div className='button clickable' onClick={() => showMessengerAlert('Fair dinkum! You sure you want to do this?', this.unfriend, null, 'Make it so')}>
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
      return <div className='button clickable' onClick={() => showMessengerAlert('This will cancel the friend request, are you sure?', this.cancelFriendRequest, null, 'Make it so')}>Request Sent</div>
    }
    return (
      <div
        className='button clickable'
        onClick={() => this.props.sendFriendRequest(this.props.profile.alias, this.props.profile.profileId)}>
        Connect
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
          style={{ backgroundImage: `url('https://myG.gg/platform_images/Dashboard/logo.svg')` }}
        />
        Send Message
      </div>
    )
  }

  renderFollowButton = () => {
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFollower) {
      return (
        <div className='button clickable' onClick={() => showMessengerAlert('Fair dinkum! You sure you want to do this?', this.unfollow, null, 'Make it so')}>
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
    return <div className='button clickable' onClick={() => this.setState({ viewingFriends: true })}>View Friends</div>
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

  renderViewFriends = () => {
    if (!this.state.viewingFriends) return;
    return (
      <ViewFriends
        profile={this.props.profile}
        sendFriendRequest={this.props.sendFriendRequest}
        onClose={() => this.setState({ viewingFriends: false })}
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
          {this.renderViewFriends()}
        </div>
      </div>
    )
  }
}
