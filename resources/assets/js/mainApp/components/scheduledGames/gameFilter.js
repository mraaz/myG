import React, { Component, Fragment } from 'react'
import axios from 'axios'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Select from 'react-select'
import { Game_name_values, Disable_keys } from '../Utility_Function'

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
    }
    this.filterGroup = {
      game_name: 'Game Name',
      region: 'Region',
      experience: 'Experience Level',
      start_time: 'Start Time',
      platform: 'Platform',
      description: 'Description',
      exclude_full_games: 'Exclude Full Game',
      tags: 'Tags',
    }
  }

  componentDidMount() {
    // this.getFilter()
  }

  handleDropDownChange = (entered_name, name) => {
    console.log('entered_name  ', entered_name)
    console.log('name  ', name)
  }

  async getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  getFilter = async () => {
    try {
      const getAllSavedFilters = await axios.get('/api/SavedFiltersScheduleGameController/getAllSavedFilters')
      const getAllSavedFiltersObj = JSON.parse(getAllSavedFilters.data.allFilters[0].payload)
      console.log('getFilter >>>> ', getAllSavedFiltersObj)
    } catch (error) {
      console.log(error)
    }
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  handleClearFilterClick = () => {
    this.setState({ filterTypeArray: ['game_name'] })
  }

  handleSaveFilterClick = async () => {
    const { filterName = '', isRequesting = false } = this.state
    if (!filterName) {
      alert('Please enter filter name first.')
      return
    }
    if (isRequesting) {
      alert('Please wait.')
      return
    }
    this.setState({ isRequesting: true })
    const payload = {
      game_name: true,
      region: true,
      experience: false,
      start_time: true,
      platform: true,
      description: false,
      exclude_full_games: true,
      tags: true,
    }
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController', {
        name: filterName,
        payload,
      })
      if (saveFilter) {
        this.setState({ showSaveFilterInput: false, isRequesting: false, filterName: '' })
      }
    } catch (error) {
      this.setState({ isRequesting: false })
      console.log(error)
    }
  }

  handleSaveFilterAction = () => {
    this.setState({ showSaveFilterInput: true })
  }
  handleCloseSaveFilterInput = () => {
    this.setState({ showSaveFilterInput: false })
  }

  handleSavedFilterChange = (savedFilter) => {
    this.setState({ savedFilter })
  }
  handleAddFilterChange = (addFilter) => {
    this.setState({ showFilterType: !this.state.showFilterType })
  }
  handleSaveFilterName = (e) => {
    const filterName = e.target.value
    const isVaid = /['/.%#$,;`\\]/.test(filterName)
    if (!isVaid) {
      if (filterName.length < 250) {
        this.setState({ filterName })
      }
    } else {
      alert('Please enter a valid Filter Name.')
    }
  }
  handleFilterTypeClick = (k) => {
    const { filterTypeArray = [], showFilterType } = this.state
    if (!filterTypeArray.includes(k)) {
      filterTypeArray.push(k)
      this.setState({ filterTypeArray, showFilterType: !showFilterType })
    } else {
      const filterType = filterTypeArray.filter((name) => name != k)
      this.setState({ filterTypeArray: filterType, showFilterType: !showFilterType })
    }
  }

  render() {
    const { savedFilter, addFilter, filterName = '', showSaveFilterInput, isRequesting = '', filterTypeArray, showFilterType } = this.state
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
            })}

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
                      value={filterName}
                      placeholder='Name your filter'
                      onChange={this.handleSaveFilterName}
                      autoComplete='off'
                    />
                  </div>
                  <button type='button' disabled={isRequesting} className='filter__save_button' onClick={this.handleSaveFilterClick}>
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
          </div>
        </div>
        <div className='viewGame__addMoreFilter'>
          <div className='savedFilter__option'>
            <div className='filter__header'>Saved Filter</div>
          </div>
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
        </div>
      </Fragment>
    )
  }
}
