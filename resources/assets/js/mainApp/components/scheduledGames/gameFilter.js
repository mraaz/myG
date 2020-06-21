/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import axios from 'axios'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Select from 'react-select'
import { Game_name_values, Disable_keys, Schedule_Game_Tags, Toast_style, Game_name_Tags } from '../Utility_Function'
import { toast } from 'react-toastify'

import {
  region_options,
  visibility_options,
  date_options,
  platform_options,
  experience_options,
  getExtraFilterOprion,
  properCase,
} from './option'

function isValidNewOption(inputValue, selectValue, selectOptions) {
  return !(
    !inputValue ||
    selectValue.some((option) => compareOption(inputValue, option)) ||
    selectOptions.some((option) => compareOption(inputValue, option))
  )
}

const compareOption = (inputValue, option) => {
  const candidate = typeof inputValue === 'string' ? inputValue.toLowerCase() : inputValue
  if (typeof option.value === 'string') {
    if (option.value.toLowerCase() === candidate) {
      return true
    }
  }
  if (typeof option.label === 'string') {
    if (option.label.toLowerCase() === candidate) {
      return true
    }
  }
  return option.value === candidate || option.label === candidate
}

const createOption = (label: string, game_names_id: string) => ({
  label,
  value: label,
  game_names_id,
})

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: null,
      default: true,
      games: false,
      just_one_time: true,
      filterName: '',
      showSaveFilterInput: false,
      filterTypeArray: ['game_name'],
      showFilterType: false,
      showFilters: false,
      showOverlay: false,
      filterValueArray: {},
      options_tags: '',
      value_tags: '',
    }
    this.filterGroup = {
      game_name: 'Game Title',
      region: 'Region',
      tags: 'Tags',
      experience: 'Experience Level',
      start_time: 'Start Time',
      platform: 'Platform',
      description: 'Description',
    }
    this.filterNameRef = React.createRef()
  }

  componentDidMount() {
    const getInitialData = async () => {
      try {
        let results = await Schedule_Game_Tags()
        this.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()

    this.getFilter()
  }

  handleDropDownChange = async (entered_name, name) => {
    const { filterValueArray = {}, filterTypeArray } = this.state
    const { additional_info = false, game_names_id = '', value = '' } = entered_name || {}

    filterValueArray['game_name'] = entered_name
    let additional_info_data = {}

    if (additional_info) {
      const getAllExtraFilters = await axios.get(`/api/ScheduleGame/getHeader_ALL/${game_names_id}`)
      additional_info_data = getAllExtraFilters.data.additional_info_data
      const allKeys = Object.keys(additional_info_data)
      allKeys.length > 0 &&
        allKeys.forEach((key) => {
          this.filterGroup[key] = properCase(key)
        })
    }

    this.setState(
      {
        game_name_box: entered_name,
        default: false,
        games: false,
        filterValueArray,
        additional_info_data,
      },
      () => {
        this.props.handleChange(
          {
            game_name_box: entered_name,
            default: false,
            games: false,
          },
          name
        )
      }
    )
  }
  handleTagsChange = (value_tags = [], name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['tags'] = value_tags
    this.setState({ value_tags, filterValueArray }, () => {
      const tags = this.getTagsValue([...value_tags])
      this.props.handleChange({ tags: value_tags }, name)
    })
  }
  handleChange_region = (selected_region, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['region'] = selected_region
    this.setState(
      {
        selected_region,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ selected_region }, name)
      }
    )
  }

  handleChange_experience = (selected_experience, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['experience'] = selected_experience
    this.setState(
      {
        selected_experience,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ selected_experience }, name)
      }
    )
  }
  handleChange_platform = (selected_platform, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['platform'] = selected_platform
    this.setState(
      {
        selected_platform,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ selected_platform }, name)
      }
    )
  }
  handleChange_time = (when, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['start_time'] = when
    this.setState(
      {
        when,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ when }, name)
      }
    )
  }

  handleChange_description = (e, name) => {
    const description_box = e.target.value
    const { filterValueArray = {} } = this.state
    filterValueArray['description'] = description_box
    this.setState(
      {
        description_box,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ description_box }, name)
      }
    )
  }

  handleChange_other = (e, name) => {
    const other_box = e.target.value
    const { filterValueArray = {} } = this.state
    filterValueArray['other'] = other_box
    this.setState(
      {
        other_box,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ other_box }, name)
      }
    )
  }

  handleChange_visibility = (visibility_box, name) => {
    this.setState(
      {
        visibility_box,
      },
      () => {
        this.props.handleChange({ visibility_box }, name)
      }
    )
  }

  async getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  getOptions_tags = (inputValue) => {
    const getInitialData = async (inputValue) => {
      try {
        let results = await Schedule_Game_Tags(inputValue)
        this.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData(inputValue)
  }
  getTagsValue = (value_tags = []) => {
    return value_tags.map((d) => d.value)
  }

  // handleCreateTags = (inputValue: any) => {
  //   if (inputValue.length > 88) {
  //     toast.success(<Toast_style text={'Sorry mate! Skill length is too long.'} />)
  //     return
  //   }
  //   setTimeout(() => {
  //     const { options_tags = [], value_tags = [], newValueCreated_tags = [], filterValueArray = {} } = this.state
  //     const newOption = createOption(inputValue, null)
  //     const { tags = [] } = filterValueArray
  //     const changedTags = [...tags, newOption]
  //     filterValueArray['tags'] = changedTags
  //
  //     this.setState(
  //       {
  //         options_tags: [...options_tags, newOption],
  //         value_tags: [...value_tags, newOption],
  //         newValueCreated_tags: [...newValueCreated_tags, newOption.label],
  //         filterValueArray,
  //       },
  //       () => {
  //         const tags = this.getTagsValue([...value_tags, newOption])
  //         this.props.handleChange({ tags }, name)
  //       }
  //     )
  //   }, 300)
  // }

  getFilter = async () => {
    try {
      const getAllSavedFilters = await axios.get('/api/SavedFiltersScheduleGameController/getAllSavedFilters')
      const savedFiltersObj = getAllSavedFilters.data.allFilters
      this.setState({ savedFiltersObj })
    } catch (error) {
      console.log(error)
    }
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  handleClearFilterClick = () => {
    this.setState(
      {
        filterTypeArray: ['game_name'],
        showFilterType: false,
        showFilters: false,
        showSaveFilterInput: false,
        showOverlay: false,
        other_box: '',
        description_box: '',
        when: '',
        selected_platform: '',
        selected_experience: '',
        selected_region: '',
        game_name_box: '',
        value_tags: '',
        filterValueArray: {},
      },
      () => {
        this.props.handleChange({ ...this.state, tags: '' }, '')
      }
    )
  }

  handleSaveFilterClick = async () => {
    const { filterName = '', isRequesting = false, filterTypeArray = [], filterValueArray = {} } = this.state
    if (!filterName) {
      toast.error(<Toast_style text={'Hmmm, sorry those characters are not allowed'} />)
      return
    }
    if (isRequesting) {
      toast.warn(<Toast_style text={'Requesting, please wait....'} />)
      return
    }
    this.setState({ isRequesting: true })
    const payload = {}
    filterTypeArray.forEach((key) => {
      payload[key] = filterValueArray[key] || ''
    })
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController', {
        name: filterName,
        payload,
      })
      if (saveFilter.data == 'ER_DUP_ENTRY') {
        toast.error(<Toast_style text={'Opps! This name already exists.'} />)
        this.setState({ isRequesting: false })
      } else {
        toast.success(<Toast_style text={`Filter ${filterName} was created successfully.`} />)
        this.setState({ showSaveFilterInput: false, isRequesting: false, filterName: '', showOverlay: false })
        this.getFilter()
      }
    } catch (error) {
      this.setState({ isRequesting: false })
      console.log(error)
    }
  }

  handleSaveFilterAction = () => {
    this.setState({ showSaveFilterInput: true, showOverlay: true })
    setTimeout(() => {
      this.filterNameRef.current.focus()
    }, 10)
  }
  handleCloseSaveFilterInput = () => {
    this.setState({ showSaveFilterInput: false })
  }

  handleSavedFilterChange = () => {
    this.setState({ showFilters: !this.state.showFilters, showFilterType: false, showOverlay: true })
  }
  handleAddFilterChange = () => {
    this.setState({ showFilterType: !this.state.showFilterType, showFilters: false, showOverlay: true })
  }
  handleSaveFilterName = (e) => {
    const filterName = e.target.value
    const isVaid = /['/.%#$,;`\\]/.test(filterName)
    if (!isVaid) {
      if (filterName.length < 250) {
        this.setState({ filterName })
      } else {
        toast.error(<Toast_style text={'Sigh, You can not enter more than 250 Char.'} />)
      }
    } else {
      toast.error(<Toast_style text={'Hmmm, sorry those characters are not allowed'} />)
    }
  }
  handleFilterTypeClick = (k) => {
    if (k != 'game_name') {
      const { filterTypeArray = [], showFilterType } = this.state
      if (!filterTypeArray.includes(k)) {
        filterTypeArray.push(k)
        this.setState({ filterTypeArray, showFilterType: !showFilterType, showOverlay: false })
      } else {
        const filterType = filterTypeArray.filter((name) => name != k)
        this.setState({ filterTypeArray: filterType, showFilterType: !showFilterType, showOverlay: false })
      }
    }
  }

  handleSavedFilterClick = (data) => {
    const { payload = {} } = data
    const JsonPayload = JSON.parse(payload)
    const filterTypeArray = []
    const filterValueArray = {}
    Object.keys(JsonPayload).forEach((key) => {
      if ((JsonPayload.hasOwnProperty(key) && JsonPayload[key] !== false) || key == 'game_name' || JsonPayload[key] === '') {
        filterTypeArray.push(key)
        filterValueArray[key] = JsonPayload[key]
      }
    })
    this.setState({ filterTypeArray, filterValueArray, showFilters: false, showOverlay: false })
  }

  handleEditFilterType = (e, id, inputValue) => {
    e.preventDefault()
    e.stopPropagation()
    const showFilterTypeInput = {}
    showFilterTypeInput[id] = true
    this.setState({ showFilterTypeInput, inputValue, showOverlay: true })
  }
  handleSavefilterInputChnage = (e, id, filterPayload) => {
    e.stopPropagation()
    const inputValue = e.target.value
    this.setState({ inputValue, filterId: id, filterPayload })
  }

  editFilterInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Escape') {
      this.setState({ showSaveFilterInput: false, isRequesting: false, filterName: '', showOverlay: false })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleSaveFilterClick()
    }
  }

  handleInputKeyDown = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Escape') {
      this.setState({
        showFilterTypeInput: {},
        inputValue: '',
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.update_Filter_Name()
    }
  }

  update_Filter_Name = async () => {
    const { inputValue = '', filterId = '', filterPayload = '' } = this.state
    if (!inputValue) {
      toast.error(<Toast_style text={'Please enter filter name first.'} />)
      return
    }
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController/updateFilter', {
        id: filterId,
        name: inputValue,
        payload: JSON.parse(filterPayload),
      })
      if (saveFilter.data == 'ER_DUP_ENTRY') {
        toast.error(<Toast_style text={'Name you entered already exists.'} />)
        this.setState({ isRequesting: false })
      } else {
        toast.success(<Toast_style text={`Filter ${inputValue} was updated successfully.`} />)
        this.setState({ showFilterTypeInput: {}, inputValue: '' })
        this.getFilter()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleDeleteFilterType = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const deleteFilter = await axios.post('/api/SavedFiltersScheduleGameController/deleteFilter', {
        id,
      })
      if (deleteFilter) {
        this.setState({ showFilters: false, showOverlay: false })
        this.getFilter()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleOverlayClick = () => {
    this.setState({
      showFilterTypeInput: {},
      showFilterType: false,
      showFilters: false,
      showSaveFilterInput: false,
      showOverlay: false,
    })
  }
  handleAdditionalInfoChange = (data, key, type) => {
    const { filterValueArray = {} } = this.state
    filterValueArray[key] = data
    this.setState(
      {
        [key]: data,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ [key]: data }, key)
      }
    )
  }

  render() {
    const {
      savedFilter,
      addFilter,
      filterName = '',
      showSaveFilterInput,
      isRequesting = '',
      filterTypeArray,
      showFilterType,
      showFilters,
      savedFiltersObj = [],
      showFilterTypeInput = [],
      inputValue = '',
      showOverlay = false,
      filterValueArray = {},
      additional_info_data = {},
    } = this.state

    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <Fragment>
        <div className='viewGame__header'>
          <div className='title'>Find Games</div>
        </div>
        <div className='viewGame__filter'>
          <div className='filter__label'>Filter by</div>
          <div className='viewGame__filter-section'>
            {filterTypeArray.map((k) => {
              if (k == 'game_name') {
                const value = this.state.game_name_box
                  ? this.state.game_name_box
                  : filterValueArray['game_name']
                  ? filterValueArray['game_name']
                  : null
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <AsyncCreatableSelect
                      cacheOptions
                      defaultOptions
                      isValidNewOption={isValidNewOption}
                      loadOptions={this.getOptions}
                      onChange={(data) => this.handleDropDownChange(data, k)}
                      isClearable
                      value={value}
                      className='viewGame__name'
                      placeholder={this.filterGroup[k]}
                      onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                      onKeyDown={this.onKeyDown}
                      isSearchable={true}
                      classNamePrefix='filter'
                    />
                  </div>
                )
              } else if (k == 'tags') {
                const value = this.state.value_tags || filterValueArray['tags']
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={(data) => this.handleTagsChange(data, k)}
                      options={this.state.options_tags}
                      isClearable
                      value={value}
                      className='viewGame__name'
                      isMulti
                      onKeyDown={this.onKeyDown}
                      onInputChange={this.getOptions_tags}
                      placeholder='Search or Select Tags'
                      classNamePrefix='filter'
                    />
                  </div>
                )
              } else if (k == 'region') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={(data) => this.handleChange_region(data, 'region')}
                      options={region_options}
                      placeholder='Select your region'
                      name='region-box'
                      isClearable
                      className='viewGame__name'
                      classNamePrefix='filter'
                      value={filterValueArray['region']}
                    />
                  </div>
                )
              } else if (k == 'experience') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={this.handleChange_experience}
                      options={experience_options}
                      placeholder='Select experience level'
                      name='experience-box'
                      isClearable
                      className='viewGame__name'
                      classNamePrefix='filter'
                      value={filterValueArray['experience']}
                    />
                  </div>
                )
              } else if (k == 'platform') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={this.handleChange_platform}
                      options={platform_options}
                      placeholder='Select which platform'
                      name='platform-box'
                      isClearable
                      className='viewGame__name'
                      classNamePrefix='filter'
                      value={filterValueArray['platform']}
                    />
                  </div>
                )
              } else if (k == 'start_time') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={this.handleChange_time}
                      options={date_options}
                      placeholder='Start Date?'
                      name='date-time-box'
                      isClearable
                      className='viewGame__name'
                      classNamePrefix='filter'
                      value={filterValueArray['start_date']}
                    />
                  </div>
                )
              } else if (k == 'description') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <input
                      type='text'
                      className='viewGame__name__input'
                      onChange={this.handleChange_description}
                      value={this.state.description_box || filterValueArray['description']}
                      placeholder='Description'
                    />
                  </div>
                )
              } else if (k == 'other') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <input
                      type='text'
                      className='viewGame__name__input'
                      onChange={this.handleChange_other}
                      value={this.state.other_box || filterValueArray['other']}
                      placeholder='Any Other stuff'
                    />
                  </div>
                )
              } else if (k == 'visibility') {
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{this.filterGroup[k]}</div>
                    <Select
                      onChange={this.handleChange_visibility}
                      options={visibility_options}
                      placeholder='Select visibility'
                      name='visibility-box'
                      isClearable
                      className='viewGame__name'
                      classNamePrefix='filter'
                      value={this.state.visibility || filterValueArray['visibility']}
                    />
                  </div>
                )
              } else {
                const field_data = additional_info_data[k]
                return (
                  <div className='viewGame__gameName'>
                    <div className='viewGame__label'>{field_data.placeholder}</div>
                    <Select
                      onChange={(data) => this.handleAdditionalInfoChange(data, k, field_data.type)}
                      options={getExtraFilterOprion(field_data.value)}
                      isClearable
                      value={this.state[k] || filterValueArray[k] || ''}
                      className='viewGame__name'
                      isMulti={field_data.type == 'Single' ? false : true}
                      onKeyDown={this.onKeyDown}
                      placeholder={`${field_data.placeholder}`}
                      classNamePrefix='filter'
                    />
                  </div>
                )
              }
            })}

            {filterTypeArray.length > 1 && (
              <div className='saveFilterAction__section'>
                <button type='button' disabled={isRequesting} className='saveFilter__button' onClick={this.handleSaveFilterAction}>
                  Save Filter
                </button>
                {showSaveFilterInput && (
                  <div className='saveFilterInput__container'>
                    <div className='input_name'>
                      <div className='input__label'>Filter Name</div>
                      <input
                        type='text'
                        ref={this.filterNameRef}
                        value={filterName}
                        placeholder='Name your filter'
                        onChange={this.handleSaveFilterName}
                        autoComplete={+new Date()}
                        maxLength='250'
                        onKeyDown={this.editFilterInputKeyDown}
                      />
                    </div>
                    <button
                      type='button'
                      disabled={isRequesting || !filterName}
                      className='filter__save_button'
                      onClick={this.handleSaveFilterClick}>
                      Save
                    </button>
                    <div className='filterInput__close' onClick={this.handleCloseSaveFilterInput}>
                      X
                    </div>
                  </div>
                )}
                <div className='clearFilter' onClick={this.handleClearFilterClick}>
                  Clear
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='viewGame__addMoreFilter'>
          <div className='savedFilter__option'>
            <div className='filter__header' onClick={this.handleSavedFilterChange}>
              Saved Filter
            </div>
            <img
              src={' https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/Down+Carrot.svg'}
              onClick={this.handleSavedFilterChange}
            />
            {showFilters && (
              <div className='filterType__group'>
                <div className='filterType__head'>Saved Filters</div>
                <div className='filterType__body'>
                  {savedFiltersObj.length > 0 &&
                    savedFiltersObj.map((k) => {
                      return (
                        <div className={`filterType__name`} key={`${k.id}_${k.name}`}>
                          {!showFilterTypeInput[k.id] ? (
                            <div
                              style={{ padding: '9px', paddingRight: '42px' }}
                              title={k.name}
                              onClick={(e) => this.handleSavedFilterClick(k)}>
                              {k.name}
                            </div>
                          ) : (
                            <div style={{ padding: '9px' }}>
                              <input
                                type='text'
                                id={k.id}
                                className='filter__Input'
                                onChange={(e) => this.handleSavefilterInputChnage(e, k.id, k.payload)}
                                value={inputValue}
                                onKeyDown={this.handleInputKeyDown}
                              />
                            </div>
                          )}

                          {!showFilterTypeInput[k.id] && (
                            <div className='deleteFilter' onClick={(e) => this.handleDeleteFilterType(e, k.id)}>
                              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/X+icon.svg' />
                            </div>
                          )}
                          {!showFilterTypeInput[k.id] && (
                            <div className='editFilter' onClick={(e) => this.handleEditFilterType(e, k.id, k.name)}>
                              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/edit-tools.svg' />
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
          <div className='filter_dot'></div>
          <div className='addFilter__option'>
            <div className='filter__header' onClick={this.handleAddFilterChange}>
              Add Filter
            </div>
            <img
              src={' https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/Down+Carrot.svg'}
              onClick={this.handleAddFilterChange}
            />
            {showFilterType && (
              <div className='filterType__group'>
                <div className='filterType__head'>Add Filters</div>
                <div className='filterType__body'>
                  {Object.keys(this.filterGroup).map((k) => {
                    return (
                      <div
                        className={`filterType__name  ${filterTypeArray.includes(k) ? 'selected' : ''}`}
                        style={{ padding: '9px' }}
                        key={k}
                        onClick={(e) => this.handleFilterTypeClick(k)}>
                        {this.filterGroup[k]}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          {showOverlay && <div className='filter__overlay' onClick={this.handleOverlayClick}></div>}
        </div>
      </Fragment>
    )
  }
}
