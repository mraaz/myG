import React from 'react'
import Game from './Game'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'

export default class Games extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    expandedGame: null,
  }

  renderGame(id, name, icon, color, expanded) {
    const chevronType = expanded ? 'down' : 'right'
    return (
      <div key={id} className='messenger-body-section' style={{ backgroundColor: color }}>
        <div
          className='messenger-body-section-header clickable'
          style={{ backgroundColor: color }}
          onClick={() =>
            this.setState(
              (previous) => ({ expandedGame: previous.expandedGame === name ? null : name }),
              () => this.props.onExpand(this.state.expandedGame ? false : this.props.expanded)
            )
          }>
          <div className='messenger-body-game-section' style={{ backgroundColor: color }}>
            <div className='messenger-game-icon' style={{ backgroundImage: `url('${icon}')` }} />
            <p className='messenger-body-section-header-name'>{name}</p>
          </div>
          <div className='messenger-body-section-header-info'>
            <div
              className='messenger-body-section-header-icon'
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
            />
          </div>
        </div>
        {this.props.expanded && expanded && (
          <Game
            userId={this.props.userId}
            game={{ gameId: id, name, icon }}
            privateKey={this.props.privateKey}
            search={this.props.search}
            disconnected={this.props.disconnected}
            openChat={this.props.openChat}
            createChat={this.props.createChat}
          />
        )}
      </div>
    )
  }

  render() {
    if (!this.props.games.length) return null

    const sections = []

    let games = this.props.games
      .slice(0)
      .sort((g1, g2) => g1.name.localeCompare(g2.name))
      .sort((g1, g2) => (g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1))

    if (this.props.search.trim()) {
      const search = (name) => name.toLowerCase().includes(this.props.search.toLowerCase())
      games = games
        .slice(0)
        .filter((game) => search(game.name))
        .slice(0, 10)
    }

    const colors = ['#EB333D', '#AF093F', '#A82DB1', '#162B84', '#3E57C1', '#029EBC', '#118137', '#05BC45', '#CE9003', '#8D7514']
    games.slice(0, 10).forEach((game, index) => {
      sections.push({
        id: game.gameId,
        name: game.name,
        icon: game.icon,
        color: colors[index],
      })
    })

    return (
      <div className='messenger-body-section'>
        {sections.map((section) =>
          this.renderGame(
            section.id,
            section.name,
            section.icon,
            section.color,
            this.state.expandedGame === section.name
          )
        )}
      </div>
    )
  }
}
