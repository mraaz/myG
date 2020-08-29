'use strict'

const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')
const Database = use('Database')
const ChatRepository = require('../../Repositories/Chat')
const { formatDateTimeFromNow } = require('../../Common/date')
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

class NotificationController {
  async addGroup({ auth, request, response }) {
    if (auth.user) {
      try {
        const addGroup = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 12,
          group_id: request.input('group_id'),
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

  async addGameDeleted({ auth, request, response }) {
    if (auth.user) {
      try {
        const addGameDeleted = await Notification.create({
          other_user_id: request.params.id,
          user_id: auth.user.id,
          activity_type: 15,
          archive_schedule_game_id: request.params.archive_schedule_game_id,
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

  async add_approved_group_attendee({ auth, request, response }) {
    if (auth.user) {
      try {
        const add_approved_group_attendee = await Notification.create({
          other_user_id: request.params.other_user_id,
          user_id: auth.user.id,
          activity_type: 17,
          group_id: request.params.group_id,
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

  async inviteToGroup({ auth, request }) {
    if (auth.user) {
      try {
        await Notification.create({
          other_user_id: request.input('userId'),
          user_id: auth.user.id,
          activity_type: 18,
          chat_id: request.input('chatId'),
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
        return error
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async myRequests({ auth, request, response }) {
    try {
      //We need group-by so that each noti isn't being counted, instead each line is counted

      //const myRequests = await Database.from('notifications').where({other_user_id: auth.user.id, read_status: 0}).whereIn('activity_type', [2,3,4,5,6]).groupBy('notifications.post_id')//.count('* as no_of_my_notis')
      //const myRequests = await Database.from('notifications').where({other_user_id: auth.user.id}).whereIn('activity_type', [2,3,4,5,6]).groupBy('notifications.post_id')

      const allMylike_posts = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 2, read_status: 0 })
        .groupBy('notifications.post_id')
        .select('id')
      const allMylike_comments = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 3, read_status: 0 })
        .groupBy('notifications.post_id')
        .select('id')
      const allMylike_replies = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 4, read_status: 0 })
        .groupBy('notifications.post_id')
        .select('id')
      const allMycomments = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 5, read_status: 0 })
        .groupBy('notifications.post_id')
        .select('id')
      const allMyreplies = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 6, read_status: 0 })
        .groupBy('notifications.post_id')
        .select('id')
      const allMyschedulegames = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 10, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .select('id')
      const myschedulegames_attendees = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 11, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .select('id')
      const mygroups = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 12, read_status: 0 })
        .groupBy('notifications.group_id')
        .select('id')
      const myschedulegames_approvals = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 14, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .select('id')
      const allMyarchived_schedulegames = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 15, read_status: 0 })
        .groupBy('notifications.archive_schedule_game_id')
        .select('id')
      const dropped_out_attendees = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 16, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .select('id')
      const group_member_approved = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 17, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .select('id')
      const group_invite = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 18, read_status: 0 })
        .groupBy('notifications.chat_id')
        .select('id')

      const group_member_kicked = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 19, read_status: 0 })
        .groupBy('notifications.group_id')
        .select('id')

      const user_ding = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 20, read_status: 0 })
        .groupBy('notifications.user_id')
        .select('id')

      var singleArr = [
        ...allMylike_posts,
        ...allMylike_comments,
        ...allMylike_replies,
        ...allMycomments,
        ...allMyreplies,
        ...allMyschedulegames,
        ...myschedulegames_attendees,
        ...mygroups,
        ...myschedulegames_approvals,
        ...allMyarchived_schedulegames,
        ...dropped_out_attendees,
        ...group_member_approved,
        ...group_invite,
        ...group_member_kicked,
        ...user_ding,
      ]
      const number_of_notis = singleArr.length
      // 10,11,14,16 = schedule_games
      // 12,17 = group_post
      // 15, archive_post
      // 2,3,4,5,6 = post_id
      return {
        number_of_notis,
        // allMylike_posts: allMylike_posts,
        // allMylike_comments: allMylike_comments,
        // allMylike_replies: allMylike_replies,
        // allMycomments: allMycomments,
        // allMyreplies: allMyreplies,
        // allMyschedulegames: allMyschedulegames,
        // myschedulegames_attendees: myschedulegames_attendees,
        // mygroups: mygroups,
        // myschedulegames_approvals: myschedulegames_approvals,
        // allMyarchived_schedulegames: allMyarchived_schedulegames,
        // dropped_out_attendees: dropped_out_attendees,
        // group_member_approved: group_member_approved
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async getAllNotiLike_post({ auth, request, response }) {
    try {
      const getAllNotiLike_post = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 2 })
        .select('notifications.post_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiLike_postCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 2 })
        .count('* as no_of_my_notis')
      const getAllNotiLike_unreadCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 2, read_status: 0 })
        .count('* as no_of_my_unread')

      return {
        getAllNotiLike_post: getAllNotiLike_post,
        getAllNotiLike_postCount: getAllNotiLike_postCount,
        getAllNotiLike_unreadCount: getAllNotiLike_unreadCount,
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

  async getAllNotiLike_comment({ auth, request, response }) {
    try {
      const getAllNotiLike_comment = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 3 })
        .select('notifications.post_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiLike_commentCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 3 })
        .count('* as no_of_my_notis')
      const getAllNotiLike_unreadCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 3, read_status: 0 })
        .count('* as no_of_my_unread')

      return {
        getAllNotiLike_comment: getAllNotiLike_comment,
        getAllNotiLike_commentCount: getAllNotiLike_commentCount,
        getAllNotiLike_unreadCount: getAllNotiLike_unreadCount,
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

  async getAllNotiLike_reply({ auth, request, response }) {
    try {
      const getAllNotiLike_reply = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 4 })
        .select('notifications.post_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiLike_replyCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 4 })
        .count('* as no_of_my_notis')
      const getAllNotiLike_unreadCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 4, read_status: 0 })
        .count('* as no_of_my_unread')

      return {
        getAllNotiLike_reply: getAllNotiLike_reply,
        getAllNotiLike_replyCount: getAllNotiLike_replyCount,
        getAllNotiLike_unreadCount: getAllNotiLike_unreadCount,
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

  async getAllNotiComment({ auth, request, response }) {
    try {
      const getAllNotiComment = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 5 })
        .select('notifications.post_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiCommentCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 5 })
        .count('* as no_of_my_notis')
      const getAllNotiCommentCount_unreadCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 5, read_status: 0 })
        .count('* as no_of_my_unread')

      return {
        getAllNotiComment: getAllNotiComment,
        getAllNotiCommentCount: getAllNotiCommentCount,
        getAllNotiCommentCount_unreadCount: getAllNotiCommentCount_unreadCount,
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

  async getAllNotiReply({ auth, request, response }) {
    try {
      const getAllNotiReply = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 6 })
        .select('notifications.post_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiReplyCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 6 })
        .count('* as no_of_my_notis')
      const getAllNotiReplyCount_unreadCount = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 6, read_status: 0 })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReply: getAllNotiReply,
        getAllNotiReplyCount: getAllNotiReplyCount,
        getAllNotiReplyCount_unreadCount: getAllNotiReplyCount_unreadCount,
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

  async getAllNotiScheduleGamesAttendees({ auth, request, response }) {
    try {
      const getAllNotiScheduleGamesAttendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.other_user_id')
        .where({
          schedule_games_id: request.params.schedule_games_id,
          activity_type: 16,
        })
        .select('notifications.schedule_games_id', 'notifications.activity_type', 'users.alias', 'users.profile_img', 'users.id')
        .orderBy('notifications.created_at', 'desc')
        .limit(3)
      const getAllNotiScheduleGamesAttendeesCount = await Database.from('notifications')
        .where({
          schedule_games_id: request.params.schedule_games_id,
          activity_type: 16,
        })
        .count('* as no_of_my_notis')

      return {
        getAllNotiScheduleGamesAttendees: getAllNotiScheduleGamesAttendees,
        getAllNotiScheduleGamesAttendeesCount: getAllNotiScheduleGamesAttendeesCount,
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

  async updateRead_Status({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateRead_Status = await Notification.query()
          .where({
            other_user_id: auth.user.id,
            post_id: request.params.post_id,
            activity_type: request.params.activity_type,
          })
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
  }

  async updateRead_Status_schedule_game({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateRead_Status_schedule_game = await Notification.query()
          .where({
            other_user_id: auth.user.id,
            schedule_games_id: request.params.schedule_game_id,
            activity_type: request.params.activity_type,
          })
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
  }

  async updateRead_Status_archive_schedule_game({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateRead_Status_archive_schedule_game = await Notification.query()
          .where({
            other_user_id: auth.user.id,
            archive_schedule_game_id: request.params.archive_schedule_game_id,
            activity_type: request.params.activity_type,
          })
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
  }

  async updateRead_Status_groups({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateRead_Status_groups = await Notification.query()
          .where({
            other_user_id: auth.user.id,
            group_id: request.params.group_id,
            activity_type: request.params.activity_type,
            user_id: request.params.user_id,
          })
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
  }

  async updateRead_Status_ding({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateRead_Status_ding = await Notification.query()
          .where({
            other_user_id: auth.user.id,
            activity_type: 20,
          })
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
  }

  async markAllNoti({ auth, request, response }) {
    try {
      const markAllNoti = await Notification.query()
        .where({ other_user_id: auth.user.id })
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 19, 20])
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
        .whereIn('activity_type', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20])
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

  async getRead_Status({ auth, request, response }) {
    try {
      const getAllNotiReplyCount_unreadCount = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({
          post_id: request.params.post_id,
          activity_type: request.params.activity_type,
          read_status: 0,
        })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReplyCount_unreadCount: getAllNotiReplyCount_unreadCount,
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

  async getRead_Status_schedule_game({ auth, request, response }) {
    try {
      const getAllNotiReplyCount_unreadCount = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({
          schedule_games_id: request.params.schedule_game_id,
          activity_type: request.params.activity_type,
          read_status: 0,
        })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReplyCount_unreadCount: getAllNotiReplyCount_unreadCount,
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

  async getunread_archive_schedule_game({ auth, request, response }) {
    try {
      const getunread_archive_schedule_game = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({
          archive_schedule_game_id: request.params.archive_schedule_game_id,
          activity_type: request.params.activity_type,
          read_status: 0,
        })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReplyCount_unreadCount: getunread_archive_schedule_game,
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

  async getunread_group({ auth, request, response }) {
    try {
      const getAllNotiReplyCount_unreadCount = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({
          group_id: request.params.id,
          activity_type: request.params.activity_type,
          read_status: 0,
        })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReplyCount_unreadCount: getAllNotiReplyCount_unreadCount,
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

  async getunread_dings({ auth, request, response }) {
    try {
      const getAllNotiReplyCount_unreadCount = await Database.from('notifications')
        .where({ other_user_id: auth.user.id })
        .where({
          activity_type: 20,
          read_status: 0,
        })
        .count('* as no_of_my_unread')

      return {
        getAllNotiReplyCount_unreadCount: getAllNotiReplyCount_unreadCount,
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

  async addScheduleGame({ auth, request, response }) {
    if (auth.user) {
      try {
        const addScheduleGame = await Notification.create({
          other_user_id: request.params.other_user_id,
          user_id: auth.user.id,
          activity_type: 10,
          schedule_games_id: request.params.schedule_games_id,
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
                alias: arrInvite_user[i].trim(),
              })
              .select('id')

            if (findUser.length == 0) {
              continue
            }

            const addScheduleGame = await Notification.create({
              other_user_id: findUser[0].id,
              user_id: auth.user.id,
              activity_type: 10,
              schedule_games_id: scheduledGameId,
            })

            // const requestedUserId = findUser[0].id
            // await ChatRepository.sendMessageFromMyGToUser({ requestingUserId, requestedUserId, content })
          }
        }

        if (arrInvite_group != '') {
          for (var i = 0; i < arrInvite_group.length; i++) {
            const findChat = await Database.table('chats')
              .where({
                title: arrInvite_group[i].trim(),
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
                name: arrInvite_community[i].trim(),
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
              group_id: findGroup[0].id,
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
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async add_all_to_Group({ auth, request, response }) {
    if (auth.user) {
      try {
        const mygroups = await Database.from('usergroups')
          .where({ group_id: request.input('group_id') })
          .whereNot({ permission_level: 42 })
        for (var i = 0; i < mygroups.length; i++) {
          const add_all_to_Group = await Notification.create({
            other_user_id: mygroups[i].user_id,
            user_id: auth.user.id,
            activity_type: 12,
            group_id: request.input('group_id'),
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

  async add_vip_to_Group({ auth, request, response }) {
    if (auth.user) {
      try {
        const mygroups = await Database.from('usergroups')
          .where({ group_id: request.input('group_id'), permission_level: 1 })
          .orWhere({ group_id: request.input('group_id'), permission_level: 2 })
        for (var i = 0; i < mygroups.length; i++) {
          const add_all_to_Group = await Notification.create({
            other_user_id: mygroups[i].user_id,
            user_id: auth.user.id,
            activity_type: 12,
            group_id: request.input('group_id'),
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

  async delete_group({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_noti = await Database.table('notifications')
          .where({
            group_id: request.params.id,
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

  async addGameApproved({ auth, request, response }) {
    if (auth.user) {
      try {
        const addGameApproved = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 14,
          schedule_games_id: request.input('schedule_games_id'),
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

  // Trying to avoid conflicts, should move this function up later.
  async outgoingFriendRequests({ auth }) {
    try {
      const friendRequests = await Database.select('user_id', 'other_user_id', 'activity_type')
        .from('notifications')
        .where({ user_id: auth.user.id, activity_type: 1 })
      return { friendRequests }
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

  async kicked_from_group({ auth, request, response }) {
    if (auth.user) {
      try {
        const kicked_from_group = await Notification.create({
          other_user_id: request.params.other_user_id,
          user_id: auth.user.id,
          activity_type: 19,
          group_id: request.params.group_id,
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

  async ding(my_user_id) {
    try {
      const kicked_from_group = await Notification.create({
        other_user_id: my_user_id,
        user_id: my_user_id,
        activity_type: 20,
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
  }

  async getApprovals_Dashboard({ auth, request, response }) {
    //Return Activity_type: 1, 11, 12
    var set_limit = 10
    try {
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

      var singleArr = [...allMyFriends.data, ...myschedulegames_attendees.data, ...mygroups.data]

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
}

module.exports = NotificationController
