import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Progress from '../../common/ProgressCircle/progress';
import LoadingIndicator from '../../LoadingIndicator';
import { ignoreFunctions } from '../../../../common/render';
import { getAssetUrl } from '../../../../common/assets';
import { WithTooltip } from '../../Tooltip';
import fetchGames from './fetch';

export default class InviteModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: false,
    games: [],
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      fetchGames().then((games) => this.setState({ games, loading: false }));
    });
  }

  renderClose = () => {
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.props.onClose}
      />
    )
  }

  renderGamer = (gamer) => (
    <div className="find-gamer-result" key={gamer.profileId}>
      <div className='gamer'>
        <div className='icon' style={{ backgroundImage: `url('${gamer.image}'), url('https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png')` }} />
        <div className="info">
          {gamer.alias && <span className="alias">@{gamer.alias}</span>}
          {gamer.country && <span className="title">Country</span>}
          {gamer.country && <span className="value">{gamer.country}</span>}
          {gamer.team && <span className="title">Professional Team</span>}
          {gamer.team && <span className="value">{gamer.team}</span>}
          {gamer.languages.length && <span className="title">Languages</span>}
          {gamer.languages.length && <span className="value">{gamer.languages.join(', ')}</span>}
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
    </div>
  )

  renderNoGames = () => (
    <div className="no-games clickable" onClick={() => window.location.replace('/addScheduleGames')}>
      <span className="title">No games found.</span>
      <span className="subtitle">Click here to add a game.</span>
    </div>
  )

  renderLoader = () => (
    <div className="no-games">
      <p className='title'>Searching for Games...</p>
      <LoadingIndicator color={'#F0F0F0'} />
    </div>
  )

  renderGame = (game) => {
    const addDefaultSrc = (event) => event.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png';
    const defaultThumbnails = 'https://mygame-media.s3.amazonaws.com/platform_images/Notifications/myG_icon.svg';
    const picture = <img src={game.game_artwork || defaultThumbnails} className={game.game_artwork ? 'image' : 'default'} />;
    const profile = <img onError={addDefaultSrc} src={game.profile_img} />;
    const title = game.game_name;
    const owner = game.alias;
    return (
      <div key={game.id} className="game-container">
         <div className='game'>
          <div className='picture'>{picture}</div>
          <div className='info'>
            <div className='row'>
              <span className="title">{title}</span>
              <a className='owner' href={`/profile/${owner}`}>
                {profile}
                <span>{owner}</span>
              </a>
            </div>
            <div className='row'>
              <div className='count'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                <span>
                  {game.no_of_gamers} / {game.limit == 0 ? <span>&#8734;</span> : game.limit} Gamers
                </span>
              </div>
              <div className='timestamp'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                <span>{moment(game.start_date_time).format('LL')}</span>
              </div>
            </div>
            <div className="row">
              <div className='tags'>
                {game.tags &&
                  game.tags.length > 0 &&
                  game.tags.slice(0, 7).map((tag) => {
                    return (
                      <WithTooltip
                        position={{ bottom: '24px', left: '-12px' }}
                        style={{ height: '24px', display: 'inline-block' }}
                        text={tag.content}>
                        <p className='tag'>{tag.content}</p>
                      </WithTooltip>
                    )
                  })}
                {game.tags && game.tags.length > 7 && ` ...`}
              </div>
            </div>
          </div>
        </div>
        <div className="invite-button clickable" onClick={() => this.invite(game)}>Invite</div>
      </div>
    )
  }

  renderGames = () => {
    if (this.state.loading) return this.renderLoader();
    if (!this.state.games.length) return this.renderNoGames();
    return(
      <div className="game-list">
        {this.state.games.map(this.renderGame)}
      </div>
    );
  }

  invite = (game) => {
    return axios.post('/api/invited_users_for_schedule_games/invite', {
      schedule_games_id: game.id,
      user_id: this.props.gamer.profileId
    });
  }

  render() {
    return(
      <div id="invite-modal" onClick={this.props.onClose}>
        <div className="container">
          {this.renderClose()}
          {this.renderGamer(this.props.gamer)}
          {this.renderGames()}
        </div>
      </div>
    );
  }
}