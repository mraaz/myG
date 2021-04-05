import React from 'react'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../common/render'

class NotificationIcon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderChannelIcon() {
    return <div className={`notification-box notification-myg`}>myG</div>
  }

  render() {
    if (this.props.type === 'channel') return this.renderChannelIcon();
    const counter = this.props[this.props.type];
    return <div className={`notification-box ${counter ? 'notification-alert' : ''}`}>{counter}</div>
  }
}

function mapStateToProps(state) {
  return {
    approvals: state.notifications.approvals,
    alerts: state.notifications.alerts,
    chats: state.notifications.chats,
  }
}

export default connect(mapStateToProps)(NotificationIcon)
