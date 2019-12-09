import React from 'react';
import { connect } from 'react-redux';

import { monitorMessages } from '../../integration/ws/chat';
import { fetchMessagesAction, fetchTitleAction, sendMessageAction } from '../../redux/actions/chatAction';
import { howLongAgo, formatAMPM } from '../../common/date';

class Chat extends React.Component {

  state = {
    input: '',
  };

  componentDidMount() {
    this.subscription = monitorMessages(this.props.chatId);
    this.props.fetchMessages(this.props.chatId);
    this.props.fetchTitle(this.props.chatId);
  }

  componentWillUnmount() {
    this.subscription.close();
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
        <div className="chat-component-header-icon" />
        <div className="chat-component-header-info">
          <div className="chat-component-header-title">
            {this.props.title}
          </div>
          <div className="chat-component-header-subtitle">
            Last seen {howLongAgo((Date.now() - (Math.floor(Math.random() * Math.floor(100000)))))} ago.
            </div>
        </div>
        <div className="chat-component-header-close"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
          onClick={this.props.onClose}
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
      <div className={`chat-component-message chat-component-message-${origin}`}>
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
    return (
      <div
        key={this.props.chatId}
        className="chat-component-base"
      >
        {this.renderHeader()}
        {this.renderBody()}
        <div className="chat-component-footer-divider" />
        {this.renderFooter()}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const chat = state.chat.chats.find(chat => chat.chatId === props.chatId) || {};
  return {
    messages: chat.messages || [],
    title: chat.title || '',
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    sendMessage: (chatId, userId, content) => dispatch(sendMessageAction(chatId, userId, content)),
    fetchMessages: (chatId) => dispatch(fetchMessagesAction(chatId)),
    fetchTitle: (chatId) => dispatch(fetchTitleAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);