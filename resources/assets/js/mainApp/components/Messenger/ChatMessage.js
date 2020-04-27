import React from 'react';

import { formatAMPM, formatDate } from '../../../common/date';
import { copyToClipboard } from '../../../common/clipboard';
import { convertColonsToEmojis } from '../../../common/emoji';
import { groupBy } from '../../../common/array';

export default class ChatMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showOptionsButton: false,
      showOptionsMenu: false,
      lastEditing: false,
      editing: false,
      audio: null,
      reaction: null,
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

  renderReactions = () => {
    if (this.props.isGuest) return;
    if (this.props.message.deleted) return;
    if (!this.props.message.reactions.length) return;
    const hasReaction = reactionId => this.props.message.reactions.find(reaction => reactionId === reaction.reactionId && this.props.userId === reaction.senderId);
    const reactionGroups = groupBy(this.props.message.reactions, reaction => reaction.reactionId);
    const reactions = [1, 2, 3, 4, 5, 6];
    return (
      <div className="chat-component-message-reactions">
        {reactions.map(reactionId => {
          const reaction = reactionGroups.get(reactionId);
          if (!reaction) return null;
          return (
            <div key={reactionId} className={`chat-component-message-reaction-container${hasReaction(reactionId) ? '-sent' : ''} clickable`}
              onMouseEnter={() => this.setState({ reaction: reactionId })}
              onMouseLeave={() => this.setState({ reaction: null })}
              onClick={() => hasReaction(reactionId) ?
                this.props.removeReaction(this.props.chatId, this.props.messageId, reactionId) :
                this.props.addReaction(this.props.chatId, this.props.messageId, reactionId)
              }
            >
              <div
                className="chat-component-message-reaction"
                style={{ backgroundImage: `url(/assets/image/img/ic_reaction_${reactionId}.png)` }}
              />
              {reaction.length > 1 && <div className="chat-component-message-reaction-count">{reaction.length}</div>}
              {this.state.reaction === reactionId && (
                <div className="chat-component-message-reaction-senders-container">
                  <div className="chat-component-message-reaction-senders">
                    {reaction.map(({ senderName }) => (<div className="chat-component-message-reaction-sender" key={senderName}>{senderName}</div>))}
                  </div>
                </div>
              )
              }
            </div>
          );
        })}
      </div>
    );
  }

  renderReactionOptions = () => {
    if (this.props.isGuest) return;
    if (!this.state.showOptionsButton) return;
    if (this.props.message.deleted) return;
    const hasReaction = reactionId => this.props.message.reactions.find(reaction => reactionId === reaction.reactionId && this.props.userId === reaction.senderId);
    return (
      <div className="chat-component-message-reaction-options">
        {!hasReaction(1) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 1)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_1.png)` }}
          />
        )}
        {!hasReaction(2) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 2)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_2.png)` }}
          />
        )}
        {!hasReaction(3) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 3)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_3.png)` }}
          />
        )}
        {!hasReaction(4) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 4)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_4.png)` }}
          />
        )}
        {!hasReaction(5) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 5)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_5.png)` }}
          />
        )}
        {!hasReaction(6) && (
          <div
            className="chat-component-message-reaction-options-item clickable"
            onClick={() => this.props.addReaction(this.props.chatId, this.props.messageId, 6)}
            style={{ backgroundImage: `url(/assets/image/img/ic_reaction_6.png)` }}
          />
        )}
      </div>
    );
  }

  renderOptions = () => {
    if (this.props.isGuest) return;
    if (!this.state.showOptionsMenu) return;
    if (this.props.message.deleted) return;
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

        {this.props.message.isAttachment &&
          <div
            className="chat-component-message-options-row clickable"
            onClick={() => window.open(this.getAttachment(this.props.message.content))}
          >
            <p className="chat-component-message-options-label">download</p>
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

  getAttachment = (content) => {
    return content.split('myg-image|')[1] || content.split('myg-sound|')[1] || content.split('myg-video|')[1] || null;
  }

  getAttachmentName = (content) => {
    const attachment = this.getAttachment(content);
    return attachment.split('chat_images/')[1];
  }

  renderMessage = (content) => {
    if (!content) return null;
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
                  message.isAttachment ? `The file ${this.getAttachmentName(message.content)} was automatically deleted.` :
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
                  {this.renderReactionOptions()}
                </div>
              </div>
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

        {this.renderReactions()}

      </div>
    );
  }
}