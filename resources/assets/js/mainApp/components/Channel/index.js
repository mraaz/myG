import React from 'react'
import { connect } from 'react-redux'
import ChatMessageList from '../Messenger/ChatMessageList'
import ChatInput from '../Messenger/ChatInput'
import AttachWindow from '../Messenger/AttachWindow'
import { fetchChannelAction, fetchMessagesAction, sendMessageAction, editMessageAction, deleteMessageAction, updateChatStateAction, setTypingAction, addReactionAction, removeReactionAction, blockUserAction, unblockUserAction } from '../../../redux/actions/chatAction'
import { withDatesAndLogsAndLastReads } from '../../../common/chat'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import { monitorChannel } from '../../../integration/ws/chat'

export class Channel extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  constructor(props) {
    super(props)
    this.state = {
      lastMessageId: '',
      editing: false,
      replyingTo: null,
      showAttachWindow: false,
      messagePaginationPage: 1,
      attachment: null,
      loadedAllMessages: false,
      hasScrolledToLastRead: false,
    }
    this.messageListRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleMessageListScroll, { passive: true })
    document.addEventListener('wheel', this.handleMessageListScroll, { passive: true })
    monitorChannel(this.props.userId, this.props.channelId)
    this.props.fetchChannel(this.props.channelId)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleMessageListScroll, false)
    document.removeEventListener('wheel', this.handleMessageListScroll, false)
  }

  handleMessageListScroll = () => {
    const messageList = this.messageListRef.current
    if (!messageList) return
    const hasScrolledEnough = messageList.scrollHeight - messageList.scrollTop > 750
    this.setState({ oldMessages: hasScrolledEnough })
    if (messageList.scrollTop !== 0 || this.props.loadingMessages || this.props.noMoreMessages) return
    const nextPage = this.state.messagePaginationPage + 1
    this.props.fetchMessages(this.props.chatId, nextPage)
    this.setState({ messagePaginationPage: nextPage })
    this.messageListRef.current.scrollTo(0, 4)
  }

  componentDidUpdate() {
    this.scrollMessagesIfNeeded()
  }

  scrollMessagesIfNeeded() {
    const isValidMessage = (message) => !message.isLastRead && !message.isEntryLog && !message.isDateDivisor
    const lastMessage = this.props.messages.slice().reverse().find(isValidMessage) || {}
    const lastMessageTime = lastMessage.createdAt
    const lastMessageId = lastMessage.messageId
    const lastReadMessageId = this.props.lastRead
    const messageTimeDelta = Date.now() - new Date(lastMessageTime).getTime()
    const tenSeconds = 1000 * 10
    const hasNewMessage = lastMessageId > this.state.lastMessageId
    if (!this.state.hasScrolledToLastRead && messageTimeDelta > tenSeconds) {
      if (this.state.lastMessageId) this.setState({ hasScrolledToLastRead: true })
      this.setState({ lastMessageId })
      return this.scrollToMessage(lastReadMessageId)
    }
    if (hasNewMessage) {
      this.setState({ lastMessageId })
      if (this.messageListRef.current) this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight)
      return
    }
  }

  scrollToMessage = (messageId) => {
    let message = document.querySelector(`[data-message-id="${messageId}"]`)
    if (message) message.scrollIntoView()
    else if (!this.state.loadedAllMessages) {
      this.props.fetchMessages(this.props.chatId, 'ALL').then(() => {
        this.setState({ loadedAllMessages: true })
        message = document.querySelector(`[data-message-id="${messageId}"]`)
        if (message) message.scrollIntoView()
      })
    }
  }

  sendMessage = (input, attachment) => {
    if (!input) return Promise.resolve()
    const { messageId: replyId, content: replyContent } = this.state.replyingTo || {};
    if (this.state.replyingTo) this.setState({ replyingTo: false })
    return this.props.sendMessage(
      this.props.chatId,
      this.props.userId,
      this.props.alias,
      { content: input, backup: input },
      attachment,
      replyId,
      replyContent,
      replyContent,
      input,
      this.props.forceSelfDestruct
    )
  }

  editMessage = (chatId, messageId, input) => {
    this.props.editMessage(chatId, this.props.userId, messageId, input)
  }

  editLastMessage = () => {
    const sentMessages = this.props.messages.filter((message) => message.senderId == this.props.userId && !message.deleted)
    const lastSentMessage = sentMessages[sentMessages.length - 1]
    if (!lastSentMessage) return
    this.setState({ editing: lastSentMessage.messageId })
  }

  onEdit = () => {
    this.setState({ editing: false })
  }

  renderBody = () => {
    return (
      <div className='chat-component-body' ref={this.messageListRef}>
        {this.renderLoadingIndicator()}
        <ChatMessageList
          userId={this.props.userId}
          chatId={this.props.chatId}
          alias={this.props.alias}
          messages={this.props.messages}
          messageListRef={this.messageListRef}
          editing={this.state.editing}
          isGroup={true}
          onEdit={this.onEdit}
          addReaction={this.props.addReaction}
          removeReaction={this.props.removeReaction}
          decryptMessage={(message) => message}
          editMessage={this.editMessage}
          replyingTo={this.state.replyingTo}
          replyToMessage={(message) => this.setState({ replyingTo: message })}
          scrollToMessage={this.scrollToMessage}
          deleteMessage={this.props.deleteMessage}
          showAttachment={(attachment) => this.setState({ attachment })}
        />
        {this.renderTypingIndicator()}
      </div>
    )
  }

  renderLoadingIndicator() {
    if (!this.props.loadingMessages) return null
    return <p className='chat-component-loading-indicator'>loading messages ...</p>
  }

  renderTypingIndicator() {
    if (!this.props.typing.length) return
    const usersTyping = this.props.isGroup
      ? this.props.typing.map((userId) => (this.props.contacts.find((contact) => contact.contactId === userId) || {}).name)
      : [this.props.title]
    const typingHint = usersTyping.length > 1 ? usersTyping.join(', ') + ' are typing...' : usersTyping[0] + ' is typing...'
    return (
      <div key={'typing'} id='chat-component-message' className='chat-component-message-received'>
        <div className='chat-component-message-typing-hint'>{typingHint}</div>
        <div className='chat-component-message-container'>
          <div className='dot-flashing' />
        </div>
      </div>
    )
  }

  renderScrollToEndIndicator() {
    if (!this.state.oldMessages) return <div className='chat-component-footer-divider' />
    return (
      <div
        key={'scroll'}
        className='chat-component-scroll-to-bottom clickable'
        onClick={() => {
          this.setState({ oldMessages: false })
          this.messageListRef.current.scrollTo(0, this.messageListRef.current.scrollHeight)
        }}>
        You are viewing old messages, jump to recent ones?
      </div>
    )
  }

  renderAttachWindow = () => {
    return (
      <AttachWindow
        sendMessage={this.sendMessage}
        isGuest={this.props.isGuest}
        show={this.state.showAttachWindow}
        onEmoji={(emoji) => {
          this.setState({ showAttachWindow: false, selectedEmoji: emoji.colons.includes('flag') ? emoji.colons : emoji.native }, () => {
            setTimeout(() => this.setState({ selectedEmoji: null }))
          })
        }}
        onFinish={() => this.setState({ showAttachWindow: false })}
      />
    )
  }

  renderAttachment = () => {
    const { image, video } = this.state.attachment
    return (
      <div className='chat-component-attachment-modal' onClick={() => this.setState({ attachment: null })}>
        {image && <div className={`chat-component-attachment`} style={{ backgroundImage: `url('${image}')` }} />}
        {video && <video src={video} autoPlay type='video/mp4'></video>}
      </div>
    )
  }

  renderOpenInNewPageButton = () => (
    <div
      className='open-in-new-page clickable'
      style={{ backgroundImage: `url(https://myG.gg/platform_images/Profile/newWindow-icon.svg)` }}
      onClick={() => window.router.push('/myg-chat')}
    />
  )

  renderFooter = () => {
    const rotatedStyle = this.state.showAttachWindow ? 'chat-component-attach-button-rotated' : ''
    return (
      <div className='chat-component-footer'>
        <div className='chat-component-attach-button-container'>
          <div
            className={`chat-component-attach-button clickable ${rotatedStyle}`}
            onClick={() => this.setState((previous) => ({ showAttachWindow: !previous.showAttachWindow }))}
            style={{ backgroundImage: `url(${getAssetUrl('ic_chat_attach')})` }}
          />
          <div className='chat-component-attach-button-divider' />
        </div>
        <ChatInput
          slowmode
          chatId={this.props.chatId}
          replyingTo={this.state.replyingTo}
          connected={!this.props.disconnected}
          isDecryptable={true}
          selectedEmoji={this.state.selectedEmoji}
          sendMessage={this.sendMessage}
          editLastMessage={this.editLastMessage}
          onBlur={() => this.setState({ replyingTo: null })}
          setTyping={(isTyping) => this.props.setTyping(this.props.chatId, isTyping)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className='messenger' style={{ all: 'unset' }}>
        <div className={`chat-component-base ${!!this.props.page ? 'channel-page' : 'channel'}`}>
          {this.state.attachment && this.renderAttachment()}
          {this.renderBody()}
          {this.renderScrollToEndIndicator()}
          {this.renderAttachWindow()}
          {this.renderFooter()}
          {!this.props.page && this.renderOpenInNewPageButton()}
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state, props) {
  const userId = state.user.userId;
  const alias = state.user.alias;
  const chatId = state.chat.channels[props.channelId]
  const chat = state.chat.chats.find((chat) => chat.chatId === chatId) || {};
  const loadingMessages = chat.loadingMessages || false;
  const noMoreMessages = chat.noMoreMessages || false;
  const typing = chat.typing || [];
  const chatMessages = chat.messages || [];
  const entryLogs = chat.entryLogs || [];
  const messages = withDatesAndLogsAndLastReads(chatMessages, entryLogs, {}, {}, userId);
  const blockedUsers = state.chat.blockedUsers || [];
  const disconnected = state.socket.disconnected;
  return { chatId, userId, alias, messages, loadingMessages, noMoreMessages, typing, blockedUsers, disconnected }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannelAction(channelId)),
    fetchMessages: (chatId, page) => dispatch(fetchMessagesAction(chatId, page)),
    sendMessage: (chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup, unencryptedContent, forceSelfDestruct) => dispatch(sendMessageAction(chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup, unencryptedContent, forceSelfDestruct)),
    editMessage: (chatId, userId, messageId, content) => dispatch(editMessageAction(chatId, userId, messageId, content)),
    deleteMessage: (chatId, userId, messageId, origin) => dispatch(deleteMessageAction(chatId, userId, messageId, origin)),
    addReaction: (chatId, userId, messageId, reactionId) => dispatch(addReactionAction(chatId, userId, messageId, reactionId)),
    removeReaction: (chatId, userId, messageId, reactionId) => dispatch(removeReactionAction(chatId, userId, messageId, reactionId)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    blockUser: (blockedUserId) => dispatch(blockUserAction(blockedUserId)),
    unblockUser: (blockedUserId) => dispatch(unblockUserAction(blockedUserId)),
    setTyping: (chatId, isTyping) => dispatch(setTypingAction(chatId, isTyping)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel)