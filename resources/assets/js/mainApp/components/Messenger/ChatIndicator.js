import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchUnreadMessagesAction } from '../../../redux/actions/chatAction'
import { ignoreFunctions } from '../../../common/render'

class ChatIndicator extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.fetchUnreadMessages()
  }

  render() {
    const active = this.props.unreadMessagesCount && 'active'
    return (
      <div className='comments'>
        <Link to='/unread'>
          <i className='fas fa-comment' />
        </Link>
        <div className={`noti-number ${active}`}>{this.props.unreadMessagesCount}</div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const unreadMessages = state.chat.unreadMessages || []
  return {
    unreadMessagesCount: unreadMessages.filter((message) => !message.read).length
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUnreadMessages: () => dispatch(fetchUnreadMessagesAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatIndicator))
