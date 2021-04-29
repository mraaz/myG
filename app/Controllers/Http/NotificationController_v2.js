'use strict'

const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')

const Database = use('Database')

const ScheduleGameController = use('./ScheduleGameController')
const NotificationsRepository = require('../../Repositories/Notifications')
const LoggingRepository = require('../../Repositories/Logging')

const ChatRepository = require('../../Repositories/Chat')
const { formatDateTimeFromNow } = require('../../Common/date')

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
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_one
                  }
                  break
                case 'value_two':
                  myschedulegames_attendees.data[i].value_two = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_two
                  }
                  break
                case 'value_three':
                  myschedulegames_attendees.data[i].value_three = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_three
                  }
                  break
                case 'value_four':
                  myschedulegames_attendees.data[i].value_four = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_four
                  }
                  break
                case 'value_five':
                  myschedulegames_attendees.data[i].value_five = {
                    [memorise[myschedulegames_attendees.data[i].schedule_games_id][key]]: _attendees.value_five
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
        message: (error && error.message) || error
      })
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            id: request.params.id
          })
          .delete()

        return 'Deleted'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
        const getOwner = await Database.from('groups').where({ id: grp_id }).select('user_id').first()
        const addGroup = await Notification.create({
          other_user_id: getOwner.user_id,
          user_id: auth.user.id,
          activity_type: 12,
          group_id: grp_id
        })
        const userId = getOwner.user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
        const getAccept = await Database.from('groups').where({ id: grp_id }).select('all_accept').first()
        if (getAccept.all_accept) {
          mygroups = await Database.from('usergroups').where({ group_id: grp_id }).whereNot({ permission_level: 42 })
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
            group_id: grp_id
          })
          const userId = mygroups[i].user_id
          const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
          await ChatRepository.publishNotifications({ userId, notifications })
        }
        return 'Saved'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async delete_group_invites({ auth }, grp_id, workAround) {
    let tmpWorkAround

    if (auth == undefined) tmpWorkAround = workAround
    else tmpWorkAround = auth.user.id

    try {
      const delete_noti = await Database.table('notifications')
        .where({
          group_id: grp_id,
          user_id: tmpWorkAround,
          activity_type: 12
        })
        .delete()

      return 'deleted'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async add_approved_group_attendee({ auth }, grp_id, other_user_id) {
    console.log(auth, '<<<AUTH')
    if (auth.user) {
      try {
        const add_approved_group_attendee = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 17,
          group_id: grp_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async getAllNotifications({ auth, request, response }) {
    // P.S 7, 8 & 9 don't exist, just have them as placeholder atm.
    // Activity_types:
    // Feed = -1
    // Games: 10
    // Misc: -2
    // Get ALL: 0

    //https://trello.com/c/kfr5Kyq7/3-alerts

    let set_limit = 10,
      singleArr = [],
      first_two_users

    try {
      if (
        request.input('activity_type') == 0 ||
        request.input('activity_type') == -1 ||
        request.input('activity_type') == 2 ||
        request.input('activity_type') == 3 ||
        request.input('activity_type') == 4 ||
        request.input('activity_type') == 5 ||
        request.input('activity_type') == 6
      ) {
        let arr = []
        switch (request.input('activity_type')) {
          case 0:
            arr = [2, 3, 4, 5, 6]
            break
          case -1:
            arr = [2, 3, 4, 5, 6]
            break
          default:
            arr.push(parseInt(request.input('activity_type')))
            break
        }
        let allMylike_posts = await Database.from('notifications')
          //.innerJoin('users', 'users.id', 'notifications.user_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', arr)
          .groupBy('notifications.activity_type', 'notifications.post_id')
          .select('notifications.id', 'notifications.post_id', 'notifications.created_at', 'notifications.activity_type')
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        allMylike_posts = allMylike_posts.data

        for (let i = 0; i < allMylike_posts.length; i++) {
          first_two_users = await Database.from('notifications')
            .innerJoin('users', 'users.id', 'notifications.user_id')
            .where({ post_id: allMylike_posts[i].post_id, other_user_id: auth.user.id })
            .where('activity_type', allMylike_posts[i].activity_type)
            .select('users.alias', 'users.profile_img')
            .orderBy('notifications.created_at', 'desc')
            .limit(2)

          const total_post_count = await Database.from('notifications')
            .where({ post_id: allMylike_posts[i].post_id, other_user_id: auth.user.id })
            .where('activity_type', allMylike_posts[i].activity_type)
            .count('* as no_of_my_notis')

          const getAllNotiLike_unreadCount = await Database.from('notifications')
            .where({ post_id: allMylike_posts[i].post_id, read_status: 0, other_user_id: auth.user.id })
            .where('activity_type', allMylike_posts[i].activity_type)
            .count('* as no_of_my_unread')

          if (first_two_users != undefined) {
            if (first_two_users.length == 2) {
              allMylike_posts[i].first_user_alias = first_two_users[0].alias
              allMylike_posts[i].first_user_profile_img = first_two_users[0].profile_img
              allMylike_posts[i].second_user_alias = first_two_users[1].alias
            } else if (first_two_users.length == 1) {
              allMylike_posts[i].first_user_alias = first_two_users[0].alias
              allMylike_posts[i].first_user_profile_img = first_two_users[0].profile_img
              allMylike_posts[i].second_user = null
            } else {
              allMylike_posts[i].first_user_alias = null
              allMylike_posts[i].second_user_alias = null
            }
          } else {
            allMylike_posts[i].first_user_alias = null
            allMylike_posts[i].second_user_alias = null
          }

          allMylike_posts[i].total_post_count = total_post_count[0].no_of_my_notis > 0 ? total_post_count[0].no_of_my_notis : 0
          allMylike_posts[i].read_status = getAllNotiLike_unreadCount[0].no_of_my_unread > 0 ? 0 : 1
        }

        singleArr.push(...allMylike_posts)
      }

      if (
        request.input('activity_type') == 0 ||
        request.input('activity_type') == 10 ||
        request.input('activity_type') == 14 ||
        request.input('activity_type') == 15 ||
        request.input('activity_type') == 21
      ) {
        let arr = []
        switch (request.input('activity_type')) {
          case 0:
            arr = [10, 14, 15, 21]
            break
          case 10:
            arr = [10, 14, 15, 21]
            break
          default:
            arr.push(parseInt(request.input('activity_type')))
            break
        }
        const allMyschedulegames = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('schedule_games', 'schedule_games.id', 'notifications.schedule_games_id')
          .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', arr)
          .select(
            'notifications.schedule_games_id',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'notifications.created_at',
            'notifications.read_status',
            'schedule_games.start_date_time',
            'schedule_games.schedule_games_GUID',
            'schedule_games.reason_for_deletion',
            'game_names.game_name',
            'notifications.id'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        singleArr.push(...allMyschedulegames.data)
      }

      if (request.input('activity_type') == 0 || request.input('activity_type') == 10 || request.input('activity_type') == 22) {
        const allMyschedulegames = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('groups', 'groups.id', 'notifications.group_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', [19, 22])
          .select(
            'groups.name',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'notifications.created_at',
            'notifications.read_status',
            'notifications.id'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        singleArr.push(...allMyschedulegames.data)
      }

      //We don't have a screen just for this activity_type so 10 is the reason
      if (request.input('activity_type') == 0 || request.input('activity_type') == 10 || request.input('activity_type') == 16) {
        let dropped_out_attendees = await Database.from('notifications')
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
            'schedule_games.start_date_time',
            'schedule_games.end_date_time',
            'schedule_games.schedule_games_GUID',
            'game_names.game_name',
            'notifications.created_at',
            'notifications.id'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        dropped_out_attendees = dropped_out_attendees.data

        for (let i = 0; i < dropped_out_attendees.length; i++) {
          const first_three_users = await Database.from('notifications')
            .innerJoin('users', 'users.id', 'notifications.user_id')
            .where({ schedule_games_id: dropped_out_attendees[i].schedule_games_id, other_user_id: auth.user.id, activity_type: 16 })
            .select('users.alias', 'users.profile_img')
            .orderBy('notifications.created_at', 'desc')
            .limit(3)
          const total_post_count = await Database.from('notifications')
            .where({ schedule_games_id: dropped_out_attendees[i].schedule_games_id, other_user_id: auth.user.id, activity_type: 16 })
            .count('* as no_of_my_notis')
          const getAllNotiLike_unreadCount = await Database.from('notifications')
            .where({
              schedule_games_id: dropped_out_attendees[i].schedule_games_id,
              read_status: 0,
              other_user_id: auth.user.id,
              activity_type: 16
            })
            .count('* as no_of_my_unread')
          if (first_three_users != undefined) {
            if (first_three_users.length == 3) {
              dropped_out_attendees[i].first_user_alias = first_three_users[0].alias
              dropped_out_attendees[i].first_user_profile_img = first_three_users[0].profile_img
              dropped_out_attendees[i].second_user_alias = first_three_users[1].alias
              dropped_out_attendees[i].third_user_alias = first_three_users[2].alias
            } else if (first_three_users.length == 2) {
              dropped_out_attendees[i].first_user_alias = first_three_users[0].alias
              dropped_out_attendees[i].first_user_profile_img = first_three_users[0].profile_img
              dropped_out_attendees[i].second_user_alias = first_three_users[1].alias
              dropped_out_attendees[i].third_user_alias = null
            } else if (first_three_users.length == 1) {
              dropped_out_attendees[i].first_user_alias = first_three_users[0].alias
              dropped_out_attendees[i].first_user_profile_img = first_three_users[0].profile_img
              dropped_out_attendees[i].second_user_alias = null
              dropped_out_attendees[i].third_user_alias = null
            } else {
              dropped_out_attendees[i].first_user_alias = null
              dropped_out_attendees[i].second_user_alias = null
              dropped_out_attendees[i].third_user_alias = null
            }
          } else {
            dropped_out_attendees[i].first_user_alias = null
            dropped_out_attendees[i].second_user_alias = null
            dropped_out_attendees[i].third_user_alias = null
          }

          dropped_out_attendees[i].total_post_count = total_post_count[0].no_of_my_notis > 0 ? total_post_count[0].no_of_my_notis : 0
          dropped_out_attendees[i].read_status = getAllNotiLike_unreadCount[0].no_of_my_unread > 0 ? 0 : 1
        }

        singleArr.push(...dropped_out_attendees)
      }

      if (request.input('activity_type') == 0 || request.input('activity_type') == -2) {
        const group_member_approved = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .innerJoin('groups', 'groups.id', 'notifications.group_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', [17, 27, 28])
          .select(
            'notifications.group_id',
            'notifications.activity_type',
            'users.alias',
            'users.profile_img',
            'users.id',
            'notifications.created_at',
            'groups.name',
            'notifications.read_status',
            'notifications.id'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        const user_ding = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.user_id')
          .where({ other_user_id: auth.user.id, activity_type: 20 })
          .select(
            'notifications.activity_type',
            'users.profile_img',
            'users.id',
            'users.alias',
            'notifications.created_at',
            'notifications.read_status',
            'notifications.id'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        const user_notis = await Database.from('notifications')
          .innerJoin('users', 'users.id', 'notifications.other_user_id')
          .where({ other_user_id: auth.user.id })
          .whereIn('activity_type', [23, 25, 26])
          .select(
            'notifications.id',
            'notifications.activity_type',
            'notifications.read_status',
            'users.alias',
            'users.profile_img',
            'notifications.created_at'
          )
          .orderBy('notifications.created_at', 'desc')
          .paginate(request.input('counter'), set_limit)

        singleArr.push(...user_notis.data)
        singleArr.push(...group_member_approved.data)
        singleArr.push(...user_ding.data)
      }

      // const chat_group_invite = await Database.from('notifications')
      //   .innerJoin('users', 'users.id', 'notifications.user_id')
      //   .where({ other_user_id: auth.user.id, activity_type: 18 })
      //   .groupBy('notifications.schedule_games_id')
      //   .select(
      //     'notifications.id as notificationId',
      //     'notifications.group_id',
      //     'notifications.activity_type',
      //     'notifications.chat_id',
      //     'users.alias',
      //     'users.profile_img',
      //     'users.id',
      //     'notifications.created_at'
      //   )
      //   .orderBy('notifications.created_at', 'desc')
      //   .paginate(request.input('counter'), set_limit)
      // const group_member_kicked = await Database.from('notifications')
      //   .innerJoin('users', 'users.id', 'notifications.user_id')
      //   .innerJoin('groups', 'groups.id', 'notifications.group_id')
      //   .where({ other_user_id: auth.user.id, activity_type: 19 })
      //   .select(
      //     'notifications.group_id',
      //     'notifications.activity_type',
      //     'users.alias',
      //     'users.profile_img',
      //     'users.id',
      //     'notifications.created_at',
      //     'groups.name',
      //     'notifications.read_status'
      //   )
      //   .orderBy('notifications.created_at', 'desc')
      //   .paginate(request.input('counter'), set_limit)

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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async addGameApproved({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        const addGameApproved = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 14,
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
        .whereIn('activity_type', [2, 3, 4, 5, 6, 10, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
        .update({ read_status: 1 })
      return 'Saved successfully'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async deleteAllNoti({ auth, request, response }) {
    try {
      const deleteAllNoti = await Database.table('notifications')
        .where({
          other_user_id: auth.user.id
        })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 10, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
        .delete()
      const userId = auth.user.id
      const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
      await ChatRepository.publishNotifications({ userId, notifications })
      return 'Saved successfully'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
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
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
            activity_type: activity_type
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Deleted'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          comment_id: comment_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          reply_id: reply_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
            activity_type: 3
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return deleteCommentLike
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
            activity_type: 4
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return deleteReplyLike
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
          post_id: post_id
        })
        const userId = other_user_id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
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
            activity_type: 2
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return deletePostLike
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addFriend({ auth, request, response }) {
    if (auth.user) {
      try {
        const addFriend = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 1
        })
        const userId = request.input('other_user_id')
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async commend({ commendedId, commenderId }) {
    try {
      await Notification.create({
        user_id: commenderId,
        other_user_id: commendedId,
        activity_type: 23
      })
      const userId = commendedId
      const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
      await ChatRepository.publishNotifications({ userId, notifications })
      return 'Saved item'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            id: request.params.id
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Done'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async destroy_community({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            id: request.params.id
          })
          .delete()

        const deleteMember = await Database.table('usergroups')
          .where({
            user_id: request.params.user_id,
            group_id: request.params.group_id,
            permission_level: 42
          })
          .delete()
        const userId = auth.user.id
        const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Done'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async checkFriend({ auth, request, response }) {
    try {
      const checkFriend = await Database.from('notifications').where({
        user_id: auth.user.id,
        activity_type: 1,
        other_user_id: request.params.id
      })

      return {
        checkedFriend: checkFriend === undefined || checkFriend.length == 0 ? false : true
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async getmyFriendRequests(id) {
    try {
      const checkMyFriends = await Database.from('notifications')
        .where({ other_user_id: id, activity_type: 1 })
        .count('* as no_of_my_notiFriends')

      return {
        checkMyFriends: checkMyFriends
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async invitations({ auth, request, response }) {
    if (auth.user) {
      try {
        if (
          request.input('schedule_games_id') == undefined ||
          request.input('schedule_games_id') == null ||
          request.input('schedule_games_id') == ''
        ) {
          return
        }

        const requestingUserId = auth.user.id
        const arrInvite_user = request.input('gamers').split(',')
        const arrInvite_group = request.input('groups').split(',')
        const arrInvite_community = request.input('communities').split(',')
        const scheduledGameId = request.input('scheduledGameId')
        const scheduledGameGuid = request.input('scheduledGameGuid')
        const gameTitle = request.input('gameTitle')
        const startTime = formatDateTimeFromNow(request.input('startTime'))
        const content = `Heya! A new ${gameTitle} game has been created! It is scheduled to start ${startTime}. Find out more here: https://myG.gg/scheduledGames/${scheduledGameGuid}`

        if (arrInvite_user != '') {
          for (var i = 0; i < arrInvite_user.length; i++) {
            const findUser = await Database.table('users')
              .where({
                alias: arrInvite_user[i].trim()
              })
              .select('id')

            if (findUser.length == 0) {
              continue
            }

            const addScheduleGame = await Notification.create({
              other_user_id: findUser[0].id,
              user_id: auth.user.id,
              activity_type: 10,
              schedule_games_id: scheduledGameId
            })
            const userId = findUser[0].id
            const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
            await ChatRepository.publishNotifications({ userId, notifications })
          }
        }

        if (arrInvite_group != '') {
          for (var i = 0; i < arrInvite_group.length; i++) {
            const findChat = await Database.table('chats')
              .where({
                title: arrInvite_group[i].trim()
              })
              .select('id')

            if (findChat.length == 0) {
              continue
            }

            const requestedChatId = findChat[0].id
            await ChatRepository.sendMessageFromMyG({ requestedChatId, content })
          }
        }

        if (arrInvite_community != '') {
          for (var i = 0; i < arrInvite_community.length; i++) {
            const findGroup = await Database.table('groups')
              .where({
                name: arrInvite_community[i].trim()
              })
              .select('id')

            if (findGroup.length == 0) {
              continue
            }

            const findGame = await Database.table('schedule_games')
              .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
              .where('schedule_games.id', '=', scheduledGameId)
              .select('game_names.game_name', 'schedule_games.start_date_time')
              .first()

            if (findGame == undefined) {
              continue
            }

            const newPost = await Post.create({
              user_id: auth.user.id,
              type: 'text',
              content:
                'Heya! A new ' +
                findGame.game_name +
                ' game has been created! It is scheduled to start: ' +
                findGame.start_date_time +
                '. Find out more here: https://myG.gg/scheduled_games/' +
                scheduledGameId,
              group_id: findGroup[0].id
            })
          }
        }

        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async invitations_community({ auth, request, response }) {
    if (auth.user) {
      try {
        if (request.input('community_id') == undefined || request.input('community_id') == null || request.input('community_id') == '') {
          return
        }

        const requestingUserId = auth.user.id
        const arrInvite_user = request.input('gamers').split(',')
        const arrInvite_group = request.input('groups').split(',')
        const arrInvite_community = request.input('communities').split(',')
        const group_id = request.input('community_id')
        const community_name = request.input('community_name')

        const content = `Heya! A new community - ${community_name} has been created! Find out more here: https://myG.gg/community/${encodeURI(
          community_name
        )}`

        if (arrInvite_user != '') {
          for (var i = 0; i < arrInvite_user.length; i++) {
            const findUser = await Database.table('users')
              .where({
                alias: arrInvite_user[i].trim()
              })
              .select('id')

            if (findUser.length == 0) {
              continue
            }

            const addScheduleGame = await Notification.create({
              other_user_id: findUser[0].id,
              user_id: auth.user.id,
              activity_type: 22,
              group_id: group_id
            })
            const userId = findUser[0].id
            const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
            await ChatRepository.publishNotifications({ userId, notifications })
          }
        }

        if (arrInvite_group != '') {
          for (var i = 0; i < arrInvite_group.length; i++) {
            const findChat = await Database.table('chats')
              .where({
                title: arrInvite_group[i].trim()
              })
              .select('id')

            if (findChat.length == 0) {
              continue
            }

            const requestedChatId = findChat[0].id
            await ChatRepository.sendMessageFromMyG({ requestedChatId, content })
          }
        }

        if (arrInvite_community != '') {
          for (var i = 0; i < arrInvite_community.length; i++) {
            const findGroup = await Database.table('groups')
              .where({
                name: arrInvite_community[i].trim()
              })
              .select('id', 'group_img')

            if (findGroup.length == 0) {
              continue
            }

            const newPost = await Post.create({
              user_id: auth.user.id,
              type: 'text',
              content: content,
              group_id: findGroup[0].id,
              media_url: findGroup[0].group_img
            })
          }
        }

        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addGenericNoti_({ auth }, id, other_user_id, type) {
    type = parseInt(type)

    let post_id = null,
      group_id = null,
      chat_id = null,
      comment_id = null,
      reply_id = null,
      schedule_games_id = null

    if (auth.user) {
      switch (type) {
        case 22:
          group_id = id
          break
        case 23:
          group_id = id
          break
        case 24:
          group_id = id
          break
        case 27:
          group_id = id
          break
        case 28:
          group_id = id
          break
      }

      try {
        const addNoti = await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: type,
          post_id: post_id,
          group_id: group_id,
          chat_id: chat_id,
          schedule_games_id: schedule_games_id,
          comment_id: comment_id,
          reply_id: reply_id
        })
        return 'Saved item'
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async getCheck({ auth, request, response }) {
    if (auth.user) {
      let checking = false

      const security_check = await Database.from('admins').where({ user_id: auth.user.id, permission_level: 1 }).first()

      let isAdmin = false
      if (security_check != undefined) {
        isAdmin = true
      }
      return isAdmin
    }
    return false
  }

  async getUnread_count({ auth, request, response }) {
    if (auth.user) {
      let checking = false

      const security_check = await Database.from('admins').where({ user_id: auth.user.id, permission_level: 1 }).first()

      let isAdmin = false
      if (security_check != undefined) {
        isAdmin = true
      }

      try {
        let arr = []
        switch (request.input('notification_type')) {
          case 0:
            arr = [1, 11, 12]
            break
          case 1:
            //This doesnt work, didnt bother to fix as its not implemented
            //It will need to have the groupBy queries
            return
            arr = [2, 3, 4, 5, 6, 10, 14, 15, 16, 17, 19, 20, 21, 22, 23]
            break
          case 2:
            arr = []
            break
          default:
            checking = true
        }
        if (checking) {
          let getUnread_count_Alerts = 0
          const getUnread_count_Approvals = await Database.from('notifications')
            .where({ other_user_id: auth.user.id, read_status: 0 })
            .whereIn('activity_type', [1, 11, 12])
            .count('* as no_of_my_unread_approvals')

          const _getUnread_count_Alerts = await Database.from('notifications')
            .where({ other_user_id: auth.user.id, read_status: 0 })
            .whereIn('activity_type', [10, 14, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
            .count('* as no_of_my_unread_alerts')

          getUnread_count_Alerts +=
            _getUnread_count_Alerts[0].no_of_my_unread_alerts != undefined ? _getUnread_count_Alerts[0].no_of_my_unread_alerts : 0

          const allMylike_posts = await Database.from('notifications')
            .where({ other_user_id: auth.user.id, read_status: 0 })
            .whereIn('activity_type', [2, 3, 4, 5, 6])
            .groupBy('notifications.post_id')
            .count('* as no_of_my_unread_alerts')

          for (let i = 0; i < allMylike_posts.length; i++) {
            getUnread_count_Alerts += allMylike_posts[i].no_of_my_unread_alerts
          }

          const dropped_out_attendees = await Database.from('notifications')
            .where({ other_user_id: auth.user.id, activity_type: 16, read_status: 0 })
            .groupBy('notifications.schedule_games_id')
            .count('* as no_of_my_unread_alerts')

          for (let i = 0; i < dropped_out_attendees.length; i++) {
            getUnread_count_Alerts += dropped_out_attendees[i].no_of_my_unread_alerts
          }

          return {
            getUnread_count_Approvals: getUnread_count_Approvals[0].no_of_my_unread_approvals,
            getUnread_count_Alerts: getUnread_count_Alerts,
            isAdmin
          }
        } else {
          const getUnread_count = await Database.from('notifications')
            .where({ other_user_id: auth.user.id, read_status: 0 })
            .whereIn('activity_type', arr)
            .count('* as no_of_my_unread')

          return getUnread_count, isAdmin
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async mark_read_status({ auth, request, response }) {
    if (auth.user) {
      if (request.input('id') == undefined || request.input('id') == null) {
        return
      }

      try {
        switch (request.input('activity_type')) {
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            const get_info = await Database.from('notifications')
              .where({ id: request.input('id') })
              .first()
            if (get_info != undefined) {
              await Notification.query()
                .where({ post_id: get_info.post_id, activity_type: request.input('activity_type'), other_user_id: auth.user.id })
                .update({ read_status: request.input('read_status') })
              const userId = auth.user.id
              const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
              await ChatRepository.publishNotifications({ userId, notifications })
            }
            break
          case 16:
            const get_sweet_16 = await Database.from('notifications')
              .where({ id: request.input('id') })
              .first()
            if (get_sweet_16 != undefined) {
              if (get_sweet_16.activity_type == 16) {
                await Notification.query()
                  .where({ schedule_games_id: get_sweet_16.schedule_games_id, activity_type: 16, other_user_id: auth.user.id })
                  .update({ read_status: request.input('read_status') })
                const userId = auth.user.id
                const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
                await ChatRepository.publishNotifications({ userId, notifications })
              }
            }

            break
          default:
            await Notification.query()
              .where({ id: parseInt(request.input('id')) })
              .update({ read_status: request.input('read_status') })
            const userId = auth.user.id
            const notifications = await this.count({ auth: { user: { id: userId } }, request: null })
            await ChatRepository.publishNotifications({ userId, notifications })
        }

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async count({ auth, request }) {
    return NotificationsRepository.count({ auth, request })
  }
}

module.exports = NotificationController_v2
