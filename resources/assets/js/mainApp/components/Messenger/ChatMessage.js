import React from 'react';

import { formatAMPM, formatDate, convertUTCDateToLocalDate } from '../../../common/date';
import { copyToClipboard } from '../../../common/clipboard';

export default class ChatMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showOptionsButton: false,
      showOptionsMenu: false,
      lastEditing: false,
      editing: false,
      input: props.message.content,
    };
    this.messageRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.editing === state.lastEditing) return {};
    return { editing: props.editing, lastEditing: props.editing };
  }

  handleKeyPress = (event) => {
    if (event.keyCode == 13) {
      if (this.props.isGuest) return;
      this.props.editMessage(this.props.chatId, this.props.messageId, this.state.input);
      this.setState({ editing: false });
      this.props.onEdit();
      return;
    }
    if (event.keyCode === 27) {
      this.setState({ editing: false });
      this.props.onEdit();
    }
  }

  shouldRenderOptionsUpwards() {
    const { y: messageOffset } = this.messageRef.current.getBoundingClientRect();
    const { y: chatOffset, height: chatHeight } = this.props.messageListRef.current.getBoundingClientRect();
    const messagePosition = messageOffset - (chatOffset + chatHeight);
    const approximateOptionMenuHeight = 70;
    return messagePosition > -approximateOptionMenuHeight;
  }

  renderOptions = () => {
    if (this.props.isGuest) return;
    if (!this.state.showOptionsMenu || this.props.message.deleted) return;
    const origin = this.props.message.senderId === this.props.userId ? 'sent' : 'received';
    const sentStyle = 'chat-component-message-options-menu-sent';
    const receivedStyle = 'chat-component-message-options-menu-received';
    const directionStyle = `chat-component-message-options-menu-${this.shouldRenderOptionsUpwards() ? 'upwards' : 'downwards'}`;
    return (
      <div className={`chat-component-message-options-menu ${origin === "sent" ? sentStyle : receivedStyle} ${directionStyle}`}>
        <div
          className="chat-component-message-options-row clickable"
          onClick={() => {
            if (origin === 'sent') this.setState({ editing: true, showOptionsMenu: false, input: this.props.message.content });
            else {
              this.setState({ showOptionsMenu: false });
              copyToClipboard(this.props.message.content);
            }
          }}
        >
          <p className="chat-component-message-options-label">{origin === 'sent' ? 'edit' : 'copy'}</p>
        </div>
        <div className={`chat-component-message-options-row-divider ${origin === "received" ? sentStyle : receivedStyle}`} />
        <div
          className="chat-component-message-options-row clickable"
          onClick={() => this.props.deleteMessage(this.props.chatId, this.props.messageId, origin)}
        >
          <p className="chat-component-message-options-label">delete</p>
        </div>
      </div>
    )
  }

  renderInput() {
    const { message } = this.props;
    return (
      <div
        key={message.messageId}
        className="chat-component-message chat-component-message-sent"
      >
        <textarea
          rows={1}
          autoFocus
          className="chat-component-message-input"
          value={this.state.input}
          onKeyDown={this.handleKeyPress}
          onBlur={() => this.setState({ editing: false })}
          onChange={event => this.setState({ input: event.target.value })}
        >
        </textarea>
      </div>
    );
  }

  renderDateDivisor() {
    const { message } = this.props;
    return (
      <div key={Math.random()} className="chat-component-message-date-divisor">
        <p>{message.isYesterday ? 'Yesterday' : formatDate(message.date)}</p>
      </div>
    );
  }

  renderEntryLog() {
    const { message } = this.props;
    const invitedText = message.invited && `${message.alias} was invited`;
    const linkText = message.link && `${message.alias} has joined through a link`;
    const kickedText = message.kicked && `${message.alias} was kicked`;
    const leftText = message.left && `${message.alias} has left`;
    return (
      <div key={Math.random()} className="chat-component-message-date-divisor">
        <p>{invitedText || linkText || kickedText || leftText}</p>
      </div>
    );
  }

  colorMessage = (id) => {
    const colors = ['#F99', '#9F9', '#99F', '#FF9', '#9FF', '#F9F'];
    return colors[parseInt(id % colors.length)];
  }

  render() {
    const { message } = this.props;
    const origin = message.senderId === this.props.userId ? 'sent' : 'received';
    const deletedStyle = message.deleted && 'chat-component-message-deleted';
    const selfDestructStyle = message.selfDestruct && 'chat-component-message-self-destruct';
    if (this.state.editing) return this.renderInput();
    if (message.isDateDivisor) return this.renderDateDivisor();
    if (message.isEntryLog) return this.renderEntryLog();
    return (
      <div
        key={message.messageId}
        ref={this.messageRef}
        className={`chat-component-message chat-component-message-${origin} ${deletedStyle} ${selfDestructStyle}`}
        onMouseEnter={() => this.setState({ showOptionsButton: true })}
        onMouseLeave={() => this.setState({ showOptionsButton: false, showOptionsMenu: false })}
      >
        <div className="chat-component-message-container">

          <div className="chat-component-message-content-body">
            {message.senderId !== this.props.userId && this.props.isGroup && (
              <p
                style={{ color: this.colorMessage(parseInt(message.senderId)) }}
                className={`chat-component-message-sender-name`}
              >
                {message.senderName}
              </p>
            )}
            <p className={`chat-component-message-content`}>
              {
                message.deleted ?
                  origin === 'sent' ?
                    'You deleted this message' :
                    'This message was deleted'
                  :
                  message.content
              }
            </p>
          </div>

          <div className="chat-component-message-content-info">
            <div className="chat-component-message-side-container">
              <div
                onClick={() => this.setState({ showOptionsMenu: true })}
                className={`chat-component-message-options-button ${!this.state.showOptionsMenu && !this.props.message.deleted && 'clickable'}`}
                style={{ backgroundImage: this.state.showOptionsButton && !this.props.message.deleted && `url(/assets/svg/ic_chat_options.svg)` }}
              />
              <div className="chat-component-message-options-menu-container">
                <div className="chat-component-message-options-menu-inner-container">
                  {this.renderOptions()}
                </div>
              </div>
            </div>
            <div className="chat-component-message-side-container">
              {!!message.edited && !message.deleted && <p className="chat-component-message-edited">edited</p>}
              <p className="chat-component-message-date">
                {formatAMPM(convertUTCDateToLocalDate(new Date(message.createdAt)))}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}