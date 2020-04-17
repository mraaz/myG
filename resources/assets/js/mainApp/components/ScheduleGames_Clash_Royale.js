import React, { Component } from 'react'
import Select from 'react-select'

import ScheduledGamePost from './ScheduledGamePost'
import { PullDataFunction } from './ScheduleGames_Pull_Data'

const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' },
]
const date_options = [
  { value: 'Now-ish', label: 'Now-ish' },
  { value: '8 hours', label: '8 hours' },
  { value: '2 days', label: '2 days' },
  { value: '7 days', label: '7 days' },
  { value: '14 days', label: '14 days' },
]
const visibility_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Friends' }, { value: 3, label: 'Group' }]

const clash_royale_trophy = [
  { value: '1000', label: '> 1000' },
  { value: '2000', label: '> 2000' },
  { value: '3000', label: '> 3000' },
  { value: '4000', label: '> 4000' },
  { value: '5000', label: '> 5000' },
  { value: 'competitive', label: 'Competitive' },
]

export default class ScheduleGames_Clash_Royale extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: '',
      selected_experience: null,
      description_box: '',
      other_box: '',
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      clash_royale_trophies: null,
    }
  }

  moveaway = () => {
    window.location.href = '/addscheduleGames'
  }

  componentDidMount() {
    this.state.game_name_box = this.props.game_name_box
    this.call_PullDataFunc()
  }

  call_PullDataFunc = async () => {
    var tmp_allscheduledGames = await PullDataFunction(this.state)
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
        db_row_counter: this.state.db_row_counter + 10,
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
        db_row_counter: this.state.db_row_counter - 10,
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

  handleChange_Clash_royale_trophies = (clash_royale_trophies) => {
    this.setState(
      {
        clash_royale_trophies,
      },
      () => {
        this.call_PullDataFunc()
      }
    )
  }

  showLatestPosts = () => {
    if (this.state.allscheduledGames != undefined) {
      return this.state.allscheduledGames.map((item, index) => {
        return <ScheduledGamePost schedule_game={item} key={index} user={this.props.props.initialData} />
      })
    }
  }

  render() {
    return (
      <section id='posts'>
        <div className='content-area scheduleGames-page'>
          <div className='filterMenu'>
            <div className='clash_royale_trophies'>
              <Select
                onChange={this.handleChange_Clash_royale_trophies}
                options={clash_royale_trophy}
                className='clash-royale-trophies'
                isClearable={true}
                placeholder='Trophies'
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
