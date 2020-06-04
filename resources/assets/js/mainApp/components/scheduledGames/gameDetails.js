import React, { Component } from 'react'

export default class GameDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className='gameDetails'>
        <div className='gameDetails__header'>
          <div className='gameName'>
            <h1 className='game__name'>DOTA 2</h1>
            <div className='gamer__count'>
              <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
              <span>0 / 3 Gamers</span>
            </div>
            <div className='game__timestamp'>
              <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
              <span>February 8, 10pm</span>
            </div>
            <div className='game__level'>Semi-Pro</div>
          </div>
          <div className='game__action__buttton'>
            <button type='button'>Join</button>
          </div>
        </div>
        <div className='gameDetails__body'>
          <div className='filter__label'>Game Details</div>
          <div className='gameDescription'>Description</div>
          <div className='gameDescription__body'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <div className='gameTime__label'>End Time</div>
          <div className='gameTime__value'>Saturday, February 8, 11pm</div>
          <div className='gameTags__label'>Tags</div>
          <div className='gameTags__value'>
            <div className='singleTags'>Initiator</div>
          </div>
        </div>
        <div className='gameDetaiils__footer'>
          <div className='view__all__comments'>View all (3) comments</div>
          <div className='game__comment'>
            <div className='profile__image'></div>
            <div className='arrow'></div>
            <span className='author'>Alexander Bischof</span>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
        </div>
      </div>
    )
  }
}
