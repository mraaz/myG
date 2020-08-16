'use strict'

const Notification = use('App/Models/Notification')
const Database = use('Database')
const ScheduleGameController = use('./ScheduleGameController')
const LoggingRepository = require('../../Repositories/Logging')

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
    let set_limit = 18,
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
            'users.id as user_id',
            'notifications.id',
            'notifications.created_at',
            'notifications.read_status'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)
        singleArr.push(...allMyFriends.data)
      }
      if (request.input('activity_type') == 0 || request.input('activity_type') == 11) {
        let myschedulegames_attendees = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
          .innerJoin('game_names', 'schedule_games.game_names_id', 'game_names.id')
          .where({ other_user_id: auth.user.id, activity_type: 11 })
          .select(
            'schedule_games.start_date_time',
            'schedule_games.id as schedule_games_id',
            'schedule_games.schedule_games_GUID',
            'game_names.game_name',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id as user_id',
            'notifications.id',
            'notifications.created_at',
            'notifications.read_status'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        let memorise = []

        let scheduleGameController = new ScheduleGameController()
        for (var i = 0; i < myschedulegames_attendees.data.length; i++) {
          if (memorise[myschedulegames_attendees.data[i].schedule_games_id] == undefined) {
            const more_fields = await scheduleGameController.get_labels_for_game_fields(
              { auth },
              myschedulegames_attendees.data[i].schedule_games_id
            )
            if (more_fields != undefined) {
              memorise[myschedulegames_attendees.data[i].schedule_games_id] = more_fields.obj
            }
          }

          let _attendees = await Database.from('attendees')
            .where({ schedule_games_id: myschedulegames_attendees.data[i].schedule_games_id })
            .first()

          if (_attendees != undefined) {
            for (let key in memorise[myschedulegames_attendees.data[i].schedule_games_id]) {
              switch (key) {
                case 'value_one':
                  myschedulegames_attendees.data[i].value_one = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_one,
                  }
                  break
                case 'value_two':
                  myschedulegames_attendees.data[i].value_two = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_two,
                  }
                  break
                case 'value_three':
                  myschedulegames_attendees.data[i].value_three = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_three,
                  }
                  break
                case 'value_four':
                  myschedulegames_attendees.data[i].value_four = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_four,
                  }
                  break
                case 'value_five':
                  myschedulegames_attendees.data[i].value_five = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_five,
                  }
                  break
                default:
              }
            }
          }
        }

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
            'users.id as user_id',
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async getAllNotifications({ auth, request, response }) {
    let set_limit = 10,
      singleArr = []

    try {
      if (
        request.input('activity_type') == 0 ||
        request.input('activity_type') == 2 ||
        request.input('activity_type') == 3 ||
        request.input('activity_type') == 4 ||
        request.input('activity_type') == 5
      ) {
        let arr = []
        switch (request.input('activity_type')) {
          case '0':
            arr = [2, 3, 4]
            break
          default:
            arr.push(parseInt(request.input('activity_type')))
            break
        }
        let allMylike_posts = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', arr)
          .groupBy('notifications.post_id')
          .select('notifications.post_id', 'notifications.created_at', 'notifications.activity_type')
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        allMylike_posts = allMylike_posts.data

        for (let i = 0; i < allMylike_posts.length; i++) {
          const first_two_users = await Database.from('notifications')
            .innerJoin('users', 'users.id', 'notifications.user_id')
            .where({ post_id: allMylike_posts[i].post_id, other_user_id: auth.user.id })
            .whereIn('activity_type', arr)
            .select('users.alias')
            .orderBy('notifications.created_at', 'desc')
            .limit(2)
          const total_post_count = await Database.from('notifications')
            .innerJoin('users', 'users.id', 'notifications.user_id')
            .where({ post_id: allMylike_posts[i].post_id, other_user_id: auth.user.id })
            .whereIn('activity_type', arr)
            .count('* as no_of_my_notis')
          const getAllNotiLike_unreadCount = await Database.from('notifications')
            .innerJoin('users', 'users.id', 'notifications.user_id')
            .where({ post_id: allMylike_posts[i].post_id, read_status: 0, other_user_id: auth.user.id })
            .whereIn('activity_type', arr)
            .count('* as no_of_my_unread')

          if (first_two_users.length == 2) {
            allMylike_posts[i].first_user = first_two_users[0].alias
            allMylike_posts[i].second_user = first_two_users[1].alias
          } else if (first_two_users.length == 1) {
            allMylike_posts[i].first_user = first_two_users[0].alias
            allMylike_posts[i].second_user = null
          } else {
            allMylike_posts[i].first_user = null
            allMylike_posts[i].second_user = null
          }

          allMylike_posts[i].total_post_count = total_post_count[0].no_of_my_notis > 0 ? total_post_count[0].no_of_my_notis : 0
          allMylike_posts[i].read = getAllNotiLike_unreadCount[0].no_of_my_unread > 0 ? false : true
        }

        singleArr.push(...allMylike_posts)
      }

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
      const schedule_games_attendees_notify_only = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 21 })
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

      // var singleArr = [
      //   ...allMylike_posts.data,
      //   ...allMylike_comments.data,
      //   ...allMylike_replies.data,
      //   ...allMycomments.data,
      //   ...allMyreplies.data,
      //   ...allMyschedulegames.data,
      //   ...myschedulegames_approvals.data,
      //   ...allMyarchived_schedulegames.data,
      //   ...dropped_out_attendees.data,
      //   ...group_member_approved.data,
      //   ...group_member_kicked.data,
      //   ...chat_group_invite.data,
      //   ...user_ding.data,
      //   ...schedule_games_attendees_notify_only.data,
      // ]

      if (singleArr.length == 0) {
        return singleArr
      } else {
        return (singleArr = mergeSort(singleArr))
      }
    } catch (error) {
      console.log(error)
      // LoggingRepository.log({
      //   environment: process.env.NODE_ENV,
      //   type: 'error',
      //   source: 'backend',
      //   context: __filename,
      //   message: (error && error.message) || error,
      // })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async markAllNoti({ auth, request, response }) {
    try {
      const markAllNoti = await Notification.query()
        .where({ other_user_id: auth.user.id })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 19, 20, 21])
        .update({ read_status: 1 })
      return 'Saved successfully'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async deleteAllNoti({ auth, request, response }) {
    try {
      const deleteAllNoti = await Database.table('notifications')
        .where({
          other_user_id: auth.user.id,
        })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21])
        .delete()

      return 'Saved successfully'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async addScheduleGame_attendance({ auth }, schedule_games_id, other_user_id, activity_type) {
    if (auth.user) {
      try {
        const addScheduleGame_attendance = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: activity_type,
          schedule_games_id: schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async remove_schedule_game_attendees({ auth }, schedule_games_id, activity_type) {
    if (auth.user) {
      try {
        const remove_schedule_game_attendees = await Database.table('notifications')
          .where({
            schedule_games_id: schedule_games_id,
            activity_type: activity_type,
          })
          .delete()

        return 'Deleted'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = NotificationController_v2
