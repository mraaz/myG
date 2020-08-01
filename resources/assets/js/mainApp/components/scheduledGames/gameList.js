/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import { WithTooltip } from '../Tooltip'
import Select from 'react-select'
const defaultUserImage = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png'

const defaultThumbnails = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Notifications/myG_icon.svg'
const statusMapping = { 1: 'Approved. you are in!', 3: 'Pending Approval by Host' }

export default class GameList extends Component {
  constructor() {
    super()
    this.state = {
      activeItemId: '',
      prefilledFilter: { value: 0, label: 'All myGames' },
    }
    this.myRef = React.createRef()
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.props.hasMore && !this.props.fetching) {
      this.props.next()
    }
  }

  handleCopyToClipBoard = (e, guid) => {
    e.preventDefault()
    e.stopPropagation()
    const link = `${window.location.protocol}//${window.location.hostname}/scheduledGames/${guid}`
    navigator.clipboard.writeText(link)
    toast.error(<Toast_style text={'Link copied mate!'} />)
  }
  handleSingleGameDetails = (e, id, game) => {
    const { activeItemId = '' } = this.state
    if (activeItemId != id) {
      this.setState({ activeItemId: id })
      this.props.getSingleGameData(e, id, game)
    }
  }
  handlePendingApproval = (e) => {
    e.stopPropagation()
    window.location.href = `/notifications`
  }

  render() {
    const { scheduleGames = [], copyClipboardEnable = true, showPrefilledFilter = false } = this.props
    const { activeItemId = '', prefilledFilter } = this.state
    const len = scheduleGames.length

    return (
      <div className='gameList'>
        <div className='gameList_head__option'>
          <div className='gameResult__count'> {len} Results</div>
          <div className='gameResult__fillView'>
            <span>{this.props.slideOptionLabel} </span>{' '}
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
        <div className='gameList__box' onScroll={this.handleScroll} ref={this.myRef}>
          {/* My game list start here */}
          {scheduleGames.length > 0 &&
            scheduleGames.map((game) => {
              const { myStatus = '', no_of_Approval_Pending = '', game_name_fields_img = '', experience = '' } = game
              const experience_split = experience ? experience.split(',') : []
              const scheduledGamePicture = (
                <img
                  src={game_name_fields_img ? game_name_fields_img : defaultThumbnails}
                  className={game_name_fields_img ? 'image' : 'default-image'}
                />
              )
              return (
                <div
                  className={`mygames ${activeItemId == game.id ? 'active' : ''}`}
                  key={game.id}
                  onClick={(e) => this.handleSingleGameDetails(e, game.id, game)}>
                  <div className='gameImage'>{scheduledGamePicture}</div>
                  <div className='game__attributes'>
                    <div className='first__row'>
                      <h1 className='game__name' title={game.game_name}>
                        {game.game_name}
                      </h1>
                      <div className='game__playerList'>
                        <Link to={`/profile/${game.alias}`}>
                          <div className='playerName'>
                            <img src={game.profile_img ? game.profile_img : defaultUserImage} />
                            <span> {game.alias}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className='second__row'>
                      <div className='gamer__count'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                        <span>
                          {game.no_of_gamers} / {game.limit == 0 ? <span>&#8734;</span> : game.limit} Gamers
                        </span>
                      </div>
                      <div className='game__timestamp'>
                        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                        <span>{moment(game.start_date_time).format('LL')}</span>
                      </div>
                    </div>
                    {copyClipboardEnable && (
                      <div className='copy__clipboard'>
                        <div className='copy__clipboard__action' onClick={(e) => this.handleCopyToClipBoard(e, game.schedule_games_GUID)}>
                          <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Link.svg' />
                        </div>
                      </div>
                    )}
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
                        {game.tags && game.tags.length > 7 && ` ...`}
                      </div>
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
                    <div className='fourth__row'>
                      {statusMapping[myStatus] && (
                        <div className='my__status'>
                          <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/tick.svg' />
                          <span>{statusMapping[myStatus]}</span>
                        </div>
                      )}
                      {no_of_Approval_Pending ? (
                        <div className='no__of__approval' onClick={this.handlePendingApproval}>
                          <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/warning.svg' />
                          <span>{no_of_Approval_Pending} Approval Pending</span>
                        </div>
                      ) : (
                        ''
                      )}
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
