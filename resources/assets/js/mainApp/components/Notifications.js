import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import IndividualNotification from "./IndividualNotification"

export default class Notifications extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  // Split the array into halves and merge them recursively
  mergeSort = function(arr) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return this.merge(
      this.mergeSort(left),
      this.mergeSort(right)
    )
  }

  // compare the arrays item by item and return the concatenated result
  merge = function (left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft].updated_at > right[indexRight].updated_at) {
        result.push(left[indexLeft])
        indexLeft++
      } else {
        result.push(right[indexRight])
        indexRight++
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }

  componentWillMount(){
    const self = this

    const getNoti = async function(){
      try{
        const getnoti = await axios.get('/api/notifications/getAllNoti')
        var singleArr = [...getnoti.data.allMylike_posts, ...getnoti.data.allMylike_comments, ...getnoti.data.allMylike_replies, ...getnoti.data.allMycomments, ...getnoti.data.allMyreplies, ...getnoti.data.allMyschedulegames, ...getnoti.data.myschedulegames_attendees, ...getnoti.data.mygroups, ...getnoti.data.myschedulegames_approvals, ...getnoti.data.allMyarchived_schedulegames, ...getnoti.data.dropped_out_attendees, ...getnoti.data.group_member_approved]
        self.setState({
          myNoti: singleArr.length == 0 ? "" : self.mergeSort(singleArr)
          })

      } catch(error){
        console.log(error)
      }
    }
    getNoti()
  }

  showNotifications = () => {
    if(this.state.myNoti != undefined){
      const rowLen = this.state.myNoti.length
      var lastRow = false
      if(rowLen == 0){
        return( <div className="notifications-info">
         No notifications
         </div>
        )
      }
      return this.state.myNoti.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualNotification notification={item} key={index} lastRow={lastRow}/>
      })
    }
  }

  mark_all = () => {
    try{
      const mark_all = axios.get('/api/notifications/markAllNoti')
    } catch(error){
      console.log(error)
    }
    window.location.reload()
  }

  delete_all = () => {
    try{
      const delete_all = axios.get('/api/notifications/deleteAllNoti')
    } catch(error){
      console.log(error)
    }
    window.location.reload()
  }

  render() {
    if(this.state.myNoti != undefined){
      var show_buttons = false

      if (this.state.myNoti.length > 0){
        show_buttons = true
      }

      return (
        <section id="notifications-page">
          <div className="content-area notifications-page">
            <div className="padding-container">
              <div className="notifications-grey-container">
                <h3>myNotifications</h3>
                {show_buttons && <div className="noti-buttons">
                  <button className="allread" onClick={() => { if (window.confirm('Are you sure you wish to Mark ALL as Read?')) this.mark_all() } }>Mark all as read</button>
                  <button className="deleteall" onClick={() => { if (window.confirm('Are you sure you wish to Delete ALL notifications?')) this.delete_all() } }>Delete All</button>
                </div>}
                <div className="padding-container">
                </div>
                <div className="notifications-container">
                  {this.showNotifications()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return (
        <div className="content-area notifications-page">
          Loading
        </div>
      )
    }
  }
}
