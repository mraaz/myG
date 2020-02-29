import React from 'react';

export default class ChatInput extends React.PureComponent {

  state = {
    input: '',
    isTyping: false,
    lastTyped: 0,
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
    if (!this.state.input.trim()) return;
    this.props.sendMessage(this.state.input.trim());
    this.props.setTyping(false);
    this.setState({ input: '' });
  }

  onTyping = (input) => {
    if (!this.state.isTyping) this.props.setTyping(true);
    this.setState({ input, isTyping: true, lastTyped: Date.now() });
    setTimeout(() => this.clearTyping(), 2000);
  }

  clearTyping = () => {
    if (!this.state.isTyping) return;
    if ((Date.now() - this.state.lastTyped) < 1900) return;
    this.props.setTyping(false);
    this.setState({ isTyping: false });
  }

  render() {
    const disabled = !this.props.connected || !!this.props.blocked || !this.props.isDecryptable;
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
          onChange={event => this.onTyping(event.target.value)}
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
