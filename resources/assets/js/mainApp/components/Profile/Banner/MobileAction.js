import React, { Fragment } from 'react'
import Uploader from '../../common/Uploader'
import get from 'lodash.get'
import Dossier from '../Dossier'
import ViewFriends from '../ViewFriends'
import { ignoreFunctions } from '../../../../common/render'
import { openChatByContact } from '../../../../common/chat'
import { showMessengerAlert } from '../../../../common/alert'

export default class MobileAction extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false,
    viewingFriends: false,
    hoveringIcon: false
  }

  unfriend = () => this.props.unfriend(this.props.profile.alias, this.props.profile.profileId)
  unfollow = () => this.props.unfollow(this.props.profile.alias, this.props.profile.profileId)
  cancelFriendRequest = () => this.props.cancelFriendRequest(this.props.profile.alias, this.props.profile.profileId)

  renderConnectionButton = () => {
    if (this.props.onlyProfile) return null
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFriend) {
      return (
        <div
          className='button clickable'
          onClick={() => showMessengerAlert('Fair dinkum! You sure you want to do this?', this.unfriend, null, 'Make it so')}
        >
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
      return (
        <div
          className='button clickable'
          onClick={() =>
            showMessengerAlert('This will cancel the friend request, are you sure?', this.cancelFriendRequest, null, 'Make it so')
          }
        >
          Request Sent
        </div>
      )
    }
    return (
      <div
        className='button clickable'
        onClick={() => this.props.sendFriendRequest(this.props.profile.alias, this.props.profile.profileId)}
      >
        Connect
      </div>
    )
  }

  renderSendMessageButton = () => {
    if (this.props.onlyProfile) return null
    if (this.props.profile.isSelf) return null
    if (!this.props.profile.isFriend) return null
    return (
      <div className='send-message-button clickable' onClick={() => openChatByContact(this.props.profile.profileId)}>
        <div className='send-message-button-icon' style={{ backgroundImage: `url('https://myG.gg/platform_images/Dashboard/logo.svg')` }} />
        Send Message
      </div>
    )
  }

  renderFollowButton = () => {
    if (this.props.onlyProfile) return null
    if (this.props.profile.isSelf) return null
    if (this.props.profile.isFollower) {
      return (
        <div
          className='button clickable'
          onClick={() => showMessengerAlert('Fair dinkum! You sure you want to do this?', this.unfollow, null, 'Make it so')}
        >
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
    if (this.props.onlyProfile) return null
    if (this.props.profile.isSelf) return null
    return (
      <div className='button clickable' onClick={() => this.setState({ viewingFriends: true })}>
        View Friends
      </div>
    )
  }

  renderSocialHubButton = () => {
    if (this.props.onlyProfile) return null
    return (
      <div className='button clickable' onClick={() => this.setState({ editing: 'social-view' })}>
        Social Hub
      </div>
    )
  }

  renderAchievementsButton = () => {
    if (this.props.onlyProfile || !this.props.isSelf) return null
    return (
      <div className='button clickable' onClick={() => window.router.push('/achievements/badges')}>
        Achievements
      </div>
    )
  }

  renderProfileButton = () => {
    if (!this.props.onlyProfile) return null
    return (
      <div className='button clickable' onClick={() => window.router.push(`/profile/${this.props.alias}`)}>
        Go To Profile
      </div>
    )
  }

  renderSocialHub = () => {
    if (this.props.onlyProfile) return null
    if (!this.state.editing) return
    return (
      <Dossier
        profile={this.props.profile}
        updateProfile={this.props.updateProfile}
        isSelf={this.props.isSelf}
        tab={this.state.editing}
        onClose={() => this.setState({ editing: false, editing: '' })}
      />
    )
  }

  renderViewFriends = () => {
    if (this.props.onlyProfile) return null
    if (!this.state.viewingFriends) return
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
      <Fragment>
        <div className={`mobile__buttons-group ${this.state.editing == 'social-view' ? 'zIndex' : ''}`}>
          {this.renderSendMessageButton()}
          {this.renderConnectionButton()}
          {this.renderFollowButton()}
          {this.renderViewFriendsButton()}
          {this.renderSocialHubButton()}
          {this.renderAchievementsButton()}
          {this.renderProfileButton()}
          {this.renderSocialHub()}
          {this.renderViewFriends()}
        </div>
      </Fragment>
    )
  }
}
