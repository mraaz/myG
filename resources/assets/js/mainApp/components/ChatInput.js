import React from 'react';

export default class Chat extends React.PureComponent {

  state = {
    input: '',
  };

  onKeyPressed = event => {
    const code = event.keyCode || event.which;
    const enterKeyCode = 13;
    if (code === enterKeyCode) this.sendMessage();
  }

  onKeyDown = event => {
    const code = event.keyCode || event.which;
    const arrowUpKeyCode = 38;
    if (code === arrowUpKeyCode) {
      this.props.editLastMessage(this.state.input);
      this.setState({ input: '' });
    }
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    return (
      <div className="chat-component-input-container">
        <input
          className="chat-component-input"
          disabled={this.props.blocked || !this.props.userPrivateKey}
          placeholder={`${this.props.blocked ? 'Unblock to send messages' : 'Type your message here'}`}
          value={this.state.input}
          onChange={event => this.setState({ input: event.target.value })}
          onKeyPress={this.onKeyPressed}
          onKeyDown={this.onKeyDown}
          onFocus={this.props.onFocus()}
        />
        <div className="chat-component-send-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_send.svg)` }}
          onClick={() => this.sendMessage()}
        />
      </div>
    );
  }

}
