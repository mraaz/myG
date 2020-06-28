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
            'notifications.created_at',
            'notifications.read_status'
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
            'schedule_games.schedule_games_GUID',
            'game_names.game_name',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id',
            'notifications.id',
            'notifications.created_at',
            'notifications.read_status'
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
            'notifications.read_status',
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
  async notify_owner_new_grp_request({ auth }, grp_id) {
    if (auth.user) {
      try {
        const getOwner = await Database.from('groups')
          .where({ id: grp_id })
          .select('user_id')
          .first()

        const addGroup = await Notification.create({
          other_user_id: getOwner.user_id,
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
  async new_grp_request({ auth }, grp_id) {
    if (auth.user) {
      try {
        let mygroups
        const getAccept = await Database.from('groups')
          .where({ id: grp_id })
          .select('all_accept')
          .first()
        if (getAccept.all_accept) {
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

  async getAllNotifications({ auth, request, response }) {
    var set_limit = 10
    try {
      const allMylike_posts = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 2 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const allMylike_comments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 3 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const allMylike_replies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 4 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const allMycomments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 5 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const allMyreplies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 6 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const allMyschedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where({ other_user_id: auth.user.id, activity_type: 10 })
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at',
          'notifications.read_status',
          'schedule_games.start_date_time',
          'schedule_games.end_date_time',
          'game_names.game_name'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)

      const myschedulegames_approvals = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where({ other_user_id: auth.user.id, activity_type: 14 })
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.read_status',
          'notifications.created_at',
          'game_names.game_name',
          'schedule_games.accept_msg'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)

      const allMyarchived_schedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('archive_schedule_games', 'archive_schedule_games.archive_schedule_game_id', 'notifications.schedule_games_id')
        .innerJoin('game_names', 'game_names.id', 'archive_schedule_games.game_names_id')
        .where({ other_user_id: auth.user.id, activity_type: 15 })
        .select(
          'notifications.archive_schedule_game_id',
          'notifications.activity_type',
          'notifications.read_status',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'game_names.game_name',
          'archive_schedule_games.start_date_time',
          'archive_schedule_games.reason_for_cancel',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const dropped_out_attendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where({ other_user_id: auth.user.id, activity_type: 16 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'schedule_games.start_date_time',
          'schedule_games.end_date_time',
          'game_names.game_name',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const group_member_approved = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('groups', 'groups.id', 'notifications.group_id')
        .where({ other_user_id: auth.user.id, activity_type: 17 })
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at',
          'groups.name',
          'notifications.read_status'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const chat_group_invite = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 18 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.id as notificationId',
          'notifications.group_id',
          'notifications.activity_type',
          'notifications.chat_id',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const group_member_kicked = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('groups', 'groups.id', 'notifications.group_id')
        .where({ other_user_id: auth.user.id, activity_type: 19 })
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at',
          'groups.name',
          'notifications.read_status'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)
      const user_ding = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 20 })
        .select(
          'notifications.activity_type',
          'users.alias',
          'users.profile_img',
          'users.id',
          'notifications.created_at',
          'notifications.read_status'
        )
        .orderBy('notifications.created_at', 'desc')
        .paginate(request.input('counter'), set_limit)

      var singleArr = [
        ...allMylike_posts.data,
        ...allMylike_comments.data,
        ...allMylike_replies.data,
        ...allMycomments.data,
        ...allMyreplies.data,
        ...allMyschedulegames.data,
        ...myschedulegames_approvals.data,
        ...allMyarchived_schedulegames.data,
        ...dropped_out_attendees.data,
        ...group_member_approved.data,
        ...group_member_kicked.data,
        ...chat_group_invite.data,
        ...user_ding.data,
      ]

      if (singleArr.length == 0) {
        return singleArr
      } else {
        return (singleArr = mergeSort(singleArr))
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addGameApproved({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        const addGameApproved = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 14,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async markAllNoti({ auth, request, response }) {
    try {
      const markAllNoti = await Notification.query()
        .where({ other_user_id: auth.user.id })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 19, 20])
        .update({ read_status: 1 })
      return 'Saved successfully'
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllNoti({ auth, request, response }) {
    try {
      const deleteAllNoti = await Database.table('notifications')
        .where({
          other_user_id: auth.user.id,
        })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20])
        .delete()

      return 'Saved successfully'
    } catch (error) {
      console.log(error)
    }
  }

  async addScheduleGame_attendance({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        const addScheduleGame_attendance = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 11,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async remove_schedule_game_attendees({ auth }, schedule_games_id) {
    if (auth.user) {
      try {
        const remove_schedule_game_attendees = await Database.table('notifications')
          .where({
            schedule_games_id: schedule_games_id,
            activity_type: 11,
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
  async add_approved_attendee_left({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        const add_approved_attendee_left = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 16,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addComment({ auth }, post_id, other_user_id, comment_id) {
    if (auth.user) {
      try {
        const addComment = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 5,
          post_id: post_id,
          comment_id: comment_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addReply({ auth }, post_id, other_user_id, reply_id) {
    if (auth.user) {
      try {
        const addReply = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 6,
          post_id: post_id,
          reply_id: reply_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addCommentLike({ auth }, post_id, other_user_id, comment_id, schedule_games_id) {
    if (auth.user) {
      try {
        const addCommentLike = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 3,
          post_id: post_id,
          comment_id: comment_id,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deleteCommentLike({ auth }, comment_id) {
    if (auth.user) {
      try {
        const deleteCommentLike = await Database.table('notifications')
          .where({
            comment_id: comment_id,
            user_id: auth.user.id,
            activity_type: 3,
          })
          .delete()

        return deleteCommentLike
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addReplyLike({ auth }, post_id, other_user_id, reply_id, schedule_games_id) {
    if (auth.user) {
      try {
        const addReplyLike = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 4,
          post_id: post_id,
          reply_id: reply_id,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deleteReplyLike({ auth }, reply_id) {
    if (auth.user) {
      try {
        const deleteReplyLike = await Database.table('notifications')
          .where({
            reply_id: reply_id,
            user_id: auth.user.id,
            activity_type: 4,
          })
          .delete()

        return deleteReplyLike
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addPostLike({ auth }, post_id, other_user_id) {
    if (auth.user) {
      try {
        const addPostLike = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 2,
          post_id: post_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deletePostLike({ auth }, post_id) {
    if (auth.user) {
      try {
        const deletePostLike = await Database.table('notifications')
          .where({
            post_id: post_id,
            user_id: auth.user.id,
            activity_type: 2,
          })
          .delete()

        return deletePostLike
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = NotificationController_v2
