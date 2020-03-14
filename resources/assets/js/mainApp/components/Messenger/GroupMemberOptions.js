
import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '../Dropdown';
import Popup from '../Popup';
import { addContactsToChatAction, inviteUserToGroupAction, updateChatAction, clearChatAction, removeFromGroupAction } from '../../../redux/actions/chatAction';
import { searchUsersAction, addAsFriendAction, fetchFriendRequestsAction } from '../../../redux/actions/userAction';

class GroupMemberOptions extends React.PureComponent {

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
    this.props.fetchFriendRequests();
  }

  onAddFriendRequest = (contactId) => {
    this.setState(previous => ({ friendRequests: [...previous.friendRequests, contactId] }));
    this.props.addAsFriend(contactId);
  }

  changeOwnership = () => {
    this.setState({ settingAsOwner: false });
    const contactId = this.props.groupContacts.find(contact => contact.name === this.state.ownerInput).contactId;
    const owners = this.props.group.owners;
    const moderators = this.props.group.moderators;
    if (moderators.indexOf(contactId) === -1) moderators.push(contactId);
    owners.splice(owners.indexOf(this.props.userId), 1);
    owners.push(contactId);
    this.props.updateChat(this.props.group.chatId, { owners });
    this.props.updateChat(this.props.group.chatId, { moderators });
  }

  toggleModerator = (contactId) => {
    const moderators = this.props.group.moderators;
    if (moderators.indexOf(contactId) !== -1) moderators.splice(moderators.indexOf(contactId), 1);
    else moderators.push(contactId);
    this.props.updateChat(this.props.group.chatId, { moderators });
  }

  toggleUserBlock = (contactId) => {
    const blockedUsers = this.props.group.blockedUsers;
    if (blockedUsers.indexOf(contactId) !== -1) blockedUsers.splice(blockedUsers.indexOf(contactId), 1);
    else blockedUsers.push(contactId);
    this.props.updateChat(this.props.group.chatId, { blockedUsers });
  }

  kickUser = () => {
    this.props.removeFromGroup(this.props.group.chatId, this.state.kickingUser.contactId);
    this.setState({ kickingUser: false });
  }

  onUserSearchRequest(input) {
    if (input.length >= 2) this.props.searchUsers(input);
    this.setState({ inviteInput: input, validInvite: false });
  }

  inviteUser = () => {
    if (!this.state.validInvite) return;
    const contact = this.props.foundUsers.find(contact => contact.name === this.state.inviteInput);
    const isFriend = this.props.contacts.find(friend => friend.contactId === contact.contactId);
    if (isFriend) this.props.addContactsToChat(this.props.userId, this.props.group.chatId, [contact.contactId], contact.publicKey, this.props.group.privateKey, this.props.userPrivateKey);
    else this.props.inviteUserToGroup(this.props.userId, this.props.group.chatId, contact.contactId, contact.publicKey, this.props.group.privateKey, this.props.userPrivateKey);
    this.setState({ inviteInput: '', validInvite: false });
  }

  renderHeader = () => {
    return (
      <div className="chat-group-members-header">
        <p className="chat-group-members-header-title">Group members</p>
        <div className="chat-group-members-header-close-button clickable"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
          onClick={() => this.props.onClose()}
        />
      </div>
    );
  }

  renderMembers = (isGroupModerator) => {
    return (
      <div className="chat-group-member-list-container">
        {this.props.groupContacts.map(contact => this.renderMember(contact, isGroupModerator))}
        {this.props.group.guests.map(this.renderGuest)}
      </div>
    );
  }

  renderMember = (contact, isGroupModerator) => {
    const isAdded = this.props.contacts.map(contact => contact.contactId).includes(contact.contactId);
    const isRequested = this.props.friendRequests.includes(contact.contactId) || this.state.friendRequests.includes(contact.contactId);
    const isContactOwner = this.props.group.owners.length && this.props.group.owners.includes(contact.contactId);
    const isContactModerator = this.props.group.moderators.length && this.props.group.moderators.includes(contact.contactId);
    const isContactBlocked = this.props.group.blockedUsers.length && this.props.group.blockedUsers.includes(contact.contactId);
    return (
      <div key={contact.contactId} className="chat-group-member">
        <div className="chat-group-member-info">
          <div
            className="chat-group-member-icon"
            style={{ backgroundImage: `url('${contact.icon}')` }}
          >
            <div className={`chat-component-header-status-indicator-static chat-component-header-status-indicator-${contact.status}`} />
          </div>
          <div className="chat-group-member-name">{contact.name}</div>
        </div>
        <div className="chat-group-member-buttons">
          {isGroupModerator && !isContactOwner && (
            <div
              className="chat-group-options-option-icon clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_group_${isContactModerator ? 'moderator' : 'not_moderator'}.svg)`, filter: `contrast(0)` }}
              onClick={() => this.toggleModerator(contact.contactId)}
            />
          )}
          {isGroupModerator && !isContactOwner && (
            <div
              className="chat-group-options-option-icon clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_group_remove.svg)`, filter: `contrast(0)` }}
              onClick={() => this.setState({ kickingUser: contact })}
            />
          )}
          <div
            className="chat-group-options-option-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)`, filter: `contrast(${isContactBlocked ? '1' : '0'})` }}
            onClick={() => this.toggleUserBlock(contact.contactId)}
          />
          {!isAdded && !isRequested && (
            <div className="chat-group-member-add-button clickable"
              onClick={() => this.onAddFriendRequest(contact.contactId)}
            >
              add friend
          </div>
          )}
          {!isAdded && isRequested && (
            <div className="chat-group-member-added-button">
              request sent
            </div>
          )}
        </div>
      </div>
    );
  }

  renderGuest = (guestId) => {
    const guestAlias = `Guest #${guestId}`;
    return (
      <div key={guestAlias} className="chat-group-member">
        <div className="chat-group-member-info">
          <div
            className="chat-group-guest-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_guest_icon.svg)` }}
          />
          <div className="chat-group-member-name">{guestAlias}</div>
        </div>
        <div className="chat-group-member-buttons">
          <div
            className="chat-group-options-option-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_group_remove.svg)`, filter: `contrast(0)` }}
            onClick={() => this.setState({ kickingUser: { contactId: guestId, name: guestAlias } })}
          />
        </div>
      </div>
    );
  }

  renderGroupInvitation(isGroupModerator) {
    if (!isGroupModerator) return null;
    const contactIds = this.props.groupContacts.map(contact => contact.contactId);
    return (
      <div className="chat-group-ownership">
        <div className="chat-group-ownership-input-row">
          <div className="chat-group-ownership-input-hint">Invite</div>
          <div className="chat-group-ownership-input-container">
            <input
              className="chat-group-ownership-input"
              placeholder={"Find new group member"}
              value={this.state.inviteInput}
              onChange={event => this.onUserSearchRequest(event.target.value)}
            >
            </input>
            <Dropdown
              show={this.state.inviteInput && !this.state.validInvite}
              position={{ top: '-6px' }}
              items={this.props.foundUsers.filter(contact => !contactIds.includes(contact.contactId)).map(contact => contact.name)}
              onItemClick={item => this.setState({ inviteInput: item, validInvite: true })}
              emptyMessage={"no users found"}
            />
          </div>
          <div className={`chat-component-group-button clickable ${!this.state.validInvite && 'chat-component-group-button-inactive'}`}
            onClick={() => this.inviteUser()}
          >
            add
          </div>
        </div>
      </div>
    );
  }

  renderGroupOwnership(isGroupOwner) {
    if (!isGroupOwner) return null;
    const matchingContacts = this.props.groupContacts
      .filter(contact => contact.name.toLowerCase().includes(this.state.ownerInput.toLowerCase()))
      .map(contact => contact.name);
    return (
      <div className="chat-group-ownership">
        <p className="chat-group-ownership-hint">Set a new group owner</p>
        <div className="chat-group-ownership-input-row">
          <div className="chat-group-ownership-input-hint">Find</div>
          <div className="chat-group-ownership-input-container">
            <input
              className="chat-group-ownership-input"
              placeholder={"Assign new owner"}
              value={this.state.ownerInput}
              onChange={event => this.setState({ ownerInput: event.target.value, validOwner: false, settingAsOwner: false })}
            >
            </input>
            <Dropdown
              show={this.state.ownerInput && !this.state.validOwner}
              position={{ top: '-6px' }}
              items={matchingContacts}
              onItemClick={item => this.setState({ ownerInput: item, validOwner: true })}
              emptyMessage={"no members found"}
            />
          </div>
          <div className={`chat-component-group-button clickable ${!this.state.validOwner && 'chat-component-group-button-inactive'}`}
            onClick={() => this.state.validOwner && this.setState({ settingAsOwner: true })}
          >
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
    );
  }

  render() {
    const isGroupOwner = this.props.group.owners.length && this.props.group.owners.includes(this.props.userId);
    const isGroupModerator = this.props.group.moderators.length && this.props.group.moderators.includes(this.props.userId);
    return (
      <div className="chat-group-members">
        <Popup
          show={this.state.kickingUser}
          position={{ bottom: '20px', left: '30px' }}
          header={`Are you sure you want to kick ${this.state.kickingUser && this.state.kickingUser.name}?`}
          confirmAction={this.kickUser}
          denyAction={() => this.setState({ kickingUser: false })}
        />
        {this.renderHeader()}
        {this.renderGroupInvitation(isGroupModerator)}
        {this.renderMembers(isGroupModerator)}
        {this.renderGroupOwnership(isGroupOwner)}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    contacts: state.user.contacts || [],
    friendRequests: state.user.friendRequests || [],
    foundUsers: state.user.foundUsers || [],
    userPrivateKey: state.encryption.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    searchUsers: (input) => dispatch(searchUsersAction(input)),
    fetchFriendRequests: () => dispatch(fetchFriendRequestsAction()),
    addAsFriend: (friendId) => dispatch(addAsFriendAction(friendId)),
    addContactsToChat: (userId, chatId, contacts, publicKey, privateKey, userPrivateKey) => dispatch(addContactsToChatAction(userId, chatId, contacts, publicKey, privateKey, userPrivateKey)),
    inviteUserToGroup: (userId, chatId, contactId, publicKey, privateKey, userPrivateKey) => dispatch(inviteUserToGroupAction(userId, chatId, contactId, publicKey, privateKey, userPrivateKey)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    removeFromGroup: (chatId, userId) => dispatch(removeFromGroupAction(chatId, userId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberOptions);
