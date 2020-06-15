import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import { WithTooltip } from '../Tooltip'

const defaultThumbnails = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Notifications/myG_icon.svg'

export default class GameList extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleCopyToClipBoard = (e, guid) => {
    e.preventDefault()
    e.stopPropagation()
    const link = `${window.location.protocol}//${window.location.hostname}/scheduledGames/${guid}`
    navigator.clipboard.writeText(link)
    toast.error(<Toast_style text={'Link Copied Successfully.'} />)
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
            <div className='button-switch'>
              <input
                type='checkbox'
                defaultChecked={this.props.show_full_games}
                id='switch-orange'
                onChange={this.props.handleExcludesFullGames}
                className='switch'
              />
            </div>
          </div>
        </div>
        <div className='gameList__box'>
          {/* My game list start here */}
          {scheduleGames.length > 0 &&
            scheduleGames.map((game) => {
              const image = game.game_img || null
              const experience_split = game.experience ? game.experience.split(',') : []
              const scheduledGamePicture = (
                <img src={image == null ? defaultThumbnails : image} className={image == null ? 'default-image' : 'image'} />
              )
              return (
                <div className='mygames' key={game.id} onClick={(e) => this.props.getSingleGameData(e, game.id, game)}>
                  <div className='gameImage'>{scheduledGamePicture}</div>
                  <div className='game__attributes'>
                    <div className='first__row'>
                      <h1 className='game__name' title={game.game_name}>
                        {game.game_name}
                      </h1>
                      <div className='game__playerList'>
                        <img src={game.profile_img} />
                        <div className='playerName'>
                          <Link to={`/profile/${game.alias}`}>{game.alias}</Link>
                        </div>
                      </div>
                    </div>
                    <div className='second__row'>
                      <div className='gamer__count'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                        <span>
                          {game.no_of_gamers} / {game.limit} Gamers
                        </span>
                      </div>
                      <div className='game__timestamp'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                        <span>{moment(game.start_date_time).format('LL')}</span>
                      </div>
                    </div>
                    <div className='copy__clipboard'>
                      <div className='copy__clipboard__action' onClick={(e) => this.handleCopyToClipBoard(e, game.schedule_games_GUID)}>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Link.svg' />
                      </div>
                    </div>
                    <div className='third__row'>
                      <div className='game__tags'>
                        {game.tags &&
                          game.tags.length > 0 &&
                          game.tags.slice(0, 7).map((tag) => {
                            return (
                              <WithTooltip
                                position={{ bottom: '24px', left: '-12px' }}
                                style={{ height: '24px', display: 'inline-block' }}
                                text={tag.content}>
                                <p className='game__tag'>{tag.content}</p>
                              </WithTooltip>
                            )
                          })}
                      </div>
                      <div className='game__level__wrap'>
                        {experience_split.length > 0 &&
                          experience_split.map((ex, index) => {
                            return (
                              <div className={`game__level game__level_${index}`} key={ex}>
                                {ex}
                              </div>
                            )
                          })}
                      </div>
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
