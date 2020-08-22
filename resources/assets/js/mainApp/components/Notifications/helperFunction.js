import axios from 'axios'
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
    const deleteNoti = axios.get(`/api/notifications/delete/${invitation.id}`)
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
