import axios from 'axios'
import moment from 'moment'
import { setAsFriendRedux } from './../../../common/friend'
import { joinGameGroup } from './../../../common/game'
export const clickedAccept_myInvitations = (invitation) => {
  try {
    const deleteNoti = axios.get(`/api/notifications_v2/delete/${invitation.id}`)
  } catch (error) {
    console.log(error)
  }

  try {
    setAsFriendRedux(invitation.user_id)
    const createFriend = axios.post('/api/friends/create', {
      friend_id: invitation.user_id,
    })
  } catch (error) {
    console.log(error)
  }
}

export const clickedDenied_myInvitations = (invitation) => {
  try {
    const deleteNoti = axios.get(`/api/notifications_v2/delete/${invitation.id}`)
  } catch (error) {
    console.log(error)
  }
}

export const clickedDenied_community = (invitation) => {
  try {
    const deleteRegistration = axios.get(`/api/usergroup/delete/${invitation.id}`)
  } catch (error) {
    console.log(error)
  }
}
export const clickedAccept_community = (invitation) => {
  try {
    const set_group_approval = axios.get(`/api/usergroup/set_group_approval/${invitation.group_id}/${invitation.user_id}`)
  } catch (error) {
    console.log(error)
  }
}
export const clickedAccept_game = (invitation) => {
  try {
    const accepted_invite = axios.post('/api/attendees/update_invite/', {
      schedule_game_id: invitation.schedule_games_id,
      user_id: invitation.user_id,
    })

    joinGameGroup(invitation.schedule_games_id, invitation.user_id)

    const str = invitation.alias + ' was approved'

    const post = axios.post('/api/comments/', {
      content: str,
      schedule_games_id: invitation.schedule_games_id,
    })
  } catch (error) {
    console.log(error)
  }
}
export const clickedDenied_game = (invitation) => {
  try {
    const deleteInvite = axios.get(`/api/attendees/delete_myInvite/${invitation.schedule_games_id}/${invitation.user_id}`)
  } catch (error) {
    console.log(error)
  }
}

export const mark_all = () => {
  try {
    const mark_all = axios.get('/api/notifications/markAllNoti')
  } catch (error) {
    console.log(error)
  }
}
export const delete_all = () => {
  try {
    const delete_all = axios.get('/api/notifications/deleteAllNoti')
  } catch (error) {
    console.log(error)
  }
}

export const handleSingleNotificationReadStatus = (id) => {
  const readstatus = axios.post('/api/comments/', {
    id,
    read_status: 1,
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
    countdown_label,
  }
}

export const delete_chatNotification_all = () => {
  try {
    const delete_all = axios.delete('/api/chat_notifications')
  } catch (error) {
    console.log(error)
  }
}

export const markread_chatNotification = (id) => {
  try {
    const read_all = axios.put('/api/chat_notifications', {})
  } catch (error) {
    console.log(error)
  }
}
