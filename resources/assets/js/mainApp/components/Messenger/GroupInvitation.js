
import React from 'react';
import { connect } from 'react-redux';

import { MAXIMUM_GROUP_SIZE } from './GroupCreation';

class GroupInvitation extends React.Component {

  state = {
    contactInput: '',
    matchingContacts: [],
    addedContacts: [],
  }

  onContactSearch = (name) => {
    const matchingContacts = this.props.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({ contactInput: name, matchingContacts });
  }

  onAddContact = (contact) => {
    if (this.state.addedContacts.length >= MAXIMUM_GROUP_SIZE) return;;
    this.setState(previous => ({ addedContacts: [...previous.addedContacts, contact.contactId] }));
  }

  renderInviteHint = () => {
    return (
      <div className="chat-group-creation-invite-hint-container">
        <p className="chat-group-creation-invite-hint">Invite</p>
        {this.renderContactLimitWarning()}
      </div>
    );
  }

  renderContactInput = () => {
    return (
      <div className="chat-group-creation-contact-input-container">
        <input
          className="chat-group-creation-contact-input"
          placeholder={"Gamer Name"}
          value={this.state.contactInput}
          onChange={event => this.onContactSearch(event.target.value)}
        >
        </input>
      </div>
    );
  }

  renderContacts = () => {
    const contacts = this.state.matchingContacts.length ? this.state.matchingContacts : this.props.contacts;
    return (
      <div className="chat-group-creation-contacts">
        {contacts.map(this.renderContact)}
      </div>
    );
  }

  renderContact = (contact) => {
    const isAdded = this.state.addedContacts.includes(contact.contactId) || this.props.group.contacts.includes(contact.contactId);
    return (
      <div key={contact.contactId} className="chat-group-creation-contact">
        <div className="chat-group-creation-contact-info">
          <div
            className="chat-group-creation-contact-icon"
            style={{ backgroundImage: `url('${contact.icon}')` }}
          />
          <div className="chat-group-creation-contact-name">{contact.name}</div>
        </div>
        {
          isAdded ?
            (
              <div className="chat-group-creation-contact-invite-button-inactive">
                Invited
              </div>

            ) :
            (
              <div className="chat-group-creation-contact-invite-button clickable"
                onClick={() => this.onAddContact(contact)}
              >
                Invite
              </div>
            )
        }
      </div>
    );
  }

  renderFooter = () => {
    return (
      <div className="chat-group-creation-footer">

        <div className="chat-group-creation-footer-button clickable" onClick={() => this.props.onCancel()}>
          Cancel
        </div>

        <div className="chat-group-creation-footer-button clickable" onClick={() => this.props.onInvite(this.state.addedContacts)}>
          Save
        </div>

      </div>
    );
  }

  renderContactLimitWarning = () => {
    if (this.state.addedContacts.length < MAXIMUM_GROUP_SIZE) return null;
    return (
      <div className="chat-group-creation-contact-error">
        Maximum Group size reached!
      </div>
    );
  }

  render() {
    return (
      <div className="chat-group-creation-container">
        {this.renderInviteHint()}
        {this.renderContactInput()}
        {this.renderContacts()}
        {this.renderFooter()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    contacts: state.user.contacts,
  }
}

export default connect(mapStateToProps)(GroupInvitation);