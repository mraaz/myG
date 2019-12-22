
import React from "react";
import { connect } from 'react-redux';

import Chat from './Chat';
import { formatAMPM } from '../../common/date';

import { monitorChats, closeSubscriptions } from '../../integration/ws/chat';
import { fetchChatsAction, createChatAction, openChatAction, closeChatAction } from '../../redux/actions/chatAction';
import { fetchFriendsAction } from '../../redux/actions/friendAction';
import { generateKeysAction } from '../../redux/actions/encryptionAction';

class Messenger extends React.PureComponent {

  state = {
    loaded: false,
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.props.loading) {
      this.setState({ loaded: true });
      monitorChats(this.props.userId);
      if (!this.props.publicKey) this.props.generateKeys();
      this.props.fetchChats(this.props.userId);
      this.props.fetchFriends();
    }
  }

  componentWillUnmount() {
    closeSubscriptions();
  }

  openChat = (friend) => {
    const chat = this.props.chats.find(chat => chat.friendId === friend.friend_id);
    if (chat) return this.props.openChat(chat.chatId);
    this.props.createChat([this.props.userId, friend.friend_id]);
  }

  closeChat = (chatId) => {
    this.props.closeChat(chatId);
  }

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.filter(chat => !chat.closed).map(this.renderChat)}
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
        onClose={chatId => this.closeChat(chatId)}
      />
    );
  }

  renderFriend = (friend) => {
    const chat = this.props.chats.find(chat => chat.friendId === friend.friend_id) || {};
    const lastMessage = (chat.messages || [])[(chat.messages || []).length - 1];
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
          {lastMessage && (
            <p className="messenger-contact-body-subtitle">
              {lastMessage.content}
            </p>
          )}
        </div>
        <div className="messenger-contact-info">
          {lastMessage && (
            <p className="messenger-contact-info-last-seen">
              {formatAMPM(new Date(lastMessage.created_at))}
            </p>
          )}
          {/* 
          <div className="messenger-contact-info-unread">
            <p className="messenger-contact-info-unread-count">
              6
            </p>
          </div>
          */}
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
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    fetchChats: userId => dispatch(fetchChatsAction(userId)),
    fetchFriends: () => dispatch(fetchFriendsAction()),
    generateKeys: pin => dispatch(generateKeysAction(pin))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);