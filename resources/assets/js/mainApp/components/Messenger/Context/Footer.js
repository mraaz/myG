import React from 'react'
import { getAssetUrl } from '../../../../common/assets'
import logger from '../../../../common/logger'
import { ignoreFunctions } from '../../../../common/render'

export default class Footer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    changingStatus: false,
  }

  setStatus = (status) => {
    this.props.updateStatus(status, true)
    this.setState({ changingStatus: false })
  }

  renderStatusChanger() {
    if (!this.state.changingStatus) return
    return (
      <div className='messenger-settings-status'>
        <p
          className='messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-online'
          onMouseDown={() => this.setStatus('online')}>
          online
        </p>
        <p
          className='messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-playing'
          onMouseDown={() => this.setStatus('playing')}>
          playing
        </p>
        <p
          className='messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-afk'
          onMouseDown={() => this.setStatus('afk')}>
          afk
        </p>
        <p
          className='messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-offline'
          onMouseDown={() => this.setStatus('offline')}>
          invisible
        </p>
      </div>
    )
  }

  render() {
    logger.log('RENDER', 'Footer')
    const bottomBarSpacer = this.props.mobileMenuActive ? { bottom: '52px' } : {};
    return (
      <div className={`messenger-footer-container`} style={this.props.mobile && { width: '100%', ...bottomBarSpacer }}>
        <div className='messenger-footer'>
          <div className='messenger-footer-icon-container'>
            <div className='messenger-footer-icon' style={{ backgroundImage: `url('${this.props.profileImage}')` }} />
            <div
              tabIndex={0}
              className={`messenger-footer-status-indicator messenger-footer-status-${this.props.status} clickable`}
              onClick={() => this.setState((previous) => ({ changingStatus: !previous.changingStatus }))}
              onBlur={() => setTimeout(() => this.setState({ changingStatus: false }), 100)}>
              {this.props.status === 'offline' ? 'invisible' : this.props.status}
            </div>
            <div className='messenger-settings-status-container'>{this.renderStatusChanger()}</div>
          </div>
          <div className='messenger-footer-search-bar'>
            <input
              className='messenger-settings-search-field'
              type='text'
              placeholder='Search'
              value={this.props.search}
              onChange={(event) => this.props.onSearch(event.target.value)}
            />
            <div className='messenger-settings-search-button' style={{ backgroundImage: `url(${getAssetUrl('ic_messenger_search')})` }} />
          </div>
          <div
            className='messenger-footer-settings-button clickable'
            style={{ backgroundImage: `url(${getAssetUrl('ic_messenger_settings')})` }}
            onClick={this.props.onSettingsClicked}></div>
        </div>
      </div>
    )
  }
}
