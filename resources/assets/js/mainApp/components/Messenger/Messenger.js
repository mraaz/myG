
import React from "react";
import { connect } from 'react-redux';
import notifyToast from '../../../common/toast';

import Chat from './Chat';
import Contacts from './Context/Contacts';
import Games from './Context/Games';
import Groups from './Context/Groups';
import StatusTimerWrapper from '../StatusTimerWrapper';
import WindowFocusHandler from '../WindowFocusHandler';
import FileOpenModal from '../FileOpenModal';

import { attemptSocketConnection, monitorChats, closeSubscription } from '../../../integration/ws/chat';
import { createChatAction, openChatAction, closeChatAction, clearChatAction } from '../../../redux/actions/chatAction';
import { favoriteGameAction, unfavoriteGameAction, updateGameIconAction, updateStatusAction } from '../../../redux/actions/userAction';
import { generateKeysAction, validatePinAction } from '../../../redux/actions/encryptionAction';
import { copyToClipboard } from '../../../common/clipboard';
import { fetchLink, acceptInvitation } from "../../../integration/http/chat";

class Messenger extends React.PureComponent {

  state = {
    showingSettings: false,
    changingStatus: false,
    searchInput: '',
    favoriteGameInput: '',
    pin: '',
    dividerExpanded: {
      games: false,
      friends: true,
      groups: false,
    },
    uploadingPhoto: null,
  }

  static getDerivedStateFromProps(props) {
    return { invalidPin: props.invalidPin }
  }

  componentDidMount() {
    monitorChats(this.props.userId, false);
    if (window.location.href.includes('/link')) this.fetchLink();
  }

  componentWillUnmount() {
    closeSubscription();
  }

  fetchLink = () => {
    const uuidMatcher = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
    const url = window.location.href;
    const uuid = Array.isArray(url.match(uuidMatcher)) ? url.match(uuidMatcher)[0] : null;
    fetchLink(uuid).then(({ link }) => {
      if (!link) return notifyToast('The Group for this Link was not found :(');
      const isValid = !link.expiry || ((new Date(link.updatedAt).getTime() + (link.expiry * 60 * 60 * 1000)) >= Date.now());
      if (!isValid) return notifyToast('This Link has expired :(');
      const userId = this.props.userId;
      const chatId = link.chatId;
      acceptInvitation(chatId, [userId]).then(response => {
        if (response.error === 'Contacts are Already in Chat.') return notifyToast('You are already in this Group!');;
        return notifyToast('You have been added to this Group!!');
      });
    });
  }

  closeChat = (chatId) => {
    this.props.closeChat(chatId);
  }

  setStatus = (status) => {
    this.props.updateStatus(status, true);
    this.setState({ changingStatus: false });
  }

  onUploadPhoto = (icon) => {
    this.props.updateGameIcon(this.state.uploadingPhoto, icon);
    this.setState({ uploadingPhoto: null });
  }

  renderConnectionWarning = () => {
    if (!this.props.disconnected) return;
    return (
      <div
        className="messenger-connection-warning clickable"
        onClick={() => attemptSocketConnection()}
      >
        <p className="messenger-connection-warning-label">It seems you are offline...</p>
        <p className="messenger-connection-warning-hint">Click to Reconnect</p>
      </div>
    );
  }

  renderGames = () => {
    return <Games 
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      games={this.props.games}
      search={this.state.searchInput}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.games}
      onExpand={(expanded) => this.setState({ dividerExpanded: { games: !expanded, friends: false, groups: false } })}
    />
  }

  renderContacts = () => {
    return <Contacts 
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      search={this.state.searchInput}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.friends}
      onExpand={(expanded) => this.setState({ dividerExpanded: { games: false, friends: !expanded, groups: false } })}
    />
  }

  renderGroups = () => {
    return <Groups 
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      groups={this.props.groups}
      search={this.state.searchInput}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.groups}
      onExpand={(expanded) => this.setState({ dividerExpanded: { games: false, friends: false, groups: !expanded } })}
    />
  }

  renderFooter() {
    const fullFooter = this.state.showingSettings && 'messenger-footer-container-full';
    return (
      <div className={`messenger-footer-container ${fullFooter}`}>
        {this.renderSettings()}
        <div className="messenger-footer">
          <div className="messenger-footer-icon-container">
            <div
              className="messenger-footer-icon"
              style={{ backgroundImage: `url('${this.props.profileImage}')` }}
            />
            <div
              tabIndex={0}
              className={`messenger-footer-status-indicator messenger-footer-status-${this.props.status} clickable`}
              onClick={() => this.setState(previous => ({ changingStatus: !previous.changingStatus }))}
              onBlur={() => setTimeout(() => this.setState({ changingStatus: false }), 100)}
            >
              {this.props.status === 'offline' ? 'invisible' : this.props.status}
            </div>
            <div className="messenger-settings-status-container">
              {this.renderStatusSettings()}
            </div>
          </div>
          <div className="messenger-footer-search-bar">
            <input
              className="messenger-settings-search-field"
              type="text"
              placeholder="Search"
              value={this.state.searchInput}
              onChange={event => this.setState({ searchInput: event.target.value })}
            />
            <div className="messenger-settings-search-button"
              style={{ backgroundImage: `url(/assets/svg/ic_messenger_search.svg)` }}
            />
          </div>
          <div
            className="messenger-footer-settings-button clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_messenger_settings.svg)` }}
            onClick={() => this.setState(previous => ({ showingSettings: !previous.showingSettings }))}
          ></div>
        </div>
      </div>
    );
  }

  renderSettings = () => {
    if (!this.state.showingSettings) return;
    return(
      <div className="messenger-settings-container">
        <p className="messenger-settings-title">Settings</p>
        {this.renderEncryptionSettings()}
        {this.renderGamesSettings()}
      </div>
    );
  }

  renderGamesSettings = () => {
    const search = (name) => name.toLowerCase().includes(this.state.favoriteGameInput.toLowerCase());
    const maxedOut = this.props.favoriteGames.length >= 10;
    const games = maxedOut ? 
      this.props.games.slice(0).sort((g1, g2) => g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1).slice(0, 10) :
      this.props.games.slice(0).filter(game => search(game.name));
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Edit your favorite games</p>
        <p className="messenger-settings-encryption-subtitle">
          type in your favorite games to be view on your top list
        </p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          placeholder={`${maxedOut ? 'Maximum of 10 favorited games' : 'Type here to search...'}`}
          disabled={maxedOut}
          value={this.state.favoriteGameInput}
          onChange={event => this.setState({ favoriteGameInput: event.target.value })}
        />
        <div className="messenger-footer-favorite-games">
          {games.map(this.renderGameSelection)}
        </div>
      </div>
    );
  }

  renderGameSelection = game => {
    const isFavorite = this.props.favoriteGames.find(favorite => favorite.gameId === game.gameId);
    const isOwner = parseInt(this.props.userId) === parseInt(game.ownerId);
    return(
      <div key={game.gameId} className="messenger-footer-favorite-game">
        <div className="messenger-body-game-section">
            {!isOwner && (
              <div
                className="messenger-game-icon"
                style={{ backgroundImage: `url('${game.icon}')` }}
              />
            )}
            {isOwner && (
              <div className="messenger-change-game-icon-button clickable"
                style={{ backgroundImage: `url(/assets/svg/ic_chat_group_icon.svg)` }}
                onClick={() => this.setState({ uploadingPhoto: game.gameId })}
              />
            )}
            <p className="messenger-body-section-header-name">{game.name}</p>
        </div>
        <div className="messenger-footer-favorite-game-button clickable"
          onClick={() => isFavorite ? this.props.unfavoriteGame(game.gameId) : this.props.favoriteGame(game.gameId)}
        >
          {isFavorite ? `unfavorite` : `favorite`}
        </div>
      </div>
    );
  }

  renderEncryptionSettings() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">
          Your messages cannot be read by anyone other than you and your contacts.<br /><br />
          Because of this, we cannot store your encryption key in our servers.<br /><br />
          {this.props.pin ?
            `Please keep this key somewhere safe, you'll need it when logging in on another device.` :
            `To decrypt your previous messages, you'll need to inform your encryption key.`
          }
        </p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          maxLength={12}
          placeholder="Encryption Key"
          disabled={this.props.pin}
          value={this.props.pin || this.state.pin}
          onChange={event => this.setState({ pin: event.target.value })}
        />
        {this.state.invalidPin && (
          <p className="messenger-settings-encryption-error">That's the wrong key, try again!</p>
        )}
        <div className="messenger-settings-encryption-footer">
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                this.props.generateKeys();
                this.props.chats.forEach(chat => this.props.clearChat(chat.chatId));
              }}
            >new</div>
          )}
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => this.props.validatePin(this.state.pin, this.props.publicKey)}
            >validate</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => copyToClipboard(this.props.pin)}
            >copy</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                const email = "felipe.roque@outlook.com"
                const mailLink = `mailto:${email}?subject=myG%20Security%20Key&body=%20This%20is%20my%20myG%20security%20key:%20${this.props.pin}`;
                window.open(mailLink, '_blank').focus();
              }}
            >email</div>
          )}
        </div>
      </div>
    );
  }

  renderStatusSettings() {
    if (!this.state.changingStatus) return;
    return (
      <div className="messenger-settings-status">
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-online"
          onMouseDown={() => this.setStatus('online')}
        >online</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-playing"
          onMouseDown={() => this.setStatus('playing')}
        >playing</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-afk"
          onMouseDown={() => this.setStatus('afk')}
        >afk</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-offline"
          onMouseDown={() => this.setStatus('offline')}
        >invisible</p>
      </div>
    );
  }

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.filter(chat => !chat.closed).map(this.renderChat)}
      </div>
    );
  }

  renderChat = (chat) => {
    return (
      <Chat
        key={chat.chatId}
        userId={this.props.userId}
        alias={this.props.alias}
        chatId={chat.chatId}
        onClose={chatId => this.closeChat(chatId)}
        windowFocused={this.state.windowFocused}
      />
    );
  }

  renderBody = () => {
    if (this.state.showingSettings) return;
    return (
      <div className="messenger-body">
        {this.renderConnectionWarning()}
        {this.renderGames()}
        {this.renderContacts()}
        {this.renderGroups()}
      </div>
    );
  }

  render() {
    return (
      <section id="messenger">

        <FileOpenModal
          bOpen={this.state.uploadingPhoto !== null}
          callbackClose={() => this.setState({ uploadingPhoto: null })}
          callbackConfirm={this.onUploadPhoto}
        />

        {this.renderBody()}
        {this.renderFooter()}

        {this.renderChats()}

        <StatusTimerWrapper {...{
          status: this.props.status,
          isStatusLocked: this.props.isStatusLocked,
          updateStatus: this.props.updateStatus,
        }} />

        <WindowFocusHandler
          onFocus={() => this.setState({ windowFocused: true })}
          onBlur={() => this.setState({ windowFocused: false })}
        />

      </section>
    );
  }

}

function mapStateToProps(state) {
  const chats = state.chat.chats || [];
  const contacts = state.user.contacts || [];
  const groups = [];
  const contactsWithChats = {};
  chats.forEach(chat => {
    const contacts = (chat.contacts || []);
    if (chat.isGroup) groups.push(chat);
    else contacts.forEach(contactId => contactsWithChats[contactId] = chat)
  });
  contacts.forEach(contact => contact.chat = contactsWithChats[contact.contactId] || {});
  return {
    status: state.user.status,
    isStatusLocked: state.user.isStatusLocked,
    chats: state.chat.chats,
    contacts: state.user.contacts,
    games: state.user.games,
    favoriteGames: state.user.games.filter(game => game.isFavorite),
    groups,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
    disconnected: state.socket.disconnected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: (contacts, userId, title, icon, encryption, isGroup) => dispatch(createChatAction(contacts, userId, title, icon, encryption, isGroup)),
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    generateKeys: () => dispatch(generateKeysAction()),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    favoriteGame: gameId => dispatch(favoriteGameAction(gameId)),
    unfavoriteGame: gameId => dispatch(unfavoriteGameAction(gameId)),
    updateGameIcon: (gameId, icon) => dispatch(updateGameIconAction(gameId, icon)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);