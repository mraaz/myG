import React from 'react';
import { connect } from 'react-redux';

import ChatMessage from './ChatMessage';

import { fetchMessagesAction, fetchInfoAction, sendMessageAction } from '../../redux/actions/chatAction';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      maximised: false,
      minimised: false,
      lastMessageId: null,
      editing: false,
    };
    this.messageListRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.chatId);
    this.props.fetchInfo(this.props.chatId);
  }

  componentDidUpdate() {
    const lastMessage = this.props.messages[this.props.messages.length - 1] || {};
    const lastMessageId = lastMessage.id;
    if (this.state.lastMessageId === lastMessageId) return;
    this.setState({ lastMessageId });
    this.scrollToLastMessage();
  }

  scrollToLastMessage = () => {
    if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight);
  }

  sendMessage = () => {
    if (!this.state.input) return;
    this.props.sendMessage(this.props.chatId, this.props.userId, this.state.input);
    this.setState({ input: '' });
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
        <div className="chat-component-header-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_minimise.svg)` }}
          onClick={() => this.setState(previous => ({ minimised: !previous.minimised, maximised: false }))}
        />
        <div className="chat-component-header-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_maximise.svg)` }}
          onClick={() => this.setState(previous => ({ maximised: !previous.maximised, minimised: false }))}
        />
        <div className="chat-component-header-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
          onClick={() => this.props.onClose(this.props.chatId)}
        />
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
        message={message}
        userId={this.props.userId}
        chatId={this.props.chatId}
        messageId={message.id}
        editing={this.state.editing === message.id}
        onEdit={this.onEdit}
        messageListRef={this.messageListRef}
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
          className="chat-component-input"
          placeholder="Type your message here"
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

  render() {
    let extraClass = "";
    if (this.state.maximised) extraClass += "chat-maximised";
    if (this.state.minimised) extraClass += "chat-minimised";
    return (
      <div
        key={this.props.chatId}
        className={`chat-component-base ${extraClass}`}
      >
        {this.renderHeader()}
        {!this.state.minimised && this.renderBody()}
        {!this.state.minimised && <div className="chat-component-footer-divider" />}
        {!this.state.minimised && this.renderFooter()}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const chat = state.chat.chats.find(chat => chat.chatId === props.chatId) || {};
  return {
    messages: chat.messages || [],
    icon: chat.icon || '',
    title: chat.title || '',
    subtitle: chat.subtitle || '',
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    sendMessage: (chatId, userId, content) => dispatch(sendMessageAction(chatId, userId, content)),
    fetchMessages: (chatId) => dispatch(fetchMessagesAction(chatId)),
    fetchInfo: (chatId) => dispatch(fetchInfoAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);