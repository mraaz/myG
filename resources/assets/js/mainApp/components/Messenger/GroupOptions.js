import React from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button'
import { updateChatAction, clearChatAction, exitGroupAction } from '../../../redux/actions/chatAction';

class GroupOptions extends React.PureComponent {

  state = {
    title: '',
  }

  onSaveTitle() {
    if (!this.state.title.trim()) return;
    this.props.updateChat(this.props.group.chatId, { title: this.state.title.trim() });
    this.setState({ title: '' });
  }

  onKeyPress = event => {
    const code = event.keyCode || event.which;
    const enterKeyCode = 13;
    if (code === enterKeyCode) {
      event.preventDefault();
      this.onSaveTitle();
    }
  }

  onKeyDown = event => {
    const code = event.keyCode || event.which;
    const escKeyCode = 27;
    if (code === escKeyCode) return this.setState({ title: '' });
  }

  exitOrDeleteGroup() {

  }

  render() {
    const isGroupOwner = this.props.group.owners.length > 1 && this.props.group.owners.includes(this.props.userId);
    const inactiveStyle = 'chat-component-options-option-inactive';
    return (
      <div className="chat-component-options-container">

        <div className="chat-component-options-row">

          <div className="chat-component-options-group-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_group_icon.svg)` }}
            onClick={() => console.log('Upload Image')}
          />

          <div className="chat-component-group-title-input-container">
            <input
              className="chat-component-group-title-input"
              placeholder={"Type new Group name..."}
              value={this.state.title}
              onKeyPress={this.onKeyPress}
              onKeyDown={this.onKeyDown}
              onChange={event => this.setState({ title: event.target.value, titleError: false })}
            >
            </input>
          </div>

          <div className={`chat-component-group-button clickable ${!this.state.title.trim() && inactiveStyle}`}
            onClick={() => this.onSaveTitle()}
          >
            save
          </div>

        </div>

        <div className="chat-component-group-content-divider" />

        <div className="chat-component-options-row">

          <div
            className={`chat-component-options-option clickable ${!this.props.messages.length && inactiveStyle}`}
            onClick={() => this.props.clearChat(this.props.group.chatId)}
          >
            <div
              className="chat-component-options-option-icon"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_delete.svg)` }}
            />
            clear
          </div>

          <div
            className={`chat-component-options-option clickable ${this.props.group.muted && inactiveStyle}`}
            onClick={() => this.props.updateChat(this.props.group.chatId, { muted: !this.props.group.muted })}
          >
            <div
              className="chat-component-options-option-icon"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)` }}
            />
            {this.props.group.muted ? 'unmute' : 'mute'}
          </div>

        </div>

        <div
          className={`chat-component-options-option clickable`}
          onClick={() => console.log('check group members')}
        >
          <div
            className="chat-component-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_group_members.svg)` }}
          />
          check group members
        </div>

        <div className="chat-component-group-content-divider" />

        <p className="chat-component-group-hint">Share this link below to invite your friends</p>

        <div className="chat-component-options-row">

          <div className="chat-component-group-title-link-container">
            <div className="chat-component-group-title-link">
              myg.gg/not-implemented-yet
            </div>
          </div>

          <div className={`chat-component-group-button chat-component-group-button-smaller clickable`}
            onClick={() => console.log('edit')}
          >
            edit
          </div>

          <div className={`chat-component-group-button chat-component-group-button-smaller clickable`}
            onClick={() => console.log('copy')}
          >
            copy
          </div>

        </div>

        <div className="chat-component-group-content-divider" />

        <div className="chat-component-options-toggle">
          Make it Private
          <ToggleButton
            value={this.state.isPrivate || false}
            onToggle={value => this.setState({ isPrivate: !value })}
          />
        </div>

        <div className="chat-component-options-toggle">
          Self destruct mode
          <ToggleButton
            value={this.props.group.selfDestruct || false}
            onToggle={selfDestruct => this.props.updateChat(this.props.group.chatId, { selfDestruct: !selfDestruct })}
          />
        </div>

        <div
          className={`chat-component-options-option clickable ${this.props.group.blocked && inactiveStyle}`}
          onClick={() => {
            this.props.updateChat(this.props.group.chatId, { blocked: !this.props.group.blocked });
          }}
        >
          <div
            className="chat-component-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)` }}
          />
          {this.props.group.blocked ? 'unblock group' : 'block group'}
        </div>

        <div
          className={`chat-component-options-option clickable chat-component-options-option-warning`}
          onClick={() => this.exitOrDeleteGroup()}
        >
          {isGroupOwner ? 'delete group' : 'leave group'}
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    exitGroup: (chatId) => dispatch(exitGroupAction(chatId)),
  });
}

export default connect(null, mapDispatchToProps)(GroupOptions);