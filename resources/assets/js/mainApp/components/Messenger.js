
import React from "react";
import { connect } from 'react-redux';

import Chat from './Chat';

import { monitorChats, closeSubscriptions } from '../../integration/ws/chat';
import { fetchChatsAction, createChatAction, openChatAction, closeChatAction, clearChatAction } from '../../redux/actions/chatAction';
import { fetchFriendsAction } from '../../redux/actions/friendAction';
import { generateKeysAction, validatePinAction } from '../../redux/actions/encryptionAction';
import { decryptMessage } from '../../integration/encryption';
import { formatAMPM, convertUTCDateToLocalDate } from '../../common/date';
import { copyToClipboard } from '../../common/clipboard';

class Messenger extends React.PureComponent {

  state = {
    loaded: false,
    pin: '',
  }

  static getDerivedStateFromProps(props) {
    return { invalidPin: props.invalidPin }
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.props.loading) {
      monitorChats(this.props.userId);
      if (!this.props.publicKey) this.props.generateKeys();
      if (this.props.pin) this.props.generateKeys(this.props.pin);
      this.props.fetchChats(this.props.userId);
      this.props.fetchFriends();
      this.setState({ loaded: true });
    }
  }

  componentWillUnmount() {
    closeSubscriptions();
  }

  decryptMessage = (message) => {
    const origin = parseInt(message.user_id) === this.props.userId ? 'sent' : 'received';
    const content = decryptMessage(origin === 'sent' ? message.backup : message.content, this.props.privateKey);
    return { ...message, content };
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
    const hasMessages = !!(chat.messages || []).length;
    const wasCleared = new Date(chat.clearedDate).getFullYear() > 1970;
    if ((!hasMessages && !wasCleared) && chat.userId !== this.props.userId) return;
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
              {this.decryptMessage(lastMessage).content}
            </p>
          )}
        </div>
        <div className="messenger-contact-info">
          {lastMessage && (
            <p className="messenger-contact-info-last-seen">
              {formatAMPM(convertUTCDateToLocalDate(new Date(lastMessage.created_at)))}
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

  renderFooter() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">
          Your messages cannot be read by anyone other than you and your friends.<br /><br />
          Because of this, we cannot store your encryption key in our servers.<br /><br />
          {this.props.pin ?
            `Please keep this key somewhere safe, you'll need it when logging in on another device.` :
            `To decrypt your previous messages, you'll need to inform your encryption key.`
          }
        </p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          maxLength={12}
          placeholder="Encryption Key"
          disabled={this.props.pin}
          value={this.props.pin || this.state.pin}
          onChange={event => this.setState({ pin: event.target.value })}
        />
        {this.state.invalidPin && (
          <p className="messenger-settings-encryption-error">That's the wrong key, try again!</p>
        )}
        <div className="messenger-settings-encryption-footer">
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                this.props.generateKeys();
                this.props.chats.forEach(chat => this.props.clearChat(chat.chatId));
              }}
            >new</div>
          )}
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => this.props.validatePin(this.state.pin, this.props.publicKey)}
            >validate</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => copyToClipboard(this.props.pin)}
            >copy</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                const email = "felipe.roque@outlook.com"
                const mailLink = `mailto:${email}?subject=myG%20Security%20Key&body=%20This%20is%20my%20myG%20security%20key:%20${this.props.pin}`;
                window.open(mailLink, '_blank').focus();
              }}
            >email</div>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <section id="messenger">
        {this.renderChats()}
        {this.renderFriends()}
        {this.renderFooter()}
      </section>
    );
  }

}

function mapStateToProps(state) {
  return {
    chats: state.chat.chats,
    friends: state.friend.friends,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: members => dispatch(createChatAction(members)),
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    fetchChats: userId => dispatch(fetchChatsAction(userId)),
    fetchFriends: () => dispatch(fetchFriendsAction()),
    generateKeys: pin => dispatch(generateKeysAction(pin)),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);