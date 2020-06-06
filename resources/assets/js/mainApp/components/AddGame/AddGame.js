import React, { Fragment, useState, useEffect } from 'react'
import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import moment from 'moment'
import CustomCron from '../common/Cron/MyGCron'

import 'rc-slider/assets/index.css'
import { toast } from 'react-toastify'

import { Toast_style } from '../Utility_Function'
import '../../styles/AddGame/AddGameStyles.scss'

import {
  SETTINGS_ENUMS,
  styles,
  EXPERIENCE_OPTIONS,
  REGION_OPTIONS,
  PLATFORM_OPTIONS,
  CLASH_ROYAL_TROPHY,
  DOTA2_MEDAL_RANKS,
  DOTA2_ROLES,
  DOTA2_SERVER_REGIONS,
} from '../../static/AddGame'
import { MyGCheckbox, MyGTextarea, MyGAsyncSelect, MyGCreateableSelect, MyGSelect, MyGDatePicker } from '../common'
import { Game_name_values, Schedule_Game_Tags, Disable_keys } from '../Utility_Function'
import Axios from 'axios'
import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

const AddGame = ({
  state,
  updateComponentState,
  advancedSettingsState,
  updateAdvancedSettingsState,
  mainSettingsState,
  updateMainSettingsState,
  optionalFieldsState,
  updateOptionalFieldsState,
  isGameNameField,
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // const getInitialData = async function() {
    //   try {
    //     let results = await Schedule_Game_Tags()
    //     updateAdvancedSettings({ optionTags: results })
    //   } catch (error) {
    //     // Error get option tags
    //   }
    // }
    // getInitialData()
  })

  // Handlers
  const updateMainSettings = (stateUpdates) => {
    updateMainSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateAdvancedSettings = (stateUpdates) => {
    updateAdvancedSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateState = (stateUpdates) => {
    updateComponentState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateOptionalSettings = (stateUpdates) => {
    updateOptionalFieldsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const onGameTitleChange = async (value) => {
    const updatedGameList = await Game_name_values(value)
    return updatedGameList
  }

  const createOption = (label, game_names_id) => ({
    label,
    value: label,
    game_names_id,
  })

  const handleCreateTags = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Skill length is too long.'} />)
      return
    }
    setTimeout(() => {
      const { optionTags, tags, newCreatedTags } = advancedSettingsState
      const newOption = createOption(inputValue, null)
      updateAdvancedSettings({
        optionTags: [...optionTags, newOption],
        tags: [...tags, newOption],
        newCreatedTags: [...newCreatedTags, newOption.label],
      })
    }, 300)
  }

  // api calls
  const getOptionsTags = (inputValue) => {
    const getInitialData = async function (inputValue) {
      try {
        let results = await Schedule_Game_Tags(inputValue)
        updateAdvancedSettings({ optionTags: results })
      } catch (error) {
        // Error get option tags
      }
    }
    getInitialData(inputValue)
  }

  const onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults },
      } = await Axios.post(`/api/user/playerSearchResults`, {
        alias: value,
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults)
      return parsedData
    } catch (error) {
      // error player suggestion fetch
    }
  }

  // Views
  const getPlayersNumberView = () => {
    const numberStyle = {
      color: '#fff',
      border: 'none',
    }
    const dotStyle = {
      borderRadius: '4px 4px 0px 0px',
      border: 'none',
      bottom: '0px',
      height: '10px',
      backgroundColor: '#b9b9b9',
    }
    const railStyle = {
      backgroundColor: '#b9b9b9',
      width: '400px',
    }
    const handleStyle = {
      border: 'none',
      backgroundColor: '#E6C846',
      height: '16px',
      width: '16px',
    }
    const trackStyle = {
      backgroundColor: '#b9b9b9',
      width: '400px',
    }

    return (
      <div>
        <div className={styles.fieldTitle}>Number of Gamers</div>
        {!mainSettingsState.isUnlimitedPlayers && (
          <SliderWithTooltip
            value={mainSettingsState.numberOfPlayers}
            style={{
              margin: '42px 7px',
            }}
            onChange={(value) => {
              updateMainSettings({ numberOfPlayers: value })
            }}
            marks={{
              1: { label: 1, style: numberStyle },
              25: { label: 25, style: numberStyle },
              50: { label: 50, style: numberStyle },
              75: { label: 75, style: numberStyle },
              100: { label: 100, style: numberStyle },
            }}
            dotStyle={dotStyle}
            min={1}
            max={100}
            railStyle={railStyle}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            tipProps={{
              placement: 'top',
              prefixCls: 'rc-slider-tooltip',
              align: {
                offset: [0, -5],
              },
              visible: true,
            }}
            tipFormatter={(value) => value + ' Gamers'}
          />
        )}
        <MyGCheckbox
          checked={mainSettingsState.isUnlimitedPlayers}
          onClick={(value) => {
            updateMainSettings({
              isUnlimitedPlayers: value,
              numberOfPlayers: value ? -42 : 1,
            })
          }}
          labelText='Unlimited'
        />
      </div>
    )
  }

  const getCommentPrivaryView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Comments and Privacy</div>
        <MyGCheckbox
          checked={mainSettingsState.isCommentsAllowed}
          onClick={(value) => {
            updateMainSettings({ isCommentsAllowed: value })
          }}
          labelText='Allow Comments On Game Listing'
        />
        <MyGCheckbox
          checked={mainSettingsState.isPublicGame}
          onClick={(value) => {
            updateMainSettings({ isPublicGame: value })
          }}
          labelText='List Game as Public Game'
        />
        <MyGCheckbox
          checked={mainSettingsState.autoAccept}
          onClick={(value) => {
            updateMainSettings({ autoAccept: value })
          }}
          labelText='Auto Accept Gamers (first-come, first-served)'
        />
      </div>
    )
  }

  const getEndGameField = () => {
    return (
      <Fragment>
        <div className={styles.fieldTitle}>End Time</div>
        <MyGDatePicker
          onChange={(value) => {
            updateMainSettings({ endTime: value })
          }}
          selected={mainSettingsState.endTime}>
          <img
            style={{ margin: '0 10px' }}
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X+icon.svg'
            height='20'
            width='20'
            onClick={() => {
              updateMainSettings({
                isEndGameFieldSelected: false,
                endTime: null,
              })
            }}
          />
        </MyGDatePicker>
      </Fragment>
    )
  }

  const getOptionalView = () => {
    return (
      <Fragment>
        <div className={styles.optionalMainContainer}>
          {!mainSettingsState.isEndGameFieldSelected && (
            <div className={styles.optionalEndContainer}>
              <div
                className={styles.optionalText}
                onClick={() => {
                  updateMainSettings({
                    isEndGameFieldSelected: true,
                    endTime: moment(mainSettingsState.startTime).add(2, 'days'),
                  })
                }}>
                Add End Time
              </div>
            </div>
          )}
          {!mainSettingsState.isRepeatFieldSelected && (
            <React.Fragment>
              {!mainSettingsState.isEndGameFieldSelected && <div className={styles.optionalCircle} />}
              <div
                className={styles.optionalText}
                onClick={(value) => {
                  updateMainSettings({ isRepeatFieldSelected: true })
                }}>
                Set To Repeat
              </div>
            </React.Fragment>
          )}
        </div>
        {/* <MyGCheckbox
          checked={mainSettingsState.isRepeatFieldSelected}
          onClick={(value) => {
            updateMainSettings({ isRepeatFieldSelected: value })
          }}
          labelText='Set To Repeat'
        /> */}
        {mainSettingsState.isRepeatFieldSelected && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <CustomCron
              onChange={console.log}
              tabs={['Daily', 'Weekly', 'Monthly']}
              hours={2}
              minutes={15}
              showResultText={true}
              showResultCron={true}
            />
            <img
              style={{ margin: '0 10px' }}
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X+icon.svg'
              height='20'
              width='20'
              onClick={() => {
                updateMainSettings({
                  isRepeatFieldSelected: false,
                  endTime: null,
                })
              }}
            />
          </div>
        )}
      </Fragment>
    )
  }

  const getOptionalMainSettingsView = () => {
    return (
      <Fragment>
        {mainSettingsState.isEndGameFieldSelected && getEndGameField()}
        {getOptionalView()}
      </Fragment>
    )
  }

  const getMainSettingsView = () => {
    return (
      <div style={{ display: 'flex' }}>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div>
          <div className={styles.fieldTitle}>Game Title</div>
          <MyGAsyncSelect
            cacheOptions
            defaultOptions
            isClearable
            isValidNewOption={() => false}
            onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
            loadOptions={onGameTitleChange}
            onChange={(value) => {
              updateMainSettings({ gameTitle: value })
              value && !value.isGameNameField && updateOptionalSettings({ serverRegion: null })
              updateState({ isGameNameField: value ? value.isGameNameField : false })
            }}
            value={mainSettingsState.gameTitle}
            placeholder='Enter Game Title'
            options={mainSettingsState.gameTitlesList}
          />

          <div className={styles.fieldTitle}>Start Time</div>
          <MyGDatePicker
            onChange={(value) => {
              updateMainSettings({ startTime: value })
            }}
            selected={mainSettingsState.startTime}
          />
          {getOptionalMainSettingsView()}
          {getPlayersNumberView()}
          {getCommentPrivaryView()}
        </div>
      </div>
    )
  }

  const getAdvancedSettingsView = () => {
    return (
      <div style={{ display: 'flex' }}>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div>
          <div className={styles.fieldTitle}>Experience</div>
          <MyGSelect
            options={EXPERIENCE_OPTIONS}
            onChange={(value) => {
              updateAdvancedSettings({ experience: value })
            }}
            value={advancedSettingsState.experience}
            placeholder='Select experience level'
            isMulti
          />
          <div className={styles.fieldTitle}>Game Tags</div>
          <MyGCreateableSelect
            isClearable
            isMulti
            onCreateOption={handleCreateTags}
            onInputChange={getOptionsTags}
            onChange={(value) => {
              updateAdvancedSettings({ tags: value })
            }}
            value={advancedSettingsState.tags}
            placeholder='Search, Select or create Game Tags'
            options={advancedSettingsState.optionTags}
            onKeyDown={Disable_keys}
          />
          <div className={styles.fieldTitle}>Platform</div>
          <MyGSelect
            options={PLATFORM_OPTIONS}
            onChange={(value) => {
              updateAdvancedSettings({ platform: value })
            }}
            value={advancedSettingsState.platform}
            placeholder='Select platform'
            isMulti
          />
          {(!mainSettingsState.gameTitle || mainSettingsState.gameTitle.value !== 'Dota 2') && (
            <Fragment>
              <div className={styles.fieldTitle}>Region</div>
              <MyGSelect
                onChange={(value) => {
                  updateAdvancedSettings({ region: value })
                }}
                value={advancedSettingsState.region}
                options={REGION_OPTIONS}
                placeholder='Select region'
                isMulti
              />
            </Fragment>
          )}
          <div className={styles.fieldTitle}>Description</div>
          <MyGTextarea
            onChange={(event) => {
              updateAdvancedSettings({ description: event.target.value })
            }}
            value={advancedSettingsState.description}
            placeholder='Enter a description for your game'
            maxLength={250}
          />
          <div className={styles.fieldTitle}>Accept Message</div>
          <MyGTextarea
            onChange={(event) => {
              updateAdvancedSettings({ acceptMessage: event.target.value })
            }}
            value={advancedSettingsState.acceptMessage}
            placeholder='Create a message for those who join & accept your game'
            maxLength={250}
          />
          <div className={styles.fieldTitle}>Co-host</div>
          <MyGAsyncSelect
            isClearable
            isMulti
            isValidNewOption={() => {
              return
            }}
            loadOptions={onPlayersSuggestionFetch}
            onChange={(value) => {
              updateAdvancedSettings({ coHosts: value })
            }}
            value={advancedSettingsState.coHosts}
            placeholder='Enter your Friend’s name to set him as a co-host'
            onKeyDown={Disable_keys}
          />
        </div>
      </div>
    )
  }

  // ToDo: update modal rank and roles needs options
  const getOptionalGameFieldsView = () => {
    const imageTempUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Game+Images/DOTA2.png'
    return (
      <div
        style={{ backgroundImage: `url(${imageTempUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        className={styles.optionalViewContainer}>
        <div className={styles.optionalHeaderContainer}>
          <span>DOTA 2 In-Game Fields </span>
          <span>(Optional)</span>
        </div>
        <div className={styles.optionalViewFields}>
          {mainSettingsState.gameTitle.value !== 'Clash Royale' && (
            <Fragment>
              <div className={styles.fieldTitle}>Medal Rank</div>
              <MyGSelect
                options={DOTA2_MEDAL_RANKS}
                onChange={(value) => {
                  updateOptionalSettings({ modalRank: value })
                }}
                value={optionalFieldsState.modalRank}
                placeholder='Select medal rank'
                isMulti
              />
            </Fragment>
          )}

          {mainSettingsState.gameTitle.value !== 'Clash Royale' && (
            <Fragment>
              <div className={styles.fieldTitle}>Server Regions</div>
              <MyGSelect
                options={DOTA2_SERVER_REGIONS}
                onChange={(value) => {
                  updateOptionalSettings({ serverRegion: value })
                }}
                value={optionalFieldsState.serverRegion}
                placeholder='Select server regions'
                isMulti
              />
            </Fragment>
          )}

          {mainSettingsState.gameTitle.value !== 'Clash Royale' && (
            <Fragment>
              <div className={styles.fieldTitle}>Roles Needed</div>
              <MyGSelect
                options={DOTA2_ROLES}
                onChange={(value) => {
                  updateOptionalSettings({ roleNeeded: value })
                }}
                value={optionalFieldsState.roleNeeded}
                placeholder='Select roles needed'
                isMulti
              />
            </Fragment>
          )}

          {mainSettingsState.gameTitle.value === 'Clash Royale' && (
            <Fragment>
              <div className={styles.fieldTitle}>Trophies</div>
              <MyGSelect
                options={CLASH_ROYAL_TROPHY}
                onChange={(value) => {
                  updateOptionalSettings({ trophies: value })
                }}
                value={optionalFieldsState.trophies}
                placeholder='Select trophies'
                isMulti
              />
            </Fragment>
          )}
        </div>
      </div>
    )
  }

  const getGameSettingsView = () => {
    return (
      <div>
        <div />
        {state.selectedSettings === SETTINGS_ENUMS.MAIN ? getMainSettingsView() : getAdvancedSettingsView()}
      </div>
    )
  }

  const getSettingsMenu = () => {
    return (
      <div className={styles.menuContainer}>
        <div onClick={() => updateState({ selectedSettings: SETTINGS_ENUMS.MAIN })}>
          <div className={styles.menuText}>Main Settings</div>
          <div
            className={classNames([styles.menuLine, state.selectedSettings === SETTINGS_ENUMS.MAIN ? styles.menuLineHighlighted : null])}
          />
        </div>
        <div onClick={() => updateState({ selectedSettings: SETTINGS_ENUMS.ADVANCED })}>
          <div className={styles.menuText}>Advanced Settings</div>
          <div
            className={classNames([
              styles.menuLine,
              state.selectedSettings === SETTINGS_ENUMS.ADVANCED ? styles.menuLineHighlighted : null,
            ])}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainViewContainer}>
        {getSettingsMenu()}
        {getGameSettingsView()}
      </div>
      {state.isGameNameField && getOptionalGameFieldsView()}
    </div>
  )
}

export default AddGame
