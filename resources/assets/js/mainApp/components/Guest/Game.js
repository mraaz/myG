import moment from 'moment'
import React from 'react'
import { fetchGame } from '../../../integration/http/guest'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import { copyToClipboard } from '../../../common/clipboard'
import { WithTooltip } from '../Tooltip'
import Approved_gamers from '../scheduledGames/ApprovedGamers'

export default class GuestGame extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    scheduleGames: null
  }

  componentDidMount() {
    fetchGame(this.props.uuid).then((scheduleGames) => this.setState({ scheduleGames, loading: false }))
  }

  render() {
    if (this.state.loading || !this.state.scheduleGames) return null
    const { latestScheduledGames, approved_gamers = [], additional_submit_info_fields = [], getAllGamers = [] } = this.state.scheduleGames
    const [scheduleGames_data = {}] = latestScheduledGames
    const {
      game_name = '',
      experience = '',
      tags = [],
      start_date_time = '',
      end_date_time = '',
      limit,
      description = '',
      platform = '',
      region = '',
      id = '',
      marked_as_deleted = 0,
      reason_for_deletion = null
    } = scheduleGames_data
    const { no_of_gamers } = getAllGamers[0] || {}
    const experience_split = experience ? experience.split(',') : []
    return (
      <div id='guest-container' style={{ backgroundImage: `url(${getAssetUrl('background_guest')})` }}>
        <div className='viewGame__container desktopView' style={{ display: 'block', width: '100%', height: '100%', overflowY: 'scroll' }}>
          <div className='gameList__section singleGameView__container' style={{ flex: 1 }}>
            <div className='gameDetails singleGameDetail'>
              <React.Fragment>
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
                      <a className='clickable share-copy' onClick={() => copyToClipboard(`Checkout this game -> ${window.location.href}`)}>
                        Share
                      </a>
                      <a
                        className='clickable share-facebook'
                        target='_blank'
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
                <div className='gameDetails__body singleGameBody'>
                  <div className='filter__label'>Game Details</div>
                  <div className='gameDescription'>Description</div>
                  <div className='gameDescription__body'>{description}</div>
                  <div className='gameTime__label'>End Time</div>
                  <div className='gameTime__value'>{moment(end_date_time).format('LLLL')}</div>
                  {platform && <div className='gameTime__label'>Platform</div>}
                  {platform && <div className='gameTime__value'>{platform.split(',').join(', ')}</div>}
                  {region && <div className='gameTime__label'>Region</div>}
                  {region && <div className='gameTime__value'>{region.split(',').join(', ')}</div>}
                  {marked_as_deleted != 0 && (
                    <div className='gameTime__label'>
                      <span style={{ color: '#e5c746' }}>Reason for cancelling</span>
                    </div>
                  )}
                  {marked_as_deleted != 0 && <div className='gameTime__value'>{reason_for_deletion}</div>}
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
                        <React.Fragment>
                          <div className='gameTime__label'>{Obj.label}</div>
                          <div className='gameTime__value'>{values.split(',').join(', ')}</div>
                        </React.Fragment>
                      )
                    })}
                  <Approved_gamers approved_gamers={approved_gamers} schedule_games_id={id} disableModal={true} disableLink={true} />
                  {tags && tags.length > 0 && <div className='gameTags__label'>Tags</div>}
                  <div className='gameTags__value game__tags'>
                    {tags &&
                      tags.length > 0 &&
                      tags.map((tag) => {
                        return (
                          <WithTooltip
                            position={{ bottom: '24px', left: '-12px' }}
                            style={{ height: '24px', display: 'inline-block', marginBottom: '10px' }}
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
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
