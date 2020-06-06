import React from 'react'
import Divider from './Divider'
import GroupCreation from '../GroupCreation'
import { deserializeKey, decryptMessage, generateKeysSync as generateGroupKeys } from '../../../../integration/encryption'
import { formatAMPM } from '../../../../common/date'
import { WithTooltip } from '../../Tooltip'
import { uploadGroupIcon } from '../../../../integration/http/chat'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'

export default class Groups extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    showingGroupCreation: false,
  }

  decryptMessage = (message, userPrivateKey, chatPrivateKey) => {
    const isSent = message.senderId === this.props.userId
    const content = decryptMessage(isSent ? message.backup : message.content, isSent ? userPrivateKey : deserializeKey(chatPrivateKey))
    return { ...message, content }
  }

  openChat = (contact) => {
    if (this.props.disconnected) return
    if (contact.chat.chatId) return this.props.openChat(contact.chat.chatId)
    this.props.createChat([contact.contactId], this.props.userId)
  }

  createGroup = async (icon, key, title, contacts, gameId) => {
    const { encryption } = generateGroupKeys()
    this.setState({ showingGroupCreation: false })
    const {
      value: {
        chat: { chatId },
      },
    } = await this.props.createChat(contacts, this.props.userId, title, icon, encryption, true, null, gameId)
    if (key) await uploadGroupIcon(chatId, key)
  }

  renderGroupButton = () => {
    return (
      <div>
        <div className='messenger-new-group-button clickable' onClick={() => this.setState({ showingGroupCreation: true })}>
          <div className='messenger-new-group-button-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_create')})` }} />
          Create Group
        </div>
        {!this.props.groups.length && (
          <div className='messenger-empty-message-container'>
            <p className='messenger-empty-message'>You aren't part of any group{this.props.inGame ? ' for this game' : ''} yet :(</p>
            <p className='messenger-empty-message'>
              {this.props.contacts.length ? 'Try adding some of your friends to a group' : 'You can find groups through matchmaking'}
            </p>
          </div>
        )}
        {this.state.showingGroupCreation && (
          <GroupCreation
            game={this.props.game}
            onCreate={this.createGroup}
            onCancel={() => this.setState({ showingGroupCreation: false })}
          />
        )}
      </div>
    )
  }

  renderGroup = (group) => {
    const messages = group.messages || []
    const lastMessage = messages[messages.length - 1]
    const unreadCount = 0
    const titleTooLong = group.title.length > 20
    return (
      <div key={`group-${group.chatId}`} className='messenger-contact' onClick={() => this.props.openChat(group.chatId)}>
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
              {this.decryptMessage(lastMessage, this.props.privateKey, group.privateKey).content}
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

  render() {
    const isSearching = this.props.search.trim()
    const search = (name) => (isSearching ? name.toLowerCase().includes(this.props.search.toLowerCase()) : true)
    const groups = this.props.groups.slice(0).filter((group) => search(group.title))
    return Divider(
      'groups',
      this.props.expanded,
      () => this.props.onExpand(this.props.expanded),
      () => {
        if (!this.props.groups.length) return this.renderGroupButton()
        return (
          <div>
            {this.renderGroupButton()}
            <div className='messenger-body-section-content'>{groups.map(this.renderGroup)}</div>
          </div>
        )
      }
    )
  }
}
