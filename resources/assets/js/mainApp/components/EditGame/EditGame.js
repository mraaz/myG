import React, { Fragment, useEffect } from 'react'
import classNames from 'classnames'
import Slider from 'rc-slider'
import moment from 'moment'
import CustomCron from '../common/Cron/MyGCron'
import axios from 'axios'

import 'rc-slider/assets/index.css'
import { toast } from 'react-toastify'

import { Toast_style } from '../Utility_Function'
import '../../styles/AddGame/AddGameStyles.scss'

import { SETTINGS_ENUMS, styles, EXPERIENCE_OPTIONS, REGION_OPTIONS, PLATFORM_OPTIONS, LANGUAGE_OPTIONS } from '../../static/AddGame'
import { MyGCheckbox, MyGTextarea, MyGAsyncSelect, MyGCreateableSelect, MyGSelect, MyGDatePicker } from '../common'
import { Game_name_values, Schedule_Game_Tags, Disable_keys } from '../Utility_Function'
import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'
import { FeatureEnabled, REPEAT_SCHEDULE } from '../../../common/flags'

let game_data_struct = {}

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

const EditGame = ({
  state,
  updateComponentState,
  advancedSettingsState,
  updateAdvancedSettingsState,
  mainSettingsState,
  updateMainSettingsState,
  optionalFieldsState,
  updateOptionalFieldsState
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const getInitialData_Tags = async function () {
      try {
        let results = await Schedule_Game_Tags()
        updateAdvancedSettings({ optionTags: results })
      } catch (error) {
        console.log(error)
      }
    }

    const getInitialData_GameName = async function () {
      try {
        let results = await Game_name_values(mainSettingsState.gameTitle.value)
        updateMainSettings({ gameTitle: results })
        if (results) {
          handleChange_game_title(results[0], true)
        }
        results = await Game_name_values()
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        console.log(error)
      }
    }

    document.title = 'myG - Edit Game'
    getInitialData_Tags()
    getInitialData_GameName()
  }, [])

  // Handlers
  const updateMainSettings = (stateUpdates) => {
    updateMainSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates
    }))
  }

  const updateAdvancedSettings = (stateUpdates) => {
    updateAdvancedSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates
    }))
  }

  const updateState = (stateUpdates) => {
    updateComponentState((currentState) => ({
      ...currentState,
      ...stateUpdates
    }))
  }

  const updateOptionalSettings = (stateUpdates) => {
    updateOptionalFieldsState((currentState) => ({
      ...currentState,
      ...stateUpdates
    }))
  }

  const createOption = (label, game_names_id) => ({
    label,
    value: label,
    game_names_id
  })

  const handleCreateTags = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Skill length is too long.'} />)
      return
    }

    if (/['/.%#$,;`\\]/.test(inputValue)) {
      toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid characters'} />)
      return
    }

    let { optionTags, tags } = advancedSettingsState

    if (!tags) {
      tags = ''
    }
    if (!optionTags) {
      optionTags = ''
    }

    const newOption = createOption(inputValue, null)

    updateAdvancedSettings({
      optionTags: [...optionTags, newOption],
      tags: [...tags, newOption]
    })
  }

  const handleCreateGame = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
      return
    }

    let { gameTitlesList, gameTitle } = mainSettingsState
    if (gameTitlesList == null) gameTitlesList = ''

    const newOption = createOption(inputValue, null)
    updateMainSettings({ gameTitlesList: [...gameTitlesList, newOption], gameTitle: newOption })
  }

  //https://github.com/JedWatson/react-select/issues/3988 :RAAZ remove once fixed
  const getNewOptionData = (inputValue, optionLabel) => ({
    value: inputValue,
    label: optionLabel,
    __isNew__: true,
    isEqual: () => false
  })

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

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Tag is too long.'} />)
      return
    }
    getInitialData(inputValue)
  }

  const getOptionsGames = (inputValue) => {
    const getInitialData = async function (inputValue) {
      try {
        let results = await Game_name_values(inputValue)
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
      return
    }
    getInitialData(inputValue)
  }

  const onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults }
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value
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
      border: 'none'
    }
    const dotStyle = {
      borderRadius: '4px 4px 0px 0px',
      border: 'none',
      bottom: '0px',
      height: '10px',
      backgroundColor: '#b9b9b9'
    }
    const railStyle = {
      backgroundColor: '#b9b9b9',
      width: '400px'
    }
    const handleStyle = {
      border: 'none',
      backgroundColor: '#E6C846',
      height: '16px',
      width: '16px'
    }
    const trackStyle = {
      backgroundColor: '#b9b9b9',
      width: '400px'
    }

    return (
      <div>
        <div className={styles.fieldTitle}>Number of Gamers</div>
        {!mainSettingsState.isUnlimitedPlayers && (
          <SliderWithTooltip
            value={mainSettingsState.numberOfPlayers}
            style={{
              margin: '42px 7px'
            }}
            onChange={(value) => {
              updateMainSettings({ numberOfPlayers: value })
            }}
            marks={{
              1: { label: 1, style: numberStyle },
              25: { label: 25, style: numberStyle },
              50: { label: 50, style: numberStyle },
              75: { label: 75, style: numberStyle },
              100: { label: 100, style: numberStyle }
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
                offset: [0, -5]
              },
              visible: true
            }}
            tipFormatter={(value) => {
              if (value === 1) {
                return value + ' Gamer'
              }
              return value + ' Gamers'
            }}
          />
        )}
        <MyGCheckbox
          checked={mainSettingsState.isUnlimitedPlayers}
          onClick={(value) => {
            updateMainSettings({
              isUnlimitedPlayers: value,
              numberOfPlayers: value ? -42 : 1
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
        <div className={styles.fieldTitle}>Settings</div>
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
        <MyGCheckbox
          checked={mainSettingsState.autoJoinHost}
          onClick={(value) => {
            updateMainSettings({ autoJoinHost: value })
          }}
          labelText='Host attending?'
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
          minDate={moment(mainSettingsState.startTime)}
          maxDate={moment(mainSettingsState.startTime).add(14, 'days')}
          selected={mainSettingsState.endTime}
        >
          <img
            style={{ margin: '0 10px' }}
            src='https://myG.gg/platform_images/Dashboard/X+icon.svg'
            height='20'
            width='20'
            onClick={() => {
              updateMainSettings({
                isEndGameFieldSelected: false,
                endTime: null
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
                  if (!mainSettingsState.startTime) {
                    toast.success(<Toast_style text={'Please add start time first.'} />)
                    return
                  }
                  updateMainSettings({
                    isEndGameFieldSelected: true,
                    endTime: moment(mainSettingsState.startTime).add(2, 'days')
                  })
                }}
              >
                Add End Time
              </div>
            </div>
          )}
          <FeatureEnabled allOf={[REPEAT_SCHEDULE]}>
            {!mainSettingsState.isRepeatFieldSelected && (
              <React.Fragment>
                {!mainSettingsState.isEndGameFieldSelected && <div className={styles.optionalCircle} />}
                <div
                  className={styles.optionalText}
                  onClick={(value) => {
                    updateMainSettings({ isRepeatFieldSelected: true })
                  }}
                >
                  Set To Repeat
                </div>
              </React.Fragment>
            )}
          </FeatureEnabled>
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
              alignItems: 'center'
            }}
          >
            <CustomCron
              onChange={({ cron, occurrence, repeatEvery }) => {
                updateMainSettings({
                  cron,
                  occurrence,
                  repeatEvery
                })
              }}
              tabs={['Daily', 'Weekly', 'Monthly']}
              hours={2}
              minutes={15}
              showResultText={true}
              showResultCron={true}
            />
            <img
              style={{ margin: '0 10px' }}
              src='https://myG.gg/platform_images/Dashboard/X+icon.svg'
              height='20'
              width='20'
              onClick={() => {
                updateMainSettings({
                  isRepeatFieldSelected: false,
                  endTime: null,
                  cron: null,
                  occurrence: null,
                  repeatEvery: null
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

  const handleChange_game_title = async (value, initial = false) => {
    updateMainSettings({ gameTitle: value })
    updateAdvancedSettings({ show_experience: true, show_platform: true, show_region: true })

    if (value == undefined || value == null) {
      updateOptionalSettings({ value_one: null, value_two: null, value_three: null, value_four: null, value_five: null })
      updateState({ additional_info: false })
      return
    }

    for (let key in value.game_headers) {
      if (!value.game_headers[key]) {
        switch (key) {
          case 'experience':
            updateAdvancedSettings({ show_experience: value.game_headers[key], experience: null })
            break
          case 'platform':
            updateAdvancedSettings({ show_platform: value.game_headers[key], platform: null })
            break
          case 'region':
            updateAdvancedSettings({ show_region: value.game_headers[key], region: null })
            break
        }
      }
    }

    if (value && !value.additional_info) {
      updateOptionalSettings({ value_one: null, value_two: null, value_three: null, value_four: null, value_five: null })
      updateState({ additional_info: value ? value.additional_info : false })
    } else if (value && value.additional_info) {
      const getAllExtraFilters = await axios.get(`/api/ScheduleGame/getHeader_ALL/${value.game_names_id}`)
      let additional_info_data = getAllExtraFilters.data.additional_info_data

      game_data_struct = {}

      let counter = 0,
        newArr = [],
        arrTags = ''

      for (let key in additional_info_data) {
        switch (counter) {
          case 0:
            newArr = []
            arrTags = ''

            updateOptionalSettings({ value_one_key: key })

            game_data_struct['value_one_label'] = additional_info_data[key].label
            game_data_struct['value_one_placeholder'] = additional_info_data[key].placeholder

            if (additional_info_data[key].type == 'Multi') {
              game_data_struct['value_one_multi_type'] = true
            } else {
              game_data_struct['value_one_multi_type'] = false
            }

            arrTags = additional_info_data[key].value.split(',')

            for (let i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i], null)
              newArr.push(newOption)
            }

            game_data_struct['value_one_value'] = newArr

            break
          case 1:
            newArr = []
            arrTags = ''

            updateOptionalSettings({ value_two_key: key })

            game_data_struct['value_two_label'] = additional_info_data[key].label
            game_data_struct['value_two_placeholder'] = additional_info_data[key].placeholder
            game_data_struct['value_two_value'] = additional_info_data[key].value
            if (additional_info_data[key].type == 'Multi') {
              game_data_struct['value_two_multi_type'] = true
            } else {
              game_data_struct['value_two_multi_type'] = false
            }

            arrTags = additional_info_data[key].value.split(',')

            for (let i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i], null)
              newArr.push(newOption)
            }

            game_data_struct['value_two_value'] = newArr
            break
          case 2:
            newArr = []
            arrTags = ''

            updateOptionalSettings({ value_three_key: key })

            game_data_struct['value_three_label'] = additional_info_data[key].label
            game_data_struct['value_three_placeholder'] = additional_info_data[key].placeholder
            game_data_struct['value_three_value'] = additional_info_data[key].value
            if (additional_info_data[key].type == 'Multi') {
              game_data_struct['value_three_multi_type'] = true
            } else {
              game_data_struct['value_three_multi_type'] = false
            }

            arrTags = additional_info_data[key].value.split(',')

            for (let i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i], null)
              newArr.push(newOption)
            }

            game_data_struct['value_three_value'] = newArr
            break
          case 3:
            newArr = []
            arrTags = ''

            updateOptionalSettings({ value_four_key: key })

            game_data_struct['value_four_label'] = additional_info_data[key].label
            game_data_struct['value_four_placeholder'] = additional_info_data[key].placeholder
            game_data_struct['value_four_value'] = additional_info_data[key].value
            if (additional_info_data[key].type == 'Multi') {
              game_data_struct['value_four_multi_type'] = true
            } else {
              game_data_struct['value_four_multi_type'] = false
            }

            arrTags = additional_info_data[key].value.split(',')

            for (let i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i], null)
              newArr.push(newOption)
            }

            game_data_struct['value_four_value'] = newArr
            break
          case 4:
            newArr = []
            arrTags = ''

            updateOptionalSettings({ value_five_key: key })

            game_data_struct['value_five_label'] = additional_info_data[key].label
            game_data_struct['value_five_placeholder'] = additional_info_data[key].placeholder
            game_data_struct['value_five_value'] = additional_info_data[key].value
            if (additional_info_data[key].type == 'Multi') {
              game_data_struct['value_five_multi_type'] = true
            } else {
              game_data_struct['value_five_multi_type'] = false
            }

            arrTags = additional_info_data[key].value.split(',')

            for (let i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i], null)
              newArr.push(newOption)
            }

            game_data_struct['value_five_value'] = newArr
            break
        }
        counter++
      }
      if (initial != true) {
        updateOptionalSettings({
          value_one: null,
          value_two: null,
          value_three: null,
          value_four: null,
          value_five: null,
          game_name_fields_img: value.game_name_fields_img
        })
      } else {
        updateOptionalSettings({
          game_name_fields_img: value.game_name_fields_img
        })
      }

      updateState({ additional_info: value ? value.additional_info : false })
    }
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
          <div className='game-title-select'>
            <MyGCreateableSelect
              isClearable
              onCreateOption={handleCreateGame}
              onInputChange={getOptionsGames}
              getNewOptionData={getNewOptionData}
              onChange={handleChange_game_title}
              value={mainSettingsState.gameTitle}
              placeholder='Search, Select or create Game Title'
              options={mainSettingsState.gameTitlesList}
              onKeyDown={Disable_keys}
              classNamePrefix='filter'
            />
          </div>
          <div className={styles.fieldTitle}>Start Time</div>
          <MyGDatePicker
            onChange={(value) => {
              if (!value) {
                updateMainSettings({
                  isEndGameFieldSelected: false,
                  endTime: null,
                  startTime: value
                })
                return
              }
              updateMainSettings({ startTime: value })
            }}
            selected={mainSettingsState.startTime}
            maxDate={moment().add(14, 'days')}
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
          <div className={styles.fieldTitle}>Co-host</div>
          <div className='game-title-select'>
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
              placeholder='Enter your Friend’s name to set them as a co-host'
              onKeyDown={Disable_keys}
              classNamePrefix='filter'
            />
          </div>
          {advancedSettingsState.show_experience && <div className={styles.fieldTitle}>Experience</div>}
          {advancedSettingsState.show_experience && (
            <div className='game-title-select'>
              <MyGSelect
                options={EXPERIENCE_OPTIONS}
                onChange={(value) => {
                  updateAdvancedSettings({ experience: value })
                }}
                value={advancedSettingsState.experience}
                placeholder='Select experience level'
                isMulti
                classNamePrefix='filter'
              />
            </div>
          )}
          <div className={styles.fieldTitle}>Game Tags</div>
          <div className='game-title-select'>
            <MyGCreateableSelect
              isClearable
              isMulti
              onCreateOption={handleCreateTags}
              getNewOptionData={getNewOptionData}
              onInputChange={getOptionsTags}
              onChange={(value) => {
                updateAdvancedSettings({ tags: value })
              }}
              value={advancedSettingsState.tags}
              placeholder='Search, Select or create Game Tags'
              options={advancedSettingsState.optionTags}
              onKeyDown={Disable_keys}
              classNamePrefix='filter'
            />
          </div>
          {advancedSettingsState.show_platform && <div className={styles.fieldTitle}>Platform</div>}
          {advancedSettingsState.show_platform && (
            <MyGSelect
              options={PLATFORM_OPTIONS}
              onChange={(value) => {
                updateAdvancedSettings({ platform: value })
              }}
              value={advancedSettingsState.platform}
              placeholder='Select platform'
              isMulti
            />
          )}
          {advancedSettingsState.show_region && (
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
          <div className='field-title'>Language</div>
          <div className='platform-select'>
            <MyGSelect
              options={LANGUAGE_OPTIONS}
              onChange={(value) => {
                updateAdvancedSettings({ language: value })
              }}
              value={advancedSettingsState.language}
              placeholder='Select language/s'
              isMulti
            />
          </div>
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
          <div className='field-title'>Extra's</div>
          <div className='comments-privacy-container'>
            <MyGCheckbox
              checked={advancedSettingsState.mic}
              onClick={(value) => {
                updateAdvancedSettings({ mic: value })
              }}
              labelText='Mic required?'
            />
            <MyGCheckbox
              checked={advancedSettingsState.eighteen_plus}
              onClick={(value) => {
                updateAdvancedSettings({ eighteen_plus: value })
              }}
              labelText='18+ event?'
            />
          </div>
        </div>
      </div>
    )
  }

  // ToDo: update modal rank and roles needs options
  const getOptionalGameFieldsView = () => {
    return (
      <div
        style={{
          backgroundImage: `url(${optionalFieldsState.game_name_fields_img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className={styles.optionalViewContainer}
      >
        <div className={styles.optionalHeaderContainer}>
          <span>In-Game Fields </span>
          <span>(Optional)</span>
        </div>

        <div className={styles.optionalViewFields}>
          {game_data_struct['value_one_label'] && (
            <Fragment>
              <div className={styles.fieldTitle}>{game_data_struct['value_one_label']}</div>
              <MyGSelect
                options={game_data_struct['value_one_value']}
                onChange={(value) => {
                  updateOptionalSettings({ value_one: value })
                }}
                value={optionalFieldsState.value_one}
                placeholder={game_data_struct['value_one_placeholder']}
                isMulti={game_data_struct['value_one_multi_type']}
                isClearable
              />
            </Fragment>
          )}

          {game_data_struct['value_two_label'] && (
            <Fragment>
              <div className={styles.fieldTitle}>{game_data_struct['value_two_label']}</div>
              <MyGSelect
                options={game_data_struct['value_two_value']}
                onChange={(value) => {
                  updateOptionalSettings({ value_two: value })
                }}
                value={optionalFieldsState.value_two}
                placeholder={game_data_struct['value_two_placeholder']}
                isMulti={game_data_struct['value_two_multi_type']}
                isClearable
              />
            </Fragment>
          )}

          {game_data_struct['value_three_label'] && (
            <Fragment>
              <div className={styles.fieldTitle}>{game_data_struct['value_three_label']}</div>
              <MyGSelect
                options={game_data_struct['value_three_value']}
                onChange={(value) => {
                  updateOptionalSettings({ value_three: value })
                }}
                value={optionalFieldsState.value_three}
                placeholder={game_data_struct['value_three_placeholder']}
                isMulti={game_data_struct['value_three_multi_type']}
                isClearable
              />
            </Fragment>
          )}

          {game_data_struct['value_four_label'] && (
            <Fragment>
              <div className={styles.fieldTitle}>{game_data_struct['value_four_label']}</div>
              <MyGSelect
                options={game_data_struct['value_four_value']}
                onChange={(value) => {
                  updateOptionalSettings({ value_four: value })
                }}
                value={optionalFieldsState.value_four}
                placeholder={game_data_struct['value_four_placeholder']}
                isMulti={game_data_struct['value_four_multi_type']}
                isClearable
              />
            </Fragment>
          )}

          {game_data_struct['value_five_label'] && (
            <Fragment>
              <div className={styles.fieldTitle}>{game_data_struct['value_five_label']}</div>
              <MyGSelect
                options={game_data_struct['value_five_value']}
                onChange={(value) => {
                  updateOptionalSettings({ value_five: value })
                }}
                value={optionalFieldsState.value_five}
                placeholder={game_data_struct['value_five_placeholder']}
                isMulti={game_data_struct['value_five_multi_type']}
                isClearable
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
              state.selectedSettings === SETTINGS_ENUMS.ADVANCED ? styles.menuLineHighlighted : null
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
      {state.additional_info && getOptionalGameFieldsView()}
    </div>
  )
}

export default EditGame
