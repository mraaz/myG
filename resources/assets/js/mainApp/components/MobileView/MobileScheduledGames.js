import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const MobileScheduledGames = ({ scheduleGames, selectedGame, getSingleGameData, deSelectGame, slideOptionLabel, handleExcludesFullGames, showFullGames, showRightSideInfo, copyClipboardEnable = true, showPrefilledFilter = false }) => {
  const defaultThumbnails = 'https://myG.gg/platform_images/Notifications/myG_icon.svg'

  const transformPlayerLevelTitle = (title) => {
    switch (title) {
      case 'Semi Pro':
        return 'Semi-Pro'
      case 'Professional':
        return 'Pro';
      case 'Casual':
        return 'Casual';
      default:
        // Unknown level, go with it
        return title;
    }
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  const handlePendingApproval = (e) => {
    e.stopPropagation()
    window.router.push('/?at=notifications&submenu=1')
  }
  
  const statusMapping = { 1: 'Approved. you are in!', 3: 'Pending Approval by Host' }

  return (
    <Fragment>
      <div className={`mGameDetails${showRightSideInfo ? ' active' : ' inactive'}`}>
        <div className="mGameDetailsRowOne">
          <button onClick={(e) => deSelectGame(e)}>{'< Full List'}</button>
        </div>

        <div className="mGameDetailsRowTwo">
          <h1 className='mGameName' title={selectedGame && selectedGame.game_name}>
            {selectedGame && selectedGame.game_name}
          </h1>
        </div>
      </div>

      <div className={`mGameTileList${!showRightSideInfo ? ' active' : ' inactive'}`}>
        
        <div className='mGameTileListHeader'>
          <div className='mGameResultsCount'> {scheduleGames.length} Results</div>
          <div className='mGameResultsFillView'>
            <span>{slideOptionLabel} </span>{' '}
            <div className='button-switch-m'>
              <input
                type='checkbox'
                defaultChecked={showFullGames}
                id='switch-orange'
                onChange={handleExcludesFullGames}
                className='switch'
              />
            </div>
          </div>
        </div>
      {
        scheduleGames.length > 0 &&
        scheduleGames.map((game) => {
          const { myStatus = '', no_of_Approval_Pending = '', game_artwork = '', experience = '' } = game
          const experience_split = experience ? experience.split(',').map(level => transformPlayerLevelTitle(level)) : []
          const scheduledGamePicture = (
            <img src={game_artwork ? game_artwork : defaultThumbnails} className={game_artwork ? 'image' : 'default-image'} />
          );

          if (game.no_of_gamers == undefined) {
            game.no_of_gamers = 0
          }

          return (
            <div className="mGameTile" onClick={(e) => getSingleGameData(e, game.id, game)}>

              <div className='mGameTileImage'>{scheduledGamePicture}</div>
              <div className="mGameTileDescription">

                <div className="mGameTileRowOne">
                  <h1 className='mGameName' title={game.game_name}>
                    {game.game_name}
                  </h1>

                  <div className='gameLevelWrap'>
                    {
                      experience_split.length > 0 &&
                      experience_split.map((ex, index) => {
                        return (
                          <div className={`gameLevel gameLevel${ex}`} key={ex}>
                            {ex}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                <div className="mGameTileRowTwo">
                  <div className='mGamePlayerList'>
                    <Link to={`/profile/${game.alias}`}>
                      <div className='playerName'>
                        <img onError={addDefaultSrc} src={game.profile_img ? game.profile_img : defaultUserImage} />
                        <span> {game.alias}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              
                <div className="mGameTileRowThree">
                  <div className='mGamerCount'>
                    <img src='https://myG.gg/platform_images/Dashboard/Notifications/little_green_man.svg' />
                    <span>
                      {game.no_of_gamers} / {game.limit == 0 ? <span>&#8734;</span> : game.limit} Gamers
                    </span>
                  </div>

                  <div className='mGameTimestamp'>
                    <img src='https://myG.gg/platform_images/Dashboard/Notifications/clock.svg' />
                    <span>{moment(game.start_date_time).format('LL')}</span>
                  </div>

                  {(game.tags && game.tags.length > 0) ? (
                    <div className='mGameTags'>
                      {game.tags.slice(0, 7).map((tag) => {
                        return (
                          <WithTooltip
                            position={{ bottom: '24px', left: '-12px' }}
                            style={{ height: '24px', display: 'inline-block' }}
                            text={tag.content}>
                            <p className='mGameTag'>{tag.content}</p>
                          </WithTooltip>
                        )
                      })}
                      {game.tags.length > 7 && ` ...`}
                    </div>
                  ) : ''}

                </div>
              
                {(statusMapping[myStatus] || no_of_Approval_Pending) ? (
                  <div className='mGameTileRowFour'>
                    <div className='rowFourWrapper'>
                      {statusMapping[myStatus] && (
                        <div className='myStatus'>
                          <img src='https://myG.gg/platform_images/View+Game/tick.svg' />
                          <span>{statusMapping[myStatus]}</span>
                        </div>
                      )}
                      {no_of_Approval_Pending ? (
                        <div className='numberOfApprovals' onClick={handlePendingApproval}>
                          <img src='https://myG.gg/platform_images/View+Game/warning.svg' />
                          <span>{no_of_Approval_Pending} Approval Pending</span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ) : '' }

              </div>
            </div>
          );
        })
      }
      </div>
    </Fragment>
  )
}

export default MobileScheduledGames
