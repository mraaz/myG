import React from 'react';
import ChatMessage from './ChatMessage';

export default class ChatMessageList extends React.PureComponent {
  renderMessage = (message) => {
    return (
      <ChatMessage
        key={message.messageId}
        userId={this.props.userId}
        chatId={this.props.chatId}
        isGroup={this.props.isGroup}
        isGuest={this.props.isGuest}
        messageId={message.messageId}
        messageListRef={this.props.messageListRef}
        editing={this.props.editing === message.messageId}
        onEdit={this.props.onEdit}
        message={this.props.decryptMessage(message)}
        editMessage={this.props.editMessage}
        deleteMessage={this.props.deleteMessage}
        showAttachment={this.props.showAttachment}
      />
    );
  }

  render() {
    return this.props.messages.map(this.renderMessage);
  }
}