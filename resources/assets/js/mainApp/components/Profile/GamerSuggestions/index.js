import React from 'react';
import { connect } from 'react-redux'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { fetchGamerSuggestionsAction } from '../../../../redux/actions/profileAction';
import InviteModal from '../../FindGamers/Invite';
import notifyToast from '../../../../common/toast';

export class GamerSuggestions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
    inviting: null,
  }

  componentDidMount() {
    this.props.fetchGamerSuggestions();
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className='header'>Gamer Suggestions</div>
      </div>
    );
  }

  renderGamerSuggestion = (profile) => {
    const isHovering = this.state.hovering === profile.alias;
    return(
      <div className="game-experience clickable" 
      style={{ minWidth: '40%' }}
      onClick={() => window.location.href = `/profile/${profile.alias}`}
      onMouseEnter={() => this.setState({ hovering: profile.alias })}
      onMouseLeave={() => this.setState({ hovering: null })}
    >
      {this.renderHoverBar(profile, isHovering)}
      <div className="image absolute-top" style={{ backgroundImage: `url(${profile.background}), url(https://mygame-media.s3.amazonaws.com/default_user/myG_bg.png)` }} />
      <div className='icon' style={{ backgroundImage: `url(${profile.image}), url(https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png)` }} />
      <span className="name">{profile.alias}</span>
      <div className="field center">
          <span className="field-title space-right">Level</span>
          <span className="field-value">{profile.level}</span>
      </div>
      {profile.mostPlayedGames.map(game => <div className="field center"><span className="field-value">{game}</span></div>)}
    </div>
    );
  }

  renderHoverBar = (gamer, isHovering) => {
    if (!isHovering) return null;
    const isFriend = (this.props.profile && this.props.profile.friends || []).includes(gamer.alias);
    const isFollower = (this.props.profile && this.props.profile.followers || []).includes(gamer.alias);
    const hasSentRequest = (this.props.profile && this.props.profile.friendRequests || []).includes(gamer.alias);
    return(
      <div className="hover-bar">
        <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); window.location.href = `/profile/${gamer.alias}`}}>Profile</div>
        {this.props.profile && !isFriend && !hasSentRequest && <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.sendFriendRequest(gamer.alias, gamer.profileId)}}>Request Connection</div>}
        {this.props.profile && !isFriend && hasSentRequest && <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.cancelFriendRequest(gamer.alias, gamer.profileId)}}>Request Sent</div>}
        {this.props.profile && <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.invite(gamer) }}>Invite</div>}
        {this.props.profile && !isFollower && <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.follow(gamer.alias, gamer.profileId)}}>Follow</div>}
        {this.props.profile && isFollower && <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.unfollow(gamer.alias, gamer.profileId)}}>Unfollow</div>}
      </div>
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
  
  invite = (gamer) => this.setState({ inviting: gamer });

  sendFriendRequest = (alias, profileId) => {
    notifyToast(`Got it mate! Friend request sent to ${alias}!`)
    this.props.sendFriendRequest(alias, profileId)
  }

  cancelFriendRequest = (alias, profileId) => {
    notifyToast(`Got it mate! Friend request removed from ${alias}!`)
    this.props.cancelFriendRequest(alias, profileId)
  }

  changePage = (direction) => {
    const page = this.state.page;
    if (direction === 'left') return this.setState({ page: (page - 1) < 0 ? page : page - 1 });
    if (direction === 'right') return this.setState({ page: (page + 1) > this.props.gamerSuggestions.length - 4 ? page : page + 1 });
  }

  renderPageButtons = () => {
    const fitsAllInScreen = this.props.gamerSuggestions.length <= 4;
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0;
    const contentToTheRight = !fitsAllInScreen && this.state.page < this.props.gamerSuggestions.length - 4;
    return(
      <React.Fragment>
        {contentToTheLeft && (
          <div
            className={`go-left clickable`}
            onClick={() => this.changePage('left')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
          />
        )}
        {contentToTheRight && (
          <div
            className={`go-right clickable`}
            onClick={() => this.changePage('right')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
          />
        )}
      </React.Fragment>
    );
  }

  renderInviteModal = () => {
    if (!this.state.inviting) return null;
    return(
     <div id="find-gamers">
        <InviteModal 
          gamer={this.state.inviting}
          onClose={() => this.setState({ inviting: null })}
        />
     </div>
    );
  }

  render() {
    if (!this.props.gamerSuggestions.length) return null;
    return(
      <div id="profile">
        <div id="profile-game-experiences">
          {this.renderInviteModal()}
          {!this.props.noTitle && this.renderHeaders()}
          <div className="scroll">
            {this.renderPageButtons()}
            {this.props.gamerSuggestions.slice(this.state.page, this.state.page + 4).map(this.renderGamerSuggestion)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gamerSuggestions: state.profile.gamerSuggestions || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGamerSuggestions: () => dispatch(fetchGamerSuggestionsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamerSuggestions)
