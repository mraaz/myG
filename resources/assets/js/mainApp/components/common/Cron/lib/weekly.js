import React, { Component } from 'react'

export default class CustomCron extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onAtHourChange = this.onAtHourChange.bind(this)
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  onAtHourChange(e) {
    let val = this.state.value
    val[0] = '0'
    val[2] = `${e.target.value}`
    this.props.onChange(val)
  }
  onAtMinuteChange(e) {
    let val = this.state.value
    val[0] = '0'
    val[1] = `${e.target.value}`
    this.props.onChange(val)
  }

  onCheck(e) {
    let val = this.state.value
    val[0] = '0'
    if (e.target.checked) {
      val[2] = `${val[2]}`.split('/').length > 1 ? '0' : val[2].toString()
      val[3] = '?'
      val[4] = '*'
      if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
        val[5] = e.target.value
      } else {
        val[5] = val[5] + '!' + e.target.value
      }
    } else {
      val[5] = val[5].split('!')
      if (val[5].length > 1) {
        val[5].splice(val[5].indexOf(e.target.value), 1)
        val[5] = val[5].toString().replace(/,/g, '!')
      } else {
        val[5] = '*'
      }
    }

    this.props.onChange(val)
  }

  onRepeatEveryChange = (e) => {
    this.props.updateRepeatEvery(e.target.value)
  }

  render() {
    this.state.value = this.props.value
    return (
      <div className='container-fluid'>
        <div className='well well-small row'>
          <div className='span6 col-sm-6'>
            <div className='text_align_left'>
              <input
                type='checkbox'
                value='MON'
                onChange={this.onCheck}
                checked={this.state.value[5].search('MON') !== -1 ? true : false}
              />
              &nbsp;Monday
              <br />
              <input
                type='checkbox'
                value='WED'
                onChange={this.onCheck}
                checked={this.state.value[5].search('WED') !== -1 ? true : false}
              />
              &nbsp;Wednesday
              <br />
              <input
                type='checkbox'
                value='FRI'
                onChange={this.onCheck}
                checked={this.state.value[5].search('FRI') !== -1 ? true : false}
              />
              &nbsp;Friday
              <br />
              <input
                type='checkbox'
                value='SUN'
                onChange={this.onCheck}
                checked={this.state.value[5].search('SUN') !== -1 ? true : false}
              />
              &nbsp;Sunday
            </div>
          </div>
          <div className='span6 col-sm-6'>
            <div className='text_align_left'>
              <input
                type='checkbox'
                value='TUE'
                onChange={this.onCheck}
                checked={this.state.value[5].search('TUE') !== -1 ? true : false}
              />
              &nbsp;Tuesday
              <br />
              <input
                type='checkbox'
                value='THU'
                onChange={this.onCheck}
                checked={this.state.value[5].search('THU') !== -1 ? true : false}
              />
              &nbsp;Thursday
              <br />
              <input
                type='checkbox'
                value='SAT'
                onChange={this.onCheck}
                checked={this.state.value[5].search('SAT') !== -1 ? true : false}
              />
              &nbsp;Saturday
            </div>
            <br />
            <br />
          </div>
        </div>
        {/* &nbsp; Start time &nbsp;
            <select  className="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                {this.getHours()} 
            </select>
            &nbsp; : &nbsp;
            <select value="DailyMinutes" className="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                {this.getMinutes()}
            </select> */}
        <div>
          <span>Repeat every </span>
          <input
            type='Number'
            onChange={this.onRepeatEveryChange}
            value={this.props.repeatEvery}
            style={{ margin: 0, display: 'inline' }}
            min={1}
            max={52}
          />
        </div>
      </div>
    )
  }
  getHours() {
    let hours = []
    let leap = parseInt(this.props.hours) || 1
    for (let i = 0; i < 24; i = i + leap) {
      hours.push(
        <option id={i} value={i < 10 ? `0${i}` : i}>
          {i < 10 ? `0${i}` : i}
        </option>
      )
    }
    return hours
  }
  getMinutes() {
    let minutes = []
    let leap = parseInt(this.props.minutes) || 1
    for (let i = 0; i < 60; i = i + leap) {
      minutes.push(
        <option id={i} value={i < 10 ? `0${i}` : i}>
          {i < 10 ? `0${i}` : i}
        </option>
      )
    }
    return minutes
  }
}
