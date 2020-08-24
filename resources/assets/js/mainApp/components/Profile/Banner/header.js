import React from 'react'
import Uploader from './uploader'
import { ignoreFunctions } from '../../../../common/render'
import { openChatByContact } from '../../../../common/chat'
import { showMessengerAlert } from '../../../../common/alert'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  onUpload = (source, key) => this.props.uploadProfileImage(this.props.alias, source, key)

  renderIcon = () => {
    if (this.props.profile.isSelf) {
      return (
        <Uploader onUpload={this.onUpload}>
          <div className='icon clickable' style={{ backgroundImage: `url('${this.props.profile.image}')` }} />
        </Uploader>
      )
    }
    return <div className='icon' style={{ backgroundImage: `url('${this.props.profile.image}'), url('https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png')` }} />
  }

  renderInfo = () => {
    return (
      <div className='info'>
        {this.renderIcon()}
        <div className={`status-${this.props.profile.status}`} />
        <span className={`handle${this.props.profile.isSelf ? '-self' : ''}`}>@{this.props.profile.alias}</span>
      </div>
    )
  }

  unfriend = () => this.props.unfriend(this.props.profile.alias, this.props.profile.profileId)
  unfollow = () => this.props.unfollow(this.props.profile.alias, this.props.profile.profileId)

  renderConnectionButton = () => {
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFriend) {
      return (
        <div className='button clickable' onClick={() => showMessengerAlert("Are you sure mate?", this.unfriend, null, 'Yes')}>
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
        <div className='button clickable' onClick={() => showMessengerAlert("Are you sure mate?", this.unfollow, null, 'Yes')}>
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
    if (this.props.profile.isSelf) return null
    return <div className='button clickable'>Social Hub</div>
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
        </div>
      </div>
    )
  }
}
