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

  render() {
    const { scheduleGames = {}, showRightSideInfo, commentData = {}, showAllComment } = this.props
    const { latestScheduledGames, approved_gamers = [], join_status } = scheduleGames
    console.log('scheduleGames  ', scheduleGames, showAllComment)

    const [scheduleGames_data = {}] = latestScheduledGames
    const {
      game_name = '',
      experience = '',
      no_of_gamers = '',
      tags = [],
      start_date_time = '',
      end_date_time = '',
      limit,
      description = '',
      platform = '',
      region = '',
      id = '',
      allow_comments = 0,
    } = scheduleGames_data
    const experience_split = experience ? experience.split(',') : []

    const { no_of_comments = [], lastComment = '' } = commentData

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
              <JoinButtonAction join_status={join_status} schedule_games_id={id} />
            </div>
            <div className='gameDetails__body'>
              <div className='filter__label'>Game Details</div>
              <div className='gameDescription'>Description</div>
              <div className='gameDescription__body'>{description}</div>
              <div className='gameTime__label'>End Time</div>
              <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>

              {platform && <div className='gameTime__label'>Platform</div>}
              {platform && <div className='gameTime__value'>{platform}</div>}
              {region && <div className='gameTime__label'>Region</div>}
              {region && <div className='gameTime__value'>{region}</div>}
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
                <div className='view__all__comments' onClick={this.props.handleShowAllComments}>
                  View all (3) comments
                </div>
                <div className='game__comment'>
                  <div className='profile__image'></div>
                  <div className='arrow'></div>
                  <span className='author'>Alexander Bischof</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </span>
                </div>
              </div>
            )}
          </Fragment>
        )}
        {showAllComment && (
          <div className='gameDetails'>
            <GameComments
              game_id={id}
              toggleBack={this.props.handleShowAllComments}
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
