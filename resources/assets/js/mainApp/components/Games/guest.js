import React from 'react';
import { getAssetUrl } from '../../../common/assets';
import { ignoreFunctions } from '../../../common/render'
import { WithTooltip } from '../Tooltip';
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

  changePage = (direction) => {
    const page = this.state.page;
    const newPage = direction === 'left' ? (page - 1) < 0 ? page : page - 1 : (page + 1) > this.filterGameExperiences().length - this.getGamesPerPage() ? page : page + 1;
    this.setState({ changingPage: true }, () => setTimeout(() => this.setState({ page: newPage, changingPage: false }), 100));
  }

  getGamesPerPage = () => {
    const selfSize = 3;
    const othersSize = 4;
    return this.state.isSelf ? selfSize : othersSize;
  }

  handleGameClick = () =>{
    if(this.props.handleGuestModal){
      this.props.handleGuestModal()
    }
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
        onClick={() => this.handleGameClick()}>
        {game_img && <div className="image game-image" style={{ backgroundImage: `url(${game_img})` }} />}
        {game_name.length > 17 ?
          (
            <WithTooltip text={game_name} position={{ bottom: '36px', left: '-2vw' }}>
              <span className="name">{game_name.slice(0, 17) + '...'}</span>
            </WithTooltip>
          ): <span className="name">{game_name}</span>
        }
      </div>
    );
  }

  filterGameExperiences = () => {
    return this.state.gameExperiences;
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
          {!gameExperiences.length && !this.state.isSelf && this.renderEmptyState()}
        </div>
      </div>
    );
  }
}
