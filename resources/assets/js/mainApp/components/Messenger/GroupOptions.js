import React from 'react'
import { connect } from 'react-redux'
import ToggleButton from 'react-toggle-button'
import GroupMemberOptions from './GroupMemberOptions'
import GroupLinkOptions from './GroupLinkOptions'
import Popup from '../Popup'
import FileOpenModal from '../FileOpenModal'
import { WithTooltip } from '../Tooltip'
import { updateChatAction, clearChatAction, deleteChatAction, exitGroupAction, updateLinkAction } from '../../../redux/actions/chatAction'
import { copyToClipboard } from '../../../common/clipboard'
import { getAssetUrl } from '../../../common/assets'
import { showMessengerAlert } from '../../../common/alert'

class GroupOptions extends React.PureComponent {
  state = {
    title: '',
    showingMembers: false,
    exitingGroup: false,
    uploadingPhoto: false,
  }

  onSaveTitle() {
    if (!this.state.title.trim()) return
    this.props.updateChat(this.props.group.chatId, { title: this.state.title.trim() })
    this.setState({ title: '' })
  }

  onKeyPress = (event) => {
    const code = event.keyCode || event.which
    const enterKeyCode = 13
    if (code === enterKeyCode) {
      event.preventDefault()
      this.onSaveTitle()
    }
  }

  onKeyDown = (event) => {
    const code = event.keyCode || event.which
    const escKeyCode = 27
    if (code === escKeyCode) return this.setState({ title: '' })
  }

  onUploadPhoto = (icon) => {
    this.props.updateChat(this.props.group.chatId, { icon })
    this.setState({ uploadingPhoto: false })
  }

  exitOrDeleteGroup = () => {
    this.setState({ exitingGroup: false })
    const isGroupOwner = this.props.group.owners.length && this.props.group.owners.includes(this.props.userId)
    if (!isGroupOwner) return this.props.exitGroup(this.props.group.chatId)
    return this.props.deleteChat(this.props.group.chatId)
  }

  renderGroupMemberOptions() {
    if (!this.state.showingMembers) return null
    return (
      <div className='chat-group-members-container'>
        <GroupMemberOptions
          userId={this.props.userId}
          group={this.props.group}
          groupContacts={this.props.groupContacts}
          expireLink={(uuid) => this.props.updateLink(this.props.group.chatId, uuid, undefined, true)}
          onClose={() => this.setState({ showingMembers: false })}
        />
      </div>
    )
  }

  renderGroupLinkOptions() {
    if (!this.state.showingLinks) return null
    return (
      <div className='chat-group-links-container'>
        <GroupLinkOptions
          userId={this.props.userId}
          group={this.props.group}
          updateLink={this.props.updateLink}
          onClose={() => this.setState({ showingLinks: false })}
        />
      </div>
    )
  }

  render() {
    const mainLink = window.location.protocol + '//' + window.location.host + '/link/' + this.props.group.links[0].uuid
    const isGroupOwner = this.props.group.owners.length && this.props.group.owners.includes(this.props.userId)
    const isGroupModerator = this.props.group.moderators.length && this.props.group.moderators.includes(this.props.userId)
    const canShareLink = !this.props.group.isPrivate || isGroupModerator || isGroupOwner
    const inactiveStyle = 'chat-component-options-option-inactive'
    return (
      <div className='chat-component-options-container'>
        <FileOpenModal
          bOpen={this.state.uploadingPhoto}
          callbackClose={() => this.setState({ uploadingPhoto: false })}
          callbackConfirm={this.onUploadPhoto}
        />

        {this.renderGroupMemberOptions()}
        {this.renderGroupLinkOptions()}

        {isGroupModerator && (
          <div className='chat-component-options-row'>
            <div
              className='chat-component-options-group-icon clickable'
              style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_icon')})` }}
              onClick={() => this.setState({ uploadingPhoto: true })}
            />

            <div className='chat-component-group-title-input-container'>
              <input
                className='chat-component-group-title-input'
                placeholder={'Type in new group name'}
                value={this.state.title}
                onKeyPress={this.onKeyPress}
                onKeyDown={this.onKeyDown}
                onChange={(event) => this.setState({ title: event.target.value, titleError: false })}></input>
            </div>

            <div
              className={`chat-component-group-button clickable ${!this.state.title.trim() && inactiveStyle}`}
              onClick={() => this.onSaveTitle()}>
              save
            </div>
          </div>
        )}

        <div className='chat-component-group-content-divider' />

        <div className='chat-component-options-row'>
          <div
            className={`chat-component-options-option clickable ${!this.props.messages.length && inactiveStyle}`}
            onClick={() =>
              showMessengerAlert(
                'Are you sure you wish to clear your chat history?',
                () => this.props.clearChat(this.props.group.chatId),
                null,
                'Yes'
              )
            }>
            <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_delete')})` }} />
            clear
          </div>

          <div
            className={`chat-component-options-option clickable ${this.props.group.muted && inactiveStyle}`}
            onClick={() => this.props.updateChat(this.props.group.chatId, { muted: !this.props.group.muted })}>
            <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_mute')})` }} />
            {this.props.group.muted ? 'unmute' : 'mute'}
          </div>
        </div>

        <div
          className={`chat-component-options-option clickable`}
          onClick={() => this.setState((previous) => ({ showingMembers: !previous.showingMembers }))}>
          <div className='chat-component-options-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_members')})` }} />
          {isGroupModerator ? 'manage group members' : 'check group members'}
        </div>

        <div className='chat-component-group-content-divider' />

        {canShareLink && <p className='chat-component-group-hint'>Share this link below to invite your friends</p>}
        {canShareLink && (
          <div className='chat-component-options-row'>
            <div className='chat-component-group-title-link-container'>
              <div className='chat-component-group-title-link'>{mainLink}</div>
            </div>

            <div
              className={`chat-component-group-button chat-component-group-button-smaller clickable`}
              onClick={() => this.setState((previous) => ({ showingLinks: !previous.showingLinks }))}>
              edit
            </div>

            <div
              className={`chat-component-group-button chat-component-group-button-smaller clickable`}
              onClick={() => copyToClipboard(mainLink)}>
              copy
            </div>
          </div>
        )}

        <div className='chat-component-group-content-divider' />

        {isGroupModerator && (
          <div className='chat-component-options-toggle'>
            Make it Private
            <WithTooltip position={{ bottom: '-6px', left: '58px' }} text={'Only moderators and owners can invite to this group.'}>
              <ToggleButton
                value={this.props.group.isPrivate || false}
                onToggle={(isPrivate) => this.props.updateChat(this.props.group.chatId, { isPrivate: !isPrivate })}
              />
            </WithTooltip>
          </div>
        )}

        {isGroupModerator && (
          <div className='chat-component-options-toggle'>
            Self destruct mode
            <WithTooltip
              position={{ bottom: '-6px', left: '58px' }}
              text={'Kaboom! When activated, messages\nwill only remain for 24 hours'}>
              <ToggleButton
                value={this.props.group.selfDestruct || false}
                onToggle={(selfDestruct) => this.props.updateChat(this.props.group.chatId, { selfDestruct: !selfDestruct })}
              />
            </WithTooltip>
          </div>
        )}

        <div
          className={`chat-component-options-option clickable chat-component-options-option-warning`}
          onClick={() => this.setState({ exitingGroup: true })}>
          {isGroupOwner ? 'delete group' : 'leave group'}
        </div>

        <Popup
          show={this.state.exitingGroup}
          position={{ bottom: '48px', left: '-12px' }}
          header={`Are you sure you want to ${isGroupOwner ? 'delete' : 'leave'} this group?`}
          confirmAction={this.exitOrDeleteGroup}
          denyAction={() => this.setState({ exitingGroup: false })}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    updateLink: (chatId, uuid, expiry, expire) => dispatch(updateLinkAction(chatId, uuid, expiry, expire)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    exitGroup: (chatId) => dispatch(exitGroupAction(chatId)),
    deleteChat: (chatId) => dispatch(deleteChatAction(chatId)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(GroupOptions)
