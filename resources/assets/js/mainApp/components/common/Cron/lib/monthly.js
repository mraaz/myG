import React, { Component } from 'react'

export default class CustomCron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: 0,
      minute: 0,
    }

    this.onDayChange = this.onDayChange.bind(this)
    this.onLastDayChange = this.onLastDayChange.bind(this)
    this.onAtHourChange = this.onAtHourChange.bind(this)
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this)
  }
  UNSAFE_componentWillMount() {
    this.state.value = this.props.value
    if (this.state.value[3] === 'L') {
      this.state.every = '2'
    } else if (this.state.value[3] === 'LW') {
      this.state.every = '3'
    } else if (this.state.value[3].startsWith('L')) {
      this.state.every = '4'
    } else {
      this.state.every = '1'
    }
  }
  onDayChange(e) {
    if ((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) || e.target.value == '') {
      let val = [
        '0',
        this.state.value[1] === '*' ? '0' : this.state.value[1],
        this.state.value[2] === '*' ? '0' : this.state.value[2],
        this.state.value[3],
        '1/1',
        '?',
        '*',
      ]
      val[3] = `${e.target.value}`
      this.props.onChange(val)
    }
  }
  onLastDayChange(e) {
    if ((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31) || e.target.value == '') {
      let val = [
        '0',
        this.state.value[1] === '*' ? '0' : this.state.value[1],
        this.state.value[2] === '*' ? '0' : this.state.value[2],
        this.state.value[3],
        '1/1',
        '?',
        '*',
      ]
      if (e.target.value == '') {
        val[3] = ''
      } else {
        val[3] = `L-${e.target.value}`
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
            onChange={(e) => {
              this.setState({ every: e.target.value })
              this.props.onChange([
                '0',
                this.state.value[1] === '*' ? '0' : this.state.value[1],
                this.state.value[2] === '*' ? '0' : this.state.value[2],
                '1',
                '1/1',
                '?',
                '*',
              ])
            }}
            value='1'
            name='MonthlyRadio'
            checked={this.state.every === '1' ? true : false}
          />
          &nbsp;Day&nbsp;
          <input readOnly={this.state.every !== '1'} type='number' value={this.state.value[3]} onChange={this.onDayChange} />
          &nbsp;of every month(s)
        </div>

        <div className='well well-small'>
          <input
            onChange={(e) => {
              this.setState({ every: e.target.value })
              this.props.onChange([
                '0',
                this.state.value[1] === '*' ? '0' : this.state.value[1],
                this.state.value[2] === '*' ? '0' : this.state.value[2],
                'L',
                '*',
                '?',
                '*',
              ])
            }}
            type='radio'
            value='2'
            name='DailyRadio'
            checked={this.state.every === '2' ? true : false}
          />
          &nbsp; Last day of every month &nbsp;
        </div>
        <div className='well well-small'>
          <input
            onChange={(e) => {
              this.setState({ every: e.target.value })
              this.props.onChange([
                '0',
                this.state.value[1] === '*' ? '0' : this.state.value[1],
                this.state.value[2] === '*' ? '0' : this.state.value[2],
                'LW',
                '*',
                '?',
                '*',
              ])
            }}
            type='radio'
            value='3'
            name='DailyRadio'
            checked={this.state.every === '3' ? true : false}
          />
          &nbsp; On the last weekday of every month &nbsp;
        </div>
        <div className='well well-small'>
          <input
            type='radio'
            onChange={(e) => {
              this.setState({ every: e.target.value })
              this.props.onChange([
                '0',
                this.state.value[1] === '*' ? '0' : this.state.value[1],
                this.state.value[2] === '*' ? '0' : this.state.value[2],
                `L-${1}`,
                '*',
                '?',
                '*',
              ])
            }}
            value='4'
            name='MonthlyRadio'
            checked={this.state.every === '4' ? true : false}
          />
          <input
            readOnly={this.state.every !== '4'}
            type='number'
            value={this.state.value[3].split('-')[1]}
            onChange={this.onLastDayChange}
            style={{ marginLeft: '9px' }}
          />
          &nbsp;day(s) before the end of the month
        </div>
        {/* &nbsp; Start time &nbsp;
                    <select  className="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                        {this.getHours()}
                    </select>
                    &nbsp; : &nbsp;
                    <select value="DailyMinutes" className="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
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
