/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const defaultThumbnails = 'https://myG.gg/platform_images/Notifications/myG_icon.svg'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'

export default class UpcomingItem extends Component {
  constructor() {
    super()
  }

  handleSingleGameView = (id) => {
    window.router.push(`/scheduledGames/${id}`)
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  render() {
    const { game_artwork = '', experience = '', start_date_time, schedule_games_GUID, end_date_time } = this.props
    const experience_split = experience ? experience.split(',') : []
    let countdown_label = 'Days'
    let isExpired = false
    let countdown = moment(start_date_time).diff(moment(), 'days')
    if (countdown == 0) {
      countdown = moment(start_date_time).diff(moment(), 'hours')
      countdown_label = 'Hours'
    }
    if (countdown == 0) {
      countdown = moment(start_date_time).diff(moment(), 'minutes')
      countdown_label = 'Minutes'
    }
    if (countdown == 0) {
      countdown = moment(start_date_time).diff(moment(), 'seconds')
      countdown_label = 'Seconds'
    }
    if (countdown < 0) {
      isExpired = true
      countdown = moment(end_date_time).diff(moment(), 'days')
      countdown_label = 'Days'
      if (countdown == 0) {
        countdown = moment(end_date_time).diff(moment(), 'hours')
        countdown_label = 'Hours'
      }
      if (countdown == 0) {
        countdown = moment(end_date_time).diff(moment(), 'minutes')
        countdown_label = 'Minutes'
      }
      if (countdown == 0) {
        countdown = moment(end_date_time).diff(moment(), 'seconds')
        countdown_label = 'Seconds'
      }
    }
    const scheduledGamePicture = (
      <img src={game_artwork ? game_artwork : defaultThumbnails} className={game_artwork ? 'image' : 'default-image'} />
    )
    return (
      <div className={`mygames`} key={this.props.id} onClick={(e) => this.handleSingleGameView(schedule_games_GUID)}>
        <div className='gameImage'>{scheduledGamePicture}</div>
        <div className='game__attributes'>
          <div className='first__row'>
            <h1 className='game__name' title={this.props.game_name}>
              {this.props.game_name}
            </h1>
            <div className='game__playerList'>
              <Link to={`/profile/${this.props.alias}`}>
                <div className='playerName'>
                  <img onError={this.addDefaultSrc} src={this.props.profile_img ? this.props.profile_img : defaultUserImage} />
                  <span> {this.props.alias}</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='second__row'>
            <div className='gamer__count'>
              <img src='https://myG.gg/platform_images/Dashboard/Notifications/little_green_man.svg' />
              <span>
                {this.props.no_of_gamers} / {this.props.limit == 0 ? <span>&#8734;</span> : this.props.limit} Gamers
              </span>
            </div>
            <div className='game__timestamp'>
              <img src='https://myG.gg/platform_images/Dashboard/Notifications/clock.svg' />
              <span>{moment(this.props.start_date_time).format('LL')}</span>
            </div>
          </div>
          <div className='third__row'>
            <div className='game__level__wrap'>
              {experience_split.length > 0 &&
                experience_split.map((ex, index) => {
                  return (
                    <div className={`game__level game__level_${ex}`} key={ex}>
                      {ex}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div
          className={`time ${
            (countdown_label == 'Minutes' || countdown_label == 'Seconds') && isExpired && countdown < 60 ? 'start-soon' : ''
          }`}>
          <div className='time-align'>
            {!isExpired ? `Starting in` : `Expire in `}
            <div className='time-info'>{countdown}</div>
            {countdown_label}
          </div>
        </div>
      </div>
    )
  }
}
