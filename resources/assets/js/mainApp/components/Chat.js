import React from 'react';
import { connect } from 'react-redux';

import { fetchMessagesAction, fetchInfoAction, sendMessageAction } from '../../redux/actions/chatAction';
import { formatAMPM } from '../../common/date';

class Chat extends React.Component {

  state = {
    input: '',
    maximised: false,
    minimised: false,
  };

  componentDidMount() {
    this.props.fetchMessages(this.props.chatId);
    this.props.fetchInfo(this.props.chatId);
  }

  sendMessage = () => {
    this.props.sendMessage(this.props.chatId, this.props.userId, this.state.input);
    this.setState({ input: '' });
  }

  onKeyPressed = event => {
    const code = event.keyCode || event.which;
    const enterKeyCode = 13;
    if (code === enterKeyCode) this.sendMessage();
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
      <div className="chat-component-body">
        {this.props.messages.map(this.renderMessage)}
      </div>
    );
  }

  renderMessage = (message) => {
    const origin = parseInt(message.user_id) === this.props.userId ? 'sent' : 'received';
    return (
      <div
        key={message.id}
        className={`chat-component-message chat-component-message-${origin}`}
      >
        <div className="chat-component-message-content-container">
          <p className="chat-component-message-content">
            {message.content}
          </p>
          <p className="chat-component-message-date">
            {formatAMPM(new Date(message.created_at))}
          </p>
        </div>
      </div>
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