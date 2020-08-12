import React from 'react'
import { decryptMessage } from '../../../../integration/encryption'
import { formatAMPM } from '../../../../common/date'
import { ignoreFunctions } from '../../../../common/render'
import { GoogleAnalytics } from '../../../../common/analytics'

export default class Contact extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  static getDerivedStateFromProps(props) {
    const messages = ((props.contact || {}).chat || {}).messages || []
    return { messages: JSON.parse(JSON.stringify(messages)) }
  }

  state = {
    messages: [],
  }

  decryptMessage = (message) => {
    if (message.decrypted) return message
    if (message.unencryptedContent) return { ...message, content: message.unencryptedContent }
    const isSent = message.senderId === this.props.userId
    const content = decryptMessage(isSent ? message.backup : message.content, this.props.privateKey)
    return { ...message, content }
  }

  openChat = (contact) => {
    GoogleAnalytics.chatContactClicked({ contactId: contact.contactId })
    if (this.props.disconnected) return
    if (contact.chat && contact.chat.chatId) return this.props.openChat(contact.chat.chatId, contact.chat)
    this.props.createChat([contact.contactId], this.props.userId)
  }

  countUnreadMessages = (lastRead, messages) => {
    let unreadCount = 0
    messages.reverse().some((message) => {
      if (message.messageId > lastRead) {
        ++unreadCount
        return false
      }
      return true
    })
    return unreadCount
  }

  renderContent = (content) => {
    if (!content) return 'encrypted message'
    if (content.includes('myg-image')) return 'Sent an Image'
    if (content.includes('myg-video')) return 'Sent a Video'
    if (content.includes('myg-sound')) return 'Sent an Audio File'
    return content
  }

  render() {
    const { contact } = this.props
    const { messages } = this.state
    const lastMessage = messages[messages.length - 1]
    const receivedMessages = messages.filter((message) => message.senderId !== this.props.userId)
    const unreadCount = this.countUnreadMessages(contact.chat && contact.chat.lastRead, receivedMessages)
    return (
      <div key={contact.contactId} className='messenger-contact' onClick={() => this.openChat(contact)}>
        <div className='messenger-contact-icon' style={{ backgroundImage: `url('${contact.icon}')` }}>
          <div className={`messenger-contact-online-indicator chat-component-header-status-indicator-${contact.status}`} />
        </div>
        <div className='messenger-contact-body'>
          <p className='messenger-contact-body-title'>{contact.name}</p>
          {lastMessage && <p className='messenger-contact-body-subtitle'>{this.renderContent(this.decryptMessage(lastMessage).content)}</p>}
        </div>
        <div className='messenger-contact-info'>
          {lastMessage && <p className='messenger-contact-info-last-seen'>{formatAMPM(new Date(lastMessage.createdAt))}</p>}
          <div className='messenger-contact-info-unread'>
            <p className='messenger-contact-info-unread-count'>{unreadCount}</p>
          </div>
        </div>
      </div>
    )
  }
}
