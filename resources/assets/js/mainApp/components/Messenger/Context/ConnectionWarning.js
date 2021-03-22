import React from 'react'
import { attemptSocketConnections } from '../../../../integration/ws/chat'
import { ignoreFunctions } from '../../../../common/render'

export default class ConnectionWarning extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return (
      <div className='messenger-connection-warning clickable' onClick={() => attemptSocketConnections()}>
        <p className='messenger-connection-warning-label'>It seems you are offline...</p>
        <p className='messenger-connection-warning-hint'>Click to Reconnect</p>
      </div>
    )
  }
}
