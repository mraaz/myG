
import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '../Dropdown';
import Popup from '../Popup';
import { addContactsToChatAction, updateChatAction, clearChatAction, exitGroupAction, removeFromGroupAction } from '../../../redux/actions/chatAction';
import { addAsFriendAction, fetchFriendRequestsAction } from '../../../redux/actions/userAction';

class GroupMemberOptions extends React.PureComponent {

  state = {
    ownerInput: '',
    validOwner: false,
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

  kickUser = () => {
    this.props.removeFromGroup(this.props.group.chatId, this.state.kickingUser.contactId);
    this.setState({ kickingUser: false });
  }

  renderMembers = (isGroupModerator) => {
    return (
      <div className="chat-group-member-list-container">
        {this.props.groupContacts.map(contact => this.renderMember(contact, isGroupModerator))}
      </div>
    );
  }

  renderMember = (contact, isGroupModerator) => {
    const isAdded = this.props.contacts.map(contact => contact.contactId).includes(contact.contactId);
    const isRequested = this.props.friendRequests.includes(contact.contactId) || this.state.friendRequests.includes(contact.contactId);
    const isContactOwner = this.props.group.owners.length && this.props.group.owners.includes(contact.contactId);
    const isContactModerator = this.props.group.moderators.length && this.props.group.moderators.includes(contact.contactId);
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
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)`, filter: `contrast(0)` }}
            onClick={() => console.log(`Block User: ${contact.contactId}`)}
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
              placeholder={"Search for members"}
              value={this.state.ownerInput}
              onChange={event => this.setState({ ownerInput: event.target.value, validOwner: false, settingAsOwner: false })}
            >
            </input>
            <Dropdown
              show={this.state.ownerInput && !this.state.validOwner}
              position={{ top: '-12px', zIndex: '-1' }}
              items={matchingContacts}
              onItemClick={item => this.setState({ ownerInput: item, validOwner: true })}
              emptyMessage={"no members found"}
            />
          </div>
          <div className={`chat-component-group-button clickable ${!this.state.validOwner && 'chat-component-group-button-inactive'}`}
            onClick={() => this.setState({ settingAsOwner: true })}
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
        <p className="chat-group-members-header">Group members</p>
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
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    fetchFriendRequests: () => dispatch(fetchFriendRequestsAction()),
    addAsFriend: (friendId) => dispatch(addAsFriendAction(friendId)),
    addContactsToChat: (userId, chatId, contacts) => dispatch(addContactsToChatAction(userId, chatId, contacts)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    removeFromGroup: (chatId, userId) => dispatch(removeFromGroupAction(chatId, userId)),
    exitGroup: (chatId) => dispatch(exitGroupAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberOptions);
