import React, { Component } from 'react'

export default class GameList extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { scheduleGames = [] } = this.state
    return (
      <div className='gameList'>
        <div className='gameList_head__option'>
          <div className='gameResult__count'> 3 Results</div>
          <div className='gameResult__fillView'> Show full games</div>
        </div>
        <div className='gameList__box'>
          {/* My game list start here */}
          <div className='mygames'>
            <div className='gameImage'>
              <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
            </div>
            <div className='game__attributes'>
              <div className='first__row'>
                <h1 className='game__name'>DOTA 2</h1>
                <div className='game__playerList'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <div className='playerName'>DAV1D_90</div>
                </div>
              </div>
              <div className='second__row'>
                <div className='gamer__count'>
                  <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                  <span>0 / 3 Gamers</span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/clock.svg' />
                  <span>February 8, 10pm</span>
                </div>
              </div>
              <div className='third__row'>
                <div className='game__tags'>
                  <div className='game__tag'>Initiator</div>
                </div>
                <div className='game__level'>Semi-Pro</div>
              </div>
            </div>
          </div>

          <div className='mygames'>
            <div className='gameImage'>
              <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
            </div>
            <div className='game__attributes'>
              <div className='first__row'>
                <h1 className='game__name'>DOTA 2</h1>
                <div className='game__playerList'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <div className='playerName'>DAV1D_90</div>
                </div>
              </div>
              <div className='second__row'>
                <div className='gamer__count'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>0 / 3 Gamers</span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>February 8, 10pm</span>
                </div>
              </div>
              <div className='third__row'>
                <div className='game__tags'>
                  <div className='game__tag'>Initiator</div>
                </div>
                <div className='game__level'>Semi-Pro</div>
              </div>
            </div>
          </div>

          <div className='mygames'>
            <div className='gameImage'>
              <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
            </div>
            <div className='game__attributes'>
              <div className='first__row'>
                <h1 className='game__name'>DOTA 2</h1>
                <div className='game__playerList'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <div className='playerName'>DAV1D_90</div>
                </div>
              </div>
              <div className='second__row'>
                <div className='gamer__count'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>0 / 3 Gamers</span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>February 8, 10pm</span>
                </div>
              </div>
              <div className='third__row'>
                <div className='game__tags'>
                  <div className='game__tag'>Initiator</div>
                </div>
                <div className='game__level'>Semi-Pro</div>
              </div>
            </div>
          </div>

          <div className='mygames'>
            <div className='gameImage'>
              <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
            </div>
            <div className='game__attributes'>
              <div className='first__row'>
                <h1 className='game__name'>DOTA 2</h1>
                <div className='game__playerList'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <div className='playerName'>DAV1D_90</div>
                </div>
              </div>
              <div className='second__row'>
                <div className='gamer__count'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>0 / 3 Gamers</span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>February 8, 10pm</span>
                </div>
              </div>
              <div className='third__row'>
                <div className='game__tags'>
                  <div className='game__tag'>Initiator</div>
                </div>
                <div className='game__level'>Semi-Pro</div>
              </div>
            </div>
          </div>

          <div className='mygames'>
            <div className='gameImage'>
              <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
            </div>
            <div className='game__attributes'>
              <div className='first__row'>
                <h1 className='game__name'>DOTA 2</h1>
                <div className='game__playerList'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <div className='playerName'>DAV1D_90</div>
                </div>
              </div>
              <div className='second__row'>
                <div className='gamer__count'>
                  <img src='https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png' />
                  <span>0 / 3 Gamers</span>
                </div>
                <div className='game__timestamp'>
                  <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Notifications/little_green_man.svg' />
                  <span>February 8, 10pm</span>
                </div>
              </div>
              <div className='third__row'>
                <div className='game__tags'>
                  <div className='game__tag'>Initiator</div>
                </div>
                <div className='game__level'>Semi-Pro</div>
              </div>
            </div>
          </div>
          {/* My game list end here */}
        </div>
      </div>
    )
  }
}
