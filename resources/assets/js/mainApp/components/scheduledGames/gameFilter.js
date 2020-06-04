import React, { Component, Fragment } from 'react'

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
    }
  }

  componentDidMount() {
    // this.getFilter()
  }

  handleChange_game_name = (entered_name) => {
    this.setState(
      {
        game_name_box: entered_name,
        default: false,
        games: false,
      },
      () => {
        if (entered_name) {
          switch (entered_name.value) {
            case 'Dota 2':
              this.setState({ games: true })
              break
            case 'Clash Royale':
              this.setState({ games: true })
              break
            default:
              this.setState({ default: true })
          }
        } else {
          this.setState({ default: true })
        }
      }
    )
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
    alert('Clear option clicked!')
  }
  handleSaveFilterClick = () => {
    alert('Save option clicked!')
  }
  handleSaveFilterDropdown = () => {
    alert(' saved  filter Dropdown clicked!')
  }

  handleSavedFilterChange = (savedFilter) => {
    this.setState({ savedFilter })
  }
  handleAddFilterChange = (addFilter) => {
    this.setState({ addFilter })
  }
  handleSaveFilterName = (e) => {
    const filterName = e.target.value
    this.setState({ filterName })
  }

  render() {
    const { savedFilter, addFilter, filterName = '' } = this.state
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
            <div className='viewGame__gameName'>
              <div className='viewGame__label'>Game Name</div>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                isValidNewOption={isValidNewOption}
                loadOptions={this.getOptions}
                onChange={this.handleChange_game_name}
                isClearable
                value={this.state.game_name_box}
                className='viewGame__name'
                placeholder='All Games'
                onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                onKeyDown={this.onKeyDown}
                isSearchable={true}
              />
            </div>
            <div className='saveFilterAction__section'>
              <button type='button' className='saveFilter__button' onClick={this.handleSaveFilterDropdown}>
                Save Filter
              </button>
              <div className='saveFilterInput__container'>
                <div className='input_name'>
                  <div className='input__label'>Filter Name</div>
                  <input type='text' value={filterName} placeholder='Name your filter' onChange={this.handleSaveFilterName} />
                </div>
                <button type='button' className='filter__save_button' onClick={this.handleSaveFilterClick}>
                  Save
                </button>
                <div className='filterInput__close'>X</div>
              </div>
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
            <div className='filter__header'>Add Filter</div>
          </div>
        </div>
      </Fragment>
    )
  }
}
