import React from 'react';
import ChatMessage from './ChatMessage';

export default class ChatMessageList extends React.PureComponent {
  renderMessage = (message) => {
    return (
      <ChatMessage
        key={message.messageId}
        message={this.props.decryptMessage(message)}
        userId={this.props.userId}
        chatId={this.props.chatId}
        messageId={message.messageId}
        messageListRef={this.props.messageListRef}
        isGroup={this.props.isGroup}
        editing={this.props.editing === message.messageId}
        onEdit={this.props.onEdit}
        editMessage={this.props.editMessage}
      />
    );
  }

  render() {
    return this.props.messages.map(this.renderMessage);
  }
}