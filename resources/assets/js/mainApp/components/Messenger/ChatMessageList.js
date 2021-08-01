import React from 'react'
import ChatMessage from './ChatMessage'
import logger from '../../../common/logger'
import { ignoreFunctions } from '../../../common/render'

export default class ChatMessageList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderMessage = (message) => {
    return (
      <ChatMessage
        key={message.messageId}
        userId={this.props.userId}
        chatId={this.props.chatId}
        alias={this.props.alias}
        isGroup={this.props.isGroup}
        isGuest={this.props.isGuest}
        channel={this.props.channel}
        canDelete={this.props.canDelete}
        messageId={message.messageId}
        messageListRef={this.props.messageListRef}
        editing={this.props.editing === message.messageId}
        onEdit={this.props.onEdit}
        message={this.props.decryptMessage(message)}
        encryptedMessage={message}
        addReaction={this.props.addReaction}
        removeReaction={this.props.removeReaction}
        replyToMessage={this.props.decryptMessage(this.props.replyToMessage)}
        scrollToMessage={this.props.scrollToMessage}
        editMessage={this.props.editMessage}
        deleteMessage={this.props.deleteMessage}
        showAttachment={this.props.showAttachment}
      />
    )
  }

  render() {
    logger.log('RENDER', 'ChatMessageList')
    return this.props.messages.map(this.renderMessage)
  }
}
