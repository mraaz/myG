import React from 'react'
import EncryptionSettings from './EncryptionSettings'
import BlockedUsers from './BlockedUsers'

export default class Settings extends React.PureComponent {
  state = {
    favoriteGameInput: '',
  }

  renderGamesSettings = () => {
    const search = (name) => name.toLowerCase().includes(this.state.favoriteGameInput.toLowerCase())
    const maxedOut = this.props.favoriteGames.length >= 10
    const games = maxedOut
      ? this.props.games
          .slice(0)
          .sort((g1, g2) => (g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1))
          .slice(0, 10)
      : this.props.games.slice(0).filter((game) => search(game.name))
    return (
      <div className='messenger-settings-encryption-container'>
        <p className='messenger-settings-encryption-title'>Edit your favourite games</p>
        <p className='messenger-settings-encryption-subtitle'>Type in your favourite games to be view on your top list</p>
        <input
          className='messenger-settings-encryption-key'
          type='text'
          placeholder={`${maxedOut ? 'Maximum of 10 favourite games' : 'Type here to search...'}`}
          disabled={maxedOut}
          value={this.state.favoriteGameInput}
          onChange={(event) => this.setState({ favoriteGameInput: event.target.value })}
        />
        <div className='messenger-footer-favorite-games'>{games.map(this.renderGameSelection)}</div>
      </div>
    )
  }

  renderGameSelection = (game) => {
    const isFavorite = this.props.favoriteGames.find((favorite) => favorite.gameId === game.gameId)
    const isOwner = parseInt(this.props.userId) === parseInt(game.ownerId)
    return (
      <div key={game.gameId} className='messenger-footer-favorite-game'>
        <div className='messenger-body-game-section'>
          {!isOwner && <div className='messenger-game-icon' style={{ backgroundImage: `url('${game.icon}')` }} />}
          {isOwner && (
            <div
              className='messenger-change-game-icon-button clickable'
              style={{
                backgroundImage: `url(https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Chat/ic_chat_group_icon.svg)`,
              }}
              onClick={() => this.props.onUploadPhoto(game.gameId)}
            />
          )}
          <p className='messenger-body-section-header-name'>{game.name}</p>
        </div>
        <div
          className='messenger-footer-favorite-game-button clickable'
          onClick={() => (isFavorite ? this.props.unfavoriteGame(game.gameId) : this.props.favoriteGame(game.gameId))}>
          {isFavorite ? `unfavourite` : `favourite`}
        </div>
      </div>
    )
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
        {this.renderEncryptionSettings()}
        {this.renderGamesSettings()}
        {this.renderBlockedUsers()}
      </div>
    )
  }
}
