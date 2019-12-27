import React from 'react';
import { connect } from 'react-redux';

import ChatMessage from './ChatMessage';

import { fetchInfoAction, sendMessageAction, editMessageAction, updateChatAction, updateChatStateAction, clearChatAction } from '../../redux/actions/chatAction';
import { enrichMessagesWithDates } from '../../common/chat';
import { encryptMessage, decryptMessage } from '../../integration/encryption';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      lastMessageId: null,
      wasEncrypted: !props.userPrivateKey,
      editing: false,
      settings: false,
    };
    this.messageListRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchInfo(this.props.chatId);
  }

  componentDidUpdate() {
    const lastMessage = this.props.messages[this.props.messages.length - 1] || {};
    const lastMessageId = lastMessage.id;
    const gotDecrypted = this.state.wasEncrypted && this.props.userPrivateKey;
    const hasNewMessage = this.state.lastMessageId !== lastMessageId;
    if (hasNewMessage) this.setState({ lastMessageId });
    if (gotDecrypted) this.setState({ wasEncrypted: false });
    if (hasNewMessage || gotDecrypted) this.scrollToLastMessage();
  }

  scrollToLastMessage = () => {
    if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight);
  }

  sendMessage = () => {
    if (!this.state.input) return;
    this.props.sendMessage(this.props.chatId, this.props.userId, this.encryptInput(this.state.input));
    this.setState({ input: '' });
  }

  editMessage = (chatId, messageId, input) => {
    this.props.editMessage(chatId, messageId, this.encryptInput(input));
  }

  encryptInput = (input) => {
    const content = encryptMessage(input, this.props.friendPublicKey, this.props.userPrivateKey);
    const backup = encryptMessage(input, this.props.userPublicKey, this.props.userPrivateKey);
    return { content, backup }
  }

  decryptMessage = (message) => {
    const origin = parseInt(message.user_id) === this.props.userId ? 'sent' : 'received';
    const content = decryptMessage(origin === 'sent' ? message.backup : message.content, this.props.userPrivateKey);
    return { ...message, content };
  }

  editLastMessage = () => {
    const sentMessages = this.props.messages.filter(message => parseInt(message.user_id) === this.props.userId);
    const lastSentMessage = sentMessages[sentMessages.length - 1];
    if (!lastSentMessage) return;
    this.setState({ input: '', editing: lastSentMessage.id });
  }

  onKeyPressed = event => {
    const code = event.keyCode || event.which;
    const enterKeyCode = 13;
    if (code === enterKeyCode) return this.sendMessage();
  }

  onKeyDown = event => {
    const code = event.keyCode || event.which;
    const arrowUpKeyCode = 38;
    if (code === arrowUpKeyCode) return this.editLastMessage();
  }

  onEdit = () => {
    this.setState({ editing: false });
    this.inputRef.current.focus();
  }

  renderSettings = () => {
    if (!this.state.settings) return;
    const inactiveStyle = 'chat-component-header-settings-option-inactive';
    return (
      <div className="chat-component-header-settings-popup">

        <div
          className={`chat-component-header-settings-option clickable ${this.props.blocked && inactiveStyle}`}
          onClick={() => this.props.updateChat(this.props.chatId, { blocked: !this.props.blocked })}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)` }}
          />
          block
        </div>

        <div
          className={`chat-component-header-settings-option clickable ${this.props.muted && inactiveStyle}`}
          onClick={() => this.props.updateChat(this.props.chatId, { muted: !this.props.muted })}
        >
          <div
            className="chat-component-header-settings-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)` }}
          />
          mute
        </div>

        <div
          className={`chat-component-header-settings-option clickable ${!this.props.messages.length && inactiveStyle}`}
          onClick={() => this.props.clearChat(this.props.chatId)}
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
    return (
      <div className="chat-component-header">

        <div
          className="chat-component-header-icon"
          style={{ backgroundImage: `url('${this.props.icon}')` }}
        />

        <div className="chat-component-header-info">
          <div className="chat-component-header-title">
            {this.props.title}
          </div>
          <div className="chat-component-header-subtitle">
            {this.props.subtitle}
          </div>
        </div>

        <div className="chat-component-header-options">
          <div className="chat-component-header-top-buttons">
            <div className="chat-component-header-button"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_minimise.svg)` }}
              onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
            />
            <div className="chat-component-header-button"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_maximise.svg)` }}
              onClick={() => this.props.updateChatState(this.props.chatId, { maximised: !this.props.maximised, minimised: false })}
            />
            <div className="chat-component-header-button"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
              onClick={() => this.props.onClose(this.props.chatId)}
            />
          </div>
          <div
            className="chat-component-header-settings clickable"
            style={{ backgroundImage: `url('/assets/svg/ic_chat_settings.svg')` }}
            onClick={() => this.setState(previous => ({ settings: !previous.settings }))}
          />
        </div>

      </div>
    );
  }

  renderBody = () => {
    return (
      <div
        className="chat-component-body"
        ref={this.messageListRef}
      >
        {this.props.messages.map(this.renderMessage)}
      </div>
    );
  }

  renderMessage = (message) => {
    return (
      <ChatMessage
        key={message.id}
        message={this.decryptMessage(message)}
        userId={this.props.userId}
        chatId={this.props.chatId}
        messageId={message.id}
        messageListRef={this.messageListRef}
        editing={this.state.editing === message.id}
        onEdit={this.onEdit}
        editMessage={this.editMessage}
      />
    );
  }

  renderFooter = () => {
    return (
      <div className="chat-component-footer">
        <div className="chat-component-attach-button-container">
          <div className="chat-component-attach-button"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_attach.svg)` }}
          />
          <div className="chat-component-attach-button-divider" />
        </div>
        <input
          disabled={this.props.blocked || !this.props.userPrivateKey}
          className="chat-component-input"
          placeholder={`${this.props.blocked ? 'Unblock to send messages' : 'Type your message here'}`}
          value={this.state.input}
          onChange={event => this.setState({ input: event.target.value })}
          onKeyPress={this.onKeyPressed}
          onKeyDown={this.onKeyDown}
          onFocus={() => this.setState({ editing: false })}
          ref={this.inputRef}
        />
        <div className="chat-component-send-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_send.svg)` }}
          onClick={this.sendMessage}
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
        {this.renderSettings()}
        {this.renderHeader()}
        <div className="chat-component-encryption-warning">
          Please inform your encryption key to read the contents of this chat.
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  render() {
    if (!this.props.userPrivateKey) return this.renderEncryptedChat();
    let extraClass = "";
    if (this.props.maximised) extraClass += "chat-maximised";
    if (this.props.minimised) extraClass += "chat-minimised";
    return (
      <div
        key={this.props.chatId}
        className={`chat-component-base ${extraClass}`}
      >
        {this.renderSettings()}
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
  return {
    messages,
    icon: chat.icon || '',
    title: chat.title || '',
    subtitle: chat.subtitle || '',
    blocked: chat.blocked || false,
    muted: chat.muted || false,
    maximised: chat.maximised || false,
    minimised: chat.minimised || false,
    friendPublicKey: chat.publicKey,
    userPublicKey: state.encryption.publicKey,
    userPrivateKey: state.encryption.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    sendMessage: (chatId, userId, content) => dispatch(sendMessageAction(chatId, userId, content)),
    editMessage: (chatId, messageId, content) => dispatch(editMessageAction(chatId, messageId, content)),
    fetchInfo: (chatId) => dispatch(fetchInfoAction(chatId)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);