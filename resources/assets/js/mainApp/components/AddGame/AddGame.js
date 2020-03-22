import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

import { SETTINGS_ENUMS, styles, EXPERIENCE_OPTIONS, REGION_OPTIONS } from '../../static/AddGame'
import { MyGCheckbox, MyGInput, MyGTextarea, MyGAsyncSelect, MyGSelect, MyGDatePicker } from '../common'
import { Game_name_values } from '../Utility_Function'

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

const AddGame = () => {
  // State
  const [state, updateComponentState] = useState({ selectedSettings: SETTINGS_ENUMS.MAIN })
  const [advancedSettingsState, updateAdvancedSettingsState] = useState({
    experience: null,
    tags: null,
    description: '',
    acceptMessage: '',
  })
  const [mainSettingsState, updateMainSettingsState] = useState({
    gameTitlesList: [],
    gameTitle: null,
    startTime: null,
    endTime: null,
    isEndGameFieldSelected: false,
    isRepeatFieldSelected: false,
    numberOfPlayers: null,
    isCommentsAllowed: false,
    isPublicGame: false,
    sliderValue: 0,
  })
  const [optionalFieldsState, updateOptionalFieldsState] = useState({
    modalRank: null,
    serverRegion: null,
    roleNeeded: null,
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

  const onGameTitleChange = async (value) => {
    const updatedGameList = await Game_name_values(value)
    updateMainSettings({ gameTitlesList: updatedGameList })
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
        <div className={styles.fieldTitle}>Number of Players</div>
        <SliderWithTooltip
          value={mainSettingsState.sliderValue}
          style={{
            margin: '42px 0',
          }}
          onChange={(value) => {
            updateMainSettings({ sliderValue: value })
          }}
          marks={{
            0: { label: 0, style: numberStyle },
            25: { label: 25, style: numberStyle },
            50: { label: 50, style: numberStyle },
            75: { label: 75, style: numberStyle },
            100: { label: 100, style: numberStyle },
          }}
          dotStyle={dotStyle}
          min={0}
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
          }}
          tipFormatter={(value) => value + ' Players'}
        />
        <MyGCheckbox
          checked={mainSettingsState.numberOfPlayers}
          onClick={(value) => {
            updateMainSettings({ numberOfPlayers: value })
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
          selected={mainSettingsState.endTime}
        />
      </Fragment>
    )
  }

  const getOptionalView = () => {
    return (
      <div className={styles.optionalMainContainer}>
        {!mainSettingsState.isEndGameFieldSelected && (
          <div className={styles.optionalEndContainer}>
            <div
              className={styles.optionalText}
              onClick={(value) => {
                updateMainSettings({ isEndGameFieldSelected: true })
              }}>
              Add End Time
            </div>
            <div className={styles.optionalCircle} />
          </div>
        )}
        {!mainSettingsState.isRepeatFieldSelected && (
          <div
            className={styles.optionalText}
            onClick={(value) => {
              updateMainSettings({ isRepeatFieldSelected: true })
            }}>
            Set To Repeat
          </div>
        )}
      </div>
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
    )
  }

  const getAdvancedSettingsView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Experience</div>
        <MyGSelect
          options={EXPERIENCE_OPTIONS}
          onChange={(value) => {
            updateAdvancedSettings({ experience: value })
          }}
          value={advancedSettingsState.experience}
          placeholder='Select experience level'
        />
        <div className={styles.fieldTitle}>Tags</div>
        <MyGSelect
          onChange={(value) => {
            updateAdvancedSettings({ tags: value })
          }}
          value={advancedSettingsState.tags}
          placeholder='Enter relevant tags to your game'
        />
        <div className={styles.fieldTitle}>Description</div>
        <MyGTextarea
          onChange={(value) => {
            updateAdvancedSettings({ acceptMessage: value })
          }}
          value={advancedSettingsState.description}
          placeholder='Enter a description for your game'
        />
        <div className={styles.fieldTitle}>Accept Message</div>
        <MyGTextarea
          onChange={(value) => {
            updateAdvancedSettings({ acceptMessage: value })
          }}
          value={advancedSettingsState.acceptMessage}
          placeholder='Create a message for those who join & accept your game'
        />
      </div>
    )
  }

  // ToDo: update modal rank and roles needs options
  const getOptionalGameFieldsView = () => {
    return (
      <Fragment>
        <div className={styles.optionalHeaderContainer}>
          <span>DOTA 2 In-Game Fields </span>
          <span>(Optional)</span>
        </div>
        <div className={styles.optionalViewFields}>
          <div className={styles.fieldTitle}>Medal Rank</div>
          <MyGSelect
            options={EXPERIENCE_OPTIONS}
            onChange={(value) => {
              updateOptionalFieldsState({ modalRank: value })
            }}
            value={optionalFieldsState.modalRank}
            placeholder='Select medal rank'
          />
          <div className={styles.fieldTitle}>Server Regions</div>
          <MyGSelect
            options={REGION_OPTIONS}
            onChange={(value) => {
              updateOptionalFieldsState({ serverRegion: value })
            }}
            value={optionalFieldsState.serverRegion}
            placeholder='Select server regions'
          />
          <div className={styles.fieldTitle}>Roles Needed</div>
          <MyGSelect
            options={EXPERIENCE_OPTIONS}
            onChange={(value) => {
              updateOptionalFieldsState({ roleNeeded: value })
            }}
            value={optionalFieldsState.roleNeeded}
            placeholder='Select roles needed'
          />
        </div>
      </Fragment>
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
      <div className={styles.optionalViewContainer}>{getOptionalGameFieldsView()}</div>
    </div>
  )
}

export default AddGame
