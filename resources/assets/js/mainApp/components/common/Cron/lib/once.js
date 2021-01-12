import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CustomCron extends Component {
  constructor(props) {
    super(props)
    const startDate = this.getStartDate(props)
    this.state = { startDate }
    this.onDayChange = this.onDayChange.bind(this)
    this.onAtHourChange = this.onAtHourChange.bind(this)
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this)
  }
  getStartDate(props) {
    if (props.value && props.value.length) {
      return new Date(`${props.value[4]}/${props.value[3]}/${props.value[6]}`)
    }
    return new Date()
  }
  UNSAFE_componentWillMount() {
    this.state.value = this.props.value
  }
  onDayChange(date) {
    let val = [...this.state.value]
    val[3] = date.getDate().toString()
    val[4] = (date.getMonth() + 1).toString()
    this.setState({
      startDate: date,
      value: val,
    })
    this.props.onChange(val)
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
          &nbsp; In: &nbsp;
          <DatePicker selected={this.state.startDate} onChange={this.onDayChange} minDate={new Date()} />
        </div>
        &nbsp; At: &nbsp;
        <select id='DailyHours' className='hours' onChange={this.onAtHourChange} value={this.state.value[2]}>
          {this.getHours()}
        </select>
        &nbsp; : &nbsp;
        <select id='DailyMinutes' className='minutes' onChange={this.onAtMinuteChange} value={this.state.value[1]}>
          {this.getMinutes()}
        </select>
      </div>
    )
  }
  getHours() {
    let hours = []
    let leap = parseInt(this.props.hours) || 1
    let startHour = this.isToday() ? this.getNextHour() : 0
    for (let i = startHour; i < 24; i = i + leap) {
      hours.push(
        <option id={i} value={i < 10 ? `0${i}` : i}>
          {i < 10 ? `0${i}` : i}
        </option>
      )
    }
    return hours
  }
  isToday() {
    const today = new Date()
    return (
      this.state.startDate.getDate() == today.getDate() &&
      this.state.startDate.getMonth() == today.getMonth() &&
      this.state.startDate.getFullYear() == today.getFullYear()
    )
  }
  getNextHour() {
    const hourNow = this.state.startDate.getHours()
    return hourNow < 23 ? hourNow + 1 : 23
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
