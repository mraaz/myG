import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import IndividualInvitation from "./IndividualInvitation"

export default class Invitation extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount(){
    const self = this

    const getFriendnoti = async function(){
      try{
        const getFriendnoti = await axios.get('/api/notifications/allmyFriendRequests')
        self.setState({
          myFriendRequests: getFriendnoti.data.allMyFriends
          })

      } catch(error){
        console.log(error)
      }
    }
    getFriendnoti()
  }

  showInvitations = () => {
    if(this.state.myFriendRequests != undefined){
      const rowLen = this.state.myFriendRequests.length
      var lastRow = false
      if(rowLen == 0){
        return( <div className="invitation-info">
         No pending invitations
         </div>
        )
      }
      return this.state.myFriendRequests.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualInvitation invitation={item} key={index} lastRow={lastRow}/>
      })
    }
  }

  render() {
    return (
      <section id="invitation-page">
        <div className="content-area invitation-page">
          <div className="padding-container">
            <div className="invitation-grey-container">
              <h3>myInvitations</h3>
              <div className="padding-container">
              </div>
              <div className="invitation-container">
                {this.showInvitations()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
