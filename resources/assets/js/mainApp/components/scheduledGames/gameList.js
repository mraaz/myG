import React, { Component } from 'react'
import moment from 'moment'

const defaultThumbnails = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Notifications/myG_icon.svg'

export default class GameList extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { scheduleGames = [] } = this.props
    const len = scheduleGames.length

    return (
      <div className='gameList'>
        <div className='gameList_head__option'>
          {/* <div className='gameResult__count'> {len} Results</div> */}
          <div className='gameResult__fillView'>
            <span>Show full games </span>{' '}
            <div class='button-switch'>
              <input type='checkbox' id='switch-orange' class='switch' />
            </div>
          </div>
        </div>
        <div className='gameList__box'>
          {/* My game list start here */}
          {scheduleGames.length > 0 &&
            scheduleGames.map((game) => {
              const image = null
              const scheduledGamePicture = (
                <img src={image == null ? defaultThumbnails : image} className={image == null ? 'default-image' : 'image'} />
              )
              return (
                <div className='mygames'>
                  <div className='gameImage'>{scheduledGamePicture}</div>
                  <div className='game__attributes'>
                    <div className='first__row'>
                      <h1 className='game__name'>{game.game_name}</h1>
                      <div className='game__playerList'>
                        <img src={game.profile_img} />
                        <div className='playerName'>{game.alias}</div>
                      </div>
                    </div>
                    <div className='second__row'>
                      <div className='gamer__count'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                        <span>0 / 3 Gamers</span>
                      </div>
                      <div className='game__timestamp'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                        <span>{moment(game.start_date_time).format('YYYY-MM-DD HH:mm')}</span>
                      </div>
                    </div>
                    <div className='third__row'>
                      <div className='game__tags'>
                        <div className='game__tag'>Initiator</div>
                      </div>
                      {game.experience && <div className='game__level'>{game.experience}</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          {/* My game list end here */}
        </div>
      </div>
    )
  }
}
