
import React from "react";
import notifyToast from '../../../../common/toast';

export default class EncryptionSettings extends React.PureComponent {

  state = {
    pinInput: '',
    editingPin: false,
    pinError: false,
  }

  requestPinEdit = () => {
    this.setState({ editingPin: true, pinInput: '', pinError: false });
  }

  confirmPinEdit = () => {
    if (this.state.pinInput.trim().length < 12) return notifyToast('Your Encryption Key must have at least 12 characters.');
    this.props.generateKeys(this.state.pinInput.trim());
    this.props.chats.forEach(chat => this.props.clearChat(chat.chatId));
    setTimeout(() => this.setState({ editingPin: false, pinInput: '', pinError: false }));
  }

  render() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">Receive, update, save your chat history in other devices</p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          placeholder="New Encryption Key"
          disabled={!this.state.editingPin}
          value={this.state.editingPin ? this.state.pinInput : this.props.pin}
          onChange={event => this.setState({ pinInput: event.target.value })}
        />
        <div className="messenger-settings-encryption-footer">
          <div
            className="messenger-settings-encryption-footer-button clickable"
            onClick={() => this.state.editingPin ? this.confirmPinEdit() : this.requestPinEdit()}
          >
            {this.state.editingPin ? "SAVE YOUR KEY" : "CHANGE YOUR KEY"}  
          </div>
        </div>
      </div>
    );
  }

}