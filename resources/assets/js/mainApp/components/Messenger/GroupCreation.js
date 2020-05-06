
import React from 'react';
import { connect } from 'react-redux';
import FileOpenModal from '../FileOpenModal';
import Dropdown from '../Dropdown';
import notifyToast from '../../../common/toast';
import { searchGameAction } from '../../../redux/actions/gameAction';

export const MAXIMUM_GROUP_SIZE = 37;

class GroupCreation extends React.Component {

  state = {
    icon: '',
    title: '',
    gameInput: '',
    selectedGame: null,
    contactInput: '',
    matchingContacts: [],
    addedContacts: [],
    uploadingPhoto: false,
  }

  onContactSearch = (name) => {
    const matchingContacts = this.props.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({ contactInput: name, matchingContacts });
  }

  onGameSearch = (game) => {
    this.setState({ gameInput: game, selectedGame: null });
    if (game.length) this.props.searchGame(game);
  }

  onCreate = () => {
    const { icon, key, addedContacts, selectedGame } = this.state;
    const contactAliases = addedContacts.map(contactId => this.props.contacts.find(contact => contact.contactId === contactId).name);
    const firstAlias = contactAliases[0] ? `, ${contactAliases[0]}` : '';
    const secondAlias = contactAliases[1] ? `, ${contactAliases[1]}` : '';
    const title = this.state.title || `${this.props.alias}` + firstAlias + secondAlias;
    this.props.onCreate(icon, key, title, addedContacts, selectedGame && selectedGame.gameId);
  }

  onAddContact = (contact) => {
    if (this.state.addedContacts.length >= MAXIMUM_GROUP_SIZE) return notifyToast('Maximum Group size reached!');
    this.setState(previous => ({ addedContacts: [...previous.addedContacts, contact.contactId] }));
  }

  onUploadPhoto = (icon, key) => {
    this.setState({ icon, key, uploadingPhoto: false });
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
            backgroundImage: `url(${this.state.icon || 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Chat/ic_chat_group_icon.svg'})`,
            backgroundSize: this.state.icon ? 'cover' : 'inherit',
          }}
          onClick={() => this.setState({ uploadingPhoto: true })}
        />

        <div className="chat-group-creation-title-input-container">
          <input
            className="chat-group-creation-title-input"
            placeholder={"Group Name"}
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          >
          </input>
        </div>

      </div>
    );
  }

  renderGameHint = () => {
    return (
      <div className="chat-group-creation-invite-hint-container">
        <p className="chat-group-creation-invite-hint">Select a Game for this Group</p>
      </div>
    );
  }

  renderGameInput = () => {
    const selectedStyle = 'chat-group-creation-contact-input-selected';
    return (
      <div className="chat-group-creation-contact-input-container">
        <input
          className={`chat-group-creation-contact-input ${selectedStyle}`}
          placeholder={"Game Name"}
          value={this.state.selectedGame ? this.state.selectedGame.name : this.state.gameInput}
          onChange={event => this.onGameSearch(event.target.value)}
        >
        </input>
        <Dropdown
          show={this.state.gameInput.length}
          position={{ top: '-6px' }}
          items={this.props.foundGames.map(game => game.name)}
          onItemClick={item => this.setState({ selectedGame: this.props.foundGames.find(game => game.name === item), gameInput: '' })}
          emptyMessage={"no games found"}
        />
      </div>
    );
  }

  renderInviteHint = () => {
    return (
      <div className="chat-group-creation-invite-hint-container">
        <p className="chat-group-creation-invite-hint">Invite</p>
      </div>
    );
  }

  renderInviteInput = () => {
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

  render() {
    return (
      <div className="chat-group-creation-container">
        {this.renderHeader()}
        {this.renderGameHint()}
        {this.renderGameInput()}
        {this.renderInviteHint()}
        {this.renderInviteInput()}
        {this.renderContacts()}
        {this.renderFooter()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    alias: state.user.alias,
    contacts: state.user.contacts,
    foundGames: state.game.foundGames,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchGame: (name) => dispatch(searchGameAction(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreation);