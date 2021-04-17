import React from 'react'
import Chat from '../Chat'
import { ignoreFunctions } from '../../../../common/render'

export default class Chats extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderChat = (chat) => {
    if (chat.channelId) return;
    return (
      <Chat
        mobile={this.props.mobile}
        key={chat.chatId}
        userId={this.props.userId}
        alias={this.props.alias}
        chatId={chat.chatId}
        forceSelfDestruct={this.props.forceSelfDestruct}
        onClose={(chatId) => this.props.closeChat(chatId)}
        windowFocused={this.props.windowFocused}
      />
    )
  }

  render() {
    const openChats = this.props.chats.filter((chat) => !chat.closed);
    const chats = openChats.length ? this.props.mobile ? [openChats[0]] : openChats : [];
    return (
      <div className='messenger-chat-bar' style={this.props.mobile && { right: 0 }}>
        {chats.map(this.renderChat)}
      </div>
    );
  }
}
