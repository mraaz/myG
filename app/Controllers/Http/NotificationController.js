'use strict'

const Notification = use('App/Models/Notification')
const Usergroup = use('App/Models/Usergroup')
const Database = use('Database')

class NotificationController {
  async addFriend({ auth, request, response }) {
    if (auth.user) {
      try {
        const addFriend = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 1,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addPostLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const addPostLike = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 2,
          post_id: request.input('post_id'),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addCommentLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const addCommentLike = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 3,
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          schedule_games_id: request.input('schedule_games_id'),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addReplyLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const addReplyLike = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 4,
          post_id: request.input('post_id'),
          reply_id: request.input('reply_id'),
          schedule_games_id: request.input('schedule_games_id'),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addComment({ auth, request, response }) {
    if (auth.user) {
      try {
        const addComment = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 5,
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          schedule_games_id: request.input('schedule_games_id'),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addReply({ auth, request, response }) {
    if (auth.user) {
      try {
        const addReply = await Notification.create({
          other_user_id: request.input('other_user_id'),
          user_id: auth.user.id,
          activity_type: 6,
          post_id: request.input('post_id'),
          reply_id: request.input('reply_id'),
          schedule_games_id: request.input('schedule_games_id'),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

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
        console.log(error)
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
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async add_approved_attendee_left({ auth, request, response }) {
    if (auth.user) {
      try {
        const add_approved_attendee_left = await Notification.create({
          other_user_id: request.params.other_user_id,
          user_id: auth.user.id,
          activity_type: 16,
          schedule_games_id: request.params.schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
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
        console.log(error)
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
        other_user_id: request.params.id,
      })

      return {
        checkedFriend: checkFriend === undefined || checkFriend.length == 0 ? false : true,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myFriendRequests({ auth, request, response }) {
    try {
      const checkMyFriends = await Database.from('notifications')
        .where({ other_user_id: auth.user.id, activity_type: 1 })
        .count('* as no_of_my_notiFriends')

      return {
        checkMyFriends: checkMyFriends,
      }
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }

  async allmyFriendRequests({ auth, request, response }) {
    try {
      const allMyFriends = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id, activity_type: 1 })
        .select('*', 'notifications.id')

      return {
        allMyFriends: allMyFriends,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myFriendRequest({ auth, request, response }) {
    try {
      const myFriendRequest = await Database.from('notifications')
        .where({
          other_user_id: auth.user.id,
          user_id: request.params.id,
          activity_type: 1,
        })
        .select('notifications.id')

      return {
        myFriendRequest: myFriendRequest === undefined || myFriendRequest.length == 0 ? false : true,
        noti_id: myFriendRequest === undefined || myFriendRequest.length == 0 ? 0 : myFriendRequest,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllNotifications({ auth, request, response }) {
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
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMylike_comments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 3 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMylike_replies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 4 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMycomments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 5 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyreplies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 6 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyschedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 10 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const myschedulegames_attendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 11 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const mygroups = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('groups', 'groups.id', 'notifications.group_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 12 })
        .groupBy('notifications.group_id')
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at',
          'groups.name'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const myschedulegames_approvals = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 14 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyarchived_schedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 15 })
        .groupBy('notifications.archive_schedule_game_id')
        .select(
          'notifications.archive_schedule_game_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const dropped_out_attendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 16 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const group_member_approved = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 17 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)

      return {
        allMylike_posts: allMylike_posts,
        allMylike_comments: allMylike_comments,
        allMylike_replies: allMylike_replies,
        allMycomments: allMycomments,
        allMyreplies: allMyreplies,
        allMyschedulegames: allMyschedulegames,
        myschedulegames_attendees: myschedulegames_attendees,
        mygroups: mygroups,
        myschedulegames_approvals: myschedulegames_approvals,
        allMyarchived_schedulegames: allMyarchived_schedulegames,
        dropped_out_attendees: dropped_out_attendees,
        group_member_approved: group_member_approved,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllNotifications2({ auth, request, response }) {
    try {
      const allMylike_posts = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 2 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMylike_comments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 3 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMylike_replies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 4 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMycomments = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 5 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyreplies = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 6 })
        .groupBy('notifications.post_id')
        .count('* as no_of_my_notis')
        .select(
          'notifications.schedule_games_id',
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyschedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 10 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const myschedulegames_attendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 11 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const mygroups = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .innerJoin('groups', 'groups.id', 'notifications.group_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 12 })
        .groupBy('notifications.group_id')
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at',
          'groups.name'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const myschedulegames_approvals = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 14 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const allMyarchived_schedulegames = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 15 })
        .groupBy('notifications.archive_schedule_game_id')
        .select(
          'notifications.archive_schedule_game_id',
          'notifications.activity_type',
          'users.alias',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const dropped_out_attendees = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 16 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)
      const group_member_approved = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ activity_type: 17 })
        .groupBy('notifications.schedule_games_id')
        .select(
          'notifications.group_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id',
          'notifications.updated_at'
        )
        .orderBy('notifications.updated_at')
        .limit(88)

      return {
        allMylike_posts: allMylike_posts,
        allMylike_comments: allMylike_comments,
        allMylike_replies: allMylike_replies,
        allMycomments: allMycomments,
        allMyreplies: allMyreplies,
        allMyschedulegames: allMyschedulegames,
        myschedulegames_attendees: myschedulegames_attendees,
        mygroups: mygroups,
        myschedulegames_approvals: myschedulegames_approvals,
        allMyarchived_schedulegames: allMyarchived_schedulegames,
        dropped_out_attendees: dropped_out_attendees,
        group_member_approved: group_member_approved,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllNotiLike_post({ auth, request, response }) {
    try {
      const getAllNotiLike_post = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 2 })
        .select(
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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
      console.log(error)
    }
  }

  async getAllNotiLike_comment({ auth, request, response }) {
    try {
      const getAllNotiLike_comment = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 3 })
        .select(
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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
      console.log(error)
    }
  }

  async getAllNotiLike_reply({ auth, request, response }) {
    try {
      const getAllNotiLike_reply = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 4 })
        .select(
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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
      console.log(error)
    }
  }

  async getAllNotiComment({ auth, request, response }) {
    try {
      const getAllNotiComment = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 5 })
        .select(
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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
      console.log(error)
    }
  }

  async getAllNotiReply({ auth, request, response }) {
    try {
      const getAllNotiReply = await Database.from('notifications')
        .innerJoin('users', 'users.id', 'notifications.user_id')
        .where({ other_user_id: auth.user.id })
        .where({ post_id: request.params.id, activity_type: 6 })
        .select(
          'notifications.post_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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
      console.log(error)
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
        .select(
          'notifications.schedule_games_id',
          'notifications.activity_type',
          'users.first_name',
          'users.last_name',
          'users.profile_img',
          'users.id'
        )
        .orderBy('notifications.created_at')
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

        return delete_noti
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deletePostLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const deletePostLike = await Database.table('notifications')
          .where({
            post_id: request.params.id,
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

  async remove_schedule_game_attendees({ auth, request, response }) {
    if (auth.user) {
      try {
        const remove_schedule_game_attendees = await Database.table('notifications')
          .where({
            schedule_games_id: request.params.id,
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

  async deleteCommentLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteCommentLike = await Database.table('notifications')
          .where({
            comment_id: request.params.id,
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

  async deleteReplyLike({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteReplyLike = await Database.table('notifications')
          .where({
            reply_id: request.params.id,
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
      }
    }
  }

  async markAllNoti({ auth, request, response }) {
    try {
      const markAllNoti = await Notification.query()
        .where({ other_user_id: auth.user.id })
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
        .delete()

      return 'Saved successfully'
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addScheduleGame_attendance({ auth, request, response }) {
    if (auth.user) {
      try {
        const addScheduleGame_attendance = await Notification.create({
          other_user_id: request.params.other_user_id,
          user_id: auth.user.id,
          activity_type: 11,
          schedule_games_id: request.params.schedule_games_id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
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

        return delete_noti
      } catch (error) {
        console.log(error)
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
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = NotificationController
