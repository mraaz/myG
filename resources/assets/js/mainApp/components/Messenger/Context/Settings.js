
import React from "react";
import { copyToClipboard } from '../../../../common/clipboard';

export default class Settings extends React.PureComponent {

  state = {
    favoriteGameInput: '',
    pin: '',
    invalidPin: false,
    uploadingPhoto: null,
  }

  static getDerivedStateFromProps(props) {
    return { invalidPin: props.invalidPin }
  }

  renderGamesSettings = () => {
    const search = (name) => name.toLowerCase().includes(this.state.favoriteGameInput.toLowerCase());
    const maxedOut = this.props.favoriteGames.length >= 10;
    const games = maxedOut ? 
      this.props.games.slice(0).sort((g1, g2) => g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1).slice(0, 10) :
      this.props.games.slice(0).filter(game => search(game.name));
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Edit your favorite games</p>
        <p className="messenger-settings-encryption-subtitle">
          type in your favorite games to be view on your top list
        </p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          placeholder={`${maxedOut ? 'Maximum of 10 favorited games' : 'Type here to search...'}`}
          disabled={maxedOut}
          value={this.state.favoriteGameInput}
          onChange={event => this.setState({ favoriteGameInput: event.target.value })}
        />
        <div className="messenger-footer-favorite-games">
          {games.map(this.renderGameSelection)}
        </div>
      </div>
    );
  }

  renderGameSelection = game => {
    const isFavorite = this.props.favoriteGames.find(favorite => favorite.gameId === game.gameId);
    const isOwner = parseInt(this.props.userId) === parseInt(game.ownerId);
    return(
      <div key={game.gameId} className="messenger-footer-favorite-game">
        <div className="messenger-body-game-section">
            {!isOwner && (
              <div
                className="messenger-game-icon"
                style={{ backgroundImage: `url('${game.icon}')` }}
              />
            )}
            {isOwner && (
              <div className="messenger-change-game-icon-button clickable"
                style={{ backgroundImage: `url(/assets/svg/ic_chat_group_icon.svg)` }}
                onClick={this.props.onUploadPhoto(game.gameId)}
              />
            )}
            <p className="messenger-body-section-header-name">{game.name}</p>
        </div>
        <div className="messenger-footer-favorite-game-button clickable"
          onClick={() => isFavorite ? this.props.unfavoriteGame(game.gameId) : this.props.favoriteGame(game.gameId)}
        >
          {isFavorite ? `unfavorite` : `favorite`}
        </div>
      </div>
    );
  }

  renderEncryptionSettings() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Encrypted Chat Key</p>
        <p className="messenger-settings-encryption-subtitle">
          Your messages cannot be read by anyone other than you and your contacts.<br /><br />
          Because of this, we cannot store your encryption key in our servers.<br /><br />
          {this.props.pin ?
            `Please keep this key somewhere safe, you'll need it when logging in on another device.` :
            `To decrypt your previous messages, you'll need to inform your encryption key.`
          }
        </p>
        <input
          className="messenger-settings-encryption-key"
          type="text"
          maxLength={12}
          placeholder="Encryption Key"
          disabled={this.props.pin}
          value={this.props.pin || this.state.pin}
          onChange={event => this.setState({ pin: event.target.value })}
        />
        {this.state.invalidPin && (
          <p className="messenger-settings-encryption-error">That's the wrong key, try again!</p>
        )}
        <div className="messenger-settings-encryption-footer">
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                this.props.generateKeys();
                this.props.chats.forEach(chat => this.props.clearChat(chat.chatId));
              }}
            >new</div>
          )}
          {!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => this.props.validatePin(this.state.pin, this.props.publicKey)}
            >validate</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => copyToClipboard(this.props.pin)}
            >copy</div>
          )}
          {!!this.props.pin && (
            <div
              className="messenger-settings-encryption-footer-button clickable"
              onClick={() => {
                const email = "felipe.roque@outlook.com"
                const mailLink = `mailto:${email}?subject=myG%20Security%20Key&body=%20This%20is%20my%20myG%20security%20key:%20${this.props.pin}`;
                window.open(mailLink, '_blank').focus();
              }}
            >email</div>
          )}
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="messenger-settings-container">
        <p className="messenger-settings-title">Settings</p>
        {this.renderEncryptionSettings()}
        {this.renderGamesSettings()}
      </div>
    );
  }

}