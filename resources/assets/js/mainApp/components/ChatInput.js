import React from 'react';

export default class Chat extends React.PureComponent {

  state = {
    input: '',
  };

  onKeyPressed = event => {
    const code = event.keyCode || event.which;
    const enterKeyCode = 13;
    if (code === enterKeyCode) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onKeyDown = event => {
    const code = event.keyCode || event.which;
    const arrowUpKeyCode = 38;
    if (code === arrowUpKeyCode) {
      this.setState({ input: '' });
      this.props.editLastMessage();
    }
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.input.trim());
    this.setState({ input: '' });
  }

  render() {
    const disabled = !this.props.connected || !!this.props.blocked || !this.props.userPrivateKey;
    const placeholderText =
      !this.props.connected ? 'You seem to be offline...' :
        this.props.blocked ? 'Unblock to send messages' :
          'Type your message here';
    return (
      <div className="chat-component-input-container">
        <textarea
          rows={1}
          className="chat-component-input"
          disabled={disabled}
          placeholder={placeholderText}
          value={this.state.input}
          onChange={event => this.setState({ input: event.target.value })}
          onKeyPress={this.onKeyPressed}
          onKeyDown={this.onKeyDown}
        >
        </textarea>
        <div className="chat-component-send-button clickable"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_send.svg)` }}
          onClick={() => !disabled && this.sendMessage()}
        />
      </div>
    );
  }

}
