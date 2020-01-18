
import React from "react";
import { connect } from 'react-redux';

import Chat from './Chat';
import StatusTimerWrapper from './StatusTimerWrapper';

import { attemptSocketConnection, monitorChats, closeSubscriptions } from '../../integration/ws/chat';
import { fetchChatsAction, createChatAction, openChatAction, closeChatAction, clearChatAction } from '../../redux/actions/chatAction';
import { fetchFriendsAction } from '../../redux/actions/friendAction';
import { fetchStatusAction, updateStatusAction } from '../../redux/actions/userAction';
import { generateKeysAction, validatePinAction } from '../../redux/actions/encryptionAction';
import { decryptMessage } from '../../integration/encryption';
import { formatAMPM, convertUTCDateToLocalDate } from '../../common/date';
import { copyToClipboard } from '../../common/clipboard';
import { STATUS_ENUM, compareStatus } from '../../common/status';

class Messenger extends React.PureComponent {

  state = {
    loaded: false,
    showingSettings: false,
    changingStatus: false,
    searchInput: '',
    pin: '',
    sectionExpanded: {
      recent: true,
      [STATUS_ENUM.ONLINE]: true,
      [STATUS_ENUM.PLAYING]: false,
      [STATUS_ENUM.AFK]: false,
      [STATUS_ENUM.OFFLINE]: false,
    },
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
      this.props.fetchStatus();
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
    if (!this.props.connected) return;
    const chat = this.props.chats.find(chat => chat.friendId === friend.friend_id || chat.userId === friend.friend_id);
    if (chat) return this.props.openChat(chat.chatId);
    this.props.createChat([this.props.userId, friend.friend_id]);
  }

  closeChat = (chatId) => {
    this.props.closeChat(chatId);
  }

  setStatus = (status) => {
    this.props.updateStatus(status, true);
    this.setState({ changingStatus: false });
  }

  compareLastMessages = (f1, f2) => {
    const m1 = (f1.chat.messages || [])[(f1.chat.messages || []).length - 1] || { created_at: 0 };
    const m2 = (f2.chat.messages || [])[(f2.chat.messages || []).length - 1] || { created_at: 0 };
    return new Date(m2.created_at) - new Date(m1.created_at);
  }

  countUnreadMessages = (lastRead, messages) => {
    let unreadCount = 0;
    messages.reverse().some(message => {
      const messageDate = convertUTCDateToLocalDate(new Date(message.created_at));
      if (messageDate > lastRead) {
        ++unreadCount;
        return false;
      }
      return true;
    });
    return unreadCount;
  }

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.filter(chat => !chat.closed).map(this.renderChat)}
      </div>
    );
  }

  renderFriends = () => {

    const sections = {};
    const friends = this.props.friends.slice(0)
      .sort((f1, f2) => compareStatus(f1.status, f2.status))
      .sort((f1, f2) => this.compareLastMessages(f1, f2));

    if (this.state.searchInput) {
      const search = (name) => name.toLowerCase().includes(this.state.searchInput.toLowerCase());
      sections['suggestions'] = friends.slice(0)
        .filter(friend => search(`${friend.first_name} ${friend.last_name}`))
        .slice(0, 18);
    }

    else {
      sections['recent'] = friends.filter(friend => (friend.chat.messages || []).length).slice(0, 8);
      sections[STATUS_ENUM.ONLINE] = friends.filter(friend => friend.status === STATUS_ENUM.ONLINE);
      sections[STATUS_ENUM.PLAYING] = friends.filter(friend => friend.status === STATUS_ENUM.PLAYING);
      sections[STATUS_ENUM.AFK] = friends.filter(friend => friend.status === STATUS_ENUM.AFK);
      sections[STATUS_ENUM.OFFLINE] = friends.filter(friend => friend.status === STATUS_ENUM.OFFLINE);
    }

    return (
      <div className="messenger-body">
        {!!this.state.searchInput && this.renderSection('suggestions', sections['suggestions'].length, sections['suggestions'], true)}
        {!this.state.searchInput && this.renderSection('recent', sections['recent'].length, sections['recent'], this.state.sectionExpanded['recent'])}
        {!this.state.searchInput && this.renderSection(STATUS_ENUM.ONLINE, sections[STATUS_ENUM.ONLINE].length, sections[STATUS_ENUM.ONLINE], this.state.sectionExpanded[STATUS_ENUM.ONLINE])}
        {!this.state.searchInput && this.renderSection(STATUS_ENUM.PLAYING, sections[STATUS_ENUM.PLAYING].length, sections[STATUS_ENUM.PLAYING], this.state.sectionExpanded[STATUS_ENUM.PLAYING])}
        {!this.state.searchInput && this.renderSection(STATUS_ENUM.AFK, sections[STATUS_ENUM.AFK].length, sections[STATUS_ENUM.AFK], this.state.sectionExpanded[STATUS_ENUM.AFK])}
        {!this.state.searchInput && this.renderSection(STATUS_ENUM.OFFLINE, sections[STATUS_ENUM.OFFLINE].length, sections[STATUS_ENUM.OFFLINE], this.state.sectionExpanded[STATUS_ENUM.OFFLINE])}
      </div>
    );

  }

  renderSection(name, count, friends, expanded) {
    const chevronType = (friends.length && expanded) ? 'down' : 'right';
    return (
      <div className="messenger-body-section">
        <div className="messenger-body-section-header clickable"
          onClick={() => this.setState(previous => ({
            sectionExpanded: {
              ...{
                [STATUS_ENUM.ONLINE]: false,
                [STATUS_ENUM.PLAYING]: false,
                [STATUS_ENUM.AFK]: false,
                [STATUS_ENUM.OFFLINE]: false,
              },
              [name]: !previous.sectionExpanded[name]
            }
          }))}
        >
          <p className="messenger-body-section-header-name">{name}</p>
          <div className="messenger-body-section-header-info">
            <p className="messenger-body-section-header-count">{`(${count})`}</p>
            <div
              className="messenger-body-section-header-icon"
              style={{ backgroundImage: `url('/assets/svg/ic_messenger_chevron_${chevronType}.svg')` }}
            />
          </div>
        </div>
        {!!friends.length && expanded && (
          <div className="messenger-body-section-content">
            {friends.map(this.renderFriend)}
          </div>
        )}
      </div >
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

  renderConnectionWarning = () => {
    if (this.props.connected) return;
    return (
      <div
        className="messenger-connection-warning clickable"
        onClick={() => attemptSocketConnection()}
      >
        <p className="messenger-connection-warning-label">It seems you are offline...</p>
        <p className="messenger-connection-warning-hint">Click to Reconnect</p>
      </div>
    );
  }

  renderFriend = (friend) => {
    const messages = (friend.chat.messages || []).slice(0);
    const lastMessage = messages[messages.length - 1];
    const lastRead = convertUTCDateToLocalDate(new Date(friend.chat.readDate));
    const receivedMessages = messages.filter(message => parseInt(message.user_id) !== this.props.userId);
    const unreadCount = this.countUnreadMessages(lastRead, receivedMessages);
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
          <div className="messenger-contact-info-unread">
            <p className="messenger-contact-info-unread-count">
              {unreadCount}
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderEncryptionSettings() {
    if (!this.state.showingSettings) return;
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

  renderStatusSettings() {
    if (!this.state.changingStatus) return;
    return (
      <div className="messenger-settings-status">
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-online"
          onMouseDown={() => this.setStatus('online')}
        >online</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-playing"
          onMouseDown={() => this.setStatus('playing')}
        >playing</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-afk"
          onMouseDown={() => this.setStatus('afk')}
        >afk</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-offline"
          onMouseDown={() => this.setStatus('offline')}
        >offline</p>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="messenger-footer-container">
        {this.renderEncryptionSettings()}
        <div className="messenger-footer">
          <div className="messenger-footer-icon-container">
            <div
              className="messenger-footer-icon"
              style={{ backgroundImage: `url('${this.props.profileImage}')` }}
            />
            <div
              tabIndex={0}
              className={`messenger-footer-status-indicator messenger-footer-status-${this.props.status} clickable`}
              onClick={() => this.setState(previous => ({ changingStatus: !previous.changingStatus }))}
              onBlur={() => setTimeout(() => this.setState({ changingStatus: false }), 100)}
            >
              {this.props.status}
            </div>
            <div className="messenger-settings-status-container">
              {this.renderStatusSettings()}
            </div>
          </div>
          <div className="messenger-footer-search-bar">
            <input
              className="messenger-settings-search-field"
              type="text"
              placeholder="Search"
              value={this.state.searchInput}
              onChange={event => this.setState({ searchInput: event.target.value })}
            />
            <div className="messenger-settings-search-button clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_messenger_search.svg)` }}
              onClick={() => this.filterFriends()}
            />
          </div>
          <div
            className="messenger-footer-settings-button clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_messenger_settings.svg)` }}
            onClick={() => this.setState(previous => ({ showingSettings: !previous.showingSettings }))}
          ></div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <section id="messenger">

        {this.renderChats()}
        {this.renderConnectionWarning()}
        {this.renderFriends()}
        {this.renderFooter()}

        <StatusTimerWrapper {...{
          status: this.props.status,
          isStatusLocked: this.props.isStatusLocked,
          updateStatus: this.props.updateStatus,
        }} />

      </section>
    );
  }

}

function mapStateToProps(state) {
  const chats = state.chat.chats;
  const friends = state.friend.friends;
  friends.forEach(friend => {
    const chat = chats.find(chat => chat.friendId === friend.friend_id) || {};
    friend.chat = chat;
  });
  return {
    status: state.user.status,
    isStatusLocked: state.user.isStatusLocked,
    chats: state.chat.chats,
    friends: state.friend.friends,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
    connected: state.socket.connected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: members => dispatch(createChatAction(members)),
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    fetchChats: userId => dispatch(fetchChatsAction(userId)),
    fetchFriends: () => dispatch(fetchFriendsAction()),
    fetchStatus: () => dispatch(fetchStatusAction()),
    generateKeys: pin => dispatch(generateKeysAction(pin)),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);