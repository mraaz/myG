import React from 'react'
import { attemptSocketConnection } from '../../../../integration/ws/chat'

export default class ConnectionWarning extends React.Component {
  render() {
    return (
      <div className='messenger-connection-warning clickable' onClick={() => attemptSocketConnection()}>
        <p className='messenger-connection-warning-label'>It seems you are offline...</p>
        <p className='messenger-connection-warning-hint'>Click to Reconnect</p>
      </div>
    )
  }
}
