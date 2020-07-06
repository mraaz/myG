import React from 'react'
import { decryptMessage, deserializeKey } from '../../../../integration/encryption'
import { formatAMPM } from '../../../../common/date'
import { WithTooltip } from '../../Tooltip'
import { ignoreFunctions } from '../../../../common/render'

export default class Group extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  static getDerivedStateFromProps(props) {
    const messages = (props.group || {}).messages || []
    return { messages: JSON.parse(JSON.stringify(messages)) }
  }

  state = {
    messages: [],
  }

  decryptMessage = (message, userPrivateKey, chatPrivateKey) => {
    if (message.decrypted) return message
    if (message.unencryptedContent) return { ...message, content: message.unencryptedContent }
    const isSent = message.senderId === this.props.userId
    const content = decryptMessage(isSent ? message.backup : message.content, isSent ? userPrivateKey : deserializeKey(chatPrivateKey))
    return { ...message, content }
  }

  renderMessage = (content) => {
    if (!content) return null
    if (content.includes('myg-image')) return 'Sent an Image'
    if (content.includes('myg-video')) return 'Sent a Video'
    if (content.includes('myg-sound')) return 'Sent an Audio File'
    return content
  }

  render() {
    const group = this.props.group
    const messages = this.state.messages || []
    const lastMessage = messages[messages.length - 1]
    const unreadCount = 0
    const titleTooLong = group.title.length > 20
    return (
      <div key={`group-${group.chatId}`} className='messenger-contact' onClick={() => this.props.openChat(group.chatId, group)}>
        <div className='messenger-contact-icon' style={{ backgroundImage: `url('${group.icon}')` }} />
        <div className='messenger-contact-body'>
          {titleTooLong ? (
            <WithTooltip position={{ bottom: '24px', left: '-12px' }} text={group.title}>
              <p className='messenger-contact-body-title'>{group.title.slice(0, 17) + '...'}</p>
            </WithTooltip>
          ) : (
            <p className='messenger-contact-body-title'>{group.title}</p>
          )}
          {lastMessage && (
            <p className='messenger-contact-body-subtitle'>
              {this.renderMessage(this.decryptMessage(lastMessage, this.props.privateKey, group.privateKey).content)}
            </p>
          )}
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
