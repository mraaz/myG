'use strict'

const Notification = use('App/Models/Notification')
const Database = use('Database')

// Split the array into halves and merge them recursively
function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(mergeSort(left), mergeSort(right))
}

// compare the arrays item by item and return the concatenated result
function merge(left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].created_at > right[indexRight].created_at) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

class NotificationController_v2 {
  async getApprovals_Dashboard({ auth, request, response }) {
    //Return results for Activity_type: 1, 11, 12
    let set_limit = 10,
      singleArr = []
    try {
      if (request.input('activity_type') == 0 || request.input('activity_type') == 1) {
        const allMyFriends = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .where({ other_user_id: auth.user.id, activity_type: 1 })
          .select(
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id',
            'notifications.id',
            'notifications.created_at'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)
        singleArr.push(...allMyFriends.data)
      }
      if (request.input('activity_type') == 0 || request.input('activity_type') == 11) {
        const myschedulegames_attendees = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
          .innerJoin('game_names', 'schedule_games.game_names_id', 'game_names.id')
          .where({ other_user_id: auth.user.id, activity_type: 11 })
          .select(
            'schedule_games.start_date_time',
            'schedule_games.id',
            'game_names.game_name',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id',
            'notifications.id',
            'notifications.created_at'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        singleArr.push(...myschedulegames_attendees.data)
      }

      if (request.input('activity_type') == 0 || request.input('activity_type') == 12) {
        const mygroups = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('groups', 'groups.id', 'notifications.group_id')
          .where({ other_user_id: auth.user.id, activity_type: 12 })
          .select(
            'notifications.group_id',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id',
            'notifications.created_at',
            'notifications.id',
            'groups.name'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        singleArr.push(...mygroups.data)
      }

      if (singleArr.length == 0) {
        return singleArr
      } else {
        return (singleArr = mergeSort(singleArr))
      }
    } catch (error) {
      console.log(error)
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            id: request.params.id,
          })
          .delete()

        return 'Deleted'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  //Notify Owner there is a new request to join this group
  async notify_owner_new_grp_request({ auth }, grp_owner, grp_id) {
    if (auth.user) {
      try {
        const addGroup = await Notification.create({
          other_user_id: grp_owner,
          user_id: auth.user.id,
          activity_type: 12,
          group_id: grp_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  //Notify all groupies there is a new request to join this group
  async new_grp_request({ auth }, grp_id, all_accept) {
    if (auth.user) {
      try {
        let mygroups
        if (all_accept) {
          mygroups = await Database.from('usergroups')
            .where({ group_id: grp_id })
            .whereNot({ permission_level: 42 })
        } else {
          mygroups = await Database.from('usergroups')
            .where({ group_id: grp_id, permission_level: 1 })
            .orWhere({ group_id: grp_id, permission_level: 2 })
        }

        for (var i = 0; i < mygroups.length; i++) {
          const add_all_to_Group = await Notification.create({
            other_user_id: mygroups[i].user_id,
            user_id: auth.user.id,
            activity_type: 12,
            group_id: grp_id,
          })
        }

        return 'Saved'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async delete_group_invites({ auth }, grp_id) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            group_id: grp_id,
            user_id: auth.user.id,
            activity_type: 12,
          })
          .delete()

        return 'deleted'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async add_approved_group_attendee({ auth }, grp_id, other_user_id) {
    if (auth.user) {
      try {
        const add_approved_group_attendee = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 17,
          group_id: grp_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = NotificationController_v2
