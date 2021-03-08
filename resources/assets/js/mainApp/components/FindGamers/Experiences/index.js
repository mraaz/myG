import React from 'react';
import { ignoreFunctions } from '../../../../common/render'
import { WithTooltip } from '../../Tooltip';

export default class Experiences extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    hovering: null,
  }

  openGame = (game) => {
    window.router.push(`/profile/${this.props.alias}/game/${game.experienceId || game.id}`)
  }

  renderGame = (game) => {
    const style = game.level === 'Pro Gamer' ? 'pro' : game.level === 'Semi Pro' ? 'semi-pro' : 'casual';
    const gameName = game.gameName || game.name;
    return(
      <div className={`game clickable ${this.state.hovering === game.id ? 'hover' : ''}`} onClick={() => this.openGame(game)}
        onMouseEnter={() => this.setState({ hovering: game.id })}
        onMouseLeave={() => this.setState({ hovering: null })}
      >
        {this.renderHoverBar(game, this.state.hovering === game.id)}
        <WithTooltip text={gameName} position={{}} disabled={gameName.length <= 12}>
          <div className="name">{gameName.slice(0, 12) + (gameName.length > 12 ? '...' : '')}</div>
        </WithTooltip>
        <div className="experience">{game.experience}</div>
        <div className={style}>{game.level}</div>
      </div>
    );
  }

  renderHoverBar = (game, isHovering) => {
    if (!isHovering) return null;
    return(
      <div className="hover-bar">
        <div className="small-button clickable" onClick={() => this.openGame(game)}>Show</div>
      </div>
    );
  }

  render() {
    if (!this.props.gameExperiences.length) return null;
    return(
      <div className="row gamer-row game-experience-row">
        {this.props.gameExperiences.slice(0, 3).map(this.renderGame)}
      </div>
    );
  }
}
