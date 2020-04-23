import React from 'react';

import { formatAMPM, formatDate } from '../../../common/date';
import { copyToClipboard } from '../../../common/clipboard';
import { convertColonsToEmojis } from '../../../common/emoji';

export default class ChatMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showOptionsButton: false,
      showOptionsMenu: false,
      lastEditing: false,
      editing: false,
      audio: null,
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
        {!this.props.message.isAttachment &&
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
        }
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

  renderMessage = (content) => {
    const isImage = content.includes('myg-image');
    const isSound = content.includes('myg-sound');
    const isVideo = content.includes('myg-video');
    const expirationDate = new Date(this.props.message.createdAt);
    expirationDate.setDate(expirationDate.getDate() + 5);
    if (isImage) return this.renderImage(content, expirationDate);
    if (isSound) return this.renderSound(content, expirationDate);
    if (isVideo) return this.renderVideo(content, expirationDate);
    return convertColonsToEmojis(content);
  }

  renderImage = (content, expirationDate) => {
    const image = content.split('myg-image|')[1];
    return (
      <div className="chat-component-message-image-container">
        <div
          className={`chat-component-message-image clickable`}
          onClick={() => this.props.showAttachment({ image })}
          style={{ backgroundImage: `url('${image}')` }}
        />
        <p className="chat-component-message-image-expiry">
          This file will expire on {formatDate(expirationDate)}
        </p>
      </div>
    );
  }

  renderSound = (content, expirationDate) => {
    const audio = new Audio(content.split('myg-sound|')[1]);
    const icon = !this.state.audio ? '/assets/svg/ic_chat_play.svg' : '/assets/svg/ic_chat_pause.svg';
    return (
      <div className="chat-component-message-image-container">
        <div className="chat-component-message-attachment-container">
          <div
            className={`chat-component-message-sound clickable`}
            onClick={() => {
              if (this.state.audio) {
                this.state.audio.pause();
                this.setState({ audio: null });
              }
              else {
                audio.play();
                this.setState({ audio });
              }
            }}
            style={{ backgroundImage: `url(${icon})` }}
          />
          <div>Audio</div>
        </div>
        <p className="chat-component-message-image-expiry">
          This file will expire on {formatDate(expirationDate)}
        </p>
      </div>
    );
  }

  renderVideo = (content, expirationDate) => {
    const video = content.split('myg-video|')[1];
    return (
      <div className="chat-component-message-image-container">
        <div className="chat-component-message-attachment-container">
          <div
            className={`chat-component-message-video clickable`}
            onClick={() => this.props.showAttachment({ video })}
            style={{ backgroundImage: `url(/assets/svg/ic_chat_play.svg)` }}
          />
          <div>Video</div>
        </div>
        <p className="chat-component-message-image-expiry">
          This file will expire on {formatDate(expirationDate)}
        </p>
      </div>
    );
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
            <div className={`chat-component-message-content`}>
              {
                message.deleted ?
                  origin === 'sent' ?
                    'You deleted this message' :
                    'This message was deleted'
                  :
                  this.renderMessage(message.content)
              }
            </div>
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
                {formatAMPM(new Date(message.createdAt))}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}