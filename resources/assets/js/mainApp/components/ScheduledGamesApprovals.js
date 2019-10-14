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

export default class ScheduledGamesApprovals extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount(){
    const self = this
    const {match} = this.props.routeProps

    const getScheduleGameInvites = async function(){
      try{
        const getScheduleGameInvites = await axios.get(`/api/attendees/getScheduleGameInvites/${match.params.id}`)
        self.setState({
          myInvites: getScheduleGameInvites.data.getScheduleGameInvites
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
    return (
      <section id="scheduledGamesApprovals-page">
        <div className="content-area scheduledGamesApprovals-page">
          <div className="padding-container">
            <div className="scheduledGamesApprovals-grey-container">
              <h3>myApprovals</h3>
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
  }
}
