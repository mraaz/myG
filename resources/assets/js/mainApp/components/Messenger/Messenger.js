
import React from "react";
import { connect } from 'react-redux';

import Contacts from './Context/Contacts';
import Games from './Context/Games';
import Groups from './Context/Groups';
import Chats from "./Context/Chats";
import Footer from './Context/Footer';
import Settings from './Context/Settings';
import EncryptionLogin from './Context/EncryptionLogin';
import ConnectionWarning from './Context/ConnectionWarning';
import StatusTimerWrapper from '../StatusTimerWrapper';
import WindowFocusHandler from '../WindowFocusHandler';
import FileOpenModal from '../FileOpenModal';

import { handleLink } from "../../../common/link";
import { monitorChats, closeSubscription } from '../../../integration/ws/chat';
import { createChatAction, openChatAction, closeChatAction, clearChatAction } from '../../../redux/actions/chatAction';
import { favoriteGameAction, unfavoriteGameAction, updateGameIconAction, updateStatusAction } from '../../../redux/actions/userAction';
import { generateKeysAction, validatePinAction } from '../../../redux/actions/encryptionAction';

class Messenger extends React.PureComponent {

  state = {
    showingSettings: false,
    searchInput: '',
    uploadingPhoto: null,
    dividerExpanded: {
      games: false,
      friends: true,
      groups: false,
    },
  }

  componentDidMount() {
    monitorChats(this.props.userId, false);
    handleLink(this.props.userId);
  }

  componentWillUnmount() {
    closeSubscription();
  }

  onUploadPhoto = (icon) => {
    this.props.updateGameIcon(this.state.uploadingPhoto, icon);
    this.setState({ uploadingPhoto: null });
  }

  renderConnectionWarning = () => {
    if (!this.props.disconnected) return;
    return <ConnectionWarning />;
  }

  renderBody = () => {
    if (!this.props.pin) return null;
    if (this.state.showingSettings) return null;
    return (
      <div className="messenger-body">
        {this.renderConnectionWarning()}
        {this.renderGames()}
        {this.renderContacts()}
        {this.renderGroups()}
      </div>
    );
  }

  renderFooter = () => {
    if (!this.props.pin) return null;
    return <Footer
      search={this.state.searchInput}
      updateStatus={this.props.updateStatus}
      profileImage={this.props.profileImage}
      status={this.props.status}
      onSearch={searchInput => this.setState({ searchInput })}
      onSettingsClicked={() => this.setState(previous => ({ showingSettings: !previous.showingSettings }))}
    />
  }

  renderSettings = () => {
    if (!this.props.pin) return null;
    if (!this.state.showingSettings) return null;
    return <Settings
      games={this.props.games}
      favoriteGames={this.props.favoriteGames}
      userId={this.props.userId}
      pin={this.props.pin}
      generateKeys={this.props.generateKeys}
      chats={this.props.chats}
      unfavoriteGame={this.props.unfavoriteGame}
      clearChat={this.props.clearChat}
      onUploadPhoto={gameId => this.setState({ uploadingPhoto: gameId })}
    />
  }

  renderEncryptionLogin = () => {
    if (this.props.pin) return null; 
    return <EncryptionLogin
      userId={this.props.userId}
      generateKeys={this.props.generateKeys}
      validatePin={this.props.validatePin}
      publicKey={this.props.publicKey}
    />
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

  renderChats = () => {
    if (!this.props.pin) return null;
    return <Chats
      userId={this.props.userId}
      chats={this.props.chats}
      alias={this.props.alias}
      closeChat={this.props.closeChat}
      windowFocused={this.state.windowFocused}
    />
  }

  renderUploadModal = () => {
    return (
      <FileOpenModal
        bOpen={this.state.uploadingPhoto !== null}
        callbackClose={() => this.setState({ uploadingPhoto: null })}
        callbackConfirm={this.onUploadPhoto}
      />
    )
  }

  renderStatusMonitor = () => {
    return (
      <StatusTimerWrapper {...{
        status: this.props.status,
        isStatusLocked: this.props.isStatusLocked,
        updateStatus: this.props.updateStatus,
      }} />
    )
  }

  renderFocusMonitor = () => {
    return (
      <WindowFocusHandler
        onFocus={() => this.setState({ windowFocused: true })}
        onBlur={() => this.setState({ windowFocused: false })}
      />
    )
  }

  render() {
    return (
      <section id="messenger">
        <div class="messenger-content">
          {this.renderBody()}
          {this.renderSettings()}
          {this.renderFooter()}
          {this.renderEncryptionLogin()}
        </div>
        {this.renderChats()}
        {this.renderUploadModal()}
        {this.renderStatusMonitor()}
        {this.renderFocusMonitor()}
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
    favoriteGames: state.user.games.filter(game => game.isFavorite),
    games: state.user.games,
    contacts,
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
    generateKeys: (pin) => dispatch(generateKeysAction(pin)),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    favoriteGame: gameId => dispatch(favoriteGameAction(gameId)),
    unfavoriteGame: gameId => dispatch(unfavoriteGameAction(gameId)),
    updateGameIcon: (gameId, icon) => dispatch(updateGameIconAction(gameId, icon)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);