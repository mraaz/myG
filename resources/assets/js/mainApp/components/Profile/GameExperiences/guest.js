import React from 'react';
import { getAssetUrl } from '../../../../common/assets';
import { copyToClipboard } from '../../../../common/clipboard';
import notifyToast from '../../../../common/toast';
import { ignoreFunctions } from '../../../../common/render'
import EditGameExperience from './edit';
import { WithTooltip } from '../../Tooltip';
import { createShortLink } from '../../../../integration/http/links';
import axios from 'axios'

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
    gameExperiences:[]
  }

  async componentDidMount() {
    const {data={}} = await axios.get(`/api/GameExperiences/showGuest/`);
    const {allfancyGameExperiences=[]} = data;
    this.setState({ gameExperiences:allfancyGameExperiences });
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

  renderGameExperience = (game,key) => {
    const { id, game_name, game_img, mainFields } = game;
    const fields = mainFields
    const commended = this.props.profile && this.props.profile.commended || [];
    const hasCommended = commended.find((commendation) => commendation.gameExperienceId === id && commendation.commenderId === this.props.userId);
    return(
      <div key={`${id}_${game_name}_${key}`} className="game-experience clickable" style={{ opacity: this.state.changingPage ? 0.3 : 1 }}
        onMouseEnter={() => this.setState({ hovering: id })}
        onMouseLeave={() => this.setState({ hovering: null })}
        onClick={() => this.setState({ selected: id })}>
        {game_name.length > 17 ?
          (
            <WithTooltip text={game_name} position={{ bottom: '36px', left: '-2vw' }}>
              <span className="name">{game_name.slice(0, 17) + '...'}</span>
            </WithTooltip>
          ): <span className="name">{game_name}</span>
        }
        {game_img && <div className="image game-image" style={{ backgroundImage: `url(${game_img})` }} />}
        <div
          className={`link clickable`}
          onClick={(event) => { event.stopPropagation(); this.copyLink(id); }}
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_link_gray')})` }}
        />
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
        <span className="subtitle">Game</span>
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
        <div className="subtitle">Game</div>
        </div>
      </div>
    );
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
        
        <div className="scroll">
          {this.renderPageButtons()}
          
          {gameExperiences.slice(this.state.page, this.state.page + this.getGamesPerPage()).map(this.renderGameExperience)}
          <div className="desktopShow game-experience clickable"> 
            {this.renderAddGameExperience()}
          </div>
          <div className="mobileShow game-experience clickable">  
          {this.renderAddGameExperience_mobile()}
        </div>
          {!gameExperiences.length && !this.state.isSelf && this.renderEmptyState()}
        </div>
      </div>
    );
  }
}
