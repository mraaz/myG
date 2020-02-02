import React from 'react';
import { connect } from 'react-redux';

import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import { prepareChatAction, sendMessageAction, editMessageAction, updateChatAction, updateChatStateAction, checkSelfDestructAction, clearChatAction } from '../../../redux/actions/chatAction';
import { enrichMessagesWithDates } from '../../../common/chat';
import { encryptMessage, decryptMessage, deserializeKey } from '../../../integration/encryption';
import { convertUTCDateToLocalDate, formatDateTime } from '../../../common/date';

class Chat extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastMessageId: null,
      lastFriendRead: new Date(0),
      wasEncrypted: !props.privateKey,
      editing: false,
      settings: false,
    };
    this.messageListRef = React.createRef();
  }

  componentDidMount() {
    this.props.prepareChat(this.props.chatId, this.props.contactId, this.props.userId);
    setTimeout(() => this.props.checkSelfDestruct(this.props.chatId), 1000);
  }

  componentDidUpdate() {
    const scrolled = this.scrollToLastMessage();
    if (!scrolled) this.markAsRead();
  }

  scrollToLastMessage = () => {
    const lastMessage = this.props.messages[this.props.messages.length - 1] || {};
    const lastMessageId = lastMessage.messageId;
    const lastFriendRead = convertUTCDateToLocalDate(new Date(this.props.friendReadDate));
    const gotDecrypted = this.state.wasEncrypted && this.props.privateKey;
    const hasNewMessage = this.state.lastMessageId !== lastMessageId;
    const hasNewFriendRead = lastFriendRead > this.state.lastFriendRead;
    if (hasNewFriendRead || hasNewMessage || gotDecrypted) {
      const state = {};
      if (hasNewFriendRead) state.lastFriendRead = lastFriendRead;
      if (hasNewMessage) state.lastMessageId = lastMessageId;
      if (gotDecrypted) state.wasEncrypted = false;
      this.setState(state);
      if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight);
      return true;
    }
  }

  markAsRead = () => {
    if (this.props.minimised || !this.props.privateKey || !this.props.windowFocused) return;
    const lastReadDate = convertUTCDateToLocalDate(new Date(this.props.readDate));
    const receivedMessages = this.props.messages.filter(message => parseInt(message.userId) !== parseInt(this.props.userId) && !message.deleted);
    const lastReceivedMessage = receivedMessages[receivedMessages.length - 1] || {};
    const lastReceivedMessageDate = convertUTCDateToLocalDate(new Date(lastReceivedMessage.createdAt));
    if (lastReceivedMessageDate > lastReadDate) this.props.updateChat(this.props.chatId, { markAsRead: true });
  }

  sendMessage = (input) => {
    if (!input) return;
    this.props.sendMessage(this.props.chatId, this.props.userId, this.encryptInput(input));
  }

  editMessage = (chatId, messageId, input) => {
    this.props.editMessage(chatId, messageId, this.encryptInput(input));
  }

  encryptInput = (input) => {
    const content = encryptMessage(input, this.props.publicKey, this.props.privateKey);
    const backup = encryptMessage(input, this.props.userPublicKey, this.props.userPrivateKey);
    return { content, backup }
  }

  decryptMessage = (message) => {
    const isSent = parseInt(message.senderId) === parseInt(this.props.userId);
    const encryptedContent = isSent ? message.backup : message.content;
    const privateKey = isSent ? this.props.userPrivateKey : this.props.privateKey;
    const content = decryptMessage(encryptedContent, privateKey);
    return { ...message, content };
  }

  editLastMessage = () => {
    const sentMessages = this.props.messages.filter(message => parseInt(message.senderId) === parseInt(this.props.userId) && !message.deleted);
    const lastSentMessage = sentMessages[sentMessages.length - 1];
    if (!lastSentMessage) return;
    this.setState({ editing: lastSentMessage.messageId });
  }

  onEdit = () => {
    this.setState({ editing: false });
  }

  renderSettings = () => {
    if (!this.state.settings) return;
    const inactiveStyle = 'chat-component-header-settings-option-inactive';
    return (
      <div className="chat-component-header-settings-popup">

        <div
          className={`chat-component-header-settings-option clickable ${this.props.blocked && inactiveStyle}`}
          onClick={() => {
            this.setState({ settings: false });
            this.props.updateChat(this.props.chatId, { blocked: !this.props.blocked });
          }}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)` }}
          />
          {this.props.blocked ? 'unblock' : 'block'}
        </div>

        <div
          className={`chat-component-header-settings-option clickable ${this.props.muted && inactiveStyle}`}
          onClick={() => {
            this.setState({ settings: false });
            this.props.updateChat(this.props.chatId, { muted: !this.props.muted });
          }}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)` }}
          />
          {this.props.muted ? 'unmute' : 'mute'}
        </div>

        <div
          className={`chat-component-header-settings-option clickable ${this.props.selfDestruct && inactiveStyle}`}
          onClick={() => {
            this.setState({ settings: false });
            this.props.updateChat(this.props.chatId, { selfDestruct: !this.props.selfDestruct });
          }}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_self_destruct.svg)` }}
          />
          {this.props.selfDestruct ? 'disable' : 'enable'} self destruct
        </div>

        <div
          className={`chat-component-header-settings-option clickable ${!this.props.messages.length && inactiveStyle}`}
          onClick={() => {
            this.setState({ settings: false });
            this.props.clearChat(this.props.chatId);
          }}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_delete.svg)` }}
          />
          delete all messages
        </div>

      </div>
    );
  }

  renderHeader = () => {
    const selfDestructStyle = this.props.selfDestruct && 'chat-component-header-self-destruct';
    return (
      <div className={`chat-component-header ${selfDestructStyle}`}>

        <div
          className="chat-component-header-icon clickable"
          onClick={() => !this.props.isGroup && window.location.replace(`/profile/${this.props.contactId}`)}
          style={{ backgroundImage: `url('${this.props.icon}')` }}
        />

        {!this.props.isGroup && (
          <div className={`chat-component-header-status-indicator chat-component-header-status-indicator-${this.props.status}`} />
        )}

        <div className="chat-component-header-info clickable"
          onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
        >
          <div className="chat-component-header-title">
            {this.props.title}
          </div>
          {this.props.subtitle && (
            <div className="chat-component-header-subtitle">
              {this.props.subtitle}
            </div>
          )}
        </div>

        <div className="chat-component-header-options">
          <div className="chat-component-header-top-buttons">
            <div className="chat-component-header-button clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_minimise.svg)` }}
              onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
            />
            <div className="chat-component-header-button clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_maximise.svg)` }}
              onClick={() => this.props.updateChatState(this.props.chatId, { maximised: !this.props.maximised, minimised: false })}
            />
            <div className="chat-component-header-button clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
              onClick={() => this.props.onClose(this.props.chatId)}
            />
          </div>
          <div
            className="chat-component-header-settings clickable"
            style={{ backgroundImage: `url('/assets/svg/ic_chat_settings.svg')` }}
            onClick={() => this.setState(previous => ({ settings: !previous.settings }))}
          />
          <div className="chat-component-header-settings-popup-container">
            {this.renderSettings()}
          </div>
        </div>

      </div>
    );
  }

  renderBody = () => {
    const lastMessage = this.props.messages[this.props.messages.length - 1] || {};
    const lastMessageDate = convertUTCDateToLocalDate(new Date(lastMessage.createdAt));
    const lastFriendRead = convertUTCDateToLocalDate(new Date(this.props.friendReadDate));
    const lastMessageWasMine = parseInt(lastMessage.senderId) === parseInt(this.props.userId);
    const friendHasRead = lastMessageWasMine && lastFriendRead >= lastMessageDate;
    return (
      <div
        className="chat-component-body"
        ref={this.messageListRef}
      >
        {this.props.messages.map(this.renderMessage)}
        {friendHasRead && this.renderReadIndicator()}
      </div>
    );
  }

  renderReadIndicator() {
    return (
      <div className="chat-component-read-indicator">
        <div className="chat-component-read-indicator-icon">
          <img
            className="chat-component-read-indicator-icon-image"
            src={this.props.icon}
          />
        </div>
      </div>
    );
  }

  renderMessage = (message) => {
    return (
      <ChatMessage
        key={message.messageId}
        message={this.decryptMessage(message)}
        userId={this.props.userId}
        chatId={this.props.chatId}
        messageId={message.messageId}
        messageListRef={this.messageListRef}
        editing={this.state.editing === message.messageId}
        onEdit={this.onEdit}
        editMessage={this.editMessage}
      />
    );
  }

  renderFooter = () => {
    return (
      <div className="chat-component-footer">
        <div className="chat-component-attach-button-container">
          <div className="chat-component-attach-button clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_attach.svg)` }}
          />
          <div className="chat-component-attach-button-divider" />
        </div>
        <ChatInput
          connected={!this.props.disconnected}
          blocked={this.props.blocked}
          isDecryptable={this.props.privateKey}
          sendMessage={this.sendMessage}
          editLastMessage={this.editLastMessage}
        />
      </div>
    );
  }

  renderEncryptedChat() {
    return (
      <div
        key={this.props.chatId}
        className="chat-component-base"
      >
        {this.renderHeader()}
        <div className="chat-component-encryption-warning">
          Please inform your encryption key to read the contents of this chat.
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  render() {
    if (!this.props.privateKey) return this.renderEncryptedChat();
    let extraClass = "";
    if (this.props.maximised) extraClass += "chat-maximised";
    if (this.props.minimised) extraClass += "chat-minimised";
    return (
      <div
        key={this.props.chatId}
        className={`chat-component-base ${extraClass}`}
      >
        {this.renderHeader()}
        {!this.props.minimised && this.renderBody()}
        {!this.props.minimised && <div className="chat-component-footer-divider" />}
        {!this.props.minimised && this.renderFooter()}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const chat = state.chat.chats.find(chat => chat.chatId === props.chatId) || {};
  const messages = enrichMessagesWithDates(chat.messages || []);
  const contacts = chat.contacts.filter(contactId => contactId !== props.userId);
  const contactId = contacts.length === 1 && contacts[0];
  const contact = (contactId && state.user.contacts.find(contact => contact.contactId === contactId)) || {};
  const contactSubtitle = contact.status && contact.status === 'offline' ? `${formatDateTime(contact.lastSeen)}` : contact.status && `${contact.status}`;
  const isGroup = contacts.length > 1;
  let chatSubtitle = null;
  if (isGroup) {
    const onlineContactsMap = {};
    state.user.contacts.forEach(contact => onlineContactsMap[contact.contactId] = contact.status === 'online');
    const memberCount = contacts.length;
    const onlineCount = contacts.filter(contactId => onlineContactsMap[contactId]).length;
    chatSubtitle = `${onlineCount}/${memberCount} online`;
  }
  chat.privateKey = deserializeKey(chat.privateKey);
  return {
    messages,
    contacts: state.user.contacts,
    contactId,
    isGroup,
    icon: chat.icon || contact.icon || '',
    title: chat.title || contact.name || '',
    subtitle: chatSubtitle || contactSubtitle || '',
    status: chat.status || contact.status || 'offline',
    blocked: chat.blocked || false,
    muted: chat.muted || false,
    selfDestruct: chat.selfDestruct || false,
    readDate: chat.readDate || new Date(0),
    friendReadDate: chat.friendReadDate || new Date(0),
    maximised: chat.maximised || false,
    minimised: chat.minimised || false,
    userPublicKey: state.encryption.publicKey,
    userPrivateKey: state.encryption.privateKey,
    publicKey: isGroup ? chat.publicKey : contact.publicKey,
    privateKey: isGroup ? chat.privateKey : state.encryption.privateKey,
    disconnected: state.socket.disconnected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    prepareChat: (chatId, contactId, userId) => dispatch(prepareChatAction(chatId, contactId, userId)),
    sendMessage: (chatId, userId, content) => dispatch(sendMessageAction(chatId, userId, content)),
    editMessage: (chatId, messageId, content) => dispatch(editMessageAction(chatId, messageId, content)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    checkSelfDestruct: (chatId) => dispatch(checkSelfDestructAction(chatId)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);