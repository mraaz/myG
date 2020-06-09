import React, { Component, Fragment } from 'react'
import moment from 'moment'
const buttonStatus = {
  0: 'Join',
  1: 'Joined',
  3: 'Pending',
}
export default class GameDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { singleScheduleGamesPayload = {}, selected_game = {}, showRightSideInfo } = this.props
    const { additional_game_info = [], approved_gamers = [], join_status } = singleScheduleGamesPayload
    const [game_additional_data = {}] = additional_game_info
    const { game_name = '', experience = '', no_of_gamers = '', tags = [] } = selected_game
    const { start_date_time = '', end_date_time = '', limit, description = '' } = game_additional_data

    return (
      <div className='gameDetails'>
        {showRightSideInfo && (
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
                <div className='game__level'>{experience}</div>
              </div>
              <div className='game__action__buttton'>{join_status && <button type='button'>{buttonStatus[join_status]}</button>}</div>
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
                  tags.slice(0, 7).map((tag) => {
                    return <div className='singleTags'>{tag.content}</div>
                  })}
              </div>
            </div>
            <div className='gameDetaiils__footer'>
              <div className='view__all__comments'>View all (3) comments</div>
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
          </Fragment>
        )}
      </div>
    )
  }
}
