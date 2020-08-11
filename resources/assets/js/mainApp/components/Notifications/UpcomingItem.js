import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const defaultThumbnails = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Notifications/myG_icon.svg'
const defaultUserImage = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png'

export default class UpcomingItem extends Component {
  constructor() {
    super()
  }

  handleSingleGameView = (id) => {
    window.location.href = `/scheduledGames/${id}`
  }

  render() {
    const { myStatus = '', no_of_Approval_Pending = '', game_img = '', experience = '', start_date_time, schedule_games_GUID } = this.props
    const experience_split = experience ? experience.split(',') : []
    let countdown_label = 'hours'
    let countdown = moment(start_date_time).diff(moment(), 'hours')
    if (countdown == 0) {
      countdown = moment(start_date_time).diff(moment(), 'minutes')
      countdown_label = 'minutes'
    }
    const scheduledGamePicture = <img src={game_img ? game_img : defaultThumbnails} className={game_img ? 'image' : 'default-image'} />
    return (
      <div className={`mygames`} key={this.props.id}>
        <div className='gameImage'>{scheduledGamePicture}</div>
        <div className='game__attributes'>
          <div className='first__row'>
            <h1 className='game__name' title={this.props.game_name} onClick={(e) => this.handleSingleGameView(schedule_games_GUID)}>
              {this.props.game_name}
            </h1>
            <div className='game__playerList'>
              <Link to={`/profile/${this.props.alias}`}>
                <div className='playerName'>
                  <img src={this.props.profile_img ? this.props.profile_img : defaultUserImage} />
                  <span> {this.props.alias}</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='second__row'>
            <div className='gamer__count'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
              <span>
                {this.props.no_of_gamers} / {this.props.limit == 0 ? <span>&#8734;</span> : this.props.limit} Gamers
              </span>
            </div>
            <div className='game__timestamp'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
              <span>{moment(this.props.start_date_time).format('LL')}</span>
            </div>
          </div>
        </div>
        <div className='time'>
          <div className='time-align'>
            Starting in
            <div className='time-info'>{countdown}</div>
            {countdown_label}
          </div>
        </div>
      </div>
    )
    // <div className='upcoming-game' onClick={() => alert('hey')}>
    //   <div className='thumbnail'>{scheduledGamePicture}</div>
    //   <div className='content'>
    //     <div className='header'>
    //       <h1 className='game-title'> {game_name} </h1>
    //       <div className='game-user'>
    //         <Link to={`/profile/${alias}`}>
    //           <div className='profile-picture'>
    //             <img src={profile_img ? profile_img : defaultUserImage} />
    //             <span className='user-name'> {alias}</span>
    //           </div>
    //         </Link>
    //       </div>
    //       <div className='match-info'>
    //         <span className='players'>{no_of_gamers} players</span>
    //         <span className='start-date-time'>{moment(start_date_time).format('LL')}</span>
    //       </div>
    //     </div>
    //     <div className='game__level__wrap'>
    //       {experience_split.length > 0 &&
    //         experience_split.map((ex, index) => {
    //           return (
    //             <div className={`game__level game__level_${ex}`} key={ex}>
    //               {ex}
    //             </div>
    //           )
    //         })}
    //     </div>
    //   </div>
    // <div className='time'>
    //   <div className='time-align'>
    //     Starting in
    //     <div className='time-info'>3</div>
    //     hours
    //   </div>
    // </div>
    // </div>
  }
}
