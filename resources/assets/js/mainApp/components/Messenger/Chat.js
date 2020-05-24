import React from 'react';
import { connect } from 'react-redux';

import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import AttachWindow from './AttachWindow';
import ChatOptions from './ChatOptions';
import GroupOptions from './GroupOptions';
import { WithTooltip } from '../Tooltip';

import { prepareChatAction, fetchMessagesAction, sendMessageAction, editMessageAction, deleteMessageAction, updateChatAction, updateChatStateAction, checkSelfDestructAction, clearChatAction, setTypingAction, addReactionAction, removeReactionAction, blockUserAction, unblockUserAction } from '../../../redux/actions/chatAction';
import { withDatesAndLogsAndLastReads } from '../../../common/chat';
import { encryptMessage, decryptMessage, deserializeKey } from '../../../integration/encryption';
import { formatDateTime } from '../../../common/date';
import { getAssetUrl } from '../../../common/assets';
import { showMessengerAlert } from '../../../common/alert';

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
      replyingTo: null,
      settings: false,
      showAttachWindow: false,
      messagePaginationPage: 1,
      attachment: null,
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
    const hasScrolledEnough = messageList.scrollHeight - messageList.scrollTop > 500;
    this.setState({ oldMessages: hasScrolledEnough });
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

  scrollToMessage = (messageId) => {
    const messageIndex = this.props.messages.findIndex(message => message.messageId === messageId);
    if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, messageIndex * 40);
  }

  markAsRead = (lastMessageId) => {
    if (this.props.isGuest) return;
    if (this.props.minimised || !this.props.privateKey || !this.props.windowFocused) return;
    if (!lastMessageId || lastMessageId <= this.props.lastRead || lastMessageId <= this.state.lastRead) return;
    this.setState({ lastRead: lastMessageId });
    this.props.updateChat(this.props.chatId, { markAsRead: true });
  }

  sendMessage = (input, attachment) => {
    if (!input) return Promise.resolve();
    const { messageId: replyId, content } = this.state.replyingTo ? this.decryptMessage(this.state.replyingTo) || {} : {};
    const { content: replyContent, backup: replyBackup } = content ? this.encryptInput(content) : {};
    if (this.state.replyingTo) this.setState({ replyingTo: false });
    return this.props.sendMessage(this.props.chatId, this.props.userId, this.props.alias, this.encryptInput(input), attachment, replyId, replyContent, replyBackup);
  }

  editMessage = (chatId, messageId, input) => {
    this.props.editMessage(chatId, this.props.userId, messageId, this.encryptInput(input));
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
    const encryptedReplyContent = isSent ? message.replyBackup : message.replyContent;
    const privateKey = isSent ? this.props.userPrivateKey : this.props.privateKey;
    const content = decryptMessage(encryptedContent, privateKey);
    const replyContent = encryptedReplyContent && decryptMessage(encryptedReplyContent, privateKey);
    return { ...message, content, replyContent };
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
        blocked={!this.props.isGroup && this.props.blockedUsers.map(user => user.userId).includes(this.props.contactId)}
        messages={this.props.messages}
        contactId={this.props.contactId}
        contactAlias={this.props.title}
        blockUser={this.props.blockUser}
        unblockUser={this.props.unblockUser}
      />
    );
  }

  renderHeader = () => {
    const selfDestructStyle = this.props.selfDestruct && 'chat-component-header-self-destruct';
    const iconClickableStyle = !this.props.isGroup && 'clickable';
    const titleTooLong = this.props.title.length > 20;
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

          {
            titleTooLong ?
              (
                <WithTooltip position={{ bottom: '24px', left: '-12px' }} text={this.props.title}>
                  <div className="chat-component-header-title">
                    {this.props.title.slice(0, 17) + '...'}
                  </div>
                </WithTooltip>
              ) :
              (
                <div className="chat-component-header-title">
                  {this.props.title}
                </div>
              )
          }

          {this.props.subtitle && (
            this.props.isGroup ?
              (
                <WithTooltip position={{ bottom: '16px', left: '-12px' }} text={this.props.contacts.slice(0, 10).map(contact => contact.name).join('\n')}>
                  <div className="chat-component-header-subtitle">
                    {this.props.subtitle}
                  </div>
                </WithTooltip>
              ) :
              (
                <div className="chat-component-header-subtitle">
                  {this.props.subtitle}
                </div>
              )
          )}

        </div>

        {
          !this.props.isGuest && (
            <div className="chat-component-header-options">
              {(!this.state.settings || this.props.minimised) && (
                <div className="chat-component-header-top-buttons">
                  <div className="chat-component-header-button clickable"
                    style={{ backgroundImage: `url(${getAssetUrl('ic_chat_minimise')})` }}
                    onClick={() => this.props.updateChatState(this.props.chatId, { minimised: !this.props.minimised, maximised: false })}
                  />
                  <div className="chat-component-header-button clickable"
                    style={{ backgroundImage: `url(${getAssetUrl('ic_chat_maximise')})` }}
                    onClick={() => this.props.updateChatState(this.props.chatId, { maximised: !this.props.maximised, minimised: false })}
                  />
                  <div className="chat-component-header-button clickable"
                    style={{ backgroundImage: `url(${getAssetUrl('ic_chat_close')})` }}
                    onClick={() => this.props.onClose(this.props.chatId)}
                  />
                </div>
              )}
              <div
                className="chat-component-header-settings clickable"
                style={{ backgroundImage: `url(${getAssetUrl('ic_chat_settings')})` }}
                onClick={() => this.setState(previous => ({ settings: !previous.settings }))}
              />
            </div>
          )
        }

      </div >
    );
  }

  renderMuteBanner = () => {
    if (!this.props.muted) return null;
    return (
      <div className="chat-component-muted-banner">
        This chat is currently muted
        <div className="chat-component-muted-button clickable" onClick={() => this.props.updateChat(this.props.chatId, { muted: false })}>
          Unmute
        </div>
      </div>
    );
  }

  renderBody = () => {
    const lastMessage = (this.props.messages[this.props.messages.length - 1] || {});
    return (
      <div
        className="chat-component-body"
        ref={this.messageListRef}
      >
        {this.renderLoadingIndicator()}
        {this.renderEmptyChatMessage()}
        <ChatMessageList
          userId={this.props.userId}
          chatId={this.props.chatId}
          alias={this.props.alias}
          isGroup={this.props.isGroup}
          isGuest={this.props.isGuest}
          messages={this.props.messages}
          messageListRef={this.messageListRef}
          editing={this.state.editing}
          onEdit={this.onEdit}
          addReaction={this.props.addReaction}
          removeReaction={this.props.removeReaction}
          editMessage={this.editMessage}
          replyingTo={this.state.replyingTo}
          replyToMessage={message => this.setState({ replyingTo: message })}
          scrollToMessage={this.scrollToMessage}
          deleteMessage={this.props.deleteMessage}
          decryptMessage={this.decryptMessage}
          showAttachment={attachment => this.setState({ attachment })}
        />
        {this.renderTypingIndicator()}
      </div>
    );
  }

  renderLoadingIndicator() {
    if (!this.props.loadingMessages) return null;
    return (
      <p className="chat-component-loading-indicator">loading messages ...</p>
    );
  }

  renderEmptyChatMessage() {
    if (this.props.messages.length) return;
    return (
      <div className="chat-component-empty-chat-message clickable" onClick={() => showMessengerAlert("Most E2E store a secret key on a device. This means you need a device to access your messages. myG emails you the secret key, which allows you to get E2E without additional gadgets. Only you have access to this key and with it you can decrypt your chat history. With great power, comes great responsibility. If you lose your key unfortunately, you will also lose your chat history, not even the god-like nerds @ myG can recover this.")}>
        <p>Messages you send to this chat are secured with end-to-end encryption.</p>
        <p>Please keep your encryption key safe, otherwise you will LOSE your chat history. Click for more info.</p>
      </div>
    );
  }

  renderTypingIndicator() {
    if (!this.props.typing.length) return;
    const usersTyping = this.props.isGroup ? this.props.typing.map(userId => (this.props.contacts.find(contact => contact.contactId === userId) || {}).name) : [this.props.title];
    const typingHint = usersTyping.length > 1 ? usersTyping.join(', ') + " are typing..." : usersTyping[0] + " is typing...";
    return (
      <div key={'typing'}
        className={`chat-component-message chat-component-message-received`}
      >
        <div className="chat-component-message-typing-hint">{typingHint}</div>
        <div className="chat-component-message-container">
          <div className="dot-flashing" />
        </div>
      </div>
    );
  }

  renderScrollToEndIndicator() {
    if (!this.state.oldMessages) return <div className="chat-component-footer-divider" />;
    return (
      <div key={'scroll'} className="chat-component-scroll-to-bottom clickable"
        onClick={() => {
          this.setState({ oldMessages: false });
          this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight);
        }}
      >
        You are viewing old messages, jump to recent ones?
      </div>
    );
  }

  renderAttachWindow = () => {
    return <AttachWindow
      sendMessage={this.sendMessage}
      isGuest={this.props.isGuest}
      show={this.state.showAttachWindow}
      onEmoji={emoji => {
        this.setState({ showAttachWindow: false, selectedEmoji: emoji.colons.includes('flag') ? emoji.colons : emoji.native }, () => {
          setTimeout(() => this.setState({ selectedEmoji: null }));
        });
      }}
      onFinish={() => this.setState({ showAttachWindow: false })}
    />;
  }

  renderAttachment = () => {
    const { image, video } = this.state.attachment;
    return (
      <div className="chat-component-attachment-modal"
        onClick={() => this.setState({ attachment: null })}
      >
        {image && (
          <div
            className={`chat-component-attachment`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}
        {video && (
          <video src={video} autoPlay type="video/mp4"></video>
        )}
      </div>
    );
  }

  renderFooter = () => {
    const rotatedStyle = this.state.showAttachWindow ? 'chat-component-attach-button-rotated' : '';
    return (
      <div className="chat-component-footer">
        <div className="chat-component-attach-button-container">
          <div className={`chat-component-attach-button clickable ${rotatedStyle}`}
            onClick={() => this.setState(previous => ({ showAttachWindow: !previous.showAttachWindow }))}
            style={{ backgroundImage: `url(${getAssetUrl('ic_chat_attach')})` }}
          />
          <div className="chat-component-attach-button-divider" />
        </div>
        <ChatInput
          replyingTo={this.state.replyingTo && this.decryptMessage(this.state.replyingTo)}
          connected={!this.props.disconnected}
          blocked={!this.props.isGroup && this.props.blockedUsers.map(user => user.userId).includes(this.props.contactId)}
          isDecryptable={this.props.privateKey}
          selectedEmoji={this.state.selectedEmoji}
          sendMessage={this.sendMessage}
          editLastMessage={this.editLastMessage}
          onBlur={() => this.setState({ replyingTo: null })}
          setTyping={isTyping => !this.props.isGuest && this.props.setTyping(this.props.chatId, isTyping)}
        />
      </div>
    );
  }

  renderEncryptedChat() {
    const isGroupWithoutKey = this.props.isGroup && !this.props.privateKey;
    const noUserKeyText = "Please inform your encryption key to read the contents of this chat.";
    const noGroupKeyText = `Waiting to join... You'll join the chat when someone else jumps in.${this.props.isGuest ? "Alternatively, create an account @ myG.gg" : ""}`;
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
    if (this.props.isGuest) extraClass = "chat-guest";
    return (
      <div
        key={this.props.chatId}
        className={`chat-component-base ${extraClass}`}
      >
        {this.renderHeader()}
        {!this.state.settings && !this.props.minimised && this.renderMuteBanner()}
        {this.state.attachment && this.renderAttachment()}
        {this.state.settings && !this.props.minimised && this.renderSettings()}
        {!this.state.settings && !this.props.minimised && this.renderBody()}
        {!this.state.settings && !this.props.minimised && this.renderScrollToEndIndicator()}
        {!this.state.settings && !this.props.minimised && this.renderAttachWindow()}
        {!this.state.settings && !this.props.minimised && this.renderFooter()}
      </div>
    );
  }
}

export function mapStateToProps(state, props) {
  const chat = state.chat.chats.find(chat => chat.chatId === props.chatId) || { contacts: [], guests: [] };
  const isGroup = chat.isGroup;
  const contacts = chat.contacts.filter(contactId => contactId !== props.userId);
  const guests = chat.guests.filter(contactId => contactId !== props.userId);
  const fullContacts = chat.fullContacts || [];
  const contactId = !isGroup && contacts[0];
  const contact = (contactId && state.user.contacts.find(contact => contact.contactId === contactId)) || {};
  const contactSubtitle = contact.status && contact.status === 'offline' ? `Last seen ${formatDateTime(contact.lastSeen)}` : contact.status && `${contact.status}`;
  let chatSubtitle = null;
  const contactsMap = {};
  fullContacts.forEach(contact => contactsMap[contact.contactId] = contact);
  if (!isGroup) contactsMap[contactId] = contact;
  if (isGroup) {
    const memberCount = contacts.length + guests.length + 1;
    const onlineCount = contacts.filter(contactId => (contactsMap[contactId] || {}).status === 'online').length + guests.length + 1;
    chatSubtitle = `${onlineCount}/${memberCount} online`;
  }
  chat.privateKey = deserializeKey(chat.privateKey);
  const messages = withDatesAndLogsAndLastReads(chat.messages || [], chat.entryLogs || [], contactsMap || {}, chat.lastReads || {});
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
    muted: chat.muted || false,
    selfDestruct: chat.selfDestruct || false,
    lastRead: chat.lastRead || 0,
    lastReads: chat.lastReads || {},
    blockedUsers: state.chat.blockedUsers || [],
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
    sendMessage: (chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup) => dispatch(sendMessageAction(chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup)),
    editMessage: (chatId, userId, messageId, content) => dispatch(editMessageAction(chatId, userId, messageId, content)),
    deleteMessage: (chatId, userId, messageId, origin) => dispatch(deleteMessageAction(chatId, userId, messageId, origin)),
    addReaction: (chatId, userId, messageId, reactionId) => dispatch(addReactionAction(chatId, userId, messageId, reactionId)),
    removeReaction: (chatId, userId, messageId, reactionId) => dispatch(removeReactionAction(chatId, userId, messageId, reactionId)),
    updateChat: (chatId, payload) => dispatch(updateChatAction(chatId, payload)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    blockUser: (blockedUserId) => dispatch(blockUserAction(blockedUserId)),
    unblockUser: (blockedUserId) => dispatch(unblockUserAction(blockedUserId)),
    checkSelfDestruct: (chatId) => dispatch(checkSelfDestructAction(chatId)),
    clearChat: (chatId) => dispatch(clearChatAction(chatId)),
    setTyping: (chatId, isTyping) => dispatch(setTypingAction(chatId, isTyping)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);