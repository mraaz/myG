import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

import ScheduledGamePost from './ScheduledGamePost'
import { PullDataFunction } from './ScheduleGames_Pull_Data'

const region_options = [
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Russia', label: 'Russia' },
  { value: 'South America', label: 'South America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Central America', label: 'Central America' },
]
const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' },
]
const platform_options = [
  { value: 'PC', label: 'PC' },
  { value: 'XB', label: 'XB' },
  { value: 'PS', label: 'PS' },
  { value: 'Nintendo', label: 'Nintendo' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Tabletop', label: 'Tabletop' },
]
const date_options = [
  { value: 'Now-ish', label: 'Now-ish' },
  { value: '8 hours', label: '8 hours' },
  { value: '2 days', label: '2 days' },
  { value: '7 days', label: '7 days' },
  { value: '14 days', label: '14 days' },
]
const visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }]

export default class ScheduleGames_Header extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: '',
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      description_box: '',
      other_box: '',
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 1,
      show_prev: false,
      show_more: false,
    }
  }

  moveaway = () => {
    window.location.href = '/addscheduleGames'
  }

  componentDidMount() {
    const self = this

    const { match } = this.props.props.routeProps

    const getExactData = async function() {
      try {
        const onescheduledGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${match.params.id}`)
        self.setState({
          allscheduledGames: onescheduledGames.data.latestScheduledGames,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (match.params.id != undefined && match.params.id != '' && this.props.show_single == true) {
      getExactData()
    } else {
      this.call_PullDataFunc()
    }
  }

  call_PullDataFunc = async () => {
    this.state.game_name_box = this.props.game_name_box
    var tmp_allscheduledGames = await PullDataFunction(this.state)
    console.log(tmp_allscheduledGames)
    this.setState({
      allscheduledGames: [],
    })

    if (tmp_allscheduledGames.data.latestScheduledGames.length > 10) {
      this.setState({
        show_more: true,
      })
      tmp_allscheduledGames.data.latestScheduledGames.pop()
    } else {
      this.setState({
        show_more: false,
      })
    }
    this.setState({
      allscheduledGames: tmp_allscheduledGames.data.latestScheduledGames,
    })
  }

  fetchMoreData = () => {
    this.setState(
      {
        db_row_counter: this.state.db_row_counter + 1,
      },
      () => {
        this.call_PullDataFunc()
        if (this.state.db_row_counter > 9) {
          this.setState({ show_prev: true })
        }
      }
    )
    window.scrollTo(0, 0)
  }

  fetchPrevData = () => {
    this.setState(
      {
        db_row_counter: this.state.db_row_counter - 1,
      },
      () => {
        this.call_PullDataFunc()
        if (this.state.db_row_counter < 9) {
          this.setState({ show_prev: false })
        }
      }
    )
    window.scrollTo(0, 0)
  }

  handleChange_region = (selected_region) => {
    this.setState(
      {
        selected_region,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }
  handleChange_experience = (selected_experience) => {
    this.setState(
      {
        selected_experience,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }
  handleChange_platform = (selected_platform) => {
    this.setState(
      {
        selected_platform,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }
  handleChange_time = (when) => {
    this.setState(
      {
        when,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  handleChange_description = (e) => {
    this.setState(
      {
        description_box: e.target.value,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  handleChange_other = (e) => {
    this.setState(
      {
        other_box: e.target.value,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  handleChange_visibility = (visibility_box) => {
    this.setState(
      {
        visibility_box,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
        db_row_counter: 0,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  saveFilter = async () => {
    let x = {
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
        name: 'Test',
        payload: x,
      })

      console.log(saveFilter)
    } catch (error) {
      console.log(error)
    }
  }

  getFilter = async () => {
    try {
      const getFilter = await axios.get('/api/SavedFiltersScheduleGameController/getAllSavedFilters')
      console.log(getFilter)
      var obj = JSON.parse(getFilter.data.allFilters[0].payload)
      console.log(obj)
    } catch (error) {
      console.log(error)
    }
  }

  updateFilter = async () => {
    let x = {
      game_name: false,
      region: false,
      experience: false,
      start_time: false,
      platform: false,
      description: false,
      exclude_full_games: false,
      tags: false,
    }
    try {
      const updateFilter = await axios.post('/api/SavedFiltersScheduleGameController/updateFilter', {
        name: 'Test',
        payload: x,
      })

      console.log(updateFilter)
    } catch (error) {
      console.log(error)
    }
  }

  deleteFilter = async () => {
    try {
      const deleteFilter = await axios.post('/api/SavedFiltersScheduleGameController/deleteFilter', {
        name: 'Test',
      })
      console.log(deleteFilter)
    } catch (error) {
      console.log(error)
    }
  }

  showLatestPosts = () => {
    if (this.state.allscheduledGames != undefined) {
      return this.state.allscheduledGames.map((item, index) => {
        return (
          <ScheduledGamePost
            schedule_game={item}
            key={index}
            user={this.props.props.initialData}
            props={this.props.props.routeProps}
            show_single={this.props.show_single}
          />
        )
      })
    }
  }

  render() {
    return (
      <section id='posts_old'>
        <div className='content-area scheduleGames-page'>
          <div className='filterMenu'>
            <div className='region'>
              <Select
                onChange={this.handleChange_region}
                options={region_options}
                placeholder='Select your region'
                name='region-box'
                isClearable
              />
            </div>
            <div className='experience'>
              <Select
                onChange={this.handleChange_experience}
                options={experience_options}
                placeholder='Select experience level'
                name='experience-box'
                isClearable
              />
            </div>
            <div className='platform'>
              <Select
                onChange={this.handleChange_platform}
                options={platform_options}
                placeholder='Select which platform'
                name='platform-box'
                isClearable
              />
            </div>
            <div className='date-time'>
              <Select onChange={this.handleChange_time} options={date_options} placeholder='Start Date?' name='date-time-box' isClearable />
            </div>
            <div className='description'>
              <input
                type='text'
                className='description-box'
                onChange={this.handleChange_description}
                value={this.state.description_box}
                placeholder='Description'
              />
            </div>
            <div className='other'>
              <input
                type='text'
                className='other-box'
                onChange={this.handleChange_other}
                value={this.state.other_box}
                placeholder='Any Other stuff'
              />
            </div>
            <div className='visibility'>
              <Select
                onChange={this.handleChange_visibility}
                options={visibility_options}
                placeholder='Select visibility'
                name='visibility-box'
                isClearable
              />
            </div>
            <div className='button'>
              <button className='allread' onClick={() => this.saveFilter()}>
                Save Filter
              </button>
              <button className='allread' onClick={() => this.getFilter()}>
                Get Filter
              </button>
              <button className='allread' onClick={() => this.updateFilter()}>
                Update Filter
              </button>
              <button className='allread' onClick={() => this.deleteFilter()}>
                Delete Filter
              </button>
              <div className='plus-button' onClick={this.moveaway}>
                <i className='fas fa-plus' />
              </div>
              <div className='full-game'>
                <input type='checkbox' defaultChecked={this.state.isChecked} onChange={this.toggleChange} />
                &nbsp;Exclude Full Games?
              </div>
            </div>
          </div>
          <div className='gap'></div>
          {this.showLatestPosts()}
          {this.state.show_prev && (
            <div className='prev_pls' onClick={this.fetchPrevData}>
              {'<'}- Previous
            </div>
          )}
          {this.state.show_more && (
            <div className='more_pls' onClick={this.fetchMoreData}>
              Next ->
            </div>
          )}
        </div>
      </section>
    )
  }
}
