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
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'

export default class GameDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }
  handleShowAllComments = (id) => {
    this.props.handleShowAllComments(id)
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  render() {
    const {
      singleScheduleGamesPayload = {},
      selected_game = {},
      showRightSideInfo,
      commentData,
      showAllComment,
      updateSingleScheduleGamesPayload
    } = this.props
    const {
      additional_game_info = {},
      approved_gamers = [],
      join_status = '',
      additional_submit_info = false,
      additional_submit_info_fields = [],
      myStatus = 0
    } = singleScheduleGamesPayload
    const { id = '', game_name = '', experience = '', no_of_gamers = '', tags = [] } = selected_game
    const {
      start_date_time = '',
      end_date_time = '',
      limit,
      description = '',
      platform = '',
      region = '',
      allow_comments = 0,
      schedule_games_GUID,
      accept_msg = ''
    } = additional_game_info

    let mic = additional_game_info.mic
    let eighteen_plus = additional_game_info.eighteen_plus
    if (mic) {
      mic = true
    } else {
      mic = false
    }
    if (eighteen_plus) {
      eighteen_plus = true
    } else {
      eighteen_plus = false
    }

    const { no_of_comments = [], lastComment = '' } = commentData
    const { no_of_my_comments = 0 } = no_of_comments[0] || {}

    const experience_split = experience ? experience.split(',') : []

    return (
      <div className='gameDetails'>
        {showRightSideInfo && !showAllComment ? (
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
                </div>
              </div>

              <JoinButtonAction
                join_status={join_status}
                schedule_games_id={id}
                additional_submit_info={additional_submit_info}
                additional_submit_info_fields={additional_submit_info_fields}
                schedule_games_GUID={schedule_games_GUID}
                myStatus={myStatus}
                updateSingleScheduleGamesPayload={updateSingleScheduleGamesPayload}
                routeProps={this.props.routeProps}
              />
            </div>
            <div className='gameDetails__body'>
              <div className='filter__label'>Game Details</div>
              {mic && <div className='gameDescription__body'>Mic required!</div>}
              {eighteen_plus && <div className='gameDescription__body'>18+ event boies n gurls</div>}
              {description && <div className='gameDescription'>Description</div>}
              {description && <div className='gameDescription__body'>{description}</div>}
              <div className='gameTime__label'>End Time</div>
              <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>

              {platform && <div className='gameTime__label'>Platform</div>}
              {platform && <div className='gameTime__value'>{platform.split(',').join(',  ')}</div>}
              {region && <div className='gameTime__label'>Region</div>}
              {region && <div className='gameTime__value'>{region.split(',').join(', ')}</div>}
              {accept_msg && <div className='gameTime__label'>Accept Message</div>}
              {accept_msg && <div className='gameTime__value'>{accept_msg}</div>}
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
              {tags && tags.length > 7 && <div className='gameTags__label'>Tags</div>}
              <div className='gameTags__value'>
                {tags &&
                  tags.length > 7 &&
                  tags.map((tag) => {
                    return (
                      <WithTooltip
                        position={{ bottom: '24px', left: '-12px' }}
                        style={{ height: '24px', display: 'inline-block', marginBottom: '5px' }}
                        text={tag.content}
                      >
                        <p className='singleTags' title={tag.content}>
                          {tag.content}
                        </p>
                      </WithTooltip>
                    )
                  })}
              </div>
            </div>
            {(lastComment.content || !showAllComment) && (
              <div className='gameDetaiils__footer'>
                {no_of_my_comments > 0 && (
                  <Fragment>
                    <div className='flexyBox'>
                      <div className='view__all__comments' onClick={(e) => this.handleShowAllComments(id)}>
                        {`View all (${no_of_my_comments}) comments`}
                      </div>
                      {allow_comments == 0 && <div className='noComments disabled'>Comments disabled.</div>}
                    </div>

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
                {allow_comments == 0 && no_of_my_comments == 0 && <div className='noComments disabled'>Comments disabled.</div>}
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
        ) : (
          !showAllComment && <div className='viewRightInfo'>Please select card from left side to see more details.</div>
        )}
        {showAllComment && (
          <GameComments
            game_id={id}
            scheduleGames_data={selected_game}
            user={this.props.initialData}
            toggleBack={(e) => this.handleShowAllComments(id)}
            allow_comments={allow_comments}
          />
        )}
      </div>
    )
  }
}
