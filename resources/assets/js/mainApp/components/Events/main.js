import React from 'react'
import moment from 'moment'

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourny_Date: '',
      start_time: 'Now!',
      live: false
    }
  }

  componentDidMount() {
    const testDateUtc = moment.utc('2021-08-08 00:00:00')
    const localDate = moment(testDateUtc).local()
    this.setState({ tourny_Date: localDate.format('LLL') })

    const duration = moment.duration(testDateUtc.diff(Date.now()))
    const hours = Math.floor(duration.asHours()) + 'h '
    if (Math.floor(duration.asHours()) < 0) {
      this.setState({ live: true })
    } else {
      this.setState({ start_time: hours })
    }
  }

  renderHeader = () => {
    return (
      <div className='viewGame__header'>
        <div className='title'>Main Event</div>
      </div>
    )
  }

  redirect2Group = () => {
    this.props.props.routeProps.routeProps.history.push(`/community/${encodeURI('myG.L%20PUBG%20MOBILE')}`)
  }

  renderBody = () => {
    return (
      <div className='event-component-body'>
        <img
          src='https://myG.gg/user_files/1_1628311610248_sJIVjK_updated_image.jpeg'
          className='event-box-img'
          onClick={this.redirect2Group}
        />
        <div className='event-component-body-border'></div>
        <div className='body-text'>
          {`Live ${
            this.state.live ? 'Now!' : `in ${this.state.start_time} on ${this.state.tourny_Date}.`
          } This tournament has three special events:\n\n🔶 Support your team by voting for them\n🔶 Vote for the People Choice award\n🔶 Win $300 worth of Amazon eGift cards`}
          <button className='btn-events' onClick={this.redirect2Group}>
            Come Join us!
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='events-main'>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </React.Fragment>
    )
  }
}
