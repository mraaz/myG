import React, { Component } from 'react'
import Select from 'react-select'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { setAsFriendRedux } from '../../common/friend'
import { logToElasticsearch } from '../../integration/http/logger'
import { GoogleAnalytics } from '../../common/analytics'

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
      chat: null,
      redirect_: false,
      redirect_link: '',
      redirect_tmp: ''
    }
  }

  clickedAccept = () => {
    let { notification } = this.props
    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch (error) {
      logToElasticsearch('error', 'IndividualNotification', 'Failed clickedAccept_1:' + ' ' + error)
    }

    try {
      setAsFriendRedux(notification.user_id)
      GoogleAnalytics.userFriendMade(notification.user_id)
      const createFriend = axios.post('/api/friends/create', {
        friend_id: notification.user_id
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualNotification', 'Failed clickedAccept_2:' + ' ' + error)
    }

    this.setState({
      actionClicked: false,
      actionClickedAccept: true
    })
  }

  clickedDenied = () => {
    let { notification } = this.props
    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${notification.id}`)
    } catch (error) {
      logToElasticsearch('error', 'IndividualNotification', 'Failed clickedDenied:' + ' ' + error)
    }
    this.setState({
      actionClicked: false,
      actionClickedDeny: true
    })
  }

  acceptGroupInvite = () => {
    if (!this.state.chat) return
    const contacts = [this.props.userId]
    axios.put(`/api/chat/${this.state.chat.chatId}/contacts`, { contacts }).then(() => {
      axios.get(`/api/notifications/delete/${this.props.notification.notificationId}`)
      this.setState({ chat: null })
    })
  }

  componentDidMount() {
    const self = this
    let { notification } = this.props
    var activity_type
    var tmpStr = ''

    const getMoreNoti = async function () {
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
            if (notification.read_status == 0) {
              self.state.unread = true
            }

            var myStartDateTime2 = moment(notification.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

            self.state.notification_str =
              'Woot! A new player joined, you need to accept their invite: ' +
              notification.game_name +
              '. Start date is ' +
              myStartDateTime2.format('Do MMM YY - h:mm a')

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
                  ' gamers has left ' +
                  myScheduledGame.data.getOne[0].game_name +
                  '. This game is planned to start ' +
                  myStartDateTime.format('Do MMM YY - h:mm a')
            }
            self.props.notification.profile_img = getschedulegameInfo.data.getAllNotiScheduleGamesAttendees[0].profile_img
            break
        }
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getMoreNoti:' + ' ' + error)
      }
      self.forceUpdate()
    }

    const getinitialData = async function () {
      if (notification.no_of_my_notis == 1) {
        try {
          const getunread = await axios.get(`/api/notifications/getunread/${notification.post_id}/${notification.activity_type}`)

          if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
            self.state.unread = true
          }
        } catch (error) {
          logToElasticsearch('error', 'IndividualNotification', 'Failed getinitialData:' + ' ' + error)
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
          notification_str: notification.alias + ' ' + activity_type
        })
      } else {
        getMoreNoti()
      }
    }

    const getschedulegameData = async function () {
      try {
        if (notification.read_status == 0) {
          self.state.unread = true
        }

        let myStartDateTime = moment(notification.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()
        let myEndDateTime = moment(notification.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

        self.setState({
          notification_str:
            notification.alias +
            ' created a game - ' +
            notification.game_name +
            ' (' +
            myStartDateTime.format('Do MMM YY - h:mm a') +
            ' - ' +
            myEndDateTime.format('Do MMM YY - h:mm a') +
            ' )'
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getschedulegameData:' + ' ' + error)
      }
    }

    const getGroupData = async function () {
      try {
        if (notification.read_status == 0) {
          self.state.unread = true
        }

        if (notification.activity_type == 12) {
          self.setState({
            notification_str: notification.name + ' - ' + notification.alias + ' wants to join this group. What ya reckon?'
          })
        } else if (notification.activity_type == 17) {
          //const getGroupInfo = await axios.get(`/api/groups/${notification.group_id}`)
          self.setState({
            notification_str: 'Epic! You have been accepted to group: ' + notification.name
          })
        }
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getGroupData:' + ' ' + error)
      }
    }

    const getGameApprovalData = async function () {
      try {
        if (notification.read_status == 0) {
          self.state.unread = true
        }

        //const myScheduledGame = await axios.get(`/api/ScheduleGame/${notification.schedule_games_id}`)

        self.setState({
          notification_str:
            "Gratz! You're approved for " +
            notification.game_name +
            ' created by ' +
            notification.alias +
            ' --- Accept Msg: ' +
            notification.accept_msg
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getGameApprovalData:' + ' ' + error)
      }
    }

    const getArchive_scheduled_game_Data = async function () {
      try {
        // const getunread = await axios.get(
        //   `/api/notifications/getunread_archive_schedule_game/${notification.archive_schedule_game_id}/${notification.activity_type}`
        // )
        // if (getunread.data.getAllNotiReplyCount_unreadCount[0].no_of_my_unread > 0) {
        //   self.state.unread = true
        // }

        if (notification.read_status == 0) {
          self.state.unread = true
        }

        //const myArchiveScheduledGame = await axios.get(`/api/ArchiveScheduleGame/${notification.archive_schedule_game_id}`)

        var myStartDateTime = moment(notification.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

        self.setState({
          notification_str:
            "Crikey mate! One of your approved game's: " +
            notification.game_name +
            ", was deleted! :'( This game was created by " +
            notification.alias +
            '. It was meant to start: ' +
            myStartDateTime.format('Do MMM YY - h:mm a') +
            '. Their reason for cancelling was: ' +
            notification.reason_for_cancel
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getArchive_scheduled_game_Data:' + ' ' + error)
      }
    }

    const getGroupInvitationData = async () => {
      const { chat } = await axios.get(`/api/chat/${notification.chat_id}/info`).then((response) => response.data)
      let notification_str = 'Something went wrong :('
      if (chat) notification_str = `${notification.alias} has invited you to join his Chat Group ${chat.title}!`
      this.setState({ chat, notification_str })
    }

    const getGroupKickedData = async function () {
      try {
        if (notification.read_status == 0) {
          self.state.unread = true
        }
        //const groupInfo = await axios.get(`/api/groups/${notification.group_id}`)

        self.setState({
          notification_str: 'Sorry mate! You were kicked from this community: ' + notification.name
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getGroupKickedData:' + ' ' + error)
      }
    }

    const getDingInfo = async function () {
      try {
        if (notification.read_status == 0) {
          self.state.unread = true
        }

        self.setState({
          notification_str: 'Ding! Congratz, you reached a new level!'
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualNotification', 'Failed getDingInfo:' + ' ' + error)
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
    } else if (notification.activity_type === 18) {
      getGroupInvitationData()
    } else if (notification.activity_type === 19) {
      getGroupKickedData()
    } else if (notification.activity_type === 20) {
      getDingInfo()
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
      logToElasticsearch('error', 'IndividualNotification', 'Failed updateRead_Status:' + ' ' + error)
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
      logToElasticsearch('error', 'IndividualNotification', 'Failed updateRead_Status_schedule_game:' + ' ' + error)
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
      logToElasticsearch('error', 'IndividualNotification', 'Failed updateRead_Status_groups:' + ' ' + error)
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
      logToElasticsearch('error', 'IndividualNotification', 'Failed updateRead_Status_archive_schedule_game:' + ' ' + error)
    }
    this.state.redirect_link = 'updateRead_Status_archive_schedule_game'
    this.setState({ redirect_: true })
  }

  updateRead_Status_ding() {
    try {
      const updateRead_Status_ding = axios.post('/api/notifications/updateRead_Status_ding/')
    } catch (error) {
      logToElasticsearch('error', 'IndividualNotification', 'Failed updateRead_Status_ding:' + ' ' + error)
    }
    this.state.redirect_link = 'updateRead_Status_ding'
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
        case 'updateRead_Status_ding':
          tmp = '/'
          return <Redirect push to={tmp} />
          break
      }
    }

    let { notification, lastRow } = this.props
    var str_href

    if (notification.activity_type === 18 && !this.state.chat) return null

    var show_profile_img = false
    if (notification.profile_img != null) {
      show_profile_img = true
    }

    if (
      notification.activity_type == 10 ||
      notification.activity_type == 14 ||
      (notification.post_id == null &&
        notification.activity_type != 15 &&
        notification.activity_type != 18 &&
        notification.activity_type != 20 &&
        notification.group_id == null)
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
    } else if (notification.activity_type == 12 || notification.activity_type == 17 || notification.activity_type == 19) {
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
    } else if (notification.activity_type == 20) {
      this.state.post = false
      this.state.group_post = false
      this.state.schedule_game = false
      this.state.archive_schedule_game = false
      str_href = '/'
    } else if (notification.activity_type !== 18) {
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
            to={`/profile/${notification.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('${notification.profile_img}')`
            }}
          ></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${notification.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://myG.gg/default_user/new-user-profile-picture.png')`
            }}
          ></Link>
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
        {notification.activity_type === 18 && (
          <div className='group-invitation'>
            {this.state.notification_str}
            <div className='group-invitation-button clickable' onClick={this.acceptGroupInvite}>
              Accept
            </div>
          </div>
        )}

        {notification.activity_type === 20 && !this.state.unread && (
          <div className='user-info-read'>
            <Link to={str_href}>{this.state.notification_str}</Link>
          </div>
        )}

        {notification.activity_type === 20 && this.state.unread && (
          <div className='user-info-unread' onClick={() => this.updateRead_Status_ding()}>
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
