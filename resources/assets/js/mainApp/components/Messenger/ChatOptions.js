import React from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button'
import { updateChatAction, clearChatAction } from '../../../redux/actions/chatAction';

class ChatOptions extends React.PureComponent {
  render() {
    const inactiveStyle = 'chat-component-options-option-inactive';
    return (
      <div className="chat-component-options-container">

        <div
          className={`chat-component-options-option clickable`}
          onClick={() => window.location.replace(`/profile/${this.props.contactId}`)}
        >
          <div
            className="chat-component-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_profile.svg)` }}
          />
          {this.props.contactAlias} profile
        </div>

        <div className="chat-component-options-row">

          <div
            className={`chat-component-options-option clickable ${!this.props.messages.length && inactiveStyle}`}
            onClick={() => this.props.clearChat(this.props.chatId)}
          >
            <div
              className="chat-component-options-option-icon"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_delete.svg)` }}
            />
            clear
          </div>

          <div
            className={`chat-component-options-option clickable ${this.props.muted && inactiveStyle}`}
            onClick={() => this.props.updateChat(this.props.chatId, { muted: !this.props.muted })}
          >
            <div
              className="chat-component-options-option-icon"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)` }}
            />
            {this.props.muted ? 'unmute' : 'mute'}
          </div>

        </div>

        <div
          className={`chat-component-options-option clickable ${this.props.blocked && inactiveStyle}`}
          onClick={() => {
            this.props.updateChat(this.props.chatId, { blocked: !this.props.blocked });
          }}
        >
          <div
            className="chat-component-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)` }}
          />
          {this.props.blocked ? 'unblock friend' : 'block friend'}
        </div>

        <div className="chat-component-options-toggle">
          Self destruct mode
          <ToggleButton
            value={this.props.selfDestruct || false}
            onToggle={(selfDestruct) => this.props.updateChat(this.props.chatId, { selfDestruct: !selfDestruct })}
          />
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
  });
}

export default connect(null, mapDispatchToProps)(ChatOptions);