import React from 'react'
import { connect } from 'react-redux'

import notifyToast from '../../../common/toast'
import Dropdown from '../Dropdown'
import Popup from '../Popup'
import {
  addContactsToChatAction,
  inviteUserToGroupAction,
  updateChatAction,
  clearChatAction,
  removeFromGroupAction,
  blockUserAction,
  unblockUserAction,
} from '../../../redux/actions/chatAction'
import { searchUsersAction, addAsFriendAction, fetchFriendRequestsAction } from '../../../redux/actions/userAction'
import { getAssetUrl } from '../../../common/assets'
import { showMessengerAlert } from '../../../common/alert'
import { ignoreFunctions } from '../../../common/render'

class GroupMemberOptions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    ownerInput: '',
    inviteInput: '',
    validOwner: false,
    validInvite: false,
    settingAsOwner: false,
    kickingUser: false,
    friendRequests: [],
  }

  componentDidMount() {
    this.props.fetchFriendRequests()
  }

  onAddFriendRequest = (contactId) => {
    this.setState((previous) => ({ friendRequests: [...previous.friendRequests, contactId] }))
    this.props.addAsFriend(contactId)
  }

  changeOwnership = () => {
    this.setState({ settingAsOwner: false })
    const contactId = this.props.groupContacts.find((contact) => contact.name === this.state.ownerInput).contactId
    const owners = this.props.group.owners
    const moderators = this.props.group.moderators
    if (moderators.indexOf(contactId) === -1) moderators.push(contactId)
    owners.splice(owners.indexOf(this.props.userId), 1)
    owners.push(contactId)
    this.props.updateChat(this.props.group.chatId, { owners })
    this.props.updateChat(this.props.group.chatId, { moderators })
    const contact = this.props.groupContacts.find((contact) => contact.contactId === contactId) || {}
    if (contact.name) notifyToast(`You have given this chat's ownership to ${contact.name}.`)
  }

  toggleModerator = (contactId) => {
    const moderators = this.props.group.moderators
    const contact = this.props.groupContacts.find((contact) => contact.contactId === contactId) || {}
    if (contact.name)
      notifyToast(
        `You have ${moderators.indexOf(contactId) !== -1 ? 'removed' : 'given'} Moderator Rights ${
          moderators.indexOf(contactId) !== -1 ? 'from' : 'to'
        } ${contact.name}.`
      )
    if (moderators.indexOf(contactId) !== -1) moderators.splice(moderators.indexOf(contactId), 1)
    else moderators.push(contactId)
    this.props.updateChat(this.props.group.chatId, { moderators })
  }

  toggleUserBlock = (contactId) => {
    const blockedUsers = this.props.blockedUsers.map((user) => user.userId)
    const contact = this.props.groupContacts.find((contact) => contact.contactId === contactId) || {}
    if (contact.name) notifyToast(`You have ${blockedUsers.indexOf(contactId) !== -1 ? 'Unblocked' : 'Blocked'} ${contact.name}.`)
    if (blockedUsers.indexOf(contactId) !== -1) this.props.unblockUser(contactId)
    else this.props.blockUser(contactId)
  }

  kickUser = () => {
    const contact = this.props.groupContacts.find((contact) => contact.contactId === this.state.kickingUser.contactId) || {}
    if (contact.name) notifyToast(`You have kicked ${contact.name}.`)
    this.props.removeFromGroup(this.props.group.chatId, this.state.kickingUser.contactId).then((response) => {
      const guest = response.value
      if (!guest.uuid) return
      const link = window.location.protocol + '//' + window.location.host + '/link/' + guest.uuid
      showMessengerAlert(
        `This Guest has joined through a link, do you wish to expire this link (${link})?`,
        () => {
          this.props.expireLink(guest.uuid)
        },
        null,
        'Yes'
      )
    })
    this.setState({ kickingUser: false })
  }

  onUserSearchRequest(input) {
    if (input.length >= 2) this.props.searchUsers(input)
    this.setState({ inviteInput: input, validInvite: false })
  }

  inviteUser = () => {
    if (!this.state.validInvite) return
    const contact = this.props.foundUsers.find((contact) => contact.name === this.state.inviteInput)
    const isFriend = this.props.contacts.find((friend) => friend.contactId === contact.contactId)
    if (isFriend)
      this.props.addContactsToChat(
        this.props.userId,
        this.props.group.chatId,
        [contact.contactId],
        contact.publicKey,
        this.props.group.privateKey,
        this.props.userPrivateKey
      )
    else
      this.props.inviteUserToGroup(
        this.props.userId,
        this.props.group.chatId,
        contact.contactId,
        contact.publicKey,
        this.props.group.privateKey,
        this.props.userPrivateKey
      )
    this.setState({ inviteInput: '', validInvite: false })
    if (contact.name) notifyToast(`You have invited ${contact.name} to this chat.`)
  }

  renderHeader = () => {
    return (
      <div className='chat-group-members-header'>
        <p className='chat-group-members-header-title'>Group members</p>
        <div
          className='chat-group-members-header-close-button clickable'
          style={{ backgroundImage: `url(${getAssetUrl('ic_chat_close')})` }}
          onClick={() => this.props.onClose()}
        />
      </div>
    )
  }

  renderTableHeader = () => {
    return (
      <div className='chat-group-table-header'>
        <div className='chat-group-table-header-info'>Gamers</div>
        <div className='chat-group-table-header-info'>Role</div>
      </div>
    )
  }

  renderMembers = (isGroupModerator) => {
    return (
      <div className='chat-group-member-list-container'>
        {this.props.groupContacts.map((contact) => this.renderMember(contact, isGroupModerator, false, null))}
        {this.props.group.guests.map((guestId) => this.renderMember({}, isGroupModerator, true, guestId))}
      </div>
    )
  }

  renderMember = (contact, isGroupModerator, isGuest, guestId) => {
    const guestAlias = `Guest #${guestId}`
    const isAdded = this.props.contacts.map((contact) => contact.contactId).includes(contact.contactId)
    const isRequested = this.props.friendRequests.includes(contact.contactId) || this.state.friendRequests.includes(contact.contactId)
    const isContactOwner = this.props.group.owners.length && this.props.group.owners.includes(contact.contactId)
    const isContactModerator = this.props.group.moderators.length && this.props.group.moderators.includes(contact.contactId)
    const isContactBlocked =
      this.props.blockedUsers.length && this.props.blockedUsers.map((user) => user.userId).includes(contact.contactId)
    return (
      <div key={contact.contactId} className='chat-group-member'>
        {this.renderMemberInfo(isGuest ? getAssetUrl('ic_guest_icon') : contact.icon, isGuest ? guestAlias : contact.name)}
        <div className='chat-group-member-buttons'>
          <div className='chat-group-member-button'>
            {this.renderMemberRole(contact.contactId, isGroupModerator, isContactOwner, isContactModerator, isGuest)}
          </div>
          <div className='chat-group-member-button-divider' />
          <div className='chat-group-member-button'>{this.renderBlockButton(contact.contactId, isContactBlocked, isGuest)}</div>
          <div className='chat-group-member-button-divider' />
          <div className='chat-group-member-button'>
            {this.renderKickButton(
              { contactId: isGuest ? guestId : contact.contactId, name: isGuest ? guestAlias : contact.name },
              isGroupModerator
            )}
          </div>
          <div className='chat-group-member-button-divider' />
          <div className='chat-group-member-button'>{this.renderFriendButton(contact.contactId, isAdded, isRequested, isGuest)}</div>
        </div>
      </div>
    )
  }

  renderMemberInfo = (icon, name) => {
    return (
      <div className='chat-group-member-info'>
        <div className='chat-group-guest-icon' style={{ backgroundImage: `url(${icon})` }} />
        <div className='chat-group-member-name'>{name}</div>
      </div>
    )
  }

  renderMemberRole = (contactId, canChangeRights, isOwner, isModerator, isGuest) => {
    if (isOwner) {
      return <div className='chat-group-member-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_owner')})` }} />
    }
    if (isModerator) {
      return (
        <div
          className={`chat-group-member-option-icon ${canChangeRights ? 'clickable' : ''}`}
          style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_moderator')})` }}
          onClick={() => canChangeRights && this.toggleModerator(contactId)}
        />
      )
    }
    if (isGuest) {
      return <div className='chat-group-member-option-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_guest_icon')})` }} />
    }
    return (
      <div
        className={`chat-group-member-option-icon ${canChangeRights ? 'clickable' : ''}`}
        style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_member')})` }}
        onClick={() => canChangeRights && this.toggleModerator(contactId)}
      />
    )
  }

  renderBlockButton = (contactId, isContactBlocked, isGuest) => {
    return (
      <div
        className={`chat-group-member-option-icon ${isGuest ? 'gray-scaled' : 'clickable'}`}
        style={{ backgroundImage: `url(${getAssetUrl(`ic_chat_group_${isContactBlocked ? 'muted' : 'unmuted'}`)})` }}
        onClick={() => !isGuest && this.toggleUserBlock(contactId)}
      />
    )
  }

  renderKickButton = (contact, canKick) => {
    return (
      <div
        className={`chat-group-member-${canKick ? 'kick' : 'unkickable'}-button ${canKick ? 'clickable' : ''}`}
        onClick={() => canKick && this.setState({ kickingUser: contact })}>
        expel
      </div>
    )
  }

  renderFriendButton = (contactId, isAdded, isRequested, isGuest) => {
    const canAddFriend = !isAdded && !isGuest && !isRequested
    return (
      <div
        className={`chat-group-member-${canAddFriend ? 'add' : 'added'}-button ${canAddFriend ? 'clickable' : ''}`}
        onClick={() => canAddFriend && this.onAddFriendRequest(contactId)}>
        {isAdded ? 'friend' : isRequested ? 'request sent' : isGuest ? 'guest' : 'add friend'}
      </div>
    )
  }

  renderGroupInvitation(isGroupModerator) {
    if (this.props.group.isPrivate && !isGroupModerator) return null
    const contactIds = this.props.groupContacts.map((contact) => contact.contactId)
    return (
      <div className='chat-group-ownership'>
        <div className='chat-group-ownership-input-row'>
          <div className='chat-group-ownership-input-hint'>Invite</div>
          <div className='chat-group-ownership-input-container'>
            <input
              className='chat-group-ownership-input'
              placeholder={'Find new group member'}
              value={this.state.inviteInput}
              onChange={(event) => this.onUserSearchRequest(event.target.value)}></input>
            <Dropdown
              show={this.state.inviteInput && !this.state.validInvite}
              position={{ top: '-6px' }}
              items={this.props.foundUsers.filter((contact) => !contactIds.includes(contact.contactId)).map((contact) => contact.name)}
              onItemClick={(item) => this.setState({ inviteInput: item, validInvite: true })}
              emptyMessage={'no users found'}
            />
          </div>
          <div
            className={`chat-component-group-button clickable ${!this.state.validInvite && 'chat-component-group-button-inactive'}`}
            onClick={() => this.inviteUser()}>
            add
          </div>
        </div>
      </div>
    )
  }

  renderGroupOwnership(isGroupOwner) {
    if (!isGroupOwner) return null
    const matchingContacts = this.props.groupContacts
      .filter((contact) => contact.name.toLowerCase().includes(this.state.ownerInput.toLowerCase()))
      .map((contact) => contact.name)
    return (
      <div className='chat-group-ownership'>
        <p className='chat-group-ownership-hint'>Set a new group owner</p>
        <div className='chat-group-ownership-input-row'>
          <div className='chat-group-ownership-input-hint'>Find</div>
          <div className='chat-group-ownership-input-container'>
            <input
              className='chat-group-ownership-input'
              placeholder={'Assign new owner'}
              value={this.state.ownerInput}
              onChange={(event) => this.setState({ ownerInput: event.target.value, validOwner: false, settingAsOwner: false })}></input>
            <Dropdown
              show={this.state.ownerInput && !this.state.validOwner}
              position={{ top: '-6px' }}
              items={matchingContacts}
              onItemClick={(item) => this.setState({ ownerInput: item, validOwner: true })}
              emptyMessage={'no members found'}
            />
          </div>
          <div
            className={`chat-component-group-button clickable ${!this.state.validOwner && 'chat-component-group-button-inactive'}`}
            onClick={() => this.state.validOwner && this.setState({ settingAsOwner: true })}>
            save
          </div>
        </div>
        <Popup
          show={this.state.settingAsOwner}
          position={{ top: 0, left: '-45px' }}
          header={`Are you sure you want to transfer the ownership to ${this.state.ownerInput}?`}
          footer={'* After the transfer you will be demoted to moderator'}
          confirmAction={this.changeOwnership}
          denyAction={() => this.setState({ settingAsOwner: false })}
        />
      </div>
    )
  }

  render() {
    const isGroupOwner = this.props.group.owners.length && this.props.group.owners.includes(this.props.userId)
    const isGroupModerator = this.props.group.moderators.length && this.props.group.moderators.includes(this.props.userId)
    return (
      <div className='chat-group-members'>
        <Popup
          show={this.state.kickingUser}
          position={{ bottom: '20px', left: '-50px' }}
          header={`Are you sure you want to kick ${this.state.kickingUser && this.state.kickingUser.name}?`}
          confirmAction={this.kickUser}
          denyAction={() => this.setState({ kickingUser: false })}
        />
        {this.renderHeader()}
        {this.renderGroupInvitation(isGroupOwner || isGroupModerator)}
        {this.renderTableHeader()}
        {this.renderMembers(isGroupOwner || isGroupModerator)}
        {this.renderGroupOwnership(isGroupOwner)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.user.contacts || [],
    friendRequests: state.user.friendRequests || [],
    foundUsers: state.user.foundUsers || [],
    blockedUsers: state.chat.blockedUsers || [],
    userPrivateKey: state.encryption.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchUsers: (input) => dispatch(searchUsersAction(input)),
    fetchFriendRequests: () => dispatch(fetchFriendRequestsAction()),
    addAsFriend: (friendId) => dispatch(addAsFriendAction(friendId)),
    addContactsToChat: (userId, chatId, contacts, publicKey, privateKey, userPrivateKey) =>
      dispatch(addContactsToChatAction(userId, chatId, contacts, publicKey, privateKey, userPrivateKey)),
    inviteUserToGroup: (userId, chatId, contactId, publicKey, privateKey, userPrivateKey) =>
      dispatch(inviteUserToGroupAction(userId, chatId, contactId, publicKey, privateKey, userPrivateKey)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    removeFromGroup: (chatId, userId) => dispatch(removeFromGroupAction(chatId, userId)),
    blockUser: (blockedUserId) => dispatch(blockUserAction(blockedUserId)),
    unblockUser: (blockedUserId) => dispatch(unblockUserAction(blockedUserId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberOptions)
