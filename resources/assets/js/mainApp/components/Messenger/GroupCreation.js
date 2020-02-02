
import React from 'react';
import { connect } from 'react-redux';

class GroupCreation extends React.Component {

  state = {
    icon: "https://i.pinimg.com/originals/d5/e1/d4/d5e1d4fb60a1b8b1d6182cc9b1ff2376.jpg",
    title: '',
    contactInput: '',
    matchingContacts: [],
    addedContacts: [],
    titleError: false,
    contactsError: false,
  }

  onContactSearch = (name) => {
    const matchingContacts = this.props.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({ contactInput: name, matchingContacts, contactsError: false });
  }

  onCreate = () => {
    const { icon, title, addedContacts } = this.state;
    if (!title) return this.setState({ titleError: true });
    if (addedContacts.length < 2) return this.setState({ contactsError: true });
    this.props.onCreate(icon, title, addedContacts);
  }

  renderHeader = () => {
    return (
      <div className="chat-group-creation-header">

        <div className="chat-group-creation-header-icon clickable"
          style={{ backgroundImage: `url(/assets/svg/ic_chat_group_icon.svg)` }}
          onClick={() => console.log('Upload Image')}
        />

        <div className="chat-group-creation-title-input-container">
          <input
            className="chat-group-creation-title-input"
            placeholder={"Group Name"}
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value, titleError: false })}
          >
          </input>
        </div>

      </div>
    );
  }

  renderInviteHint = () => {
    return (
      <div className="chat-group-creation-invite-hint-container">
        <p className="chat-group-creation-invite-hint">Invite</p>
        {this.renderTitleError()}
        {this.renderContactsError()}
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
    const isAdded = this.state.addedContacts.includes(contact.contactId);
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
              <div className="chat-group-creation-contact-remove-button clickable"
                onClick={() => this.setState(previous => ({ addedContacts: previous.addedContacts.filter(contactId => contactId !== contact.contactId) }))}
              >
                Remove
              </div>

            ) :
            (
              <div className="chat-group-creation-contact-invite-button clickable"
                onClick={() => this.setState(previous => ({ addedContacts: [...previous.addedContacts, contact.contactId] }))}
              >
                Add
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

        <div className="chat-group-creation-footer-button clickable" onClick={this.onCreate}>
          Create
        </div>

      </div>
    );
  }

  renderTitleError = () => {
    if (!this.state.titleError) return null;
    return (
      <div className="chat-group-creation-title-error">
        Please inform a name for the group
      </div>
    );
  }

  renderContactsError = () => {
    if (!this.state.contactsError) return null;
    return (
      <div className="chat-group-creation-contact-error">
        Please add 2+ friends to the group
      </div>
    );
  }

  render() {
    return (
      <div className="chat-group-creation-container">
        {this.renderHeader()}
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

export default connect(mapStateToProps)(GroupCreation);