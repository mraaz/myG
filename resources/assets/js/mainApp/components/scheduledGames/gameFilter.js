import React, { Component, Fragment } from 'react'
import axios from 'axios'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Select from 'react-select'
import { Game_name_values, Disable_keys, Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'

import { region_options, visibility_options, date_options, platform_options, experience_options } from './option'

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
    }
    this.filterGroup = {
      game_name: 'Game Name',
      region: 'Region',
      experience: 'Experience Level',
      start_time: 'Start Time',
      platform: 'Platform',
      description: 'Description',
    }
    this.filterNameRef = React.createRef()
  }

  componentDidMount() {
    this.getFilter()
  }

  handleDropDownChange = (entered_name, name) => {
    this.setState(
      {
        game_name_box: entered_name,
        default: false,
        games: false,
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
  handleChange_region = (selected_region, name) => {
    this.setState(
      {
        selected_region,
      },
      () => {
        this.props.handleChange({ selected_region }, name)
      }
    )
  }

  handleChange_experience = (selected_experience, name) => {
    this.setState(
      {
        selected_experience,
      },
      () => {
        this.props.handleChange({ selected_experience }, name)
      }
    )
  }
  handleChange_platform = (selected_platform, name) => {
    this.setState(
      {
        selected_platform,
      },
      () => {
        this.props.handleChange({ selected_platform }, name)
      }
    )
  }
  handleChange_time = (when, name) => {
    this.setState(
      {
        when,
      },
      () => {
        this.props.handleChange({ when }, name)
      }
    )
  }

  handleChange_description = (e, name) => {
    const description_box = e.target.value
    this.setState(
      {
        description_box,
      },
      () => {
        this.props.handleChange({ description_box }, name)
      }
    )
  }

  handleChange_other = (e, name) => {
    const other_box = e.target.value
    this.setState(
      {
        other_box,
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
    this.setState({
      filterTypeArray: ['game_name'],
      showFilterType: false,
      showFilters: false,
      showSaveFilterInput: false,
      showOverlay: false,
    })
  }

  handleSaveFilterClick = async () => {
    const { filterName = '', isRequesting = false, filterTypeArray = [] } = this.state
    if (!filterName) {
      toast.error(<Toast_style text={'Please enter filter name first.'} />)
      return
    }
    if (isRequesting) {
      toast.warn(<Toast_style text={'Please wait.Requesting...'} />)
      return
    }
    this.setState({ isRequesting: true })
    const payload = {}
    filterTypeArray.forEach((key) => {
      payload[key] = true
    })
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController', {
        name: filterName,
        payload,
      })
      if (saveFilter) {
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
        toast.error(<Toast_style text={'You can not enter more than 250 Char.'} />)
      }
    } else {
      toast.error(<Toast_style text={'Please enter a valid Filter Name.'} />)
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
    Object.keys(JsonPayload).map((key) => {
      if (JsonPayload[key] == true) {
        filterTypeArray.push(key)
      }
    })
    this.setState({ filterTypeArray, showFilters: false, showOverlay: false })
  }

  handleEditFilterType = (e, id, inputValue) => {
    e.preventDefault()
    const showFilterTypeInput = {}
    showFilterTypeInput[id] = true
    this.setState({ showFilterTypeInput, inputValue, showOverlay: true })
  }
  handleSavefilterInputChnage = (e, id, value) => {
    const inputValue = e.target.value
    this.setState({ inputValue, filterId: id })
  }

  handleInputKeyDown = (e) => {
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
    const { inputValue = '', filterId = '' } = this.state
    if (!inputValue) {
      toast.error(<Toast_style text={'Please enter filter name first.'} />)
      return
    }
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController', {
        name: inputValue,
      })
      if (saveFilter) {
        this.setState({ showFilterTypeInput: {}, inputValue: '' })
        this.getFilter()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleDeleteFilterType = async (e, name) => {
    e.preventDefault()
    try {
      const deleteFilter = await axios.post('/api/SavedFiltersScheduleGameController/deleteFilter', {
        name,
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
    } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <Fragment>
        <div className='viewGame__header'>
          <div className='title'>Find Games</div>
          <div className='search__results'>
            <input type='text' placeholder='Search Results' />
          </div>
        </div>
        <div className='viewGame__filter'>
          <div className='filter__label'>Filter by</div>
          <div className='viewGame__filter-section'>
            {filterTypeArray.map((k) => {
              if (k == 'game_name') {
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
                      value={this.state.game_name_box}
                      className='viewGame__name'
                      placeholder={this.filterGroup[k]}
                      onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                      onKeyDown={this.onKeyDown}
                      isSearchable={true}
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
                      value={this.state.description_box}
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
                      value={this.state.other_box}
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
                        maxlength='250'
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
            {showFilters && (
              <div className='filterType__group'>
                <div className='filterType__head'>Saved Filters</div>
                <div className='filterType__body'>
                  {savedFiltersObj.length > 0 &&
                    savedFiltersObj.map((k) => {
                      return (
                        <div className={`filterType__name`} key={`${k.id}_${k.name}`}>
                          {!showFilterTypeInput[k.id] ? (
                            <span onClick={(e) => this.handleSavedFilterClick(k)}>{k.name}</span>
                          ) : (
                            <input
                              type='text'
                              className='filter__Input'
                              onChange={(e) => this.handleSavefilterInputChnage(e, k.id)}
                              value={inputValue}
                              onKeyDown={this.handleInputKeyDown}
                            />
                          )}

                          {!showFilterTypeInput[k.id] && (
                            <div className='deleteFilter' onClick={(e) => this.handleDeleteFilterType(e, k.name)}>
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
            {showFilterType && (
              <div className='filterType__group'>
                <div className='filterType__head'>Add Filters</div>
                <div className='filterType__body'>
                  {Object.keys(this.filterGroup).map((k) => {
                    return (
                      <div
                        className={`filterType__name  ${filterTypeArray.includes(k) ? 'selected' : ''}`}
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
