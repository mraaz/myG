import React from 'react';
import { ignoreFunctions } from '../../../../common/render'

export default class Experiences extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  openGame = (game) => {
    window.location.href = `/profile/${this.props.alias}/game/${game.id}`;
  }

  renderGame = (game) => {
    const style = game.level === 'Pro Gamer' ? 'pro' : game.level === 'Semi Pro' ? 'semi-pro' : 'casual';
    return(
      <div className="game clickable" onClick={() => this.openGame(game)}>
        <div className="name">{game.gameName || game.name}</div>
        <div className="experience">{game.experience}</div>
        <div className={style}>{game.level}</div>
      </div>
    );
  }

  render() {
    if (!this.props.gameExperiences.length) return null;
    return(
      <div className="row">
        {this.props.gameExperiences.map(this.renderGame)}
      </div>
    );
  }
}
