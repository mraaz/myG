import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import IndividualPlayer from "./IndividualPlayer"

export default class PlayerList extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount(){
    const self = this
    const {match} = this.props.routeProps

    const getAttendees = async function(){
      try{
        const getAttendees = await axios.get(`/api/attendees/role_call_ALL/${match.params.id}`)
        self.setState({
          allMyFriends: getAttendees.data.role_call_ALL
          })

      } catch(error){
        console.log(error)
      }
    }
    getAttendees()
  }

  showFriends = () => {
    if(this.state.allMyFriends != undefined){
      const rowLen = this.state.allMyFriends.length
      var lastRow = false
      if(rowLen == 0){
        return( <div className="invitation-info">
         No attendees :(
         </div>
        )
      }
      return this.state.allMyFriends.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualPlayer attendee={item} key={index} lastRow={lastRow}/>
      })
    }
  }

  render() {
    if(this.state.allMyFriends !== undefined) {
      return (
        <section id="invitation-page">
          <div className="content-area invitation-page">
            <div className="padding-container">
              <div className="invitation-grey-container">
                <h3>{(this.state.allMyFriends.length == 1) ?  ' ' + this.state.allMyFriends.length + ' attendee' : this.state.allMyFriends.length + ' attendees'}</h3>
                <div className="padding-container">
                </div>
                <div className="invitation-container">
                  {this.showFriends()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
     return (
       <div className="content-area invitation-page">
         Loading
       </div>
     )
   }
  }
}
