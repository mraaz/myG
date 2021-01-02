import React from 'react';
import Progress from '../../common/ProgressCircle/progress'
import LoadingIndicator from '../../LoadingIndicator'
import Experiences from '../Experiences'
import InviteModal from '../Invite'
import { ignoreFunctions } from '../../../../common/render'
import notifyToast from '../../../../common/toast'

export default class Results extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    hovering: null,
    inviting: null,
  }

  cancelFriendRequest = () => this.props.cancelFriendRequest(this.props.profile.alias, this.props.profile.profileId)

  renderLoading = () => {
    if (!this.props.loading) return null;
    return(
      <div className='loading'>
        <p className='loading-hint'>Searching for Gamers...</p>
        <LoadingIndicator color={'#F0F0F0'} />
      </div>
    );
  }

  renderGamers = () => {
    if (this.props.loading) return null;
    return this.props.gamers.map(this.renderGamer);
  }
  
  renderGamer = (gamer) => {
    const isHovering = this.state.hovering === gamer.profileId;
    return(
      <div className="find-gamer-result" key={gamer.profileId}>
        <div className={`gamer ${isHovering ? 'hover' : ''}`}
          onMouseEnter={() => this.setState({ hovering: gamer.profileId })}
          onMouseLeave={() => this.setState({ hovering: null })}
        >
          {this.renderHoverBar(gamer, isHovering)}
          <div className='icon' style={{ backgroundImage: `url('${gamer.image}'), url('https://myG.gg/default_user/new-user-profile-picture.png')` }} />
          <div className="info">
            {gamer.alias && <span className="alias">@{gamer.alias}</span>}
            {gamer.country && <span className="title">Country</span>}
            {gamer.country && <span className="value">{gamer.country}</span>}
            {gamer.team && <span className="title">Professional Team</span>}
            {gamer.team && <span className="value">{gamer.team}</span>}
            {gamer.languages.length && <span className="title">Languages</span>}
            {gamer.languages.length && <span className="value">{gamer.languages.join(', ')}</span>}
          </div>
          <div className="level-progress">
            <Progress
              className={`circle-wrap`}
              borderColor={'#E5C746'}
              progress={0}
              value={gamer.level}
              subtitle={'Level'}
              reduction={0}
              hideBall
              strokeWidth={8}
              background={'#ffffff'}
            />
          </div>
          <div className="info">
            <span className="title">Experience Pts.</span>
            <span className="value">{gamer.experience}</span>
          </div>
        </div>
        <Experiences alias={gamer.alias} gameExperiences={(gamer.gameExperiences || []).filter((experience) => gamer.mostPlayedGames.includes(experience.name))} />
      </div>
    );
  }

  renderButton = (action, title) => <div className="small-button clickable" onClick={action}>{title}</div>

  renderHoverBar = (gamer, isHovering) => {
    if (!isHovering) return null;

    const canSendFriendRequest = !(this.props.profile.friends || []).includes(gamer.alias) && !(this.props.profile.friendRequests || []).includes(gamer.alias);
    const canCancelFriendRequest = !(this.props.profile.friends || []).includes(gamer.alias) && (this.props.profile.friendRequests || []).includes(gamer.alias);
    const canFollow = !(this.props.profile.followers || []).includes(gamer.alias);
    const canUnfollow = (this.props.profile.followers || []).includes(gamer.alias);

    const openProfile = () => window.router.push(`/profile/${gamer.alias}`);
    const sendFriendRequest = () => this.sendFriendRequest(gamer.alias, gamer.profileId);
    const cancelFriendRequest = () => this.cancelFriendRequest(gamer.alias, gamer.profileId);
    const invite = () => this.setState({ inviting: gamer });
    const follow = () => this.follow(gamer.alias, gamer.profileId);
    const unfollow = () => this.unfollow(gamer.alias, gamer.profileId);

    return(
      <div className="hover-bar">
        {this.renderButton(openProfile, 'Profile')}
        {canSendFriendRequest && this.renderButton(sendFriendRequest, 'Connect')}
        {canCancelFriendRequest && this.renderButton(cancelFriendRequest, 'Request Sent')}
        {this.renderButton(invite, 'Invite')}
        {canFollow && this.renderButton(follow, 'Follow')}
        {canUnfollow && this.renderButton(unfollow, 'Unfollow')}
      </div>
    );
  }

  renderInviteModal = () => {
    if (!this.state.inviting) return null;
    return(
      <InviteModal 
        gamer={this.state.inviting}
        onClose={() => this.setState({ inviting: null })}
      />
    );
  }

  follow = (alias, profileId) => {
    notifyToast(`Got it mate! You have followed ${alias}!`)
    this.props.follow(alias, profileId)
  }

  unfollow = (alias, profileId) => {
    notifyToast(`Got it mate! You have unfollowed ${alias}!`)
    this.props.unfollow(alias, profileId)
  }

  sendFriendRequest = (alias, profileId) => {
    notifyToast(`Got it mate! Friend request sent to ${alias}!`)
    this.props.sendFriendRequest(alias, profileId)
  }

  cancelFriendRequest = (alias, profileId) => {
    notifyToast(`Got it mate! Friend request removed from ${alias}!`)
    this.props.cancelFriendRequest(alias, profileId)
  }

  render() {
    return(
      <div className="find-gamers-results">
        {this.renderLoading()}
        {this.renderGamers()}
        {this.renderInviteModal()}
      </div>
    );
  }
}
