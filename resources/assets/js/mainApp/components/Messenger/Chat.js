import React from 'react';
import { connect } from 'react-redux';

import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import ChatOptions from './ChatOptions';
import GroupOptions from './GroupOptions';

import { prepareChatAction, fetchMessagesAction, sendMessageAction, editMessageAction, deleteMessageAction, updateChatAction, updateChatStateAction, checkSelfDestructAction, clearChatAction, setTypingAction } from '../../../redux/actions/chatAction';
import { withDatesAndLogs } from '../../../common/chat';
import { encryptMessage, decryptMessage, deserializeKey } from '../../../integration/encryption';
import { formatDateTime } from '../../../common/date';

export class Chat extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastMessageId: null,
      lastRead: 0,
      lastReads: {},
      wasEncrypted: !props.privateKey,
      currentlyTyping: '',
      editing: false,
      settings: false,
      messagePaginationPage: 1,
    };
    this.messageListRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleMessageListScroll, { passive: true });
    document.addEventListener("wheel", this.handleMessageListScroll, { passive: true });
    this.props.prepareChat(this.props.chatId, this.props.userId, this.props.contactId, this.props.isGroup);
    if (!this.props.isGuest) this.props.checkSelfDestruct(this.props.chatId);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleMessageListScroll, false);
    document.removeEventListener("wheel", this.handleMessageListScroll, false);
  }

  handleMessageListScroll = () => {
    const messageList = this.messageListRef.current;
    if (!messageList) return;
    if (messageList.scrollTop !== 0 || this.props.loadingMessages || this.props.noMoreMessages) return;
    const nextPage = this.state.messagePaginationPage + 1;
    this.props.fetchMessages(this.props.chatId, nextPage);
    this.setState({ messagePaginationPage: nextPage });
    this.messageListRef.current.scrollTo(0, 4);
  }

  componentDidUpdate() {
    const lastMessageId = (this.props.messages[this.props.messages.length - 1] || {}).messageId;
    this.markAsRead(lastMessageId);
    this.scrollToLastMessage(lastMessageId);
  }

  scrollToLastMessage = (lastMessageId) => {
    const typing = JSON.stringify(this.props.typing);
    const isTyping = typing !== this.state.currentlyTyping;
    const hasNewReadIndicators = JSON.stringify(this.props.lastReads) !== JSON.stringify(this.state.lastReads);
    const hasNewMessage = this.state.lastMessageId !== lastMessageId;
    const gotDecrypted = this.state.wasEncrypted && this.props.privateKey;
    if (isTyping || hasNewReadIndicators || hasNewMessage || gotDecrypted) {
      const state = {};
      if (isTyping) state.currentlyTyping = typing;
      if (hasNewReadIndicators) state.lastReads = this.props.lastReads;
      if (hasNewMessage) state.lastMessageId = lastMessageId;
      if (gotDecrypted) state.wasEncrypted = false;
      this.setState(state);
      if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight);
      return true;
    }
  }

  markAsRead = (lastMessageId) => {
    if (this.props.isGuest) return;
    if (this.props.minimised || !this.props.privateKey || !this.props.windowFocused) return;
    if (!lastMessageId || lastMessageId <= this.props.lastRead || lastMessageId <= this.state.lastRead) return;
    this.setState({ lastRead: lastMessageId });
    this.props.updateChat(this.props.chatId, { markAsRead: true });
  }

  sendMessage = (input) => {
    if (!input) return;
    this.props.sendMessage(this.props.chatId, this.props.userId, this.props.alias, this.encryptInput(input));
  }

  editMessage = (chatId, messageId, input) => {
    this.props.editMessage(chatId, messageId, this.encryptInput(input));
  }

  encryptInput = (input) => {
    const content = encryptMessage(input, this.props.publicKey, this.props.privateKey);
    const backup = encryptMessage(input, this.props.userPublicKey, this.props.userPrivateKey);
    return { content, backup }
  }

  decryptMessage = (message) => {
    if (!message.content && !message.backup) return message;
    const isSent = !this.props.isGroup && message.senderId == this.props.userId;
    const encryptedContent = isSent ? message.backup : message.content;
    const privateKey = isSent ? this.props.userPrivateKey : this.props.privateKey;
    const content = decryptMessage(encryptedContent, privateKey);
    return { ...message, content };
  }

  editLastMessage = () => {
    const sentMessages = this.props.messages.filter(message => message.senderId == this.props.userId && !message.deleted);
    const lastSentMessage = sentMessages[sentMessages.length - 1];
    if (!lastSentMessage) return;
    this.setState({ editing: lastSentMessage.messageId });
  }

  onEdit = () => {
    this.setState({ editing: false });
  }

  renderSettings = () => {
    if (this.props.isGroup) return (
      <GroupOptions
        userId={this.props.userId}
        messages={this.props.messages}
        group={this.props.group}
        groupContacts={this.props.contacts}
      />
    );
    return (
      <ChatOptions
        {...this.props.group}
        messages={this.props.messages}
        contactId={this.props.contactId}
        contactAlias={this.props.title}
      />
    );
  }

  renderHeader = () => {
    const selfDestructStyle = this.props.selfDestruct && 'chat-component-header-self-destruct';
    const iconClickableStyle = !this.props.isGroup && 'clickable';
    return (
      <div className={`chat-component-header ${selfDestructStyle}`}>

        <div
          className={`chat-component-header-icon ${iconClickableStyle}`}
          onClick={() => !this.props.isGroup && window.location.replace(`/profile/${this.props.title}`)}
          style={{ backgroundImage: `url('${this.props.icon}')` }}
        />

        {!this.props.isGroup && (
          <div className={`chat-component-header-status-indicator chat-component-header-status-indicator-${this.props.status}`} />
        )}

        <div className="chat-component-header-info clickable"
          onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
        >
          <div className="chat-component-header-title">
            {this.props.title}
          </div>
          {this.props.subtitle && (
            <div className="chat-component-header-subtitle">
              {this.props.subtitle}
            </div>
          )}
        </div>

        <div className="chat-component-header-options">
          {(!this.state.settings || this.props.minimised) && (
            <div className="chat-component-header-top-buttons">
              <div className="chat-component-header-button clickable"
                style={{ backgroundImage: `url(/assets/svg/ic_chat_minimise.svg)` }}
                onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
              />
              <div className="chat-component-header-button clickable"
                style={{ backgroundImage: `url(/assets/svg/ic_chat_maximise.svg)` }}
                onClick={() => this.props.updateChatState(this.props.chatId, { maximised: !this.props.maximised, minimised: false })}
              />
              <div className="chat-component-header-button clickable"
                style={{ backgroundImage: `url(/assets/svg/ic_chat_close.svg)` }}
                onClick={() => this.props.onClose(this.props.chatId)}
              />
            </div>
          )}
          {!this.props.isGuest && (
            <div
              className="chat-component-header-settings clickable"
              style={{ backgroundImage: `url('/assets/svg/ic_chat_settings.svg')` }}
              onClick={() => this.setState(previous => ({ settings: !previous.settings }))}
            />
          )}
        </div>

      </div>
    );
  }

  renderBody = () => {
    const lastMessage = (this.props.messages[this.props.messages.length - 1] || {});
    const lastMessageId = lastMessage.messageId;
    const lastMessageSender = lastMessage.senderId;
    return (
      <div
        className="chat-component-body"
        ref={this.messageListRef}
      >
        {this.renderLoadingIndicator()}
        <ChatMessageList
          userId={this.props.userId}
          chatId={this.props.chatId}
          isGroup={this.props.isGroup}
          isGuest={this.props.isGuest}
          messages={this.props.messages}
          messageListRef={this.messageListRef}
          editing={this.state.editing}
          onEdit={this.onEdit}
          editMessage={this.editMessage}
          deleteMessage={this.props.deleteMessage}
          decryptMessage={this.decryptMessage}
        />
        {this.renderTypingIndicator()}
        {this.renderReadIndicators(lastMessageId, lastMessageSender)}
      </div>
    );
  }

  renderLoadingIndicator() {
    if (!this.props.loadingMessages) return null;
    return (
      <p className="chat-component-loading-indicator">loading messages ...</p>
    );
  }

  renderReadIndicators(lastMessageId, lastMessageSender) {
    if (this.props.isGuest) return;
    const { contactsMap, lastReads } = this.props;
    const contacts = this.props.isGroup ? contactsMap : { [this.props.contactId]: { contactId: this.props.contactId, icon: this.props.icon } };
    const contactsWithRead = Object.keys(lastReads).map(contactId => ({ ...contacts[contactId], lastRead: lastReads[contactId] }));
    const contactsThatRead = contactsWithRead.filter(contact => contact.contactId !== lastMessageSender && contact.lastRead >= lastMessageId && contact.icon);
    if (!contactsThatRead.length) return null;
    return (
      <div className="chat-component-read-indicator-container">
        {contactsThatRead.map(contact => this.renderReadIndicator(contact.contactId, contact.icon))}
      </div>
    );
  }

  renderReadIndicator(key, icon) {
    return (
      <div key={key} className="chat-component-read-indicator">
        <div className="chat-component-read-indicator-icon">
          <img
            className="chat-component-read-indicator-icon-image"
            src={icon}
          />
        </div>
      </div>
    );
  }

  renderTypingIndicator() {
    if (!this.props.typing.length) return;
    return (
      <div key={'typing'}
        className={`chat-component-message chat-component-message-received chat-component-message-short`}
      >
        <div className="chat-component-message-container">
          <div className="dot-flashing" />
        </div>
      </div>
    );
  }

  renderFooter = () => {
    return (
      <div className="chat-component-footer">
        <div className="chat-component-attach-button-container">
          <div className="chat-component-attach-button clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_chat_attach.svg)` }}
          />
          <div className="chat-component-attach-button-divider" />
        </div>
        <ChatInput
          connected={!this.props.disconnected}
          blocked={this.props.blocked}
          isDecryptable={this.props.privateKey}
          sendMessage={this.sendMessage}
          editLastMessage={this.editLastMessage}
          setTyping={isTyping => !this.props.isGuest && this.props.setTyping(this.props.chatId, isTyping)}
        />
      </div>
    );
  }

  renderEncryptedChat() {
    const isGroupWithoutKey = this.props.isGroup && !this.props.privateKey;
    const noUserKeyText = "Please inform your encryption key to read the contents of this chat.";
    const noGroupKeyText = "Waiting to join... You'll join the chat when someone else jumps in. Alternatively, create an account @ myG.gg";
    return (
      <div
        key={this.props.chatId}
        className="chat-component-base"
      >
        {this.renderHeader()}
        <div className="chat-component-encryption-warning">
          {isGroupWithoutKey ? noGroupKeyText : noUserKeyText}
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  render() {
    if (!this.props.minimised && !this.props.privateKey) return this.renderEncryptedChat();
    let extraClass = "";
    if (this.props.maximised) extraClass += "chat-maximised";
    if (this.props.minimised) extraClass += "chat-minimised";
    if (!this.props.minimised && this.state.settings) extraClass = "chat-settings";
    return (
      <div
        key={this.props.chatId}
        className={`chat-component-base ${extraClass}`}
      >
        {this.renderHeader()}
        {this.state.settings && !this.props.minimised && this.renderSettings()}
        {!this.state.settings && !this.props.minimised && this.renderBody()}
        {!this.state.settings && !this.props.minimised && <div className="chat-component-footer-divider" />}
        {!this.state.settings && !this.props.minimised && this.renderFooter()}
      </div>
    );
  }
}

export function mapStateToProps(state, props) {
  const chat = state.chat.chats.find(chat => chat.chatId === props.chatId) || { contacts: [], guests: [] };
  const isGroup = chat.isGroup;
  const messages = withDatesAndLogs(chat.messages || [], chat.entryLogs || []);
  const contacts = chat.contacts.filter(contactId => contactId !== props.userId);
  const guests = chat.guests.filter(contactId => contactId !== props.userId);
  const fullContacts = chat.fullContacts || [];
  const contactId = !isGroup && contacts[0];
  const contact = (contactId && state.user.contacts.find(contact => contact.contactId === contactId)) || {};
  const contactSubtitle = contact.status && contact.status === 'offline' ? `${formatDateTime(contact.lastSeen)}` : contact.status && `${contact.status}`;
  let chatSubtitle = null;
  const contactsMap = {};
  fullContacts.forEach(contact => contactsMap[contact.contactId] = contact);
  if (isGroup) {
    const memberCount = contacts.length + guests.length;
    const onlineCount = contacts.filter(contactId => (contactsMap[contactId] || {}).status === 'online').length + guests.length;
    chatSubtitle = `${onlineCount}/${memberCount} online`;
  }
  chat.privateKey = deserializeKey(chat.privateKey);
  return {
    messages,
    loadingMessages: chat.loadingMessages,
    noMoreMessages: chat.noMoreMessages,
    contacts: fullContacts,
    contactId,
    contactsMap,
    isGroup,
    group: chat,
    icon: chat.icon || contact.icon || '',
    title: chat.title || contact.name || '',
    subtitle: chatSubtitle || contactSubtitle || '',
    status: chat.status || contact.status || 'offline',
    blocked: chat.blocked || false,
    muted: chat.muted || false,
    selfDestruct: chat.selfDestruct || false,
    lastRead: chat.lastRead || 0,
    lastReads: chat.lastReads || {},
    typing: chat.typing || [],
    maximised: chat.maximised || false,
    minimised: chat.minimised || false,
    userPublicKey: state.encryption.publicKey,
    userPrivateKey: state.encryption.privateKey,
    publicKey: isGroup ? chat.publicKey : contact.publicKey,
    privateKey: isGroup ? chat.privateKey : state.encryption.privateKey,
    disconnected: state.socket.disconnected,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    prepareChat: (chatId, userId, contactId, isGroup) => dispatch(prepareChatAction(chatId, userId, contactId, isGroup)),
    fetchMessages: (chatId, page) => dispatch(fetchMessagesAction(chatId, page)),
    sendMessage: (chatId, userId, alias, content) => dispatch(sendMessageAction(chatId, userId, alias, content)),
    editMessage: (chatId, messageId, content) => dispatch(editMessageAction(chatId, messageId, content)),
    deleteMessage: (chatId, messageId, origin) => dispatch(deleteMessageAction(chatId, messageId, origin)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    checkSelfDestruct: (chatId) => dispatch(checkSelfDestructAction(chatId)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    setTyping: (chatId, isTyping) => dispatch(setTypingAction(chatId, isTyping)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);