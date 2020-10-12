import React from 'react';
import Progress from '../../common/ProgressCircle/progress'
import LoadingIndicator from '../../LoadingIndicator'
import { ignoreFunctions } from '../../../../common/render'

export default class Results extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    hovering: null,
  }

  renderLoading = () => {
    if (!this.props.loading) return null;
    return(
      <div className='loading'>
        <p className='loading-hint'>Searching for Gamers...</p>
        <LoadingIndicator color={'#F0F0F0'} />
      </div>
    );
  }

  renderGamers = () => {
    if (this.props.loading) return null;
    return this.props.gamers.map(this.renderGamer);
  }
  
  renderGamer = (gamer) => {
    const isHovering = this.state.hovering === gamer.profileId;
    return(
      <div className="find-gamer-result" key={gamer.profileId}>
        <div className={`gamer ${isHovering ? 'hover' : ''}`}
          onMouseEnter={() => this.setState({ hovering: gamer.profileId })}
          onMouseLeave={() => this.setState({ hovering: null })}
        >
          {this.renderHoverBar(gamer, isHovering)}
          <div className='icon' style={{ backgroundImage: `url('${gamer.image}'), url('https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png')` }} />
          <div className="info">
            <span className="alias">@{gamer.alias}</span>
            <span className="title">Country</span>
            <span className="value">{gamer.country}</span>
            <span className="title">Professional Team</span>
            <span className="value">{gamer.team}</span>
            <span className="title">Languages</span>
            <span className="value">{gamer.languages.join(', ')}</span>
          </div>
          <div className="level-progress">
            <Progress
              className={`circle-wrap`}
              borderColor={'#E5C746'}
              progress={0}
              value={gamer.level}
              subtitle={'Level'}
              reduction={0}
              hideBall
              strokeWidth={8}
              background={'#ffffff'}
            />
          </div>
          <div className="info">
            <span className="title">Experience Pts.</span>
            <span className="value">{gamer.experience}</span>
          </div>
        </div>
        {gamer.mostPlayedGames.map(this.renderGame)}
      </div>
    );
  }

  renderGame = (game) => {
    return(
      <div className="game">
        <div className="name">{game}</div>
      </div>
    );
  }

  renderHoverBar = (gamer, isHovering) => {
    if (!isHovering) return null;
    return(
      <div className="hover-bar">
        <div className="small-button clickable" onClick={() => window.location.href = `/profile/${gamer.alias}`}>Profile</div>
      </div>
    );
  }

  render() {
    return(
      <div id="find-gamers-results">
        {this.renderLoading()}
        {this.renderGamers()}
      </div>
    );
  }
}
