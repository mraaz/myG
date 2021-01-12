import React, { Component } from 'react'

export default class CustomCron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: 0,
      minute: 0,
    }

    this.onDayChange = this.onDayChange.bind(this)
    this.onAtHourChange = this.onAtHourChange.bind(this)
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this)
  }
  UNSAFE_componentWillMount() {
    this.state.value = this.props.value
    if (this.state.value[3] === '?') {
      this.state.every = false
    } else {
      this.state.every = true
    }
  }
  onDayChange(e) {
    if ((e.target.value > 0 && e.target.value < 32) || e.target.value == '') {
      let val = [
        '0',
        this.state.value[1] === '*' ? '0' : this.state.value[1],
        this.state.value[2] === '*' ? '0' : this.state.value[2],
        '*',
        '*',
        '?',
        '*',
      ]
      if (e.target.value == '') {
        val[3] = ''
      } else {
        val[3] = `1/${e.target.value}`
      }
      this.props.onChange(val)
    }
  }
  onAtHourChange(e) {
    let val = this.state.value
    val[2] = `${e.target.value}`
    this.props.onChange(val)
  }
  onAtMinuteChange(e) {
    let val = this.state.value
    val[1] = `${e.target.value}`
    this.props.onChange(val)
  }
  render() {
    this.state.value = this.props.value
    return (
      <div className='tab-pane'>
        <div className='well well-small'>
          <input
            type='radio'
            onClick={(e) => {
              this.setState({ every: true })
              this.props.onChange()
            }}
            value='1'
            name='DailyRadio'
            checked={this.state.every ? true : false}
          />
          &nbsp; Every &nbsp;
          <input
            disabled={this.state.every ? false : true}
            type='Number'
            onChange={this.onDayChange}
            value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] : ''}
            style={{ margin: 0 }}
          />
          &nbsp; day(s)
        </div>
        <div className='well well-small'>
          <input
            onClick={(e) => {
              this.setState({ every: false })
              this.props.onChange(['0', this.state.value[1], this.state.value[2], '?', '*', 'MON-FRI', '*'])
            }}
            type='radio'
            value='2'
            name='DailyRadio'
            checked={this.state.every ? false : true}
          />
          &nbsp; Every week day&nbsp;
        </div>
        {/* &nbsp; Start time&nbsp;
                    <select id="DailyHours" className="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                        {this.getHours()}                    
                    </select>
                    &nbsp; : &nbsp;
                    <select id="DailyMinutes" className="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                        {this.getMinutes()}
                    </select> */}
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
