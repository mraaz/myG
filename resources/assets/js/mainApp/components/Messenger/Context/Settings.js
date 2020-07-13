import React from 'react'
import ToggleButton from 'react-toggle-button'
import EncryptionSettings from './EncryptionSettings'
import GameSettings from './GameSettings'
import BlockedUsers from './BlockedUsers'
import { ignoreFunctions } from '../../../../common/render'

export default class Settings extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  renderNotificationSoundSettings = () => {
    return (
      <div className='messenger-settings-toggle'>
        <div className='messenger-settings-toggle-hint'>
          <div className='messenger-settings-toggle-title'>Sound Alerts</div>
          <div className='messenger-settings-toggle-subtitle'>Receive an alert for incoming messages.</div>
        </div>
        <ToggleButton
          value={!this.props.notificationSoundsDisabled}
          onToggle={(notificationSoundsDisabled) => this.props.toggleNotificationSounds(notificationSoundsDisabled)}
        />
      </div>
    )
  }

  renderPushNotificationsSettings = () => {
    return (
      <div className='messenger-settings-toggle'>
        <div className='messenger-settings-toggle-hint'>
          <div className='messenger-settings-toggle-title'>Push Notifications</div>
          <div className='messenger-settings-toggle-subtitle'>Receive a Push Notifications for incoming messages.</div>
        </div>
        <ToggleButton
          value={this.props.pushNotificationsEnabled}
          onToggle={() => this.props.togglePushNotifications(this.props.userId)}
        />
      </div>
    )
  }

  renderAutoSelfDestructSettings = () => {
    return (
      <div className='messenger-settings-toggle'>
        <div className='messenger-settings-toggle-hint'>
          <div className='messenger-settings-toggle-title'>Auto Destruct</div>
          <div className='messenger-settings-toggle-subtitle'>Any message sent will automatically self destruct.</div>
        </div>
        <ToggleButton
          value={this.props.autoSelfDestruct}
          onToggle={(autoSelfDestruct) => this.props.toggleAutoSelfDestruct(!autoSelfDestruct)}
        />
      </div>
    )
  }

  renderGamesSettings = () => {
    return <GameSettings {...this.props} />
  }

  renderEncryptionSettings() {
    return (
      <EncryptionSettings
        userId={this.props.userId}
        chats={this.props.chats}
        contacts={this.props.contacts}
        pin={this.props.pin}
        privateKey={this.props.privateKey}
        publicKey={this.props.publicKey}
        toggleSettings={this.props.toggleSettings}
        generateKeys={this.props.generateKeys}
        validatePin={this.props.validatePin}
        clearChat={this.props.clearChat}
      />
    )
  }

  renderBlockedUsers() {
    return <BlockedUsers blockedUsers={this.props.blockedUsers} blockUser={this.props.blockUser} unblockUser={this.props.unblockUser} />
  }

  render() {
    return (
      <div className='messenger-settings-container'>
        <p className='messenger-settings-title'>Settings</p>
        {this.renderNotificationSoundSettings()}
        {this.renderPushNotificationsSettings()}
        {this.renderAutoSelfDestructSettings()}
        {this.renderEncryptionSettings()}
        {this.renderGamesSettings()}
        {this.renderBlockedUsers()}
      </div>
    )
  }
}
