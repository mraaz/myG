import React from 'react';
import get from 'lodash.get';
import { getAssetUrl } from '../../../../common/assets';
import { ignoreFunctions } from '../../../../common/render'
import EditGameExperience from './edit';

export default class GameExperiences extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
    editing: false,
    hovering: null,
  }

  static getDerivedStateFromProps(props) {
    const isSelf = get(props, 'profile.isSelf') || false;
    const gameExperiences = get(props, 'profile.gameExperiences') || [];
    return { gameExperiences, isSelf };
  }

  changePage = (direction) => {
    const page = this.state.page;
    if (direction === 'left') return this.setState({ page: (page - 1) < 0 ? page : page - 1 });
    if (direction === 'right') return this.setState({ page: (page + 1) > this.state.gameExperiences.length - 4 ? page : page + 1 });
  }

  renderPageButtons = () => {
    return(
      <React.Fragment>
        <div
          className={`go-left clickable`}
          onClick={() => this.changePage('left')}
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
        />
        <div
          className={`go-right clickable`}
          onClick={() => this.changePage('right')}
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
        />
      </React.Fragment>
    );
  }

  renderGameExperience = (game) => {
    const { id, gameName, gameImage, mainFields } = game;
    const allFields = ['level', 'experience', 'team', 'nickname'];
    const missingFields = allFields.filter(field => !mainFields.map(field => field.toLowerCase()).includes(field.toLowerCase()))
    const fields = [...mainFields, ...missingFields].slice(0, 3);
    return(
      <div className="game-experience" 
        onMouseEnter={() => this.setState({ hovering: id })}
        onMouseLeave={() => this.setState({ hovering: null })}
      >
        <span className="name">{gameName}</span>
        {gameImage && <div className="image" style={{ backgroundImage: `url(${gameImage})` }} />}
        {fields.map(field => (
          <div className="field">
            <span className="field-title">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
            <span className="field-value">{game[field.toLowerCase()] || 'N/A'}</span>
          </div>
        ))}
        {this.state.isSelf && this.state.hovering === id && (
          <div className="edit-button clickable" onClick={() => this.setState({ editing: id })}>
            Edit
          </div>
        )}
      </div>
    );
  }

  renderAddGameExperience = () => {
    if (!this.state.isSelf) return null;
    return(
      <div className="add-game-experience clickable" onClick={() => this.setState({ editing: true })}>
        <div
          className="icon"
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_add')})` }}
        />
        <span className="title">Add New</span>
        <span className="subtitle">Game Experience</span>
      </div>
    );
  }

  renderEditGameExperienceModal = () => {
    if (!this.state.editing) return null;
    const gameExperience = this.state.gameExperiences.find(experience => experience.id === this.state.editing);
    return <EditGameExperience 
      alias={this.props.alias}
      profile={this.props.profile}
      gameExperience={gameExperience}
      onClose={() => this.setState({ editing: false })}
      updateGame={this.props.updateGame}
    />;
  }

  render() {
    return(
      <div id="profile-game-experiences">
        {this.renderPageButtons()}
        {this.renderAddGameExperience()}
        {this.state.gameExperiences.slice(this.state.page, this.state.page + 4).map(this.renderGameExperience)}
        {this.renderEditGameExperienceModal()}
      </div>
    );
  }
}

