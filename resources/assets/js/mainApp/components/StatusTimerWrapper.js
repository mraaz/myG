import React from 'react'
import IdleTimer from 'react-idle-timer'

/**
 * IdleTimer Wrapper for User Status.
 * Prevents re-rendering the Timer if the changed props have nothing to do with status.
 */
export default class StatusTimerWrapper extends React.Component {
  shouldComponentUpdate(nextProps) {
    const statusChanged = this.props.status !== nextProps.status
    const statusLockChanged = this.props.isStatusLocked !== nextProps.isStatusLocked
    return statusChanged || statusLockChanged
  }

  onAction = () => {
    if (this.props.isStatusLocked) return
    if (this.props.status === 'online') return
    this.props.updateStatus('online', false)
  }

  onIdle = () => {
    if (this.props.isStatusLocked) return
    if (this.props.status === 'afk') return
    this.props.updateStatus('afk', false)
  }

  render() {
    return <IdleTimer onAction={this.onAction} onIdle={this.onIdle} throttle={3000} timeout={1000 * 60} />
  }
}
