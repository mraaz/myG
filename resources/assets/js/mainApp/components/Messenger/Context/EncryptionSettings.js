
import React from "react";
import notifyToast from '../../../../common/toast';
import LoadingIndicator from '../../LoadingIndicator';
import { fetchMessages, editMessage } from '../../../../integration/http/chat';
import { decryptMessage, encryptMessage } from "../../../../integration/encryption";
import logger from '../../../../common/logger';

export default class EncryptionSettings extends React.PureComponent {

  state = {
    pinInput: '',
    editingPin: false,
    pinError: false,
    showKey: false,
    reEncryptingMessages: false,
    reEncryptionState: '',
  }

  requestPinEdit = () => {
    this.setState({ editingPin: true, pinInput: '', pinError: false });
  }

  confirmPinEdit = async () => {
    if (this.state.pinInput.trim().length < 12) return notifyToast('Your Encryption Key must have at least 12 characters.');

    logger.log('CHAT', `Re-Encryption - Starting for ${this.props.chats.length} Chats`);

    this.setState({ reEncryptingMessages: true });
    this.props.toggleSettings();

    const chats = JSON.parse(JSON.stringify(this.props.chats));
    chats.forEach(chat => {
      if (!chat.messages) chat.messages = [];
    })
    let chatsProcessed, messagesProcessed;

    chatsProcessed = 0;
    for (const chat of chats) {
      logger.log('CHAT', `Re-Encryption - Downloading Messages for Chat ${chat.chatId}`);
      ++chatsProcessed;
      this.setState({ reEncryptionState: `(1/5) We are downloading your messages (${chatsProcessed} of ${chats.length} chats)...` });
      const { messages } = await fetchMessages(chat.chatId, 'ALL');
      chat.messages = messages;
    }

    chatsProcessed = 0;
    for (const chat of chats) {
      logger.log('CHAT', `Re-Encryption - Decrypting Messages for Chat ${chat.chatId}`);
      ++chatsProcessed;
      messagesProcessed = 0;
      if (!chat.isGroup) {
        for (const message of chat.messages) {
          ++messagesProcessed;
          this.setState({ reEncryptionState: `(2/5) We are decrypting your messages (${chatsProcessed} of ${chats.length} chats \n and ${messagesProcessed} of ${chat.messages.length} messages)...` });
          const { content } = this.decryptMessage(message, this.props.privateKey);
          message.content = content;
        }
      }
    }

    this.setState({ reEncryptionState: '(3/5) We are changing your encryption key...' });
    const { value: { encryption: { privateKey, publicKey } } } = await this.props.generateKeys(this.state.pinInput.trim());

    chatsProcessed = 0;
    for (const chat of chats) {
      logger.log('CHAT', `Re-Encryption - Re-Encrypting Messages for Chat ${chat.chatId}`);
      ++chatsProcessed;
      messagesProcessed = 0;
      if (!chat.isGroup) {
        for (const message of chat.messages) {
          ++messagesProcessed;
          this.setState({ reEncryptionState: `(4/5) We are re-encrypting your messages (${chatsProcessed} of ${chats.length} chats \n and ${messagesProcessed} of ${chat.messages.length} messages)...` });
          const { content, backup } = this.encryptInput(message.content, message, privateKey, publicKey);
          message.content = content;
          message.backup = backup;
        }
      }
    }

    chatsProcessed = 0;
    for (const chat of chats) {
      logger.log('CHAT', `Re-Encryption - Uploading Messages for Chat ${chat.chatId}`);
      ++chatsProcessed;
      messagesProcessed = 0;
      if (!chat.isGroup) {
        for (const message of chat.messages) {
          ++messagesProcessed;
          this.setState({ reEncryptionState: `(5/5) We are uploading your messages (${chatsProcessed} of ${chats.length} chats \n and ${messagesProcessed} of ${chat.messages.length} messages)...` });
          const { content, backup } = message;
          await editMessage(chat.chatId, this.props.userId, message.messageId, { content, backup }, true);
        }
      }
    }

    logger.log('CHAT', `Re-Encryption - Finished for ${this.props.chats.length} Chats`);

    this.props.toggleSettings();
    this.setState({ editingPin: false, pinInput: '', pinError: false, reEncryptingMessages: false, reEncryptingState: '' });
    notifyToast("Woot! Encryption key changed, an email with this new key has been sent.");
  }

  decryptMessage = (message, chatPrivateKey) => {
    if (!message.content && !message.backup) return message;
    const isSent = message.senderId == this.props.userId;
    const encryptedContent = isSent ? message.backup : message.content;
    const privateKey = isSent ? this.props.privateKey : chatPrivateKey;
    const content = decryptMessage(encryptedContent, privateKey);
    return { ...message, content };
  }

  encryptInput = (input, message, privateKey, publicKey) => {
    const content = message.senderId == this.props.userId ? null : encryptMessage(input, publicKey, privateKey);
    const backup = message.senderId == this.props.userId ? encryptMessage(input, publicKey, privateKey) : null;
    return { content, backup }
  }

  renderEncryptionInput = () => {
    if (this.state.reEncryptingMessages) return null;
    if (!this.state.showKey && !this.state.editingPin) {
      return (
        <div
          className="messenger-settings-encryption-show-button clickable"
          onClick={() => this.setState({ showKey: true })}
        >
          SHOW KEY
        </div>
      );
    }
    return (
      <input
        className="messenger-settings-encryption-key"
        type="text"
        placeholder="New Encryption Key"
        disabled={!this.state.editingPin}
        value={this.state.editingPin ? this.state.pinInput : this.props.pin}
        onChange={event => this.setState({ pinInput: event.target.value })}
      />
    );
  }

  renderEncryptionFooter = () => {
    if (this.state.reEncryptingMessages) return null;
    return (
      <div className="messenger-settings-encryption-footer">
        <div
          className="messenger-settings-encryption-footer-button clickable"
          onClick={() => this.state.editingPin ? this.confirmPinEdit() : this.requestPinEdit()}
        >
          {this.state.editingPin ? "SAVE YOUR KEY" : "CHANGE YOUR KEY"}
        </div>
      </div>
    );
  }

  renderReEncryptionLoading = () => {
    if (!this.state.reEncryptingMessages) return null;
    return (
      <div className="messenger-settings-encryption-re-encryption">
        {this.state.reEncryptionState.split('\n').map(state => <p className="messenger-settings-encryption-re-encryption-top-label">{state}</p>)}
        <LoadingIndicator color={'#E7BB30'} />
        <p className="messenger-settings-encryption-re-encryption-bottom-label">Please don't close this window</p>
      </div>
    );
  }

  render() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">Receive, update, save your chat history in other devices</p>
        {this.renderEncryptionInput()}
        {this.renderEncryptionFooter()}
        {this.renderReEncryptionLoading()}
      </div>
    );
  }

}