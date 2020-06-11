import React, { Component, Fragment } from 'react'
import moment from 'moment'
import Approved_gamers from './ApprovedGamers'
import JoinButtonAction from './JoinButtonAction'
import GameComments from './GameComments'

export default class GameDetails extends Component {
  constructor() {
    super()
    this.state = {
      showAllComment: false,
    }
  }
  handleShowAllComments = () => {
    this.setState({ showAllComment: !this.state.showAllComment })
  }

  render() {
    const { scheduleGames = [], showRightSideInfo, commentData } = this.props
    const { latestScheduledGames, approved_gamers = [], join_status } = scheduleGames
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
    } = scheduleGames_data
    const { no_of_comments = [], lastComment = '' } = commentData

    const { showAllComment } = this.state

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
                {experience && <div className='game__level'>{experience}</div>}
              </div>
              <JoinButtonAction join_status={join_status} />
            </div>
            <div className='gameDetails__body'>
              <div className='filter__label'>Game Details</div>
              <div className='gameDescription'>Description</div>
              <div className='gameDescription__body'>{description}</div>
              <div className='gameTime__label'>End Time</div>
              <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>
              <div className='gameTags__label'>Tags</div>
              <div className='gameTags__value'>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag) => {
                    return <div className='singleTags'>{tag.content}</div>
                  })}
              </div>
              {platform && <div className='gameTime__label'>Platform</div>}
              {platform && <div className='gameTime__value'>{platform}</div>}
              {region && <div className='gameTime__label'>Region</div>}
              {region && <div className='gameTime__value'>{region}</div>}
              <Approved_gamers approved_gamers={approved_gamers} />
            </div>
            {(lastComment || !showAllComment) && (
              <div className='gameDetaiils__footer'>
                <div className='view__all__comments' onClick={this.handleShowAllComments}>
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
        {showAllComment && <GameComments game_id={id} scheduleGames_data={scheduleGames_data} {...this.props} />}
      </div>
    )
  }
}
