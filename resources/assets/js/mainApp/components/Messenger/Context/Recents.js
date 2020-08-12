import React from 'react'
import { connect } from 'react-redux'
import { decryptMessage } from '../../../../integration/encryption'
import { formatAMPM } from '../../../../common/date'
import LoadingIndicator from '../../LoadingIndicator'
import { getAssetUrl } from '../../../../common/assets'
import { openChatById } from '../../../../common/chat'
import { GoogleAnalytics } from '../../../../common/analytics'
import { ignoreFunctions } from '../../../../common/render'
import { fetchRecentsAction } from '../../../../redux/actions/paginationAction'

class Recents extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    if (this.props.expanded) this.props.fetchRecents()
  }

  expand = () => {
    if (!this.props.expanded) this.props.fetchRecents()
    this.props.onExpand(this.props.expanded)
  }

  getChat = (message) => {
    return this.props.chats.find((chat) => parseInt(chat.chatId, 10) === parseInt(message.chatId, 10))
  }

  openChat = (message) => {
    GoogleAnalytics.chatRecentMessageClicked({ messageId: message.messageId })
    if (this.props.disconnected) return
    const chat = this.getChat(message)
    if (chat) this.props.openChat(chat.chatId, chat)
    else openChatById(message.chatId)
  }

  renderLoading = () => {
    if (!this.props.expanded || !this.props.loading) return null
    return (
      <div className='messenger-loading-container'>
        <p className='messenger-loading-hint-top'>Hang on</p>
        <div className='messenger-loading-indicator'>
          <LoadingIndicator />
        </div>
        <p className='messenger-loading-hint-bottom'>Looking for recent messages...</p>
      </div>
    )
  }

  renderEmpty = () => {
    if (this.props.messages.length || !this.props.expanded || this.props.loading) return null
    return (
      <div className='messenger-empty-message-container'>
        <p className='messenger-empty-message'>There aren't any messages here :(</p>
        <p className='messenger-empty-message'>Try sending a message</p>
      </div>
    )
  }

  renderMessages = () => {
    if (!this.props.messages.length || !this.props.expanded || this.props.loading) return null
    return this.props.messages.map(this.renderMessage)
  }

  renderMessage = (message) => {
    return (
      <div key={`recent-${message.messageId}`} className='recent-message clickable' onClick={() => this.openChat(message)}>
        <p className='title'>
          from {message.senderId === this.props.userId ? 'you' : message.senderName} on {message.title}
        </p>
        <div className='content'>
          <span className='message'>{this.renderContent(this.decryptMessage(message).content)}</span>
          <span className='time'>at {formatAMPM(new Date(message.createdAt))}</span>
        </div>
      </div>
    )
  }

  decryptMessage = (message) => {
    if (message.decrypted) return message
    if (message.unencryptedContent) return { ...message, content: message.unencryptedContent }
    const isSent = message.senderId === this.props.userId
    const chat = (!isSent && this.getChat(message)) || {}
    const key = isSent ? this.props.privateKey : chat.isGroup ? chat.privateKey : this.props.privateKey
    const content = decryptMessage(isSent ? message.backup : message.content, key)
    return { ...message, content }
  }

  renderContent = (content) => {
    if (!content) return 'encrypted message'
    if (content.includes('myg-image')) return 'Sent an Image'
    if (content.includes('myg-video')) return 'Sent a Video'
    if (content.includes('myg-sound')) return 'Sent an Audio File'
    return content
  }

  render() {
    const chevronType = this.props.messages.length && this.props.expanded ? 'down' : 'right'
    return (
      <div className='messenger-body-section' key='recents'>
        <div className='messenger-body-section-header clickable' onClick={this.expand}>
          <p className='messenger-body-section-header-name'>recents</p>
          <div className='messenger-body-section-header-info'>
            <div
              className='messenger-body-section-header-icon'
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
            />
          </div>
        </div>
        <div className='messenger-body-section-content'>
          {this.renderLoading()}
          {this.renderEmpty()}
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  return {
    chats: state.chat.chats,
    loading: state.pagination.recentsLoading,
    messages: state.pagination.recents,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecents: () => dispatch(fetchRecentsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recents)
