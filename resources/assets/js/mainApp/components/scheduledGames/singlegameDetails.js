/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import moment from 'moment'
import Approved_gamers from './ApprovedGamers'
import JoinButtonAction from './JoinButtonAction'
import GameComments from './GameComments'
import { Link } from 'react-router-dom'
import { WithTooltip } from '../Tooltip'
import axios from 'axios'
import { copyToClipboard } from '../../../common/clipboard'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'

export default class SingleGameDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    try {
      const { scheduleGames = {} } = this.props
      const { latestScheduledGames } = scheduleGames

      const [scheduleGames_data = {}] = latestScheduledGames
      const { id = '' } = scheduleGames_data
      const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
      if (allComments.data) {
        await this.setState({ commentData: { ...allComments.data } })
      }
    } catch (error) {
      console.log('error  ', error)
    }
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  handleShowAllComments = async (id) => {
    const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
    if (allComments.data) {
      await this.setState({ commentData: { ...allComments.data } })
    }
    this.props.handleShowAllComments()
  }

  render() {
    const { scheduleGames = {}, showRightSideInfo, showAllComment } = this.props
    const {
      latestScheduledGames,
      approved_gamers = [],
      join_status,
      myStatus,
      additional_submit_info = false,
      additional_submit_info_fields = [],
      getAllGamers = [],
    } = scheduleGames

    const [scheduleGames_data = {}] = latestScheduledGames
    const {
      game_name = '',
      experience = '',
      tags = [],
      start_date_time = '',
      end_date_time = '',
      limit,
      description = '',
      platform = '',
      region = '',
      id = '',
      schedule_games_GUID,
      marked_as_deleted = 0,
      reason_for_deletion = null,
    } = scheduleGames_data
    const { no_of_gamers } = getAllGamers[0] || {}
    const experience_split = experience ? experience.split(',') : []
    const { commentData = {} } = this.state
    const { no_of_comments = [], lastComment = '' } = commentData
    const { no_of_my_comments = 0 } = no_of_comments[0] || {}
    let { allow_comments = 0 } = scheduleGames_data
    if (marked_as_deleted) {
      allow_comments = 0
    }

    return (
      <div className='gameDetails singleGameDetail'>
        {showRightSideInfo && !showAllComment && (
          <Fragment>
            <div className='gameDetails__header'>
              <div className='gameName'>
                <h1 className='game__name'>{game_name}</h1>
                <div className='gamer__count'>
                  <img src='https://myG.gg/platform_images/Dashboard/Notifications/little_green_man.svg' />
                  <span>
                    {no_of_gamers} / {limit == 0 ? <span>&#8734;</span> : limit} Gamers
                  </span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://myG.gg/platform_images/Dashboard/Notifications/clock.svg' />
                  <span>{moment.utc(start_date_time).local().format('LLL')}</span>
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
                  <a className="clickable share-copy" onClick={() => copyToClipboard(`Checkout this game -> ${window.location.href}`)}>Share</a>
                  <a className="clickable share-facebook" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>Facebook</a>
                </div>
              </div>
              {!marked_as_deleted && (
                <JoinButtonAction
                  join_status={join_status}
                  additional_submit_info={additional_submit_info}
                  additional_submit_info_fields={additional_submit_info_fields}
                  schedule_games_id={id}
                  schedule_games_GUID={schedule_games_GUID}
                  myStatus={myStatus}
                  routeProps={this.props.routeProps}
                />
              )}
            </div>
            <div className='gameDetails__body singleGameBody'>
              <div className='filter__label'>Game Details</div>
              <div className='gameDescription'>Description</div>
              <div className='gameDescription__body'>{description}</div>
              <div className='gameTime__label'>End Time</div>
              <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>

              {platform && <div className='gameTime__label'>Platform</div>}
              {platform && <div className='gameTime__value'>{platform.split(',').join(', ')}</div>}
              {region && <div className='gameTime__label'>Region</div>}
              {region && <div className='gameTime__value'>{region.split(',').join(', ')}</div>}
              {marked_as_deleted != 0 && (
                <div className='gameTime__label'>
                  <span style={{ color: '#e5c746' }}>Reason for cancelling</span>
                </div>
              )}
              {marked_as_deleted != 0 && <div className='gameTime__value'>{reason_for_deletion}</div>}
              {additional_submit_info_fields.length > 0 &&
                additional_submit_info_fields.map((fields) => {
                  let values = ''
                  const Obj = fields[0]

                  if (Obj != null) {
                    values = Object.values(Obj)[0]
                    if (values == undefined || values == null) {
                      values = ''
                    }
                  }
                  return (
                    <Fragment>
                      <div className='gameTime__label'>{Obj.label}</div>
                      <div className='gameTime__value'>{values.split(',').join(', ')}</div>
                    </Fragment>
                  )
                })}
              <Approved_gamers approved_gamers={approved_gamers} schedule_games_id={id} />
              {tags && tags.length > 0 && <div className='gameTags__label'>Tags</div>}
              <div className='gameTags__value game__tags'>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag) => {
                    return (
                      <WithTooltip
                        position={{ bottom: '24px', left: '-12px' }}
                        style={{ height: '24px', display: 'inline-block', marginBottom: '10px' }}
                        text={tag.content}>
                        <p className='singleTags' title={tag.content}>
                          {tag.content}
                        </p>
                      </WithTooltip>
                    )
                  })}
              </div>
            </div>
            {(lastComment || !showAllComment) && (
              <div className='gameDetaiils__footer'>
                {no_of_my_comments > 0 && (
                  <Fragment>
                    <div className='view__all__comments' onClick={(e) => this.handleShowAllComments(id)}>
                      {`View all (${no_of_my_comments}) comments`}
                    </div>

                    {allow_comments == 0 && <div className='noComments disabled'>Comments disabled.</div>}

                    <div className='game__comment'>
                      <Link to={`/profile/${lastComment.alias}`} className='user-img'>
                        {' '}
                        <div>
                          <img
                            onError={this.addDefaultSrc}
                            src={lastComment.profile_img ? lastComment.profile_img : defaultUserImage}
                            className='profile__image'
                          />
                        </div>
                      </Link>

                      <div className='arrow'></div>
                      <span className='author'>{`${lastComment.alias}`}</span>
                      <span>{lastComment.content || ''}</span>
                    </div>
                  </Fragment>
                )}
                {no_of_my_comments == 0 && allow_comments ? (
                  <div className='noComments'>
                    No comments yet. <span onClick={(e) => this.handleShowAllComments(id)}>Be the first to leave a comment.</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </Fragment>
        )}
        {showAllComment && (
          <div className='gameDetails'>
            <GameComments
              game_id={id}
              toggleBack={(e) => this.handleShowAllComments(id)}
              scheduleGames_data={scheduleGames_data}
              user={this.props.initialData}
              allow_comments={allow_comments}
            />
          </div>
        )}
      </div>
    )
  }
}
