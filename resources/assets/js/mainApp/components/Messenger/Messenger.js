import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SweetAlert from '../common/MyGSweetAlert'
import General from './Context/General'
import Games from './Context/Games'
import SearchResults from './Context/SearchResults'
import Chats from './Context/Chats'
import Footer from './Context/Footer'
import Settings from './Context/Settings'
import EncryptionLogin from './Context/EncryptionLogin'
import ConnectionWarning from './Context/ConnectionWarning'
import StatusTimerWrapper from '../StatusTimerWrapper'
import WindowFocusHandler from '../WindowFocusHandler'

import { handleLink } from '../../../common/link'
import { monitorChats, closeSubscription, monitorSocketConnection } from '../../../integration/ws/chat'
import {
  createChatAction,
  openChatAction,
  closeChatAction,
  clearChatAction,
  blockUserAction,
  unblockUserAction,
} from '../../../redux/actions/chatAction'
import {
  favoriteGameAction,
  unfavoriteGameAction,
  updateGameIconAction,
  updateStatusAction,
  toggleNotificationSoundsAction,
  toggleAutoSelfDestructAction,
  togglePushNotificationsAction,
} from '../../../redux/actions/userAction'
import { generateKeysAction, validatePinAction, togglePersistEncryptionAction } from '../../../redux/actions/encryptionAction'
import { searchPaginatedAction } from '../../../redux/actions/paginationAction'
import { uploadGameIcon } from '../../../integration/http/chat'
import logger from '../../../common/logger'
import { ignoreFunctions } from '../../../common/render'

class Messenger extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    showingSettings: false,
    searchInput: '',
    blockSettings: false,
    windowFocused: true,
    dividerExpanded: {
      general: true,
      games: false,
    },
  }

  componentDidMount() {
    monitorChats(this.props.userId, false)
    handleLink(this.props.userId)
    monitorSocketConnection()
  }

  componentWillUnmount() {
    closeSubscription()
  }

  onSearch = (searchInput) => {
    this.setState({ searchInput })
    this.props.searchPaginated(0, searchInput, true)
  }

  onUploadPhoto = async (gameId, icon, key) => {
    this.props.updateGameIcon(gameId, icon)
    if (key) await uploadGameIcon(gameId, key)
  }

  renderConnectionWarning = () => {
    if (!this.props.disconnected) return
    return <ConnectionWarning />
  }

  renderLockedChat = () => {
    return (
      <section id='messenger'>
        {this.renderSweetAlert()}
        <div className='locked-chat'>
          <div className='locked-image'>
            <img src='https://myG.gg/platform_images/Dashboard/Lock_Icon_Mobile.svg' className='img-locked' />
          </div>
          <span>Your Chat is locked</span>
          <span>
            Reach{' '}
            <span style={{ color: '#E6C846' }}>
              {' '}
              <strong>level 2</strong>
            </span>{' '}
            to unlock it.
          </span>
          <div className='rectangle'>
            <img src='https://myg.gg/platform_images/Dashboard/btn_Network.svg' className='img-network' />
            <div className='body-of-text'>
              <p>
                Go to{' '}
                <Link to={'/achievements'}>
                  &nbsp;<strong> Achievements</strong>{' '}
                </Link>
              </p>
              <p>to learn how to progress</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderBody = () => {
    if (!this.props.pin) return null
    if (this.state.showingSettings) return null
    return (
      <div className='messenger-body'>
        {this.renderConnectionWarning()}
        {this.renderGeneral()}
        {this.renderSearchResults()}
        {this.renderGames()}
      </div>
    )
  }

  renderFooter = () => {
    if (!this.props.pin) return null
    return (
      <Footer
        search={this.state.searchInput}
        updateStatus={this.props.updateStatus}
        profileImage={this.props.profileImage}
        status={this.props.status}
        onSearch={this.onSearch}
        onSettingsClicked={() => !this.state.blockSettings && this.setState((previous) => ({ showingSettings: !previous.showingSettings }))}
      />
    )
  }

  renderSettings = () => {
    if (!this.props.pin) return null
    if (!this.state.showingSettings) return null
    return (
      <Settings
        games={this.props.games}
        favoriteGames={this.props.favoriteGames}
        userId={this.props.userId}
        pin={this.props.pin}
        privateKey={this.props.privateKey}
        publicKey={this.props.publicKey}
        generateKeys={this.props.generateKeys}
        chats={this.props.chats}
        contacts={this.props.contacts}
        notificationSoundsDisabled={this.props.notificationSoundsDisabled}
        pushNotificationsEnabled={this.props.pushNotificationsEnabled}
        autoSelfDestruct={this.props.autoSelfDestruct}
        persistEncryption={this.props.persistEncryption}
        blockedUsers={this.props.blockedUsers}
        blockUser={this.props.blockUser}
        unblockUser={this.props.unblockUser}
        favoriteGame={this.props.favoriteGame}
        unfavoriteGame={this.props.unfavoriteGame}
        clearChat={this.props.clearChat}
        toggleNotificationSounds={this.props.toggleNotificationSounds}
        toggleAutoSelfDestruct={this.props.toggleAutoSelfDestruct}
        togglePersistEncryption={this.props.togglePersistEncryption}
        togglePushNotifications={this.props.togglePushNotifications}
        toggleSettings={() => this.setState((previous) => ({ blockSettings: !previous.blockSettings }))}
        onUploadPhoto={this.onUploadPhoto}
      />
    )
  }

  renderEncryptionLogin = () => {
    if (this.props.pin) return null
    return (
      <EncryptionLogin
        userId={this.props.userId}
        generateKeys={this.props.generateKeys}
        validatePin={this.props.validatePin}
        publicKey={this.props.publicKey}
      />
    )
  }

  renderGeneral = () => {
    return (
      <General
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        search={this.state.searchInput}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        contactCount={this.props.contactCount}
        expanded={this.state.dividerExpanded.general}
        onExpand={(expanded) => this.setState({ dividerExpanded: { general: !expanded, games: false } })}
      />
    )
  }

  renderSearchResults = () => {
    return (
      <SearchResults
        searchResults={this.props.searchResults}
        games={this.props.games}
        loading={this.props.searching}
        chats={this.props.chats}
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        search={this.state.searchInput}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
      />
    )
  }

  renderGames = () => {
    return (
      <Games
        games={this.props.games}
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        search={this.state.searchInput}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        expanded={this.state.dividerExpanded.games}
        onExpand={(expanded) => this.setState({ dividerExpanded: { general: false, games: !expanded } })}
      />
    )
  }

  renderChats = () => {
    if (!this.props.pin) return null
    return (
      <Chats
        userId={this.props.userId}
        chats={this.props.chats}
        alias={this.props.alias}
        forceSelfDestruct={this.props.autoSelfDestruct}
        closeChat={this.props.closeChat}
        windowFocused={this.state.windowFocused}
      />
    )
  }

  renderStatusMonitor = () => {
    return (
      <StatusTimerWrapper
        {...{
          status: this.props.status,
          isStatusLocked: this.props.isStatusLocked,
          updateStatus: this.props.updateStatus,
        }}
      />
    )
  }

  renderFocusMonitor = () => {
    return (
      <WindowFocusHandler onFocus={() => this.setState({ windowFocused: true })} onBlur={() => this.setState({ windowFocused: false })} />
    )
  }

  renderSweetAlert = () => {
    if (!this.props.alert) return
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
    )
  }

  render() {
    logger.log('RENDER', 'Messenger')
    if (parseInt(this.props.level) < 2) return this.renderLockedChat()
    return (
      <section id='messenger'>
        <div className='messenger-content'>
          {this.renderBody()}
          {this.renderSettings()}
          {this.renderFooter()}
          {this.renderEncryptionLogin()}
        </div>
        {this.renderChats()}
        {this.renderStatusMonitor()}
        {this.renderFocusMonitor()}
        {this.renderSweetAlert()}
      </section>
    )
  }
}

function mapStateToProps(state) {
  const chats = state.chat.chats || []
  const contacts = state.user.contacts || []
  const groups = []
  const contactsWithChats = {}
  chats.forEach((chat) => {
    const contacts = chat.contacts || []
    if (chat.isGroup) groups.push(chat)
    else contacts.forEach((contactId) => (contactsWithChats[contactId] = chat))
  })
  contacts.forEach((contact) => (contact.chat = contactsWithChats[contact.contactId] || {}))
  return {
    level: (state.user.userTransactionStates || {}).user_level,
    alert: state.alert.show,
    autoSelfDestruct: state.user.autoSelfDestruct,
    persistEncryption: state.encryption.persist,
    notificationSoundsDisabled: state.user.notificationSoundsDisabled,
    pushNotificationsEnabled: state.user.pushNotificationsEnabled,
    status: state.user.status,
    isStatusLocked: state.user.isStatusLocked,
    chats: state.chat.chats,
    favoriteGames: state.user.games.filter((game) => game.isFavorite),
    games: state.user.games,
    contacts,
    groups,
    blockedUsers: state.chat.blockedUsers,
    pin: state.encryption.pin,
    invalidPin: state.encryption.invalidPin,
    privateKey: state.encryption.privateKey,
    disconnected: state.socket.disconnected,
    searchResults: state.pagination.search,
    searching: state.pagination.searchLoading,
    contactCount: state.user.contactCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createChat: (contacts, userId, title, icon, encryption, isGroup, individualGameId, gameId) =>
      dispatch(createChatAction(contacts, userId, title, icon, encryption, isGroup, individualGameId, gameId)),
    openChat: (chatId, chat) => dispatch(openChatAction(chatId, chat)),
    closeChat: (chatId) => dispatch(closeChatAction(chatId)),
    generateKeys: (pin) => dispatch(generateKeysAction(pin)),
    validatePin: (pin, publicKey) => dispatch(validatePinAction(pin, publicKey)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    favoriteGame: (gameId) => dispatch(favoriteGameAction(gameId)),
    unfavoriteGame: (gameId) => dispatch(unfavoriteGameAction(gameId)),
    blockUser: (blockedUserId) => dispatch(blockUserAction(blockedUserId)),
    unblockUser: (blockedUserId) => dispatch(unblockUserAction(blockedUserId)),
    updateGameIcon: (gameId, icon) => dispatch(updateGameIconAction(gameId, icon)),
    updateStatus: (status, forcedStatus) => dispatch(updateStatusAction(status, forcedStatus)),
    searchPaginated: (page, search, refresh) => dispatch(searchPaginatedAction(page, search, refresh)),
    toggleNotificationSounds: (disabled) => dispatch(toggleNotificationSoundsAction(disabled)),
    toggleAutoSelfDestruct: (enabled) => dispatch(toggleAutoSelfDestructAction(enabled)),
    togglePersistEncryption: (persist) => dispatch(togglePersistEncryptionAction(persist)),
    togglePushNotifications: (userId) => dispatch(togglePushNotificationsAction(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger)
