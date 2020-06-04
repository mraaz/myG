import React, { Component } from 'react'

const defaultScheduledGamePicture = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Notifications/myG_icon.svg';

export default class UpcomingItem extends Component {
  constructor() {
    super();
  }

  render() {
    const { gameTitle, players, image } = this.props;

    const scheduledGamePicture = (
      <img
        src={image == null ? defaultScheduledGamePicture : image}
        className={image == null ? "default-image" : "image"}
      />
    );

    return (
      <div className='upcoming-game' onClick={() => alert("hey")}>
        <div className='thumbnail'>
          { scheduledGamePicture }
        </div>
        <div className='content'>
          <div className='header'>
            <h1 className='game-title'> { gameTitle } </h1>
            <div className='game-user'>
              <div className='profile-picture'></div>
              <div className='user-name'>Andreas</div>
            </div>
            <div className='match-info'>
              <span className='players'>{players} players</span>
              <span className='start-date-time'>9pm, today</span>
            </div>
          </div>
          <div className='game-tags'>
            <span className='region'>EU</span>
            <span className='experience'>Professional</span>
          </div>
        </div>
        <div className='time'>
          <div className='time-align'>
            Starting in
            <div className='time-info'>
              3
            </div>
            hours
          </div>
        </div>
      </div>
    );
  }
}