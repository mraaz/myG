
import React from "react";
import { connect } from 'react-redux';

import Chat from './Chat';
import StatusTimerWrapper from '../StatusTimerWrapper';
import WindowFocusHandler from '../WindowFocusHandler';

import { attemptSocketConnection, monitorChats, closeSubscription } from '../../../integration/ws/chat';
import { createChatAction, openChatAction, closeChatAction, clearChatAction } from '../../../redux/actions/chatAction';
import { updateStatusAction } from '../../../redux/actions/userAction';
import { generateKeysAction, validatePinAction } from '../../../redux/actions/encryptionAction';
import { decryptMessage } from '../../../integration/encryption';
import { formatAMPM, convertUTCDateToLocalDate } from '../../../common/date';
import { copyToClipboard } from '../../../common/clipboard';
import { STATUS_ENUM, compareStatus } from '../../../common/status';

class Messenger extends React.PureComponent {

  state = {
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

  componentDidMount() {
    monitorChats(this.props.userId);
  }

  componentWillUnmount() {
    closeSubscription();
  }

  decryptMessage = (message) => {
    const origin = parseInt(message.senderId) === this.props.userId ? 'sent' : 'received';
    const content = decryptMessage(origin === 'sent' ? message.backup : message.content, this.props.privateKey);
    return { ...message, content };
  }

  openChat = (contact) => {
    if (this.props.disconnected) return;
    if (contact.chat.chatId) return this.props.openChat(contact.chat.chatId);
    this.props.createChat([contact.contactId], this.props.userId);
  }

  closeChat = (chatId) => {
    this.props.closeChat(chatId);
  }

  setStatus = (status) => {
    this.props.updateStatus(status, true);
    this.setState({ changingStatus: false });
  }

  compareLastMessages = (f1, f2) => {
    const m1 = (f1.chat.messages || [])[(f1.chat.messages || []).length - 1] || { createdAt: 0 };
    const m2 = (f2.chat.messages || [])[(f2.chat.messages || []).length - 1] || { createdAt: 0 };
    return new Date(m2.createdAt) - new Date(m1.createdAt);
  }

  countUnreadMessages = (lastRead, messages) => {
    let unreadCount = 0;
    messages.reverse().some(message => {
      const messageDate = convertUTCDateToLocalDate(new Date(message.createdAt));
      if (messageDate > lastRead) {
        ++unreadCount;
        return false;
      }
      return true;
    });
    return unreadCount;
  }

  renderConnectionWarning = () => {
    if (!this.props.disconnected) return;
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

  renderContacts = () => {

    const sections = {};
    const contacts = this.props.contacts.slice(0)
      .sort((f1, f2) => compareStatus(f1.status, f2.status))
      .sort((f1, f2) => this.compareLastMessages(f1, f2));

    if (this.state.searchInput) {
      const search = (name) => name.toLowerCase().includes(this.state.searchInput.toLowerCase());
      sections['suggestions'] = contacts.slice(0)
        .filter(contact => search(contact.name))
        .slice(0, 18);
    }

    else {
      sections['recent'] = contacts.filter(contact => (contact.chat.messages || []).length).slice(0, 8);
      sections[STATUS_ENUM.ONLINE] = contacts.filter(contact => contact.status === STATUS_ENUM.ONLINE);
      sections[STATUS_ENUM.PLAYING] = contacts.filter(contact => contact.status === STATUS_ENUM.PLAYING);
      sections[STATUS_ENUM.AFK] = contacts.filter(contact => contact.status === STATUS_ENUM.AFK);
      sections[STATUS_ENUM.OFFLINE] = contacts.filter(contact => contact.status === STATUS_ENUM.OFFLINE);
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

  renderSection(name, count, contacts, expanded) {
    const chevronType = (contacts.length && expanded) ? 'down' : 'right';
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
        {!!contacts.length && expanded && (
          <div className="messenger-body-section-content">
            {contacts.map(this.renderContact)}
          </div>
        )}
      </div >
    );
  }

  renderContact = (contact) => {
    const messages = (contact.chat.messages || []).slice(0);
    const lastMessage = messages[messages.length - 1];
    const receivedMessages = messages.filter(message => message.senderId !== this.props.userId);
    const unreadCount = this.countUnreadMessages(contact.chat.readDate, receivedMessages);
    return (
      <div
        key={contact.contactId}
        className="messenger-contact"
        onClick={() => this.openChat(contact)}
      >
        <div
          className="messenger-contact-icon"
          style={{ backgroundImage: `url('${contact.icon}')` }}
        >
          <div className="messenger-contact-online-indicator" />
        </div>
        <div className="messenger-contact-body">
          <p className="messenger-contact-body-title">{contact.name}</p>
          {lastMessage && (
            <p className="messenger-contact-body-subtitle">
              {this.decryptMessage(lastMessage).content}
            </p>
          )}
        </div>
        <div className="messenger-contact-info">
          {lastMessage && (
            <p className="messenger-contact-info-last-seen">
              {formatAMPM(convertUTCDateToLocalDate(new Date(lastMessage.createdAt)))}
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
              onClick={() => this.filterContacts()}
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

  renderEncryptionSettings() {
    if (!this.state.showingSettings) return;
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">
          Your messages cannot be read by anyone other than you and your contacts.<br /><br />
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

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.filter(chat => !chat.closed).map(this.renderChat)}
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
        windowFocused={this.state.windowFocused}
      />
    );
  }

  render() {
    return (
      <section id="messenger">

        {this.renderConnectionWarning()}
        {this.renderContacts()}
        {this.renderFooter()}

        {this.renderChats()}

        <StatusTimerWrapper {...{
          status: this.props.status,
          isStatusLocked: this.props.isStatusLocked,
          updateStatus: this.props.updateStatus,
        }} />

        <WindowFocusHandler
          onFocus={() => this.setState({ windowFocused: true })}
          onBlur={() => this.setState({ windowFocused: false })}
        />

      </section>
    );
  }

}

function mapStateToProps(state) {
  const chats = state.chat.chats || [];
  const contacts = state.user.contacts || [];
  const contactsWithChats = {};
  chats.forEach(chat => (chat.contacts || []).forEach(contactId => contactsWithChats[contactId] = chat));
  contacts.forEach(contact => contact.chat = contactsWithChats[contact.contactId] || {});
  return {
    status: state.user.status,
    isStatusLocked: state.user.isStatusLocked,
    chats: state.chat.chats,
    contacts: state.user.contacts,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
    disconnected: state.socket.disconnected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: (contacts, userId) => dispatch(createChatAction(contacts, userId)),
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    generateKeys: () => dispatch(generateKeysAction()),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);