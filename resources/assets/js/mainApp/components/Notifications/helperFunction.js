/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import axios from 'axios'
import moment from 'moment'
import { setAsFriendRedux } from './../../../common/friend'
import { joinGameGroup } from './../../../common/group'

import { logToElasticsearch } from '../../../integration/http/logger'
import { GoogleAnalytics } from '../../../common/analytics'

export const clickedAccept_myInvitations = (invitation) => {
  try {
    axios.delete(`/api/notifications_v2/delete/${invitation.id}`)

    setAsFriendRedux(invitation.user_id)
    GoogleAnalytics.userFriendMade(invitation.user_id)
    axios.post('/api/friends/create', {
      friend_id: invitation.user_id
    })
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedAccept_createFriend:' + ' ' + error)
  }
}

export const clickedDenied_myInvitations = (invitation) => {
  try {
    axios.delete(`/api/notifications_v2/delete/${invitation.id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedDenied_myInvitations:' + ' ' + error)
  }
}

export const clickedDenied_community = (invitation) => {
  try {
    axios.delete(`/api/notifications_v2/delete_community/${invitation.id}/${invitation.group_id}/${invitation.user_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedDenied_community:' + ' ' + error)
  }
}
export const clickedAccept_community = (invitation) => {
  try {
    axios.get(`/api/usergroup/set_group_approval/${invitation.group_id}/${invitation.user_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedAccept_community:' + ' ' + error)
  }
}
export const clickedAccept_game = (invitation) => {
  try {
    axios.post('/api/attendees/update_invite/', {
      schedule_game_id: invitation.schedule_games_id,
      user_id: invitation.user_id
    })

    joinGameGroup(invitation.schedule_games_id, invitation.user_id)
    const str = invitation.alias + ' was approved'

    axios.post('/api/comments/', {
      content: str,
      schedule_games_id: invitation.schedule_games_id
    })
    GoogleAnalytics.gameAccepted()
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedAccept_/api/comments:' + ' ' + error)
  }
}
export const clickedDenied_game = (invitation) => {
  try {
    axios.get(`/api/attendees/delete_myInvite/${invitation.schedule_games_id}/${invitation.user_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedDenied_game:' + ' ' + error)
  }
}

export const mark_all = () => {
  try {
    axios.get('/api/notifications_v2/markAllNoti')
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed mark_all:' + ' ' + error)
  }
}
export const mark_read_status = (id) => {
  try {
    axios.post('/api/notifications_v2/mark_read_status', {
      id,
      read_status: 1
    })
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed mark_read_status' + ' ' + error)
  }
}
export const delete_all = () => {
  try {
    axios.get('/api/notifications_v2/deleteAllNoti')
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed delete_all:' + ' ' + error)
  }
}

export const handleSingleNotificationReadStatus = (id, status, activity_type) => {
  axios.post('/api/notifications_v2/mark_read_status', {
    id,
    read_status: status == true ? 1 : 0,
    activity_type
  })
}

export const handleTime = (time) => {
  let countdown_label = 'Days'
  let countdown = moment().diff(moment(time), 'days')
  if (countdown == 0) {
    countdown = moment().diff(moment(time), 'hours')
    countdown_label = 'Hours'
  }
  if (countdown == 0) {
    countdown = moment().diff(moment(time), 'minutes')
    countdown_label = 'Minutes'
  }
  if (countdown == 0) {
    countdown = moment().diff(moment(time), 'seconds')
    countdown_label = 'Seconds'
  }
  return {
    countdown,
    countdown_label
  }
}

export const delete_chatNotification_all = () => {
  try {
    axios.delete('/api/chat_notifications')
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed delete_chatNotification_all:' + ' ' + error)
  }
}

export const markread_chatNotification = (id) => {
  try {
    axios.put('/api/chat_notifications', { id })
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed markread_chatNotification:' + ' ' + error)
  }
}
export const deleteReportedPost = (data) => {
  try {
    axios.delete(`/api/report/delete_source/${data.report_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed deleteReportedPost:' + ' ' + error)
  }
}
export const deleteReportNotification = (data) => {
  try {
    axios.delete(`/api/report/delete/${data.report_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed deleteReportNotification:' + ' ' + error)
  }
}
export const deleteGamer = (data) => {
  try {
    axios.delete(`/api/user/delete/${data.user_id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed clickedDeleteGamer:' + ' ' + error)
  }
}
export const banGamer = (data) => {
  try {
    //axios.delete(`/api/user/delete/${data.id}`)
  } catch (error) {
    logToElasticsearch('error', 'Notification HelperFunction', 'Failed banGamer:' + ' ' + error)
  }
}
export const clicked_sonsors = (approval, id) => {
  axios.post('/api/sponsor/approval_for_sponsor', {
    id,
    approval
  })
}
