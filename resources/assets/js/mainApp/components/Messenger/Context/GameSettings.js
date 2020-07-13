import React from 'react'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'

export default class GameSettings extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    favoriteGameInput: '',
    editingSlot: null,
  }

  renderGame = (game, index) => {
    const isOwner = parseInt(this.props.userId) === parseInt(game.ownerId)
    return (
      <div key={game.gameId} className='messenger-settings-favorite-game'>
        {this.state.editingSlot === index && <div className='messenger-settings-game-input-container'>{this.renderGameInput()}</div>}
        {!game.isEmptySlot && !isOwner && (
          <div className='messenger-favorite-game-icon-button' style={{ backgroundImage: `url('${game.icon}')` }} />
        )}
        {!game.isEmptySlot && isOwner && (
          <div
            className='messenger-favorite-game-change-icon-button clickable'
            style={{
              backgroundImage: `url(${getAssetUrl('ic_chat_group_icon')})`,
            }}
            onClick={() => this.props.onUploadPhoto(game.gameId)}
          />
        )}
        <p className='messenger-settings-favorite-game clickable' onClick={() => this.setState({ editingSlot: index })}>
          {game.isEmptySlot ? `Game Number ${this.getNumber(index + 1)}` : game.name}
        </p>
        {!game.isEmptySlot && (
          <div
            className='messenger-favorite-game-close-button clickable'
            style={{
              backgroundImage: `url(${getAssetUrl('ic_chat_close')})`,
            }}
            onClick={() => this.props.unfavoriteGame(game.gameId)}
          />
        )}
      </div>
    )
  }

  renderGameInput = () => {
    const search = (name) => name.toLowerCase().includes(this.state.favoriteGameInput.toLowerCase())
    const games = this.props.games.slice(0).filter((game) => search(game.name))
    return (
      <div className='messenger-settings-game-input'>
        <p className="messenger-settings-game-input-hint">Search for your added games to favourite</p>
        <div className='messenger-settings-game-input-header'>
          <input
            className='messenger-settings-game-input-field'
            type='text'
            placeholder='Search for Games...'
            value={this.state.favoriteGameInput}
            onChange={(event) => this.setState({ favoriteGameInput: event.target.value })}
          />
          <div
            className='messenger-favorite-game-close-button clickable'
            style={{
              backgroundImage: `url(${getAssetUrl('ic_chat_close')})`,
            }}
            onClick={() => this.setState({ editingSlot: null })}
          />
        </div>
        <div className='messenger-settings-favorite-games-input'>{games.map(this.renderGameSelection)}</div>
      </div>
    )
  }

  renderGameSelection = (game) => {
    const isFavorite = this.props.favoriteGames.find((favorite) => favorite.gameId === game.gameId)
    return (
      <div key={game.gameId} className='messenger-settings-select-game'>
        <div className='messenger-body-game-section'>
          <div className='messenger-favorite-game-icon-button' style={{ backgroundImage: `url('${game.icon}')` }} />
          <p className='messenger-body-section-header-name'>{game.name}</p>
        </div>
        <div className='messenger-settings-favorite-game-button clickable' onClick={() => this.toggleGameFavorite(game, isFavorite)}>
          {isFavorite ? `unfavourite` : `favourite`}
        </div>
      </div>
    )
  }

  toggleGameFavorite = (game, isFavorite) => {
    if (isFavorite) this.props.unfavoriteGame(game.gameId)
    else this.props.favoriteGame(game.gameId)
    this.setState({ editingSlot: null })
  }

  getNumber = (index) => {
    if (index === 1) return 'One'
    if (index === 2) return 'Two'
    if (index === 3) return 'Three'
    if (index === 4) return 'Four'
    if (index === 5) return 'Five'
    if (index === 6) return 'Six'
    if (index === 7) return 'Seven'
    if (index === 8) return 'Eight'
    if (index === 9) return 'Nine'
    if (index === 10) return 'Ten'
  }

  render() {
    const favoriteGames = this.props.games.filter((game) => game.isFavorite).slice(0, 10)
    const emptySlots = []
    for (let i = 0; i < 10 - favoriteGames.length; ++i) emptySlots.push({ gameId: `Empty-${i}`, isEmptySlot: true })
    const games = [...favoriteGames, ...emptySlots]
    return (
      <div className='messenger-settings-encryption-container'>
        <p className='messenger-settings-encryption-title'>Edit your favourite games</p>
        <p className='messenger-settings-encryption-subtitle'>Type in your favourite games to be viewed on your top list</p>
        <div className='messenger-settings-favorite-games'>{games.map(this.renderGame)}</div>
      </div>
    )
  }
}
