import React from 'react'
import { connect } from 'react-redux'
import ToggleButton from 'react-toggle-button'
import { WithTooltip } from '../Tooltip'
import { updateChatAction, clearChatAction } from '../../../redux/actions/chatAction'
import { getAssetUrl } from '../../../common/assets'
import { showMessengerAlert } from '../../../common/alert'
import { ignoreFunctions } from '../../../common/render'

class ChatOptions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    const inactiveStyle = 'chat-component-options-option-inactive'
    return (
      <div className='chat-component-options-container'>
        <div
          className={`chat-component-options-option clickable`}
          onClick={() => window.location.replace(`/profile/${this.props.contactAlias}`)}>
          <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_profile')})` }} />
          {this.props.contactAlias} profile
        </div>

        <div className='chat-component-options-row'>
          <div
            className={`chat-component-options-option clickable ${!this.props.messages.length && inactiveStyle}`}
            onClick={() =>
              showMessengerAlert(
                'Mate, are you sure you wish to clear your chat history?',
                () => this.props.clearChat(this.props.chatId),
                null,
                'Yes'
              )
            }>
            <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_delete')})` }} />
            clear
          </div>

          <div
            className={`chat-component-options-option clickable ${this.props.muted && inactiveStyle}`}
            onClick={() => this.props.updateChat(this.props.chatId, { muted: !this.props.muted })}>
            <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_mute')})` }} />
            {this.props.muted ? 'unmute' : 'mute'}
          </div>
        </div>

        <div
          className={`chat-component-options-option clickable ${this.props.blocked && inactiveStyle}`}
          onClick={() => {
            if (!this.props.blocked) this.props.blockUser(this.props.contactId)
            else this.props.unblockUser(this.props.contactId)
          }}>
          <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_block')})` }} />
          {this.props.blocked ? 'unblock friend' : 'block friend'}
        </div>

        <div className='chat-component-options-toggle'>
          Self destruct mode (ALT+S)
          <WithTooltip
            position={{ bottom: '-6px', right: '10px' }}
            text={'Kaboom! When activated, messages\nwill only remain for 24 hours'}>
            <ToggleButton
              value={this.props.selfDestruct || false}
              onToggle={(selfDestruct) => this.props.updateChat(this.props.chatId, { selfDestruct: !selfDestruct })}
            />
          </WithTooltip>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
  }
}

export default connect(null, mapDispatchToProps)(ChatOptions)
