import React from 'react';
import get from 'lodash.get';
import { getAssetUrl } from '../../../../common/assets';
import { copyToClipboard } from '../../../../common/clipboard';
import notifyToast from '../../../../common/toast';
import { ignoreFunctions } from '../../../../common/render'
import EditGameExperience from './edit';
import { showMessengerAlert } from '../../../../common/alert';
import { WithTooltip } from '../../Tooltip';
import { createShortLink } from '../../../../integration/http/links';

export default class GameExperiences extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
    selected: false,
    hovering: null,
    changingPage: false,
    filter: 'All',
  }

  componentDidMount() {
    const selected = get(this.props, 'selectedGame', false);
    if (selected) this.setState({ selected });
  }

  static getDerivedStateFromProps(props) {
    const isSelf = get(props, 'profile.isSelf') || false;
    const gameExperiences = get(props, 'profile.gameExperiences') || [];
    return { gameExperiences, isSelf };
  }

  deleteExperience = (id) => {
    this.setState({ page: 0 });
    this.props.deleteExperience(id);
  }

  changePage = (direction) => {
    const page = this.state.page;
    const newPage = direction === 'left' ? (page - 1) < 0 ? page : page - 1 : (page + 1) > this.filterGameExperiences().length - this.getGamesPerPage() ? page : page + 1;
    this.setState({ changingPage: true }, () => setTimeout(() => this.setState({ page: newPage, changingPage: false }), 100));
  }

  onClose = () => {
    this.setState({ selected: false })
    window.history.pushState("", "", `/profile/${this.props.alias}`)
  }

  copyLink = async (gameId) => {
    const shortLink = await createShortLink(`${window.location.host}/profile/${this.props.alias}/game/${gameId}`);
    copyToClipboard(shortLink);
    notifyToast('Roger that. Link copied. Over.')
  }

  getGamesPerPage = () => {
    const selfSize = 3;
    const othersSize = 4;
    return this.state.isSelf ? selfSize : othersSize;
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className={`header clickable ${this.state.filter === 'All' && 'selected'}`} onClick={() => this.setState({ page: 0,  filter: 'All' })}>All</div>
        <div className={`header clickable ${this.state.filter === 'Pro Gamer' && 'selected'}`} onClick={() => this.setState({ page: 0,  filter: 'Pro Gamer' })}>Pro Career</div>
        <div className={`header clickable ${this.state.filter === 'Semi Pro' && 'selected'}`} onClick={() => this.setState({ page: 0,  filter: 'Semi Pro' })}>Semi Pro</div>
        <div className={`header clickable ${this.state.filter === 'Casual' && 'selected'}`} onClick={() => this.setState({ page: 0,  filter: 'Casual' })}>Casual</div>
      </div>
    );
  }

  renderEmptyState = () => {
    return(
      <div className="empty">
        No games found here mate!
      </div>
    );
  }

  renderPageButtons = () => {
    const gameExperiences = this.filterGameExperiences();
    const fitsAllInScreen = gameExperiences.length <= this.getGamesPerPage();
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0;
    const contentToTheRight = !fitsAllInScreen && this.state.page < gameExperiences.length - this.getGamesPerPage();
    return(
      <React.Fragment>
        {contentToTheLeft && (
          <div
            className={`go-left clickable`}
            onClick={() => this.changePage('left')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
          />
        )}
        {contentToTheRight && (
          <div
            className={`go-right clickable`}
            onClick={() => this.changePage('right')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
          />
        )}
      </React.Fragment>
    );
  }

  renderGameExperience = (game) => {
    const { id, gameName, gameImage, mainFields } = game;
    const fields = mainFields
    const commended = this.props.profile && this.props.profile.commended || [];
    const hasCommended = commended.find((commendation) => commendation.gameExperienceId === id && commendation.commenderId === this.props.userId);
    return(
      <div key={id} className="game-experience clickable" style={{ opacity: this.state.changingPage ? 0.3 : 1 }}
        onMouseEnter={() => this.setState({ hovering: id })}
        onMouseLeave={() => this.setState({ hovering: null })}
        onClick={() => this.setState({ selected: id })}>
        {gameName.length > 17 ?
          (
            <WithTooltip text={gameName} position={{ bottom: '36px', left: '-2vw' }}>
              <span className="name">{gameName.slice(0, 17) + '...'}</span>
            </WithTooltip>
          ): <span className="name">{gameName}</span>
        }
        {gameImage && <div className="image game-image" style={{ backgroundImage: `url(${gameImage})` }} />}
        <div
          className={`link clickable`}
          onClick={(event) => { event.stopPropagation(); this.copyLink(id); }}
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_link_gray')})` }}
        />
        {fields.map((field) => (
          <div className="field">
            <span className="field-title">{field.replace('Level', 'Career').charAt(0).toUpperCase() + field.replace('Level', 'Career').slice(1)}</span>
            <span className="field-value">{game[field.toLowerCase()] || 'N/A'}</span>
          </div>
        ))}
        {this.state.hovering === id && (
          <div className="hover-box">
            <div className="hover-button clickable" onClick={() => this.setState({ selected: id })}>
              {this.state.isSelf ? 'Edit' : 'Show'}
            </div>
            {this.state.isSelf && (
              <div className="hover-button clickable" onClick={() => 
                showMessengerAlert(`Are you sure you want to delete your game experience for ${gameName}?`,
                () => this.deleteExperience(id),
                null,
                'Make it so',
              )}>
                Delete
              </div>
            )}
            {!!this.props.profile && !!this.props.profile.isFriend && !hasCommended && (
              <div className="hover-button clickable" onClick={(event) => { event.stopPropagation(); this.props.commendUser(id); }}>
                  Commend Me
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  renderAddGameExperience = () => {
    if (!this.state.isSelf) return null;
    return(
      <div className="add-game-experience clickable" onClick={() => this.setState({ selected: 'edit' })}>
        <div
          className="icon"
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_add')})` }}
        />
        <span className="title">Add New</span>
        <span className="subtitle">Game Experience</span>
      </div>
    ); 
  }
  renderAddGameExperience_mobile = () => {
    if (!this.state.isSelf) return null;
    return(
      <div className="add-game-experience mobile clickable" onClick={() => this.setState({ selected: 'edit' })}>
        <div className="mobile_col">
        <div
          className="icon"
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_add')})` }}
        />
        </div> 
        <div className="mobile_col"> 
        <div className="title">Add New</div>
        <div className="subtitle">Game Experience</div>
        </div>
      </div>
    );
  } 

  renderEditGameExperienceModal = () => {
    if (!this.state.selected) return null;
    const gameExperience = this.state.gameExperiences.find(experience => parseInt(experience.id, 10) === parseInt(this.state.selected, 10));
    if (this.state.selected != 'edit' && !gameExperience) return null;
    return <EditGameExperience
      alias={this.props.alias}
      profile={this.props.profile}
      isSelf={this.state.isSelf}
      gameExperience={gameExperience}
      onClose={this.onClose}
      updateGame={this.props.updateGame}
    />;
  }

  filterGameExperiences = () => {
    return this.state.gameExperiences.filter((experience) => {
      if (this.state.filter === 'All') return true;
      return experience.level === this.state.filter;
    });
  }

  render() {
    const gameExperiences = this.filterGameExperiences();
    return(
      <div id="profile-game-experiences">
        {this.props.guest && <div className='headers'></div>}
        {!this.props.guest && this.renderHeaders()}
        <div className="mobileShow">  
          {this.renderAddGameExperience_mobile()}
        </div>
        <div className="scroll">
          {this.renderPageButtons()}
          <div className="desktopShow"> 
            {this.renderAddGameExperience()}
          </div>
          {gameExperiences.slice(this.state.page, this.state.page + this.getGamesPerPage()).map(this.renderGameExperience)}
          {!gameExperiences.length && !this.state.isSelf && this.renderEmptyState()}
          {this.renderEditGameExperienceModal()}
        </div>
      </div>
    );
  }
}
