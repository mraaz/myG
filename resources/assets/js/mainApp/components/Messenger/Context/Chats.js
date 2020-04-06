
import React from "react";
import Chat from '../Chat';

export default class Chats extends React.PureComponent {

  renderChat = (chat) => {
    return (
      <Chat
        key={chat.chatId}
        userId={this.props.userId}
        alias={this.props.alias}
        chatId={chat.chatId}
        onClose={chatId => this.props.closeChat(chatId)}
        windowFocused={this.props.windowFocused}
      />
    );
  }

  render() {
    return (
      <div className="messenger-chat-bar">
        {this.props.chats.filter(chat => !chat.closed).map(this.renderChat)}
      </div>
    );
  }

}