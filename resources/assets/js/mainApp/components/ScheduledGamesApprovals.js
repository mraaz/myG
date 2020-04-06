import React, { Component } from 'react'
import axios from 'axios'
import IndividualApproval from './IndividualApproval'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class ScheduledGamesApprovals extends Component {
  constructor() {
    super()
    this.state = {
      start_date: '',
      show_game_header: false,
    }
  }

  componentDidMount() {
    const self = this
    const { match } = this.props.routeProps

    const getScheduleGameInvites = async function() {
      try {
        const getScheduleGameInvites = await axios.get(`/api/attendees/getScheduleGameInvites/${match.params.id}`)
        self.setState({
          myInvites: getScheduleGameInvites.data.getScheduleGameInvites,
        })

        if (getScheduleGameInvites.data.getScheduleGameInvites.length > 0) {
          var myStartDateTime = moment(
            getScheduleGameInvites.data.getScheduleGameInvites[0].schedule_games.start_date_time,
            'YYYY-MM-DD HH:mm:ssZ'
          ).local()
          self.setState({
            start_date: myStartDateTime.format('Do MMM YY - h:mm a'),
            show_game_header: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getScheduleGameInvites()
  }

  showApprovals = () => {
    if (this.state.myInvites != undefined) {
      var lastRow = false
      if (
        this.state.myInvites.length == 0 ||
        this.state.myInvites[0].attendees == undefined ||
        this.state.myInvites[0].attendees.length == 0
      ) {
        return <div className='scheduledGamesApprovals-info'>No pending approvals</div>
        return
      }
      return this.state.myInvites.map((item, index) => {
        if (this.state.myInvites.length === index + 1) {
          lastRow = true
        }
        return <IndividualApproval approvals={item} key={index} lastRow={lastRow} />
      })
    }
  }

  render() {
    if (this.state.myInvites != undefined) {
      return (
        <section id='scheduledGamesApprovals-page'>
          <div className='content-area scheduledGamesApprovals-page'>
            <div className='padding-container'>
              <div className='scheduledGamesApprovals-grey-container'>
                {this.state.show_game_header && (
                  <h3>
                    myApprovals for{' '}
                    <Link to={`/scheduledGames/${this.state.myInvites[0].schedule_games.id}`} style={{ textDecoration: 'none' }}>
                      {' '}
                      {this.state.myInvites[0].game_names.game_name}
                    </Link>{' '}
                    on this date: {this.state.start_date}
                  </h3>
                )}
                {!this.state.show_game_header && <h3>myApprovals</h3>}
                <div className='padding-container'></div>
                <div className='scheduledGamesApprovals-container'>{this.showApprovals()}</div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return <section id='scheduledGamesApprovals-page'></section>
    }
  }
}
