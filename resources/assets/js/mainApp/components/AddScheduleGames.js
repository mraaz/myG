import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'

import AddScheduleGames_Headers from './AddScheduleGames_Header'
import AddScheduleGames_Dota2 from './AddScheduleGames_Dota2'
import AddScheduleGames_Clash_Royale from './AddScheduleGames_Clash_Royale'

import { Game_name_values, Disable_keys } from './Utility_Function'

const createOption = (label: string, game_names_id: string) => ({
  label,
  value: label,
  game_names_id,
})

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

export default class AddScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: '',
      default: true,
      games: false,
    }
  }

  handleCreate_game_name = (inputValue: any) => {
    setTimeout(() => {
      const newOption = createOption(inputValue, null)
      this.setState({ game_name_box: newOption })
    }, 300)
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

  showHeaders = () => {
    return <AddScheduleGames_Headers game_name_box={this.state.game_name_box} props={this.props} />
  }

  showGames = () => {
    switch (this.state.game_name_box.value) {
      case 'Dota 2':
        return <AddScheduleGames_Dota2 game_name_box={this.state.game_name_box} props={this.props} />
        break
      case 'Clash Royale':
        return <AddScheduleGames_Clash_Royale game_name_box={this.state.game_name_box} props={this.props} />
        break
    }
  }

  async getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  render() {
    return (
      <div className='content-area addscheduleGames-page'>
        <div id='header-2'>
          <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-18.png' />
        </div>
        <div className='content'>
          <div className='game-name'>
            <div>
              <label>
                Game Name: <span style={{ color: 'red' }}>*</span>
              </label>
            </div>
            <AsyncCreatableSelect
              cacheOptions
              defaultOptions
              isValidNewOption={isValidNewOption}
              loadOptions={this.getOptions}
              onChange={this.handleChange_game_name}
              onCreateOption={this.handleCreate_game_name}
              isClearable
              value={this.state.game_name_box}
              onBlur={this.onBlur_game_name}
              onFocus={this.onFocus_game_name}
              className='game_name_box'
              placeholder='Enter Game name'
              onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
        {this.state.default && this.showHeaders()}
        {this.state.games && this.showGames()}
      </div>
    )
  }
}
