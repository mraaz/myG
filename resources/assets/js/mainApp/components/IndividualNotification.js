import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import moment from "moment"

export default class IndividualNotification extends Component {
  constructor() {
    super()
    this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      notification_str: "",
      unread: false,
      post: false,
      schedule_game: false,
      group_post: false
    }
  }

  clickedAccept = () => {
    let {notification} = this.props
    try{
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch(error){
      console.log(error)
    }

    try {
      const createFriend = axios.post('/api/friends/create',{
        friend_id: notification.user_id,
      })

    } catch(error){
      console.log(error)
    }

    this.setState({
      actionClicked: false,
      actionClickedAccept: true
    })
  }

  clickedDenied = () => {
    let {notification} = this.props
    try{
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch(error){
      console.log(error)
    }
    this.setState({
      actionClicked: false,
      actionClickedDeny: true
    })
  }

  componentWillMount(){
    const self = this
    let {notification} = this.props
    var activity_type
    var tmpStr=""

    const getMoreNoti = async function(){
      try{
        switch(notification.activity_type) {
          case 2:
            const getLikePost = await axios.get(`/api/notifications/getAllNotiLike_post/${notification.post_id}`)
            if (getLikePost.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            switch(getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " liked your post"
                break
              case 2:
                self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " and " + getLikePost.data.getAllNotiLike_post[1].first_name + " " + getLikePost.data.getAllNotiLike_post[1].last_name + " liked your post"
                break
              case 3:
                self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + ",  " + getLikePost.data.getAllNotiLike_post[1].first_name + " " + getLikePost.data.getAllNotiLike_post[1].last_name + " and " + getLikePost.data.getAllNotiLike_post[2].first_name + " " + getLikePost.data.getAllNotiLike_post[2].last_name + " liked your post"
                break
              default:
                self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].first_name + " " + getLikePost.data.getAllNotiLike_post[0].last_name + " and " + getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis + " other people liked your post"
            }
            self.props.notification.profile_img = getLikePost.data.getAllNotiLike_post[0].profile_img
            break
          case 3:
            const getLikeComment = await axios.get(`/api/notifications/getAllNotiLike_comment/${notification.post_id}`)
            if (getLikeComment.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            switch(getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " liked your comment"
                break
              case 2:
                self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " and " + getLikeComment.data.getAllNotiLike_comment[1].first_name + " " + getLikeComment.data.getAllNotiLike_comment[1].last_name + " liked your comment"
                break
              case 3:
                self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + ",  " + getLikeComment.data.getAllNotiLike_comment[1].first_name + " " + getLikeComment.data.getAllNotiLike_comment[1].last_name + " and " + getLikeComment.data.getAllNotiLike_comment[2].first_name + " " + getLikeComment.data.getAllNotiLike_comment[2].last_name + " liked your comment"
                break
              default:
                self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].first_name + " " + getLikeComment.data.getAllNotiLike_comment[0].last_name + " and " + getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis + " other people liked your comment"
            }
            self.props.notification.profile_img = getLikeComment.data.getAllNotiLike_comment[0].profile_img
            break
          case 4:
            const getLikeReply = await axios.get(`/api/notifications/getAllNotiLike_reply/${notification.post_id}`)
            if (getLikeReply.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            switch(getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " liked your reply"
                break
              case 2:
                self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " and " + getLikeReply.data.getAllNotiLike_reply[1].first_name + " " + getLikeReply.data.getAllNotiLike_reply[1].last_name + " liked your reply"
                break
              case 3:
                self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + ",  " + getLikeReply.data.getAllNotiLike_reply[1].first_name + " " + getLikeReply.data.getAllNotiLike_reply[1].last_name + " and " + getLikeReply.data.getAllNotiLike_reply[2].first_name + " " + getLikeReply.data.getAllNotiLike_reply[2].last_name + " liked your reply"
                break
              default:
                self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].first_name + " " + getLikeReply.data.getAllNotiLike_reply[0].last_name + " and " + getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis + " other people liked your reply"
            }
            self.props.notification.profile_img = getLikeReply.data.getAllNotiLike_reply[0].profile_img
            break
          case 5:
            const getComment = await axios.get(`/api/notifications/getAllNotiComment/${notification.post_id}`)
            if (getComment.data.getAllNotiCommentCount_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            switch(getComment.data.getAllNotiCommentCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " commented on your post"
                break
              case 2:
                self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " and " + getComment.data.getAllNotiComment[1].first_name + " " + getComment.data.getAllNotiComment[1].last_name + " commented on your post"
                break
              case 3:
                self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + ",  " + getComment.data.getAllNotiComment[1].first_name + " " + getComment.data.getAllNotiComment[1].last_name + " and " + getComment.data.getAllNotiComment[2].first_name + " " + getComment.data.getAllNotiComment[2].last_name + " commented on your post"
                break
              default:
                self.state.notification_str = getComment.data.getAllNotiComment[0].first_name + " " + getComment.data.getAllNotiComment[0].last_name + " and " + getComment.data.getAllNotiCommentCount[0].no_of_my_notis + " other people commented on your post"
            }
            self.props.notification.profile_img = getComment.data.getAllNotiComment[0].profile_img
            break
          case 6:
            const getReply = await axios.get(`/api/notifications/getAllNotiReply/${notification.post_id}`)
            if (getReply.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            switch(getReply.data.getAllNotiReplyCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " replied to your comment"
                break
              case 2:
                self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " and " + getReply.data.getAllNotiReply[1].first_name + " " + getReply.data.getAllNotiReply[1].last_name + " replied to your comment"
                break
              case 3:
                self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + ",  " + getReply.data.getAllNotiReply[1].first_name + " " + getReply.data.getAllNotiReply[1].last_name + " and " + getReply.data.getAllNotiReply[2].first_name + " " + getReply.data.getAllNotiReply[2].last_name + " replied to your comment"
                break
              default:
                self.state.notification_str = getReply.data.getAllNotiReply[0].first_name + " " + getReply.data.getAllNotiReply[0].last_name + " and " + getReply.data.getAllNotiReplyCount[0].no_of_my_notis + " other people replied to your comment"
            }
            self.props.notification.profile_img = getReply.data.getAllNotiReply[0].profile_img
            break
          case 11:
            const getunread = await axios.get(`/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`)
            if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
            const getschedulegameInfo = await axios.get(`/api/notifications/getAllNotiScheduleGamesAttendees/${notification.schedule_games_id}`)
            const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)
            var myStartDateTime = moment(myScheduledGame.data.getOne[0].start_date_time, "YYYY-MM-DD HH:mm:ssZ").local()
            var myEndDateTime = moment(myScheduledGame.data.getOne[0].end_date_time, "YYYY-MM-DD HH:mm:ssZ").local()

            switch(getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + " joined " + myScheduledGame.data.getOne[0].game_name + " (" + myStartDateTime.format('Do MMM YY - h:mm a') + " - " + myEndDateTime.format('Do MMM YY - h:mm a') + ")"
                break
              case 2:
                self.state.notification_str = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + " and " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].last_name + " joined " + myScheduledGame.data.getOne[0].game_name + " (" + myStartDateTime.format('Do MMM YY - h:mm a') + " - " + myEndDateTime.format('Do MMM YY - h:mm a') + ")"
                break
              case 3:
                self.state.notification_str = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + ",  " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].last_name + " and " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[2].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[2].last_name + " others joined " + myScheduledGame.data.getOne[0].game_name + " (" + myStartDateTime.format('Do MMM YY - h:mm a') + " - " + myEndDateTime.format('Do MMM YY - h:mm a') + ")"
                break
              default:
                self.state.notification_str = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].first_name + " " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].last_name + " and " + getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis + " joined " + myScheduledGame.data.getOne[0].game_name + " (" + myStartDateTime.format('Do MMM YY - h:mm a') + " - " + myEndDateTime.format('Do MMM YY - h:mm a') + ")"
            }
            self.props.notification.profile_img = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].profile_img
            break
        }

      } catch(error){
        console.log(error)
      }
      self.forceUpdate()
    }

    const getinitialData = async function(){
      var getunread
      if (notification.no_of_my_notis == 1){
        try {
          if (notification.activity_type == 11){
            getunread = await axios.get(`/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`)
            if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
          } else {
            getunread = await axios.get(`/api/notifications/getunread/${notification.post_id}/${notification.activity_type}`)
            if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
              self.state.unread = true
            }
          }

        } catch (error){
          console.log(error);
        }
        switch(notification.activity_type) {
          case 2:
            activity_type = "liked your post"
            break
          case 3:
            activity_type = "liked your comment"
            break
          case 4:
            activity_type = "liked your reply"
            break
          case 5:
            activity_type = "commented on your post"
            break
          case 6:
            activity_type = "replied to your comment"
            break
        }
        self.setState({
          notification_str: notification.first_name + " " + notification.last_name + " " + activity_type
          })
      }else{
        getMoreNoti()
      }
    }

    const getschedulegameData = async function(){
      try {
        const getunread = await axios.get(`/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`)
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
          self.state.unread = true
        }

        const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)

        var myStartDateTime = moment(myScheduledGame.data.getOne[0].start_date_time, "YYYY-MM-DD HH:mm:ssZ").local()
        var myEndDateTime = moment(myScheduledGame.data.getOne[0].end_date_time, "YYYY-MM-DD HH:mm:ssZ").local()

        self.setState({
          notification_str: notification.first_name + " " + notification.last_name + " created a game - " + myScheduledGame.data.getOne[0].game_name + " (" + myStartDateTime.format('Do MMM YY - h:mm a') + " - " + myEndDateTime.format('Do MMM YY - h:mm a') + " )"
        })

      } catch (error){
        console.log(error);
      }
    }

    const getGroupData = async function(){
      try {
        const getunread = await axios.get(`/api/notifications/getunread_group/${notification.group_id}/${notification.id}`)
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0){
          self.state.unread = true
        }

        self.setState({
          notification_str: notification.name + " - " + notification.first_name + " " + notification.last_name + " wants to join this group. What ya reckon?"
        })

      } catch (error){
        console.log(error);
      }
    }

    if (notification.activity_type == 10){
      getschedulegameData()
    } else if (notification.activity_type == 11) {
      getMoreNoti()
    } else if (notification.activity_type == 12) {
      getGroupData()
    }else{
      getinitialData()
    }
  }

  updateRead_Status(){
    try{
      const updateRead_Status = axios.post(`/api/notifications/updateRead_Status/${this.props.notification.post_id}/${this.props.notification.activity_type}`)
    } catch (error){
      console.log(error)
    }
    window.location.href = `/post/${this.props.notification.post_id}`
  }

  updateRead_Status_schedule_game(){
    try{
      const updateRead_Status_schedule_game = axios.post(`/api/notifications/updateRead_Status_schedule_game/${this.props.notification.schedule_games_id}/${this.props.notification.activity_type}`)
    } catch (error){
      console.log(error)
    }
    window.location.href = `/scheduledGames/${this.props.notification.schedule_games_id}`
  }

  updateRead_Status_groups(){
    try{
      const updateRead_Status_groups = axios.post(`/api/notifications/updateRead_Status_groups/${this.props.notification.group_id}/${this.props.notification.id}`)
    } catch (error){
      console.log(error)
    }
    window.location.href = `/myApprovals/${this.props.notification.group_id}`
  }


  render() {
    let {notification, lastRow} = this.props
    var str_href

    var show_profile_img = false
    if (notification.profile_img != null){
      show_profile_img = true
    }

    if (notification.activity_type == 10 || notification.activity_type == 11){
      this.state.post = false
      this.state.schedule_game = true
      str_href = "/scheduledGames/" + notification.schedule_games_id
    } else if (notification.activity_type == 12) {
      this.state.post = false
      this.state.group_post = true
      str_href = "/myApprovals/" + notification.group_id
    }else{
      this.state.post = true
      str_href = "/post/" + notification.post_id
    }

    return (
      <div className="notification-info">
        {show_profile_img && <a href={`/profile/${notification.id}`} className="user-img" style={{
          backgroundImage: `url('${notification.profile_img}')`}}/>}
        {!show_profile_img && <a href={`/profile/${notification.id}`} className="user-img" style={{
          backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')`
        }}/>}
        {this.state.post && !this.state.unread && <div className="user-info-read">
          <a href={str_href}>{this.state.notification_str}</a>
        </div>}
        {this.state.post && this.state.unread && <div className="user-info-unread" onClick={() => this.updateRead_Status()}>{this.state.notification_str}</div>}
        {this.state.schedule_game && !this.state.unread && <div className="user-info-read">
          <a href={str_href}>{this.state.notification_str}</a>
        </div>}
        {this.state.schedule_game && this.state.unread && <div className="user-info-unread" onClick={() => this.updateRead_Status_schedule_game()}>{this.state.notification_str}</div>}
        {this.state.group_post && !this.state.unread && <div className="user-info-read">
          <a href={str_href}>{this.state.notification_str}</a>
        </div>}
        {this.state.group_post && this.state.unread && <div className="user-info-unread" onClick={() => this.updateRead_Status_groups()}>{this.state.notification_str}</div>}
        {!lastRow && <div className="line-break">
          <hr />
        </div>}
        {lastRow && <div className="last-row">

        </div>}
      </div>
    )
  }
}
