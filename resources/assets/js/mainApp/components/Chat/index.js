import React from 'react';
import axios from 'axios';
import socket from '../../common/socket';
import { howLongAgo, formatAMPM } from '../../common/date';

class Chat extends React.Component {

  state = {
    input: '',
    messages: [],
    title: '',
  };

  componentDidMount() {
    socket.connect();
    this.subscription = socket.subscribe(`chat:${this.props.chatId}`, this.onNewMessage);
    this.fetchMessages();
    this.fetchTitle();
  }

  componentWillUnmount() {
    this.subscription.close();
  }

  fetchMessages = () => {
    axios.get(`/api/chat/${this.props.chatId}`).then(response => {
      console.log(`onFetchMessages`, response)
      this.setState({
        messages: response.data.messages,
      });
    });
  }

  fetchTitle = () => {
    axios.get(`/api/chat/${this.props.chatId}/title`).then(response => {
      console.log(`onFetchTitle`, response)
      this.setState({
        title: response.data,
      });
    });
  }

  onNewMessage = message => {
    console.log(`onNewMessage`, message)
    this.setState(prevState => ({
      messages: [...prevState.messages, message.data]
    }));
  };

  sendMessage = () => {
    axios.post(`/api/chat/${this.props.chatId}/message/`, {
      content: this.state.input,
      user_id: this.props.userId,
    });
    this.setState({ input: '' }); ƒ
  }

  onKeyPressed = event => {
    const code = event.keyCode || event.which;
    if (code === 13) this.sendMessage();
  }

  renderHeader = () => {
    return (
      <div className="chat-component-header">
        <div className="chat-component-header-icon" />
        <div className="chat-component-header-info">
          <div className="chat-component-header-title">
            {this.state.title}
          </div>
          <div className="chat-component-header-subtitle">
            Last seen {howLongAgo(this.props.lastOnline)} ago.
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
        {this.state.messages.map(this.renderMessage)}
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
      <div className="chat-component-base">
        {this.renderHeader()}
        {this.renderBody()}
        <div className="chat-component-footer-divider" />
        {this.renderFooter()}
      </div>
    );
  }
}

Chat.defaultProps = {
  id: '',
  title: 'Nickname',
  lastOnline: Date.now() - (Math.floor(Math.random() * Math.floor(100000)))
}

export default Chat;