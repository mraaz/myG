import React from 'react';
import { connect } from 'react-redux';
import { Manager, Reference, Popper } from 'react-popper';

import { editMessageAction, deleteMessageAction } from '../../redux/actions/chatAction';
import { formatAMPM } from '../../common/date';

class ChatMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onMessage: false,
      onOverlay: false,
      onOptions: false,
      editing: false,
      input: '',
    };
  }

  handleKeyPress = (event) => {
    if (event.keyCode == 13) {
      this.props.editMessage(this.props.chatId, this.props.messageId, this.state.input);
      this.setState({ editing: false });
      return;
    }
    if (event.key === 27) {
      this.setState({ editing: false });
    }
  }

  renderOverlay = (origin) => {
    if ((!this.state.onMessage && !this.state.onOverlay) || origin !== 'sent' || this.props.message.deleted) return;
    return (
      <div className="chat-component-message-overlay">
        <div
          className="chat-component-message-overlay-options-icon chat-component-message-overlay-options-button"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_options.svg)` }}
          onMouseEnter={() => this.setState({ onOverlay: true })}
          onMouseLeave={() => this.setState({ onOverlay: false })}
        />
      </div>
    )
  }

  renderOptions = () => {
    if (!this.state.onOverlay && !this.state.onOptions) return;
    return (
      <div
        className="chat-component-message-overlay-options"
        onMouseEnter={() => this.setState({ onOptions: true })}
        onMouseLeave={() => this.setState({ onOptions: false })}
      >
        <div
          onClick={() => this.setState({
            editing: true, input: this.props.message.content,
            onOptions: false, onOverlay: false, onMessage: false,
          })}
          className="chat-component-message-overlay-options-row clickable"
        >
          <p className="chat-component-message-overlay-options-label">Edit</p>
          <div
            className="chat-component-message-overlay-options-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_edit.svg)` }}
          />
        </div>
        <div
          onClick={() => this.props.deleteMessage(this.props.chatId, this.props.messageId)}
          className="chat-component-message-overlay-options-row clickable"
        >
          <p className="chat-component-message-overlay-options-label">Delete</p>
          <div
            className="chat-component-message-overlay-options-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_delete.svg)` }}
          />
        </div>
      </div>
    )
  }

  renderInput() {
    const { message } = this.props;
    return (
      <div
        key={message.id}
        className="chat-component-message chat-component-message-sent"
      >
        <input
          autoFocus
          className="chat-component-message-input"
          value={this.state.input}
          onKeyDown={this.handleKeyPress}
          onChange={event => this.setState({ input: event.target.value })}
        />
      </div>
    );
  }

  render() {
    if (this.state.editing) return this.renderInput();
    const { message } = this.props;
    const origin = parseInt(message.user_id) === this.props.userId ? 'sent' : 'received';
    const isSelected = !message.deleted && (this.state.onMessage || this.state.onOverlay || this.state.onOptions);
    const selectedStyle = isSelected && 'chat-component-message-selected';
    const deletedStyle = message.deleted && 'chat-component-message-deleted';
    return (
      <Manager>
        <div
          key={message.id}
          className={`chat-component-message chat-component-message-${origin} ${selectedStyle} ${deletedStyle}`}
          onMouseEnter={() => this.setState({ onMessage: true })}
          onMouseLeave={() => this.setState({ onMessage: false })}
        >
          <Reference>
            {({ ref }) => (
              <div ref={ref} className="chat-component-message-content-container">
                <p className={`chat-component-message-content`}>
                  {message.deleted ? 'This message was deleted.' : message.content}
                </p>
                <div className="chat-component-message-content-info">
                  {!!message.edited && !message.deleted && <p className="chat-component-message-edited">edited</p>}
                  <p className="chat-component-message-date">
                    {formatAMPM(new Date(message.created_at))}
                  </p>
                </div>
              </div>
            )}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement }) => (
              <div ref={ref} style={style} data-placement={placement}>
                {this.renderOptions()}
              </div>
            )}
          </Popper>
          <Popper placement="top">
            {({ ref, style, placement }) => (
              <div ref={ref} style={style} data-placement={placement}>
                {this.renderOverlay(origin)}
              </div>
            )}
          </Popper>
        </div>
      </Manager>
    );
  }
}

function mapStateToProps(state, props) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return ({
    editMessage: (chatId, messageId, content) => dispatch(editMessageAction(chatId, messageId, content)),
    deleteMessage: (chatId, messageId) => dispatch(deleteMessageAction(chatId, messageId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);