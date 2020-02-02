
import React from 'react';
import { connect } from 'react-redux';

import GroupInvitation from './GroupInvitation';

import { addContactsToChatAction, updateChatAction, clearChatAction, deleteChatAction } from '../../../redux/actions/chatAction';
import { addAsFriendAction } from '../../../redux/actions/userAction';

class GroupOptions extends React.PureComponent {

  state = {
    invitingToGroup: false,
    editingTitle: false,
    titleInput: '',
    friendRequests: [],
  }

  onAddFriendRequest = (contactId) => {
    this.setState(previous => ({ friendRequests: [...previous.friendRequests, contactId] }));
    this.props.addAsFriend(contactId);
  }

  onTitleChange = () => {
    this.setState({ editingTitle: false });
    console.log(`Setting Group Name to ${titleInput}`);
  }

  onInvitation = (contacts) => {
    this.setState({ invitingToGroup: false })
    if (!contacts || !contacts.length) return;
    this.props.addContactsToChat(this.props.userId, this.props.group.chatId, contacts);
  }

  renderGroupHeader = () => {
    return (
      <div className="chat-group-options-header-container">
        {this.renderGroupInfo()}
        {this.renderGroupOptions()}
      </div>
    );
  }

  renderGroupInfo = () => {
    return (
      <div className="chat-group-options-header-info-container">
        <div
          className="chat-group-options-header-info-group-icon"
          style={{ backgroundImage: `url('${this.props.group.icon}')` }}
        />
        <div>
          {this.state.editingTitle ?
            (
              <div>
                <input
                  className="chat-group-options-header-info-name-input"
                  placeholder={"Group Name"}
                  value={this.state.titleInput}
                  autoFocus={true}
                  onChange={event => this.setState({ titleInput: event.target.value })}
                  onKeyDown={event =>
                    event.keyCode === 13 && this.onTitleChange() ||
                    event.keyCode === 27 && this.setState({ editingTitle: false })
                  }
                >
                </input>
              </div>
            ) :
            (
              <div className="chat-group-options-header-info-name-container">
                <div className="chat-group-options-header-info-name">{this.props.group.title}</div>
                <div className="chat-group-options-header-info-name-button"
                  style={{ backgroundImage: `url(/assets/svg/ic_chat_group_edit.svg)` }}
                  onClick={() => this.setState({ editingTitle: true, titleInput: this.props.group.title })}
                />
              </div>
            )
          }
        </div>
      </div >
    );
  }

  renderGroupOptions = () => {
    const inactiveStyle = 'chat-group-options-header-options-option-inactive';
    return (
      <div className="chat-group-options-header-options-container">

        <div
          className={`chat-group-options-header-options-option clickable`}
          onClick={() => {
            console.log(`Edit Icon`);
          }}
        >
          <div
            className="chat-group-options-header-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_group_edit.svg)` }}
          />
          edit icon
        </div>

        <div
          className={`chat-group-options-header-options-option clickable ${this.props.group.muted && inactiveStyle}`}
          onClick={() => this.props.updateChat(this.props.group.chatId, { muted: !this.props.group.muted })}
        >
          <div
            className="chat-group-options-header-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)` }}
          />
          {this.props.group.muted ? 'unmute group' : 'mute group'}
        </div>

        <div
          className={`chat-group-options-header-options-option clickable ${!this.props.group.messages.length && inactiveStyle}`}
          onClick={() => this.props.clearChat(this.props.group.chatId)}
        >
          <div
            className="chat-group-options-header-options-option-icon"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_delete.svg)` }}
          />
          clear messages
        </div>

      </div>
    );
  }

  renderContactsInfo = () => {
    return (
      <div className="chat-group-options-contacts-container">
        {this.props.groupContacts.map(this.renderContact)}
      </div>
    );
  }

  renderContact = (contact) => {
    const isAdded = this.props.contacts.map(contact => contact.contactId).includes(contact.contactId);
    const isRequested = this.state.friendRequests.includes(contact.contactId);
    return (
      <div key={contact.contactId} className="chat-group-options-contact">
        <div className="chat-group-options-contact-info">
          <div
            className="chat-group-options-contact-icon"
            style={{ backgroundImage: `url('${contact.icon}')` }}
          >
            <div className={`chat-component-header-status-indicator-static chat-component-header-status-indicator-${contact.status}`} />
          </div>
          <div className="chat-group-options-contact-name">{contact.name}</div>
        </div>
        <div className="chat-group-options-contact-buttons">
          <div
            className="chat-group-options-option-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_group_remove.svg)`, filter: `contrast(1)` }}
            onClick={() => console.log(`Remove From Group: ${contact.contactId}`)}
          />
          <div
            className="chat-group-options-option-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_mute.svg)`, filter: `contrast(0)` }}
            onClick={() => console.log(`Mute User: ${contact.contactId}`)}
          />
          <div
            className="chat-group-options-option-icon clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_block.svg)`, filter: `contrast(0)` }}
            onClick={() => console.log(`Block User: ${contact.contactId}`)}
          />
          {!isAdded && !isRequested && (
            <div className="chat-group-options-contact-add-button clickable"
              onClick={() => this.onAddFriendRequest(contact.contactId)}
            >
              add friend
          </div>
          )}
          {!isAdded && isRequested && (
            <div className="chat-group-options-contact-added-button">
              request sent
            </div>
          )}
        </div>
      </div>
    );
  }

  renderGroupFooter = () => {
    if (!this.props.group.owners.includes(this.props.userId)) return null;
    return (
      <div className="chat-group-options-footer">
        <div className="chat-group-delete-button clickable"
          onClick={() => this.props.deleteChat(this.props.group.chatId)}
        >
          Delete Group
        </div>
        <div className="chat-group-invite-button clickable"
          onClick={() => this.setState({ invitingToGroup: true })}
        >
          Invite to Group
        </div>
      </div>
    );
  }

  renderInviteWindow = () => {
    if (!this.state.invitingToGroup) return;
    return (
      <GroupInvitation
        group={this.props.group}
        onCancel={() => this.setState({ invitingToGroup: false })}
        onInvite={this.onInvitation}
      />
    );
  }

  render() {
    return (
      <div className="chat-group-options-container">
        {this.renderGroupHeader()}
        {this.renderContactsInfo()}
        {this.renderGroupFooter()}
        {this.renderInviteWindow()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    contacts: state.user.contacts,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    addAsFriend: (friendId) => dispatch(addAsFriendAction(friendId)),
    addContactsToChat: (userId, chatId, contacts) => dispatch(addContactsToChatAction(userId, chatId, contacts)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    deleteChat: (chatId) => dispatch(deleteChatAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupOptions);
