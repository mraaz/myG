import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { SubmitDataFunction } from './AddScheduleGames_Submit_Data'

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

const visibility_options = [
  { value: 1, label: 'Public' },
  { value: 2, label: 'Friends' },
  { value: 3, label: 'Group' },
  { value: 4, label: 'Hidden' },
]
const limit_options = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 42, label: 'Unlimited' },
]

export default class AddScheduleGames_Headers extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: '',
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      selected_expiry: null,
      selected_visibility: [{ label: 'Public', value: 1 }],
      selected_limit: [{ label: 'Unlimited', value: 42 }],
      startDate: moment(),
      endDate: null,
      description_box: '',
      other_box: '',
      tmp_expiry: '2 days',
      txtAreaValue: '',
      just_one_time: true,
      redirect_ScheduleGames: false,
      redirect_myScheduleGames: false,
    }
  }

  submitForm = (e) => {
    this.state.game_name_box = this.props.game_name_box

    if (this.props.game_name_box == '' || this.props.game_name_box == null) {
      alert('Sorry mate! Game name can not be blank')
      return
    }
    if (this.state.startDate == null || this.state.startDate == undefined) {
      alert('Sorry mate! Start date can not be empty')
      return
    }

    if (this.state.startDate.isSameOrAfter(this.state.endDate)) {
      alert('Sorry mate! End date needs to be AFTER start date')
      return
    }
    //Slow connections this function can get called multiple times
    if (!this.state.just_one_time) {
      return
    }
    this.state.just_one_time = false

    SubmitDataFunction(this.state)

    if (e === true) {
      if (
        this.state.selected_visibility != null &&
        this.state.selected_visibility != undefined &&
        (this.state.selected_visibility.value == 2 ||
          this.state.selected_visibility.value == 4)
      ) {
        this.setState({ redirect_myScheduleGames: true })
      } else {
        this.setState({ redirect_ScheduleGames: true })
      }
    } else {
      location.reload()
    }
  }

  handleChange_Region = (selected_region) => {
    this.setState({ selected_region })
  }
  handleChange_Experience = (selected_experience) => {
    this.setState({ selected_experience })
  }
  handleChange_Platform = (selected_platform) => {
    this.setState({ selected_platform })
  }
  handleChange_Expiry = (selected_expiry) => {
    this.setState({ selected_expiry })
  }
  handleChange_Visibility = (selected_visibility) => {
    this.setState({ selected_visibility })
  }
  handleChange_Limit = (selected_limit) => {
    this.setState({ selected_limit })
  }
  handleChange_forStartdate = (date) => {
    this.setState({ startDate: date })
  }
  handleChange_forEnddate = (date) => {
    this.setState({ endDate: date })
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleChange_txtArea = (e) => {
    this.setState({ txtAreaValue: e.target.value })
  }

  render() {
    if (this.state.redirect_ScheduleGames === true) {
      return <Redirect push to='/scheduledGames' />
    }
    if (this.state.redirect_myScheduleGames === true) {
      return <Redirect push to='/myScheduledGames' />
    }
    return (
      <div className='content-area addscheduleGames-page'>
        <div className='content'>
          <div className='date-time'>
            <div className='date-time-label'>
              <label>
                Start<span style={{ color: 'red' }}>*</span> and End date:
              </label>
            </div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange_forStartdate}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='lll'
              timeCaption='time'
              className='start-date-box'
              todayButton={'Today'}
              shouldCloseOnSelect={true}
              onBlur={this.onBlur_date_name}
              onFocus={this.onFocus_date_name}
            />
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleChange_forEnddate}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='lll'
              timeCaption='time'
              className='end-date-box'
              todayButton={'Today'}
              shouldCloseOnSelect={true}
              onBlur={this.onBlur_date_name}
              onFocus={this.onFocus_date_name}
              minDate={this.state.startDate}
              maxDate={moment(this.state.startDate).add(7, 'days')}
            />
            {/* maxDate = Don't think its just games, it could be post for LFG for clan */}
          </div>
          <div className='region'>
            <label>Region:</label>
            <Select
              onChange={this.handleChange_Region}
              options={region_options}
              isMulti
              placeholder='Select your region/s'
              className='region-box'
              onBlur={this.onBlur_region_name}
              onFocus={this.onFocus_region_name}
            />
          </div>
          <div className='experience'>
            <label>Experience:</label>
            <Select
              onChange={this.handleChange_Experience}
              options={experience_options}
              isMulti
              placeholder='Select experience level/s'
              className='experience-box'
              onBlur={this.onBlur_experience_name}
              onFocus={this.onFocus_experience_name}
            />
          </div>
          <div className='platform'>
            <label>Platform:</label>
            <Select
              onChange={this.handleChange_Platform}
              options={platform_options}
              isMulti
              placeholder='Select which platform/s'
              className='platform-box'
              onBlur={this.onBlur_platform_name}
              onFocus={this.onFocus_platform_name}
            />
          </div>
          <div className='description'>
            <label>Description:</label>
            <input
              type='text'
              id='description_box'
              className='description-box'
              maxLength='254'
              placeholder='Any details for this game?'
              onBlur={this.onBlur_description_name}
              onFocus={this.onFocus_description_name}
              onChange={this.handleChange}
              value={this.state.post_description_box}
            />
          </div>
          <div className='other'>
            <label>Other Info:</label>
            <input
              type='text'
              id='other_box'
              className='other-box'
              maxLength='254'
              placeholder='Additional comments?'
              onBlur={this.onBlur_other_name}
              onFocus={this.onFocus_other_name}
              onChange={this.handleChange}
              value={this.state.other_box}
            />
          </div>
          <div className='limit'>
            <label>Max number of players:</label>
            <Select
              onChange={this.handleChange_Limit}
              options={limit_options}
              className='limit-box'
              defaultValue={[limit_options[8]]}
              isClearable={false}
              onBlur={this.onBlur_limit_name}
              onFocus={this.onFocus_limit_name}
            />
          </div>
          <div className='visibility'>
            <label>Visibility:</label>
            <Select
              onChange={this.handleChange_Visibility}
              options={visibility_options}
              className='visibility-box'
              defaultValue={[visibility_options[0]]}
              isClearable={false}
              onBlur={this.onBlur_expiry_name}
              onFocus={this.onFocus_expiry_name}
            />
          </div>
          <div className='accept-msg'>
            <label>Accept Message:</label>
            <textarea
              className='txtarea-accept'
              rows={8}
              cols={80}
              placeholder='Msg that will be sent to players when they accept this game invite'
              value={this.state.txtAreaValue}
              onChange={this.handleChange_txtArea}
              maxLength='254'
            />
          </div>
          <div className='buttons'>
            <button
              className='save'
              type='button'
              onClick={() => this.submitForm(true)}>
              &nbsp;&nbsp;Create game&nbsp;&nbsp;
            </button>
            &nbsp;
            <button
              className='save-create'
              type='button'
              onClick={() => this.submitForm(false)}>
              Save & Create Another
            </button>
          </div>
        </div>
      </div>
    )
  }
}
