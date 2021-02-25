import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Select from 'react-select'

import GameFilter from '../scheduledGames/gameFilter'
import { WithTooltip } from '../Tooltip'
import JoinButtonAction from '../scheduledGames/JoinButtonAction'
import Approved_gamers from '../scheduledGames/ApprovedGamers'
import GameComments from '../scheduledGames/GameComments'
import { prefilledFilter_option } from '../scheduledGames/option'

const MobileScheduledGames = (props) => {
  const {
    scheduleGames,
    selectedGame,
    getSingleGameData,
    deSelectGame,
    user,
    handleShowAllComments,
    routeProps,
    slideOptionLabel,
    handleExcludesFullGames,
    showFullGames,
    showRightSideInfo,
    commentData,
    showAllComment,
    showPrefilledFilter = false,
    prefilledFilter,
    handleChangeFilter,
    myGamesMenu = false,
    singleScheduleGamesPayload,
  } = props

  const defaultThumbnails = 'https://myG.gg/platform_images/Notifications/myG_icon.svg'
  const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'
  const myRef = React.createRef()

  const transformPlayerLevelTitle = (title) => {
    switch (title) {
      case 'Semi Pro':
        return 'Semi-Pro'
      case 'Professional':
        return 'Pro'
      case 'Casual':
        return 'Casual'
      default:
        // Unknown level, go with it
        return title
    }
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  const handlePendingApproval = (e) => {
    e.stopPropagation()
    window.router.push('/?at=notifications&submenu=1')
  }
  const handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && props.hasMore && !props.fetching) {
      props.next()
    }
  }

  const statusMapping = { 1: 'Approved. you are in!', 3: 'Pending Approval by Host' }

  const {
    additional_game_info = {},
    approved_gamers = [],
    join_status = '',
    additional_submit_info = false,
    additional_submit_info_fields = [],
    myStatus = 0,
    latestScheduledGames = [],
    getAllGamers = [],
  } = singleScheduleGamesPayload || scheduleGames || {}
  const [firstGame = {}] = latestScheduledGames
  const gameData = { ...additional_game_info, ...selectedGame, ...firstGame }
  const {
    start_date_time = '',
    end_date_time = '',
    limit,
    description = '',
    platform = '',
    region = '',
    schedule_games_GUID,
    accept_msg = '',
    id = '',
    game_name = '',
    experience = '',
    tags = [],
  } = gameData
  const { no_of_gamers = 0 } = getAllGamers[0] || {}
  const { allow_comments = 0 } = additional_game_info

  const experience_split = experience ? experience.split(',').map((level) => transformPlayerLevelTitle(level)) : []

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

  return (
    <Fragment>
      <div className={`mGameAllComments${showRightSideInfo && showAllComment ? ' active' : ' inactive'}`}>
        {showAllComment && (
          <GameComments
            game_id={id}
            scheduleGames_data={selectedGame}
            user={user}
            toggleBack={(e) => handleShowAllComments(id)}
            allow_comments={allow_comments}
          />
        )}
      </div>

      <div className={`mGameDetails${showRightSideInfo && !showAllComment ? ' active' : ' inactive'}`}>
        <div className='mGameDetailsRowOne'>
          <div className='rowOneWrapper'>
            <a className='mGameDetailsBackButton' onClick={(e) => deSelectGame(e)}>
              <img className='mGameDetailsCaretImg' src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg' />
              <span>{` Full List `}</span>
            </a>

            <JoinButtonAction
              join_status={join_status}
              schedule_games_id={id}
              additional_submit_info={additional_submit_info}
              additional_submit_info_fields={additional_submit_info_fields}
              schedule_games_GUID={schedule_games_GUID}
              myStatus={myStatus}
              routeProps={routeProps}
            />
          </div>
        </div>

        <div className='mGameDetailsRowTwo'>
          <h1 className='mGameName' title={selectedGame && selectedGame.game_name}>
            {selectedGame && selectedGame.game_name}
          </h1>
        </div>

        <div className='mGameDetailsRowThree'>
          <div className='mGamerCount'>
            <img src='https://myG.gg/platform_images/Dashboard/Notifications/little_green_man.svg' />
            <span>
              {no_of_gamers} / {limit == 0 ? <span>&#8734;</span> : limit} Gamers
            </span>
          </div>
          <div className='mGameTimestamp'>
            <img src='https://myG.gg/platform_images/Dashboard/Notifications/clock.svg' />
            <span>{moment(start_date_time).format('LLL')}</span>
          </div>
          <div className='gameLevelWrap'>
            {experience_split.length > 0 &&
              experience_split.map((ex, index) => {
                return (
                  <div className={`gameLevel gameLevel${ex}`} key={ex}>
                    {ex}
                  </div>
                )
              })}
          </div>
        </div>

        <div className='mGameDetailsRowFour'>
          <div className='mGameDetailsRowWrapper'>
            <div className='gameDescription'>Game Details</div>
            {mic && <div className='gameDescription__body'>Mic required!</div>}
            {eighteen_plus && <div className='gameDescription__body'>18+ event boies n gurls</div>}
            {description && <div className='filter__label'>Description</div>}
            {description && <div className='gameDescription__body'>{description}</div>}
            {end_date_time && <div className='gameTime__label'>End Time</div>}
            {end_date_time && <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>}

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
                      text={tag.content}>
                      <p className='singleTags' title={tag.content}>
                        {tag.content}
                      </p>
                    </WithTooltip>
                  )
                })}
            </div>
          </div>
        </div>

        {(lastComment.content || !showAllComment) && (
          <div className='gameDetaiils__footer'>
            {no_of_my_comments > 0 && (
              <Fragment>
                <div className='view__all__comments' onClick={(e) => handleShowAllComments(id)}>
                  {`View all (${no_of_my_comments}) comments`}
                </div>

                <div className='game__comment'>
                  <Link to={`/profile/${lastComment.alias}`} className='user-img'>
                    {' '}
                    <div>
                      <img
                        onError={addDefaultSrc}
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
                No comments yet. <span onClick={(e) => handleShowAllComments(id)}>Be the first to leave a comment.</span>
              </div>
            ) : (
              ''
            )}
            {allow_comments == 0 && <div className='noComments disabled'>Comments disabled.</div>}
          </div>
        )}
      </div>

      <div className={`mGameTileList${!showRightSideInfo ? ' active' : ' inactive'}`}>
        <div className='mGameTileListHeader'>
          <div className='myGame__filter-section'>
            {id == '' && myGamesMenu && (
              <div className='viewGame__gameName game-title-select'>
                <Select
                  onChange={(data) => handleChangeFilter(data)}
                  options={prefilledFilter_option}
                  placeholder='Select your filter'
                  name='prefilledFilter'
                  className='viewGame__name'
                  classNamePrefix='filter'
                  value={prefilledFilter}
                />
              </div>
            )}
            {id == '' && !myGamesMenu && <GameFilter handleChange={handleChangeFilter} />}
          </div>
          <div class='mGameResultsFiltersRowTwo'>
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
        </div>
        <div className='gameList__box' onScroll={handleScroll} ref={myRef}>
          {scheduleGames.length > 0 &&
            scheduleGames.map((game) => {
              const { myStatus = '', no_of_Approval_Pending = '', game_artwork = '', experience = '' } = game
              const experience_split = experience ? experience.split(',').map((level) => transformPlayerLevelTitle(level)) : []
              const scheduledGamePicture = (
                <img src={game_artwork ? game_artwork : defaultThumbnails} className={game_artwork ? 'image' : 'default-image'} />
              )

              if (game.no_of_gamers == undefined) {
                game.no_of_gamers = 0
              }

              return (
                <div className='mGameTile' onClick={(e) => getSingleGameData(e, game.id, game)}>
                  <div className='mGameTileImage'>{scheduledGamePicture}</div>
                  <div className='mGameTileDescription'>
                    <div className='mGameTileRowOne'>
                      <h1 className='mGameName' title={game.game_name}>
                        {game.game_name}
                      </h1>

                      <div className='gameLevelWrap'>
                        {experience_split.length > 0 &&
                          experience_split.map((ex, index) => {
                            return (
                              <div className={`gameLevel gameLevel${ex}`} key={ex}>
                                {ex}
                              </div>
                            )
                          })}
                      </div>
                    </div>

                    <div className='mGameTileRowTwo'>
                      <div className='mGamePlayerList'>
                        <Link to={`/profile/${game.alias}`}>
                          <div className='playerName'>
                            <img onError={addDefaultSrc} src={game.profile_img ? game.profile_img : defaultUserImage} />
                            <span> {game.alias}</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className='mGameTileRowThree'>
                      <div className='mGamerCount'>
                        <img src='https://myG.gg/platform_images/Dashboard/Notifications/little_green_man.svg' />
                        <span>
                          {game.no_of_gamers} / {game.limit == 0 ? <span>&#8734;</span> : game.limit} Gamers
                        </span>
                      </div>

                      <div className='mGameTimestamp'>
                        <img src='https://myG.gg/platform_images/Dashboard/Notifications/clock.svg' />
                        <span>{moment(game.start_date_time).format('LLL')}</span>
                      </div>

                      {game.tags && game.tags.length > 0 ? (
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
                      ) : (
                        ''
                      )}
                    </div>

                    {statusMapping[myStatus] || no_of_Approval_Pending ? (
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
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </Fragment>
  )
}

export default MobileScheduledGames
