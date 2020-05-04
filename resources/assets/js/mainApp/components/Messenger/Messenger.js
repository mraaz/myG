
import React from "react";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import General from './Context/General';
import Games from './Context/Games';
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
import { createChatAction, openChatAction, closeChatAction, clearChatAction, blockUserAction, unblockUserAction } from '../../../redux/actions/chatAction';
import { favoriteGameAction, unfavoriteGameAction, updateGameIconAction, updateStatusAction } from '../../../redux/actions/userAction';
import { generateKeysAction, validatePinAction } from '../../../redux/actions/encryptionAction';
import { uploadGameIcon } from "../../../integration/http/chat";

class Messenger extends React.PureComponent {

  state = {
    showingSettings: false,
    searchInput: '',
    uploadingPhoto: null,
    blockSettings: false,
    dividerExpanded: {
      general: true,
      games: false,
    },
  }

  componentDidMount() {
    monitorChats(this.props.userId, false);
    handleLink(this.props.userId);
  }

  componentWillUnmount() {
    closeSubscription();
  }

  onUploadPhoto = async (icon, key) => {
    this.props.updateGameIcon(this.state.uploadingPhoto, icon);
    await uploadGameIcon(this.state.uploadingPhoto, key);
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
        {this.renderGeneral()}
        {this.renderGames()}
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
      onSettingsClicked={() => !this.state.blockSettings && this.setState(previous => ({ showingSettings: !previous.showingSettings }))}
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
      privateKey={this.props.privateKey}
      publicKey={this.props.publicKey}
      generateKeys={this.props.generateKeys}
      chats={this.props.chats}
      contacts={this.props.contacts}
      blockedUsers={this.props.blockedUsers}
      blockUser={this.props.blockUser}
      unblockUser={this.props.unblockUser}
      unfavoriteGame={this.props.unfavoriteGame}
      clearChat={this.props.clearChat}
      toggleSettings={() => this.setState(previous => ({ blockSettings: !previous.blockSettings }))}
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

  renderGeneral = () => {
    return <General
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      groups={this.props.groups}
      search={this.state.searchInput}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.general}
      onExpand={(expanded) => this.setState({ dividerExpanded: { general: !expanded, games: false } })}
    />
  }

  renderGames = () => {
    return <Games
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      games={this.props.games}
      groups={this.props.groups}
      search={this.state.searchInput}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.games}
      onExpand={(expanded) => this.setState({ dividerExpanded: { general: false, games: !expanded } })}
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

  renderSweetAlert = () => {
    if (!this.props.alert) return;
    return (
      <SweetAlert
        info
        showCancel
        confirmBtnText={window.messengerSweetAlert.confirmText}
        confirmBtnBsStyle='info'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => window.messengerSweetAlert.onConfirm()}
        onCancel={() => window.messengerSweetAlert.onCancel()}>
        {window.messengerSweetAlert.label}
      </SweetAlert>
    );
  }

  render() {
    return (
      <section id="messenger">
        <div className="messenger-content">
          {this.renderBody()}
          {this.renderSettings()}
          {this.renderFooter()}
          {this.renderEncryptionLogin()}
        </div>
        {this.renderChats()}
        {this.renderUploadModal()}
        {this.renderStatusMonitor()}
        {this.renderFocusMonitor()}
        {this.renderSweetAlert()}
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
    alert: state.alert.show,
    status: state.user.status,
    isStatusLocked: state.user.isStatusLocked,
    chats: state.chat.chats,
    favoriteGames: state.user.games.filter(game => game.isFavorite),
    games: state.user.games,
    contacts,
    groups,
    blockedUsers: state.chat.blockedUsers,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
    disconnected: state.socket.disconnected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createChat: (contacts, userId, title, icon, encryption, isGroup, individualGameId, gameId) => dispatch(createChatAction(contacts, userId, title, icon, encryption, isGroup, individualGameId, gameId)),
    openChat: chatId => dispatch(openChatAction(chatId)),
    closeChat: chatId => dispatch(closeChatAction(chatId)),
    generateKeys: (pin) => dispatch(generateKeysAction(pin)),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    favoriteGame: gameId => dispatch(favoriteGameAction(gameId)),
    unfavoriteGame: gameId => dispatch(unfavoriteGameAction(gameId)),
    blockUser: (blockedUserId) => dispatch(blockUserAction(blockedUserId)),
    unblockUser: (blockedUserId) => dispatch(unblockUserAction(blockedUserId)),
    updateGameIcon: (gameId, icon) => dispatch(updateGameIconAction(gameId, icon)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);