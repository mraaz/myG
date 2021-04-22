import React from 'react'
import { copyToClipboard } from '../../../common/clipboard'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'

export default class GroupLinkOptions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    currentTab: 0,
  }

  renderHeader = () => {
    return (
      <div className='chat-group-links-header'>
        <p className='chat-group-links-header-title'>Invite link settings</p>
        <div
          className='chat-group-links-header-close-button clickable'
          style={{ backgroundImage: `url(${getAssetUrl('ic_chat_close')})` }}
          onClick={() => this.props.onClose()}
        />
      </div>
    )
  }

  renderLinkTabs = () => {
    const selectedStyle = 'chat-group-links-tab-selected'
    return (
      <div className='chat-group-links-tabs'>
        <div
          className={`chat-group-links-tab clickable ${this.state.currentTab === 0 && selectedStyle}`}
          onClick={() => this.setState({ currentTab: 0 })}>
          Link A
        </div>
        <div
          className={`chat-group-links-tab clickable ${this.state.currentTab === 1 && selectedStyle}`}
          onClick={() => this.setState({ currentTab: 1 })}>
          Link B
        </div>
        <div
          className={`chat-group-links-tab clickable ${this.state.currentTab === 2 && selectedStyle}`}
          onClick={() => this.setState({ currentTab: 2 })}>
          Link C
        </div>
      </div>
    )
  }

  renderCurrentLinkTab = () => {
    const link = this.props.group.links[this.state.currentTab]
    const linkURL = window.location.protocol + '//' + window.location.host + '/link/' + link.uuid
    return (
      <div className='chat-group-links-current-tab-container'>
        <div className='chat-group-links-current-link-container'>
          <div className='chat-group-links-current-link' style={this.props.mobile && { width: '64vw', overflowX: 'scroll', padding: '10px 0 0 0', height: '40px' }}>
            {linkURL}
          </div>
        </div>
        <div className={`chat-group-links-copy-button clickable`} onClick={() => copyToClipboard(linkURL)}>
          copy
        </div>
      </div>
    )
  }

  renderLinkRuler = () => {
    const link = this.props.group.links[this.state.currentTab]
    const selectedOptionStyle = 'chat-group-links-ruler-option-inside-selected'
    const selectedTextStyle = 'chat-group-links-ruler-option-text-selected'
    return (
      <div className='chat-group-links-ruler-container'>
        <div className='chat-group-links-ruler' />
        <div
          className='chat-group-links-ruler-option clickable'
          onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, null, false)}>
          <div className={`chat-group-links-ruler-option-inside ${link.expiry === null && selectedOptionStyle}`} />
          <div style={this.props.mobile && { marginLeft: 0, width: '12px;' }} className={`chat-group-links-ruler-option-text ${link.expiry === null && selectedTextStyle}`}>{this.props.mobile ? '∞' : 'Unlimited'}</div>
        </div>
        <div
          className='chat-group-links-ruler-option clickable'
          onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, 3, false)}>
          <div className={`chat-group-links-ruler-option-inside ${link.expiry === 3 && selectedOptionStyle}`} />
          <div style={this.props.mobile && { marginLeft: 0, width: '12px;' }} className={`chat-group-links-ruler-option-text ${link.expiry === 3 && selectedTextStyle}`}>{this.props.mobile ? '3hrs' : 'Last 3hrs'}</div>
        </div>
        <div
          className='chat-group-links-ruler-option clickable'
          onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, 6, false)}>
          <div className={`chat-group-links-ruler-option-inside ${link.expiry === 6 && selectedOptionStyle}`} />
          <div style={this.props.mobile && { marginLeft: 0, width: '12px;' }} className={`chat-group-links-ruler-option-text ${link.expiry === 6 && selectedTextStyle}`}>{this.props.mobile ? '6hrs' : 'Last 6hrs'}</div>
        </div>
        <div
          className='chat-group-links-ruler-option clickable'
          onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, 12, false)}>
          <div className={`chat-group-links-ruler-option-inside ${link.expiry === 12 && selectedOptionStyle}`} />
          <div style={this.props.mobile && { marginLeft: 0, width: '12px;' }} className={`chat-group-links-ruler-option-text ${link.expiry === 12 && selectedTextStyle}`}>{this.props.mobile ? '12hrs' : 'Last 12hrs'}</div>
        </div>
        <div
          className='chat-group-links-ruler-option clickable'
          onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, 24, false)}>
          <div className={`chat-group-links-ruler-option-inside ${link.expiry === 24 && selectedOptionStyle}`} />
          <div style={this.props.mobile && { marginLeft: 0, width: '12px;' }} className={`chat-group-links-ruler-option-text ${link.expiry === 24 && selectedTextStyle}`}>{this.props.mobile ? '24hrs' : 'Last 24hrs'}</div>
        </div>
      </div>
    )
  }

  renderExpireButton = () => {
    const link = this.props.group.links[this.state.currentTab]
    return (
      <div
        className='chat-group-links-expire-link-button clickable'
        onClick={() => this.props.updateLink(this.props.group.chatId, link.uuid, undefined, true)}>
        expire link
      </div>
    )
  }

  render() {
    return (
      <div className='chat-group-links' style={this.props.mobile && { borderRadius: 0 }}>
        {this.renderHeader()}
        {this.renderLinkTabs()}
        {this.renderCurrentLinkTab()}
        {this.renderLinkRuler()}
        {this.renderExpireButton()}
      </div>
    )
  }
}
