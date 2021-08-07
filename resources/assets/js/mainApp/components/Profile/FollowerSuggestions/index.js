import React from 'react';
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import InviteModal from '../../FindGamers/Invite';
import notifyToast from '../../../../common/toast';
import axios from 'axios';

export default class FollowerSuggestions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
    suggestions: [],
    hoveringUser: null,
    hoveringCommunity: null,
  }

  componentDidMount() {
    this.fetchSuggestions();
  }

  async fetchSuggestions() {
    this.setState({ loading: true });
    let response
    
    try {
        response = await axios.get('/api/connections/show_whom_to_follow')
        if (response.data && response.data[0] && response.data[0].alias == "myG") {
            this.props.follow(response.data[0].alias, response.data[0].profileId)
        }
    } catch (error) {
      //logToElasticsearch('error', 'Utility_Function', 'Failed Game_name_values:' + ' ' + error)
      console.log("Error show_whom_to_follow")
    }

    this.setState({ loading: false, suggestions: response.data });
  }

  renderHeaders = () => {
    return (
      <div className='headers'>
        <div className='header suggestions-header'>Follower Suggestions</div>
      </div>
    );
  }

  renderSuggestion = (suggestion, index) => {
    if (suggestion.profileId) return this.renderUser(suggestion, index);
    if (suggestion.groupId) return this.renderCommunity(suggestion, index);
    return null;
  }

  renderCommunity = (community, index) => {
    const isHovering = this.state.hoveringCommunity === community.groupId;
    return (
      <div className="game-experience clickable" key={`${community.groupId}_${index}`}
        onClick={() => this.followCommunity(community.groupId)}
        onMouseEnter={() => this.setState({ hoveringUser: null, hoveringCommunity: community.groupId })}
        onMouseLeave={() => this.setState({ hoveringUser: null, hoveringCommunity: null })}
      >
        {this.renderHoverBar(community, isHovering)}
        <div className="image absolute-top" style={{ backgroundImage: `url(https://myg.gg/platform_images/Profile/Silver-Stamping-Logo-MockUp.jpg)` }} />
        <div className='icon' style={{ backgroundImage: `url(${community.groupImage}), url(https://myG.gg/default_user/new-user-profile-picture.png)` }} />
        <span className="name">{community.groupName}</span>
      </div>
    );
  }

  renderUser = (profile, index) => {
    const isHovering = this.state.hoveringUser === profile.alias;
    return (
      <div className="game-experience clickable" key={`${profile.alias}_${index}`}
        onClick={() => this.follow(profile.alias, profile.profileId)}
        onMouseEnter={() => this.setState({ hoveringUser: profile.alias, hoveringCommunity: null })}
        onMouseLeave={() => this.setState({ hoveringUser: null, hoveringCommunity: null })}
      >
        {this.renderHoverBar(profile, isHovering)}
        <div className="image absolute-top" style={{ backgroundImage: `url(${profile.background}), url(https://myg.gg/platform_images/Profile/Silver-Stamping-Logo-MockUp.jpg)` }} />
        <div className='icon' style={{ backgroundImage: `url(${profile.image}), url(https://myG.gg/default_user/new-user-profile-picture.png)` }} />
        <span className="name">{profile.alias}</span>
        <div className="field center">
          <span className="field-title space-right">Level</span>
          <span className="field-value">{profile.level}</span>
        </div>
      </div>
    );
  }

  renderHoverBar = (suggestion, isHovering) => {
    if (!isHovering) return null;
    const isFollower = (this.props.profile && this.props.profile.followers || []).includes(suggestion.alias);
    return (
      <div className="hover-bar suggestion-bar">
        {!isFollower && <div className="small-button suggestion-button clickable" onClick={(event) => { event.stopPropagation(); suggestion.alias ? this.follow(suggestion.alias, suggestion.profileId) : this.followCommunity(suggestion.groupId) }}>Follow</div>}
        {isFollower && <div className="small-button suggestion-button clickable" onClick={(event) => { event.stopPropagation(); this.unfollow(suggestion.alias, suggestion.profileId) }}>Unfollow</div>}
      </div>
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

  followCommunity = (group_id) => {
    notifyToast(`Got it mate! You are following this community!`)
    axios.post(`/api/followers/create`, { group_id });
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
    if (direction === 'right') return this.setState({ page: (page + 1) > this.state.suggestions.length - 4 ? page : page + 1 });
  }

  renderPageButtons = () => {
    const fitsAllInScreen = this.state.suggestions.length <= 4;
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0;
    const contentToTheRight = !fitsAllInScreen && this.state.page < this.state.suggestions.length - 4;
    return (
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
    return (
      <div id="find-gamers">
        <InviteModal
          gamer={this.state.inviting}
          onClose={() => this.setState({ inviting: null })}
        />
      </div>
    );
  }

  renderOnboardingButtons() {
    return (
      <div className="onboarding-buttons">
        <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.props.skipOnboarding() }}>Skip</div>
        <div className="small-button clickable" onClick={(event) => { event.stopPropagation(); this.props.setOnboardingStep(5) }}>Next 2/2</div>
      </div>
    );
  }

  render() {
    const suggestions = this.state.suggestions;
    if (this.state.loading) return null;
    return (
        <div id="profile">
          <div id="profile-game-experiences" className="onboarding-follower-container">
            {!this.props.noTitle && this.renderHeaders()}
            <div className="scroll suggestions-scroll onboarding-follower-content">
              {this.renderPageButtons()}
              {suggestions.slice(this.state.page, this.state.page + 4).map((profile, index) => this.renderSuggestion(profile, index))}
              {!suggestions.length && <span className="no-users">Sorry mate, no suggestions found for you at this moment :(</span>}
              {this.renderOnboardingButtons()}
            </div>
          </div>
        </div>
    );
  }
}
