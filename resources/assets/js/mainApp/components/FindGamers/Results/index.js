import React from 'react';
import Progress from '../../common/ProgressCircle/progress'
import LoadingIndicator from '../../LoadingIndicator'
import Experiences from '../Experiences'
import InviteModal from '../Invite'
import { ignoreFunctions } from '../../../../common/render'
import notifyToast from '../../../../common/toast'
import { WithTooltip } from '../../Tooltip';

let lastScrollPosition = null;

export default class Results extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  constructor(props) {
    super(props);
    this.state = {
      hovering: null,
      inviting: null,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    document.addEventListener('wheel', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false);
    document.removeEventListener('wheel', this.handleScroll, false);
  }

  handleScroll = () => {
    const scroll = document.scrollingElement || {};
    const windowHeight = window.innerHeight;
    const filters = document.getElementsByClassName('filter-container')[0] || {}
    const list = document.getElementsByClassName('find-gamers-results')[0] || {}
    const element = document.getElementsByClassName('find-gamer-result')[0] || {}
    const elementStyles = window.getComputedStyle(element);
    const elementMarginTop = elementStyles && elementStyles.getPropertyValue('margin-top') || '';
    const elementMarginBottom = elementStyles && elementStyles.getPropertyValue('margin-bottom') || '';
    const elementMargins = parseInt(
      parseInt(elementMarginTop.replace('px', '')) +
      parseInt(elementMarginBottom.replace('px', ''))
    ) || 24
    const filtersHeight = filters.offsetHeight;
    const listHeight = list.offsetHeight + elementMargins;
    const elementHeight = element.offsetHeight + elementMargins;
    const scrollPosition = scroll.scrollTop
    const listFitsInScreen = windowHeight > (listHeight + filtersHeight)
    const scrolledToBottom = (scrollPosition + elementHeight) > windowHeight
    if (this.props.loading || !this.props.gamers.length) return;
    if ((!listFitsInScreen && !scrolledToBottom) || lastScrollPosition === scrollPosition) return;
    lastScrollPosition = scrollPosition;
    this.props.showMore();
  }

  cancelFriendRequest = () => this.props.cancelFriendRequest(this.props.profile.alias, this.props.profile.profileId)

  renderLoading = () => {
    if (!this.props.loading) return null;
    return (
      <div className='loading'>
        <p className='loading-hint'>Searching for Gamers...</p>
        <LoadingIndicator color={'#F0F0F0'} />
      </div>
    );
  }

  renderGamers = () => {
    return this.props.gamers.map(this.renderGamer);
  }


  renderGamer = (gamer) => {
    const isHovering = this.state.hovering === gamer.profileId;
    const aliasTooLong = gamer.alias && gamer.alias.length > 11;
    return (
      <div className="find-gamer-result" key={gamer.profileId}>
        <div className={`gamer ${isHovering ? 'hover' : ''}`}
          onMouseEnter={() => this.setState({ hovering: gamer.profileId })}
          onMouseLeave={() => this.setState({ hovering: null })}
        >
          {this.renderHoverBar(gamer, isHovering)}
          <div className='icon' style={{ backgroundImage: `url('${gamer.image}'), url('https://myG.gg/default_user/new-user-profile-picture.png')` }} />
          <div className="alias-info info">
            {gamer.alias && (
              aliasTooLong ? (
                <WithTooltip position={{
                  width: '120px',
                  padding: '4px 8px',
                  bottom: '-12px',
                  left: '-12px',
                  fontSize: '12px',
                }} text={`@${gamer.alias}`}>
                  <span className="alias">{`@${gamer.alias}`.slice(0, 10) + '...'}</span>
                </WithTooltip>
              ) : (
                <span className="alias">@{gamer.alias}</span>
              )
            )}
          </div>
          <div className="info">
            <span className="title">Level</span>
            <span className="value">Lv. {gamer.level || 1}</span>
            <span className="title">Experience Pts.</span>
            <span className="value">{gamer.experience || 0} pts</span>
          </div>
        </div>
        <Experiences alias={gamer.alias} gameExperiences={gamer.gameExperiences || []} />
      </div>
    );
  }

  renderButton = (action, title) => <div className="small-button clickable" onClick={action}>{title}</div>

  renderHoverBar = (gamer, isHovering) => {
    if (!isHovering) return null;

    const profile = this.props.profile || {};
    const canSendFriendRequest = !this.props.guest && !(profile.friends || []).includes(gamer.alias) && !(profile.friendRequests || []).includes(gamer.alias);
    const canCancelFriendRequest = !this.props.guest && !(profile.friends || []).includes(gamer.alias) && (profile.friendRequests || []).includes(gamer.alias);
    const canFollow = !this.props.guest && !(profile.followers || []).includes(gamer.alias);
    const canUnfollow = !this.props.guest && (profile.followers || []).includes(gamer.alias);
    const canInvite = !this.props.guest;

    const openProfile = () => this.props.guest ? window.location.href = `/profile/${gamer.alias}` : window.router.push(`/profile/${gamer.alias}`);
    const sendFriendRequest = () => this.sendFriendRequest(gamer.alias, gamer.profileId);
    const cancelFriendRequest = () => this.cancelFriendRequest(gamer.alias, gamer.profileId);
    const invite = () => this.setState({ inviting: gamer });
    const follow = () => this.follow(gamer.alias, gamer.profileId);
    const unfollow = () => this.unfollow(gamer.alias, gamer.profileId);

    return (
      <div className="hover-bar">
        {this.renderButton(openProfile, 'Profile')}
        {canSendFriendRequest && this.renderButton(sendFriendRequest, 'Connect')}
        {canCancelFriendRequest && this.renderButton(cancelFriendRequest, 'Request Sent')}
        {canInvite && this.renderButton(invite, 'Invite')}
        {canFollow && this.renderButton(follow, 'Follow')}
        {canUnfollow && this.renderButton(unfollow, 'Unfollow')}
      </div>
    );
  }

  renderInviteModal = () => {
    if (!this.state.inviting) return null;
    return (
      <InviteModal
        gamer={this.state.inviting}
        onClose={() => this.setState({ inviting: null })}
      />
    );
  }

  follow = (alias, profileId) => {
    notifyToast(`Got it mate! You are following ${alias}!`)
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
    return (
      <div className="find-gamers-results">
        {this.renderGamers()}
        {this.renderInviteModal()}
        {this.renderLoading()}
      </div>
    );
  }
}
