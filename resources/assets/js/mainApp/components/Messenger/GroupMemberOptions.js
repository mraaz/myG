
import React from 'react';
import { connect } from 'react-redux';

import { addContactsToChatAction, updateChatAction, clearChatAction, deleteChatAction, exitGroupAction, removeFromGroupAction } from '../../../redux/actions/chatAction';
import { addAsFriendAction, fetchFriendRequestsAction } from '../../../redux/actions/userAction';

class GroupMemberOptions extends React.PureComponent {

  state = {
    ownerInput: '',
    friendRequests: [],
  }

  componentDidMount() {
    this.props.fetchFriendRequests();
  }

  onAddFriendRequest = (contactId) => {
    this.setState(previous => ({ friendRequests: [...previous.friendRequests, contactId] }));
    this.props.addAsFriend(contactId);
  }

  renderMembers = (isGroupOwner) => {
    return (
      <div className="chat-group-member-list-container">
        {this.props.groupContacts.map(contact => this.renderMember(contact, isGroupOwner))}
      </div>
    );
  }

  renderMember = (contact, isGroupOwner) => {
    const isAdded = this.props.contacts.map(contact => contact.contactId).includes(contact.contactId);
    const isRequested = this.props.friendRequests.includes(contact.contactId) || this.state.friendRequests.includes(contact.contactId);
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
          {isGroupOwner && (
            <div
              className="chat-group-options-option-icon clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_group_moderator.svg)`, filter: `contrast(0)` }}
              onClick={() => console.log(`Make Moderator: ${contact.contactId}`)}
            />
          )}
          {isGroupOwner && (
            <div
              className="chat-group-options-option-icon clickable"
              style={{ backgroundImage: `url(/assets/svg/ic_chat_group_remove.svg)`, filter: `contrast(0)` }}
              onClick={() => this.props.removeFromGroup(this.props.group.chatId, contact.contactId)}
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
    return (
      <div className="chat-group-ownership">
        <p className="chat-group-ownership-hint">Set a new group owner</p>
        <div className="chat-group-ownership-input-row">
          <div className="chat-group-ownership-input-hint">Find</div>
          <div className="chat-group-ownership-dropdown-container">

          </div>
          <div className="chat-group-ownership-input-container">
            <input
              className="chat-group-ownership-input"
              placeholder={"Type member alias"}
              value={this.state.ownerInput}
              onChange={event => this.setState({ ownerInput: event.target.value })}
            >
            </input>
          </div>
          <div className={`chat-component-group-button clickable`}
            onClick={() => console.log('save')}
          >
            save
          </div>
        </div>
      </div>
    );
  }

  render() {
    const isGroupOwner = this.props.group.owners.length && this.props.group.owners.includes(this.props.userId);
    return (
      <div className="chat-group-members">
        <p className="chat-group-members-header">Group members</p>
        {this.renderMembers(isGroupOwner)}
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
    deleteChat: (chatId) => dispatch(deleteChatAction(chatId)),
    removeFromGroup: (chatId, userId) => dispatch(removeFromGroupAction(chatId, userId)),
    exitGroup: (chatId) => dispatch(exitGroupAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberOptions);
