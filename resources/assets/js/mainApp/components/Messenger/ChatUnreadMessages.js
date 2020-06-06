import React from 'react'
import { connect } from 'react-redux'

import { clearUnreadIndicatorAction, openChatAction } from '../../../redux/actions/chatAction'
import { decryptMessage, deserializeKey } from '../../../integration/encryption'
import { formatAMPM } from '../../../common/date'
import { ignoreFunctions } from '../../../common/render'

class ChatUnreadMessages extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.clearUnreadIndicator()
  }

  renderUnreadMessage = (message) => {
    return (
      <div
        key={message.messageId}
        className='unread-message clickable'
        onClick={() => this.props.openChat(message.chatId || message.chat_id)}>
        <div className='title'>
          <p className='sender-name'>From {message.senderName || message.sender_name}</p>
          <p className='date'>{formatAMPM(new Date(message.createdAt || message.created_at))}</p>
        </div>
        <p className='content'>{decryptMessage(message.content, deserializeKey(this.props.privateKey))}</p>
      </div>
    )
  }

  render() {
    return (
      <div id='chat-unread-messages'>
        <div className='container'>
          <p className='header'>Unread Messages</p>
          {this.props.unreadMessages.slice(0).reverse().map(this.renderUnreadMessage)}
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  return {
    chats: state.chat.chats,
    privateKey: state.encryption.privateKey,
    unreadMessages: state.chat.unreadMessages || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearUnreadIndicator: () => dispatch(clearUnreadIndicatorAction()),
    openChat: (chatId) => dispatch(openChatAction(chatId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUnreadMessages)
