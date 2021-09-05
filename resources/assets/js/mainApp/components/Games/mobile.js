import React from 'react'
import axios from 'axios'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import { WithTooltip } from '../Tooltip'

export default class MobileGames extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
    selected: false,
    hovering: null,
    changingPage: false,
    filter: 'All',
    gameExperiences: []
  }

  async componentDidMount() {
    if (this.props.guest == true) {
      const { data = {} } = await axios.get(`/api/GameExperiences/showGuest/`)
      const { allfancyGameExperiences = [] } = data
      this.setState({ gameExperiences: allfancyGameExperiences })
    } else {
      const { data = {} } = await axios.get(`/api/GameExperiences/show`)
      const { allmyGameExperiences = [] } = data
      this.setState({ gameExperiences: allmyGameExperiences })
    }
  }

  changePage = (direction) => {
    const page = this.state.page
    const newPage =
      direction === 'left'
        ? page - 1 < 0
          ? page
          : page - 1
        : page + 1 > this.filterGameExperiences().length - this.getGamesPerPage()
        ? page
        : page + 1
    this.setState({ changingPage: true }, () => setTimeout(() => this.setState({ page: newPage, changingPage: false }), 100))
  }

  getGamesPerPage = () => {
    const selfSize = 2
    return selfSize
  }
  renderEmptyState = () => {
    return <div className='empty'>No games found here mate!</div>
  }

  handleGameClick = (id,game_name) => {
    if (this.props.handleGuestModal && this.props.guest == true) {
      this.props.handleGuestModal()
    } else {
      this.props.handleGameClick(id,game_name)
    }
  }
  renderPageButtons = () => {
    const gameExperiences = this.filterGameExperiences()
    const fitsAllInScreen = gameExperiences.length <= this.getGamesPerPage()
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0
    const contentToTheRight = !fitsAllInScreen && this.state.page < gameExperiences.length - this.getGamesPerPage()
    return (
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
    )
  }

  renderGameExperience = (game) => {
    const { game_names_id,id, game_name, game_img = 'https://myg.gg/platform_images/Profile/Silver-Stamping-Logo-MockUp.jpg' } = game
    const { selectedGame = [] } = this.props
    return (
      <div
        key={game_names_id}
        className={`game-experience clickable ${selectedGame.includes(game_names_id) ? 'selected' : ''}`}
        style={{ opacity: this.state.changingPage ? 0.3 : 1 }}
        onMouseEnter={() => this.setState({ hovering: game_names_id })}
        onMouseLeave={() => this.setState({ hovering: null })}
        onClick={() => this.handleGameClick(game_names_id,game_name)}
      >
        {game_img && (
          <div className='image game-image'>
            <img src={game_img} />
          </div>
        )}
        {game_name.length > 17 ? (
          <WithTooltip text={game_name} position={{ bottom: '36px', left: '-2vw' }}>
            <span className='name'>{game_name.slice(0, 17) + '...'}</span>
          </WithTooltip>
        ) : (
          <span className='name'>{game_name}</span>
        )}
        {selectedGame.includes(game_names_id)  && 
          <div className='selectedGame_image'>
            <img src={'https://myg.gg/platform_images/Dashboard/tick.png'} />
          </div>}
      </div>
    )
  }

  renderAddGameExperience_mobile = () => {
    if (!this.state.isSelf) return null
    return (
      <div className='add-game-experience mobile clickable' onClick={() => this.setState({ selected: 'edit' })}>
        <div className='mobile_col'>
          <div className='icon' style={{ backgroundImage: `url(${getAssetUrl('ic_profile_add')})` }} />
        </div>
        <div className='mobile_col'>
          <div className='title'>Add New</div>
          <div className='subtitle'>Filter posts by Game</div>
        </div>
      </div>
    )
  }

  filterGameExperiences = () => {
    return this.state.gameExperiences
  }

  render() {
    const gameExperiences = this.filterGameExperiences()
    return (
      <div id='profile-game-experiences' className='mobile-profile-game-experiences'>
        <div className='headers'>Filter posts by Game</div>
        <div className='scroll'>
          {this.renderPageButtons()}
          {gameExperiences.slice(this.state.page, this.state.page + this.getGamesPerPage()).map(this.renderGameExperience)}
          {!gameExperiences.length && !this.state.isSelf && this.renderEmptyState()}
        </div>
        {!this.props.guest && <div className='mobileShow'>{this.renderAddGameExperience_mobile()}</div>}
      </div>
    )
  }
}
