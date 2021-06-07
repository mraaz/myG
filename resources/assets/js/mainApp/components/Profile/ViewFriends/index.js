import React from 'react';
import LoadingIndicator from '../../LoadingIndicator';
import { ignoreFunctions } from '../../../../common/render';
import { getAssetUrl } from '../../../../common/assets';
import { fetchFriends } from '../../../../integration/http/profile';
import notifyToast from '../../../../common/toast';

export default class ViewFriendsModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: false,
    friends: [],
    sentRequest: [],
    experience: '',
    level: '',
    search: '',
    page: 1,
  }

  componentDidMount() {
    this.paginateFriends();
  }

  paginateFriends = () => {
    this.setState({ loading: true });
    const alias = this.props.profile.alias;
    const { experience, level, page } = this.state;
    return fetchFriends({ alias, experience, level, page }).then(({ friends }) => this.setState({ friends, loading: false }));
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

  renderNoFriends = () => (
    <div className="no-friends">
      <span className="title">
        {this.state.page === 1 && "No friends were found for this gamer :("}
        {this.state.page !== 1 && "Nothing else to see here ¯\\_(ツ)_/¯"}
      </span>
    </div>
  )

  renderLoader = () => (
    <div className="no-friends">
      <p className='title'>Searching for Friends...</p>
      <LoadingIndicator color={'#F0F0F0'} />
    </div>
  )

  renderFilters = () => {
    return (
      <div className="filter" onClick={(event) => event.stopPropagation()}>
        <div className="input-container-row">
          <input
            className='input'
            placeholder='Search Friends'
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}></input>
        </div>
      </div>
    );
  }

  renderFriends = () => {
    if (this.state.loading) return this.renderLoader();
    if (!this.state.friends.length) return this.renderNoFriends();
    return (
      <div className="friend-list">
        {this.state.friends.filter((friend) => friend.alias.includes(this.state.search)).map(this.renderFriend)}
      </div>
    );
  }

  renderFriend = (friend) => {
    const canAddFriend = !friend.isFriend && !friend.hasSentFriendRequest && !this.state.sentRequest.includes(friend.profileId);
    const hasSentFriendRequest = !friend.isFriend && (friend.hasSentFriendRequest || this.state.sentRequest.includes(friend.profileId));
    return (
      <div key={friend.alias} className="friend clickable" onClick={() => window.router.replace(`/profile/${friend.alias}`)}>
        <div className="background"
          style={{
            backgroundImage: friend.background ? `url('${friend.background}')` : '',
          }}
        />
        <div className="picture-container">
          <div
            className='picture'
            style={{
              backgroundImage: `url('${friend.image}'), url('https://myG.gg/default_user/new-user-profile-picture.png')`,
            }}
          />
        </div>
        <div className="info">
          <span className="alias">{friend.alias}</span>
          <span className="level">level {friend.level}</span>
          {canAddFriend && <div className="add-friend clickable" onClick={(event) => this.addFriend(event, friend)}>Add Friend</div>}
          {hasSentFriendRequest && <div className="add-friend">Request Pending</div>}
        </div>
      </div>
    )
  }

  addFriend = (event, friend) => {
    event.stopPropagation();
    this.props.sendFriendRequest(friend.alias, friend.profileId);
    notifyToast('Got it mate! A friend request was sent.');
    this.setState(previous => ({ sentRequest: [...previous.sentRequest, friend.profileId] }));
  }

  renderPreviousButton = () => {
    if (this.state.loading) return null;
    if (this.state.page === 1) return null;
    return (
      <div className="previous-button clickable"
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
        onClick={(event) => {
          event.stopPropagation();
          this.setState(previous => ({ page: previous.page - 1 }), this.paginateFriends);
        }}
      />
    );
  }

  renderNextButton = () => {
    if (this.state.loading) return null;
    if (!this.state.friends.length) return null;
    return (
      <div className="next-button clickable"
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
        onClick={(event) => {
          event.stopPropagation();
          this.setState(previous => ({ page: previous.page + 1 }), this.paginateFriends);
        }}
      />
    );
  }

  render() {
    return (
      <div id="view-friends-modal" onClick={this.props.onClose}>
        <div className="container">
          {this.renderClose()}
          {this.renderFilters()}
          {this.renderFriends()}
          {this.renderPreviousButton()}
          {this.renderNextButton()}
        </div>
      </div>
    );
  }
}
