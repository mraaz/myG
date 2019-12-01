import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import ScheduleGames_Header from './ScheduleGames_Header'
import ScheduleGames_Dota2 from './ScheduleGames_Dota2'
import ScheduleGames_Clash_Royale from './ScheduleGames_Clash_Royale'

import { Game_name_values, Disable_keys } from './Utility_Function'

function isValidNewOption(inputValue, selectValue, selectOptions) {
  return !(
    !inputValue ||
    selectValue.some((option) => compareOption(inputValue, option)) ||
    selectOptions.some((option) => compareOption(inputValue, option))
  )
}

const compareOption = (inputValue, option) => {
  const candidate =
    typeof inputValue === 'string' ? inputValue.toLowerCase() : inputValue
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

  componentWillMount() {}

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
    if (this.state.just_one_time) {
      this.state.just_one_time = false
      return (
        <ScheduleGames_Header
          game_name_box={this.state.game_name_box}
          show_single={true}
          props={this.props}
        />
      )
    } else {
      return (
        <ScheduleGames_Header
          game_name_box={this.state.game_name_box}
          show_single={false}
          props={this.props}
        />
      )
    }
  }

  showGames = () => {
    switch (this.state.game_name_box.value) {
      case 'Dota 2':
        return (
          <ScheduleGames_Dota2
            game_name_box={this.state.game_name_box}
            props={this.props}
          />
        )
        break
      case 'Clash Royale':
        return (
          <ScheduleGames_Clash_Royale
            game_name_box={this.state.game_name_box}
            props={this.props}
          />
        )
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
      <section id='posts'>
        <div className='content-area scheduleGames-page'>
          <div id='header-2'>
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-17.png' />
          </div>
          <div className='game-menu'>
            <div className='game-name'>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                isValidNewOption={isValidNewOption}
                loadOptions={this.getOptions}
                onChange={this.handleChange_game_name}
                isClearable
                value={this.state.game_name_box}
                className='game-name-box'
                placeholder='Enter Game name'
                onInputChange={(inputValue) =>
                  inputValue.length <= 88
                    ? inputValue
                    : inputValue.substr(0, 88)
                }
                onKeyDown={this.onKeyDown}
              />
            </div>
          </div>
          {this.state.default && this.showHeaders()}
          {this.state.games && this.showGames()}
        </div>
      </section>
    )
  }
}
