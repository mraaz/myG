import React, { Component } from 'react'

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

  handleSavedFilterChange = (savedFilter) => {
    this.setState({ savedFilter })
  }
  handleAddFilterChange = (addFilter) => {
    this.setState({ addFilter })
  }

  render() {
    const { savedFilter, addFilter } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
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
              <button type='button' className='saveFilter__button' onClick={this.handleSaveFilterClick}>
                Save Filter
              </button>
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
        <div className='gameList__section'>
          <div className='gameList'>
            <div className='gameList_head__option'>
              <div className='gameResult__count'> 3 Results</div>
              <div className='gameResult__fillView'> Show full games</div>
            </div>
            <div className='gameList__box'>
              <div className='mygames'>
                <div className='gameImage'>
                  <img src='https://scontent.fdel20-1.fna.fbcdn.net/v/t1.0-9/101379557_1122093438157270_4919549497542967296_n.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=TFifTmgEhSMAX9hMl7s&_nc_ht=scontent.fdel20-1.fna&oh=00403f8d95cce0121f5996fbc96d61cd&oe=5EFB813E' />
                </div>
                <div className='game__attributes'>
                  <div className='first__row'>
                    <h1 className='game__name'>DOTA 2</h1>
                    <div className='game__playerList'>
                      <img src='https://lh3.googleusercontent.com/proxy/8A3Cv9HRzoGwPztTS3GoyOU878URYz0KasLidFJ5q77FjpCBcshrcUdzbaaK2wkkNmKAix0LBXmjC7FT36ScHq5OFuhvFurXdx73lu3fg1WOA7LZYqDYLd48EA' />
                      <div className='playerName'>DAV1D_90</div>
                    </div>
                  </div>
                  <div className='second__row'>
                    <div className='gamer__count'>
                      <img src='https://lh3.googleusercontent.com/proxy/8A3Cv9HRzoGwPztTS3GoyOU878URYz0KasLidFJ5q77FjpCBcshrcUdzbaaK2wkkNmKAix0LBXmjC7FT36ScHq5OFuhvFurXdx73lu3fg1WOA7LZYqDYLd48EA' />
                      <span>0 / 3 Gamers</span>
                    </div>
                    <div className='game__timestamp'>
                      <img src='https://lh3.googleusercontent.com/proxy/8A3Cv9HRzoGwPztTS3GoyOU878URYz0KasLidFJ5q77FjpCBcshrcUdzbaaK2wkkNmKAix0LBXmjC7FT36ScHq5OFuhvFurXdx73lu3fg1WOA7LZYqDYLd48EA' />
                      <span>February 8, 10pm</span>
                    </div>
                  </div>
                  <div className='third__row'>
                    <div className='game__tags'>
                      <div className='game__tag'>Initiator</div>
                    </div>
                    <div className='game__level'>Semi-Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='gameDetails'>my games details</div>
        </div>
      </section>
    )
  }
}
