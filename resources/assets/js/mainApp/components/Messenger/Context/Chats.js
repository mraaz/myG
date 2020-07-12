import React from 'react'
import Chat from '../Chat'
import { ignoreFunctions } from '../../../../common/render'

export default class Chats extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderChat = (chat) => {
    return (
      <Chat
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
    return <div className='messenger-chat-bar'>{this.props.chats.filter((chat) => !chat.closed).map(this.renderChat)}</div>
  }
}
