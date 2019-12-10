
import React from "react";
import { connect } from 'react-redux';

import Chat from './Chat';

import { monitorChats } from '../../integration/ws/chat';
import { fetchChatsAction, createChatAction } from '../../redux/actions/chatAction';
import { fetchFriendsAction } from '../../redux/actions/friendAction';

class Messenger extends React.PureComponent {

  state = {
    loaded: false,
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.props.loading) {
      this.setState({ loaded: true });
      this.subscription = monitorChats(this.props.userId);
      this.props.fetchChats(this.props.userId);
      this.props.fetchFriends();
    }
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.close();
  }

  openChat = (friend) => {
    this.props.createChat([this.props.userId, friend.friend_id]);
  }

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.map(this.renderChat)}
      </div>
    );
  }

  renderFriends = () => {
    return (
      <div className="messenger-body">
        {this.props.friends.map(this.renderFriend)}
      </div>
    );
  }

  renderChat = (chat) => {
    return (
      <Chat
        key={chat.chatId}
        userId={this.props.userId}
        chatId={chat.chatId}
        onClose={() => { }}
      />
    );
  }

  renderFriend = (friend) => {
    return (
      <div
        key={friend.id}
        className="messenger-contact"
        onClick={() => this.openChat(friend)}
      >
        <div
          className="messenger-contact-icon"
          style={{ backgroundImage: `url('${friend.profile_img}')` }}
        >
          <div className="messenger-contact-online-indicator" />
        </div>
        <div className="messenger-contact-body">
          <p className="messenger-contact-body-title">
            {friend.first_name} {friend.last_name}
          </p>
          <p className="messenger-contact-body-subtitle">
            Hey what's up
          </p>
        </div>
        <div className="messenger-contact-info">
          <p className="messenger-contact-info-last-seen">
            10:38pm
          </p>
          <div className="messenger-contact-info-unread">
            <p className="messenger-contact-info-unread-count">
              6
          </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section id="messenger">
        {this.renderChats()}
        {this.renderFriends()}
      </section>
    );
  }

}

function mapStateToProps(state) {
  return {
    chats: state.chat.chats,
    friends: state.friend.friends,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: members => dispatch(createChatAction(members)),
    fetchChats: userId => dispatch(fetchChatsAction(userId)),
    fetchFriends: () => dispatch(fetchFriendsAction()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);