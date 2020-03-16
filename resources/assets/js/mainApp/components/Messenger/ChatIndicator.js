import React from 'react';
import { connect } from 'react-redux';

import { fetchUnreadMessagesAction } from '../../../redux/actions/chatAction';

class ChatIndicator extends React.PureComponent {

  componentDidMount() {
    this.props.fetchUnreadMessages();
  }

  render() {
    const active = this.props.unreadMessagesCount && 'active';
    return (
      <div className='comments'>
        <i className='fas fa-comment' />
        <div className={`noti-number ${active}`}>{this.props.unreadMessagesCount}</div>
      </div>
    );
  }

}

export function mapStateToProps(state) {
  const unreadMessages = state.chat.unreadMessages || [];
  return {
    unreadMessagesCount: unreadMessages.length,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    fetchUnreadMessages: () => dispatch(fetchUnreadMessagesAction()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndicator);