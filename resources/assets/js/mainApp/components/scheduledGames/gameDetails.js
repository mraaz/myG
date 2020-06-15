import React, { Component, Fragment } from 'react'
import moment from 'moment'
import Approved_gamers from './ApprovedGamers'
import JoinButtonAction from './JoinButtonAction'
import GameComments from './GameComments'
import { Link } from 'react-router-dom'
import { WithTooltip } from '../Tooltip'

export default class GameDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }
  handleShowAllComments = () => {
    this.props.handleShowAllComments()
  }

  render() {
    const { singleScheduleGamesPayload = {}, selected_game = {}, showRightSideInfo, commentData, showAllComment } = this.props
    const {
      additional_game_info = {},
      approved_gamers = [],
      join_status = '',
      additional_submit_info = false,
      additional_submit_info_fields = [],
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
    } = additional_game_info

    const { no_of_comments = [], lastComment = '' } = commentData
    const { no_of_my_comments = '' } = no_of_comments[0] || {}

    const experience_split = experience ? experience.split(',') : []

    return (
      <div className='gameDetails'>
        {showRightSideInfo && !showAllComment && (
          <Fragment>
            <div className='gameDetails__header'>
              <div className='gameName'>
                <h1 className='game__name'>{game_name}</h1>
                <div className='gamer__count'>
                  <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                  <span>
                    {no_of_gamers} / {limit} Gamers
                  </span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                  <span>{moment(start_date_time).format('LL')}</span>
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
              />
            </div>
            <div className='gameDetails__body'>
              <div className='filter__label'>Game Details</div>
              {description && <div className='gameDescription'>Description</div>}
              {description && <div className='gameDescription__body'>{description}</div>}
              <div className='gameTime__label'>End Time</div>
              <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>

              {platform && <div className='gameTime__label'>Platform</div>}
              {platform && <div className='gameTime__value'>{platform}</div>}
              {region && <div className='gameTime__label'>Region</div>}
              {region && <div className='gameTime__value'>{region}</div>}
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
                        text={tag.content}>
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
                <div className='view__all__comments' onClick={this.handleShowAllComments}>
                  {no_of_my_comments ? `View all (${no_of_my_comments}) comments` : 'Click here to post a comment'}
                </div>
                {no_of_my_comments > 0 && (
                  <div className='game__comment'>
                    <Link to={`/profile/${lastComment.alias}`} className='user-img'>
                      {' '}
                      <div
                        className='profile__image'
                        style={{
                          backgroundImage: `url('${lastComment.profile_img}')`,
                          backgroundSize: 'cover',
                        }}></div>
                    </Link>

                    <div className='arrow'></div>
                    <span className='author'>{`${lastComment.first_name} ${lastComment.last_name}`}</span>
                    <span>{lastComment.content || ''}</span>
                  </div>
                )}
              </div>
            )}
          </Fragment>
        )}
        {showAllComment && (
          <GameComments
            game_id={id}
            scheduleGames_data={selected_game}
            user={this.props.initialData}
            toggleBack={this.handleShowAllComments}
            allow_comments={allow_comments}
          />
        )}
      </div>
    )
  }
}
