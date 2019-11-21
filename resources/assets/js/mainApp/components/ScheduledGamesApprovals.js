import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import IndividualApproval from "./IndividualApproval"
import moment from "moment"

export default class ScheduledGamesApprovals extends Component {
  constructor() {
    super()
    this.state = {
      start_date: ""
    }
  }

  componentWillMount(){
    const self = this
    const {match} = this.props.routeProps

    const getScheduleGameInvites = async function(){
      try{
        const getScheduleGameInvites = await axios.get(`/api/attendees/getScheduleGameInvites/${match.params.id}`)
        var myStartDateTime = moment(getScheduleGameInvites.data.getScheduleGameInvites[0].schedule_games.start_date_time, "YYYY-MM-DD HH:mm:ssZ").local()
        self.setState({
          myInvites: getScheduleGameInvites.data.getScheduleGameInvites,
          start_date: myStartDateTime.format('Do MMM YY - h:mm a')
        })

      } catch(error){
        console.log(error)
      }
    }
    getScheduleGameInvites()
  }

  showApprovals = () => {
    if(this.state.myInvites != undefined){
      const rowLen = this.state.myInvites.length
      var lastRow = false
      if(rowLen == 0){
        return( <div className="scheduledGamesApprovals-info">
         No pending approvals
         </div>
        )
      }
      return this.state.myInvites.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualApproval approvals={item} key={index} lastRow={lastRow}/>
      })
    }
  }

  render() {
    if(this.state.myInvites != undefined){

      return (
        <section id="scheduledGamesApprovals-page">
          <div className="content-area scheduledGamesApprovals-page">
            <div className="padding-container">
              <div className="scheduledGamesApprovals-grey-container">
                <h3>myApprovals for <a href={`/scheduledGames/${this.state.myInvites[0].schedule_games.id}`}> {this.state.myInvites[0].schedule_games.game_name}</a> on this date: {this.state.start_date}</h3>
                <div className="padding-container">
                </div>
                <div className="scheduledGamesApprovals-container">
                  {this.showApprovals()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    } else{
      return (
        <section id="scheduledGamesApprovals-page">
        </section>
      )
    }
  }
}
