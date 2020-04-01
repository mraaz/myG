
import React from 'react';
import { connect } from 'react-redux';
import FileOpenModal from '../FileOpenModal';

export const MAXIMUM_GROUP_SIZE = 37;

class GroupCreation extends React.Component {

  state = {
    icon: '',
    title: '',
    contactInput: '',
    matchingContacts: [],
    addedContacts: [],
    uploadingPhoto: false,
    titleError: false,
  }

  onContactSearch = (name) => {
    const matchingContacts = this.props.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({ contactInput: name, matchingContacts });
  }

  onCreate = () => {
    const { icon, title, addedContacts } = this.state;
    if (!title) return this.setState({ titleError: true });
    this.props.onCreate(icon, title, addedContacts);
  }

  onAddContact = (contact) => {
    if (this.state.addedContacts.length >= MAXIMUM_GROUP_SIZE) return;;
    this.setState(previous => ({ addedContacts: [...previous.addedContacts, contact.contactId] }));
  }

  onUploadPhoto = (icon) => {
    this.setState({ icon, uploadingPhoto: false });
  }

  renderHeader = () => {
    return (
      <div className="chat-group-creation-header">

        <FileOpenModal
          bOpen={this.state.uploadingPhoto}
          callbackClose={() => this.setState({ uploadingPhoto: false })}
          callbackConfirm={this.onUploadPhoto}
        />

        <div className="chat-group-creation-header-icon clickable"
          style={{
            backgroundImage: `url(${this.state.icon || '/assets/svg/ic_chat_group_icon.svg'})`,
            backgroundSize: this.state.icon ? 'cover' : 'inherit',
          }}
          onClick={() => this.setState({ uploadingPhoto: true })}
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
                onClick={() => this.onAddContact(contact)}
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

  renderContactLimitWarning = () => {
    if (this.state.titleError || this.state.addedContacts.length < MAXIMUM_GROUP_SIZE) return null;
    return (
      <div className="chat-group-creation-contact-error">
        Maximum Group size reached!
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