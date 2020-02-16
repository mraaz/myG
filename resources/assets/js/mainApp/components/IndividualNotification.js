import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

export default class IndividualNotification extends Component {
  constructor() {
    super()
    this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      notification_str: '',
      unread: false,
      post: false,
      schedule_game: false,
      group_post: false,
      archive_schedule_game: false,
      redirect_: false,
      redirect_link: '',
      redirect_tmp: '',
    }
  }

  clickedAccept = () => {
    let { notification } = this.props
    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch (error) {
      console.log(error)
    }

    try {
      const createFriend = axios.post('/api/friends/create', {
        friend_id: notification.user_id,
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      actionClicked: false,
      actionClickedAccept: true,
    })
  }

  clickedDenied = () => {
    let { notification } = this.props
    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      actionClicked: false,
      actionClickedDeny: true,
    })
  }

  componentWillMount() {
    const self = this
    let { notification } = this.props
    var activity_type
    var tmpStr = ''

    const getMoreNoti = async function() {
      try {
        switch (notification.activity_type) {
          case 2:
            const getLikePost = await axios.get(`/api/notifications/getAllNotiLike_post/${notification.post_id}`)
            if (getLikePost.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            switch (getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikePost.data.getAllNotiLike_post[0].alias + ' liked your post'
                break
              case 2:
                self.state.notification_str =
                  getLikePost.data.getAllNotiLike_post[0].alias +
                  ' and ' +
                  getLikePost.data.getAllNotiLike_post[1].alias +
                  ' liked your post'
                break
              case 3:
                self.state.notification_str =
                  getLikePost.data.getAllNotiLike_post[0].alias +
                  ',  ' +
                  getLikePost.data.getAllNotiLike_post[1].alias +
                  ' and ' +
                  getLikePost.data.getAllNotiLike_post[2].alias +
                  ' liked your post'
                break
              default:
                self.state.notification_str =
                  getLikePost.data.getAllNotiLike_post[0].alias +
                  ' and ' +
                  getLikePost.data.getAllNotiLike_postCount[0].no_of_my_notis +
                  ' other people liked your post'
            }
            self.props.notification.profile_img = getLikePost.data.getAllNotiLike_post[0].profile_img
            break
          case 3:
            const getLikeComment = await axios.get(`/api/notifications/getAllNotiLike_comment/${notification.post_id}`)
            if (getLikeComment.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            switch (getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikeComment.data.getAllNotiLike_comment[0].alias + ' liked your comment'
                break
              case 2:
                self.state.notification_str =
                  getLikeComment.data.getAllNotiLike_comment[0].alias +
                  ' and ' +
                  getLikeComment.data.getAllNotiLike_comment[1].alias +
                  ' liked your comment'
                break
              case 3:
                self.state.notification_str =
                  getLikeComment.data.getAllNotiLike_comment[0].alias +
                  ',  ' +
                  getLikeComment.data.getAllNotiLike_comment[1].alias +
                  ' and ' +
                  getLikeComment.data.getAllNotiLike_comment[2].alias +
                  ' liked your comment'
                break
              default:
                self.state.notification_str =
                  getLikeComment.data.getAllNotiLike_comment[0].alias +
                  ' and ' +
                  getLikeComment.data.getAllNotiLike_commentCount[0].no_of_my_notis +
                  ' other people liked your comment'
            }
            self.props.notification.profile_img = getLikeComment.data.getAllNotiLike_comment[0].profile_img
            break
          case 4:
            const getLikeReply = await axios.get(`/api/notifications/getAllNotiLike_reply/${notification.post_id}`)
            if (getLikeReply.data.getAllNotiLike_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            switch (getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getLikeReply.data.getAllNotiLike_reply[0].alias + ' liked your reply'
                break
              case 2:
                self.state.notification_str =
                  getLikeReply.data.getAllNotiLike_reply[0].alias +
                  ' and ' +
                  getLikeReply.data.getAllNotiLike_reply[1].alias +
                  ' liked your reply'
                break
              case 3:
                self.state.notification_str =
                  getLikeReply.data.getAllNotiLike_reply[0].alias +
                  ',  ' +
                  getLikeReply.data.getAllNotiLike_reply[1].alias +
                  ' and ' +
                  getLikeReply.data.getAllNotiLike_reply[2].alias +
                  ' liked your reply'
                break
              default:
                self.state.notification_str =
                  getLikeReply.data.getAllNotiLike_reply[0].alias +
                  ' and ' +
                  getLikeReply.data.getAllNotiLike_replyCount[0].no_of_my_notis +
                  ' other people liked your reply'
            }
            self.props.notification.profile_img = getLikeReply.data.getAllNotiLike_reply[0].profile_img
            break
          case 5:
            const getComment = await axios.get(`/api/notifications/getAllNotiComment/${notification.post_id}`)
            if (getComment.data.getAllNotiCommentCount_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            switch (getComment.data.getAllNotiCommentCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getComment.data.getAllNotiComment[0].alias + ' commented on your post'
                break
              case 2:
                self.state.notification_str =
                  getComment.data.getAllNotiComment[0].alias +
                  ' and ' +
                  getComment.data.getAllNotiComment[1].alias +
                  ' commented on your post'
                break
              case 3:
                self.state.notification_str =
                  getComment.data.getAllNotiComment[0].alias +
                  ',  ' +
                  getComment.data.getAllNotiComment[1].alias +
                  ' and ' +
                  getComment.data.getAllNotiComment[2].alias +
                  ' commented on your post'
                break
              default:
                self.state.notification_str =
                  getComment.data.getAllNotiComment[0].alias +
                  ' and ' +
                  getComment.data.getAllNotiCommentCount[0].no_of_my_notis +
                  ' other people commented on your post'
            }
            self.props.notification.profile_img = getComment.data.getAllNotiComment[0].profile_img
            break
          case 6:
            const getReply = await axios.get(`/api/notifications/getAllNotiReply/${notification.post_id}`)
            if (getReply.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            switch (getReply.data.getAllNotiReplyCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str = getReply.data.getAllNotiReply[0].alias + ' replied to your comment'
                break
              case 2:
                self.state.notification_str =
                  getReply.data.getAllNotiReply[0].alias + ' and ' + getReply.data.getAllNotiReply[1].alias + ' replied to your comment'
                break
              case 3:
                self.state.notification_str =
                  getReply.data.getAllNotiReply[0].alias +
                  ',  ' +
                  getReply.data.getAllNotiReply[1].alias +
                  ' and ' +
                  getReply.data.getAllNotiReply[2].alias +
                  ' replied to your comment'
                break
              default:
                self.state.notification_str =
                  getReply.data.getAllNotiReply[0].alias +
                  ' and ' +
                  getReply.data.getAllNotiReplyCount[0].no_of_my_notis +
                  ' other people replied to your comment'
            }
            self.props.notification.profile_img = getReply.data.getAllNotiReply[0].profile_img
            break
          case 11:
            const getunread = await axios.get(
              `/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`
            )
            if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            const myScheduledGame2 = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)
            var myStartDateTime2 = moment(myScheduledGame2.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

            self.state.notification_str =
              'Woot! A new player joined, you need to accept their invite: ' +
              myScheduledGame2.data.getOne[0].game_name +
              '. Start date is ' +
              myStartDateTime2.format('Do MMM YY - h:mm a')
            notification.schedule_games_GUID = myScheduledGame2.data.getOne[0].schedule_games_GUID

            break
          case 16:
            const getunread2 = await axios.get(
              `/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`
            )
            if (getunread2.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
              self.state.unread = true
            }
            const getschedulegameInfo = await axios.get(
              `/api/notifications/getAllNotiScheduleGamesAttendees/${notification.schedule_games_id}`
            )

            const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)
            var myStartDateTime = moment(myScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

            switch (getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis) {
              case 1:
                self.state.notification_str =
                  'Sigh! ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].alias +
                  ' has left ' +
                  myScheduledGame.data.getOne[0].game_name +
                  '. This game is planned to start ' +
                  myStartDateTime.format('Do MMM YY - h:mm a')
                break
              case 2:
                self.state.notification_str =
                  'Sigh! ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].alias +
                  ' and ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].alias +
                  ' has left ' +
                  myScheduledGame.data.getOne[0].game_name +
                  '. This game is planned to start ' +
                  myStartDateTime.format('Do MMM YY - h:mm a')
                break
              case 3:
                self.state.notification_str =
                  'Sigh! ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].alias +
                  ',  ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[1].alias +
                  ' and ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[2].alias +
                  ' has left ' +
                  myScheduledGame.data.getOne[0].game_name +
                  '. This game is planned to start ' +
                  myStartDateTime.format('Do MMM YY - h:mm a')
                break
              default:
                self.state.notification_str =
                  'Sigh! ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].alias +
                  ' and ' +
                  getschedulegameInfo.data.getAllNotiScheduleGamesAttendeesCount[0].no_of_my_notis +
                  ' has left ' +
                  myScheduledGame.data.getOne[0].game_name +
                  '. This game is planned to start ' +
                  myStartDateTime.format('Do MMM YY - h:mm a')
            }
            self.props.notification.profile_img = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].profile_img
            break
        }
      } catch (error) {
        console.log(error)
      }
      self.forceUpdate()
    }

    const getinitialData = async function() {
      if (notification.no_of_my_notis == 1) {
        try {
          const getunread = await axios.get(`/api/notifications/getunread/${notification.post_id}/${notification.activity_type}`)

          if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
            self.state.unread = true
          }
        } catch (error) {
          console.log(error)
        }

        switch (notification.activity_type) {
          case 2:
            activity_type = 'liked your post'
            break
          case 3:
            activity_type = 'liked your comment'
            break
          case 4:
            activity_type = 'liked your reply'
            break
          case 5:
            activity_type = 'commented on your post'
            break
          case 6:
            activity_type = 'replied to your comment'
            break
        }

        self.setState({
          notification_str: notification.alias + ' ' + activity_type,
        })
      } else {
        getMoreNoti()
      }
    }

    const getschedulegameData = async function() {
      try {
        const getunread = await axios.get(
          `/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`
        )
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
          self.state.unread = true
        }

        const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)

        var myStartDateTime = moment(myScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()
        var myEndDateTime = moment(myScheduledGame.data.getOne[0].end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

        self.setState({
          notification_str:
            notification.alias +
            ' created a game - ' +
            myScheduledGame.data.getOne[0].game_name +
            ' (' +
            myStartDateTime.format('Do MMM YY - h:mm a') +
            ' - ' +
            myEndDateTime.format('Do MMM YY - h:mm a') +
            ' )',
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getGroupData = async function() {
      try {
        const getunread = await axios.get(`/api/notifications/getunread_group/${notification.group_id}/${notification.activity_type}`)
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
          self.state.unread = true
        }
        if (notification.activity_type == 12) {
          self.setState({
            notification_str: notification.name + ' - ' + notification.alias + ' wants to join this group. What ya reckon?',
          })
        } else if (notification.activity_type == 17) {
          const getGroupInfo = await axios.get(`/api/groups/${notification.group_id}`)
          self.setState({
            notification_str: 'Epic! You have been accepted to group: ' + getGroupInfo.data.group[0].name,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getGameApprovalData = async function() {
      try {
        const getunread = await axios.get(
          `/api/notifications/getunread_schedule_game/${notification.schedule_games_id}/${notification.activity_type}`
        )
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
          self.state.unread = true
        }

        const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)

        self.setState({
          notification_str:
            "Gratz! You're approved for " +
            myScheduledGame.data.getOne[0].game_name +
            ' created by ' +
            notification.alias +
            ' --- Accept Msg: ' +
            myScheduledGame.data.getOne[0].accept_msg,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getArchive_scheduled_game_Data = async function() {
      try {
        const getunread = await axios.get(
          `/api/notifications/getunread_archive_schedule_game/${notification.archive_schedule_game_id}/${notification.activity_type}`
        )
        if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
          self.state.unread = true
        }

        const myArchiveScheduledGame = await axios.get(`/api/ArchiveScheduleGame/${notification.archive_schedule_game_id}`)

        var myStartDateTime = moment(myArchiveScheduledGame.data.getOne[0].start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

        self.setState({
          notification_str:
            "Crikey mate! One of your approved game's: " +
            myArchiveScheduledGame.data.getOne[0].game_name +
            ", was deleted! :'( This game was created by " +
            notification.alias +
            '. It was meant to start: ' +
            myStartDateTime.format('Do MMM YY - h:mm a') +
            '. Their reason for cancelling was: ' +
            myArchiveScheduledGame.data.getOne[0].reason_for_cancel,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (notification.activity_type == 10) {
      getschedulegameData()
    } else if (notification.activity_type == 11 || notification.activity_type == 16) {
      getMoreNoti()
    } else if (notification.activity_type == 12 || notification.activity_type == 17) {
      getGroupData()
    } else if (notification.activity_type == 14) {
      getGameApprovalData()
    } else if (notification.activity_type == 15) {
      getArchive_scheduled_game_Data()
    } else {
      getinitialData()
    }
  }

  updateRead_Status() {
    try {
      const updateRead_Status = axios.post(
        `/api/notifications/updateRead_Status/${this.props.notification.post_id}/${this.props.notification.activity_type}`
      )
    } catch (error) {
      console.log(error)
    }
    this.state.redirect_link = 'updateRead_Status'
    this.setState({ redirect_: true })
  }

  updateRead_Status_schedule_game(str_href) {
    try {
      const updateRead_Status_schedule_game = axios.post(
        `/api/notifications/updateRead_Status_schedule_game/${this.props.notification.schedule_games_id}/${this.props.notification.activity_type}`
      )
    } catch (error) {
      console.log(error)
    }
    this.state.redirect_link = 'updateRead_Status_schedule_game'
    this.state.redirect_tmp = str_href

    this.setState({ redirect_: true })
  }

  updateRead_Status_groups() {
    try {
      const updateRead_Status_groups = axios.post(
        `/api/notifications/updateRead_Status_groups/${this.props.notification.group_id}/${this.props.notification.activity_type}/${this.props.notification.id}`
      )
    } catch (error) {
      console.log(error)
    }
    this.state.redirect_link = 'updateRead_Status_groups'
    this.setState({ redirect_: true })
  }

  updateRead_Status_archive_schedule_game() {
    try {
      const updateRead_Status_archive_schedule_game = axios.post(
        `/api/notifications/updateRead_Status_archive_schedule_game/${this.props.notification.archive_schedule_game_id}/${this.props.notification.activity_type}`
      )
    } catch (error) {
      console.log(error)
    }
    this.state.redirect_link = 'updateRead_Status_archive_schedule_game'
    this.setState({ redirect_: true })
  }

  render() {
    if (this.state.redirect_) {
      var tmp
      switch (this.state.redirect_link) {
        case 'updateRead_Status':
          tmp = `/post/${this.props.notification.post_id}`
          return <Redirect push to={tmp} />
          break
        case 'updateRead_Status_schedule_game':
          return <Redirect push to={this.state.redirect_tmp} />
          break
        case 'updateRead_Status_groups':
          tmp = `/groups/${this.props.notification.group_id}`
          return <Redirect push to={tmp} />
          break
        case 'updateRead_Status_archive_schedule_game':
          tmp = `/archived_scheduledGames/${this.props.notification.archive_schedule_game_id}`
          return <Redirect push to={tmp} />
          break
      }
    }

    let { notification, lastRow } = this.props
    var str_href

    var show_profile_img = false
    if (notification.profile_img != null) {
      show_profile_img = true
    }

    if (
      notification.activity_type == 10 ||
      notification.activity_type == 14 ||
      (notification.post_id == null && notification.activity_type != 15 && notification.group_id == null)
    ) {
      this.state.post = false
      this.state.archive_schedule_game = false
      this.state.group_post = false
      this.state.schedule_game = true
      if (notification.activity_type == 11) {
        str_href = '/scheduledGamesApprovals/' + notification.schedule_games_GUID
      } else {
        str_href = '/scheduledGames/' + notification.schedule_games_id
      }
    } else if (notification.activity_type == 12 || notification.activity_type == 17) {
      this.state.post = false
      this.state.archive_schedule_game = false
      this.state.schedule_game = false
      this.state.group_post = true
      str_href = '/groups/' + notification.group_id
    } else if (notification.activity_type == 15) {
      this.state.post = false
      this.state.group_post = false
      this.state.schedule_game = false
      this.state.archive_schedule_game = true
      str_href = `/archived_scheduledGames/${this.props.notification.archive_schedule_game_id}`
    } else {
      this.state.post = true
      this.state.group_post = false
      this.state.schedule_game = false
      this.state.archive_schedule_game = false
      str_href = '/post/' + notification.post_id
    }

    return (
      <div className='notification-info'>
        {show_profile_img && (
          <Link
            to={`/profile/${notification.id}`}
            className='user-img'
            style={{
              backgroundImage: `url('${notification.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${notification.id}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')`,
            }}></Link>
        )}

        {this.state.post && !this.state.unread && (
          <div className='user-info-read'>
            <Link to={str_href}>{this.state.notification_str}</Link>
          </div>
        )}
        {this.state.post && this.state.unread && (
          <div className='user-info-unread' onClick={() => this.updateRead_Status()}>
            {this.state.notification_str}
          </div>
        )}

        {this.state.schedule_game && !this.state.unread && (
          <div className='user-info-read'>
            <Link to={str_href}>{this.state.notification_str}</Link>
          </div>
        )}
        {this.state.schedule_game && this.state.unread && (
          <div className='user-info-unread' onClick={() => this.updateRead_Status_schedule_game(str_href)}>
            {this.state.notification_str}
          </div>
        )}

        {this.state.group_post && !this.state.unread && (
          <div className='user-info-read'>
            <Link to={str_href}>{this.state.notification_str}</Link>
          </div>
        )}
        {this.state.group_post && this.state.unread && (
          <div className='user-info-unread' onClick={() => this.updateRead_Status_groups()}>
            {this.state.notification_str}
          </div>
        )}

        {this.state.archive_schedule_game && !this.state.unread && (
          <div className='user-info-read'>
            <Link to={str_href}>{this.state.notification_str}</Link>
          </div>
        )}
        {this.state.archive_schedule_game && this.state.unread && (
          <div className='user-info-unread' onClick={() => this.updateRead_Status_archive_schedule_game()}>
            {this.state.notification_str}
          </div>
        )}

        {!lastRow && (
          <div className='line-break'>
            <hr />
          </div>
        )}
        {lastRow && <div className='last-row'></div>}
      </div>
    )
  }
}
