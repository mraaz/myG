'use strict'

const Database = use('Database')
const Notification = use('App/Models/Notification')
const NotificationsRepository = require('../../Repositories/Notifications')
const ChatRepository = require('../../Repositories/Chat')
const LoggingRepository = require('../../Repositories/Logging')

//Noti methods in this component....fuck a duck!!! - mraaz

class CommonController {
  //current_user_permission:
  //-1: Not a member of this group, 0: Owner, 1: Admin of group, 2: Moderator, 3: User, 42:Pending approval
  async get_permission({ auth }, group_id) {
    let current_user_permission = -1
    try {
      const owner_query = await Database.from('groups').where({
        user_id: auth.user.id,
        id: group_id
      })

      if (owner_query.length > 0) {
        current_user_permission = 0
      } else {
        const permission_query_current_user = await Database.from('usergroups').where({
          user_id: auth.user.id,
          group_id: group_id
        })

        if (permission_query_current_user.length > 0) {
          current_user_permission = permission_query_current_user[0].permission_level
        }
      }
      return current_user_permission
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'get_permission'
      })
    }
  }

  async add_approved_attendee_left({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 16,
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
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
          message: (error && error.message) || error,
          method: 'add_approved_attendee_left'
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addScheduleGame_attendance({ auth }, schedule_games_id, other_user_id, activity_type) {
    if (auth.user) {
      try {
        await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: activity_type,
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'addScheduleGame_attendance'
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addGameApproved({ auth }, schedule_games_id, other_user_id) {
    if (auth.user) {
      try {
        await Notification.create({
          other_user_id: other_user_id,
          user_id: auth.user.id,
          activity_type: 14,
          schedule_games_id: schedule_games_id
        })
        const userId = other_user_id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'addGameApproved'
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async remove_schedule_game_attendees({ auth }, schedule_games_id, activity_type) {
    if (auth.user) {
      try {
        await Database.table('notifications')
          .where({
            schedule_games_id: schedule_games_id,
            activity_type: activity_type
          })
          .delete()
        const userId = auth.user.id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Deleted'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'remove_schedule_game_attendees'
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async remove_schedule_game_individual_attendees({ auth }, schedule_games_id, activity_type, user_id) {
    if (auth.user) {
      try {
        await Database.table('notifications')
          .where({
            schedule_games_id: schedule_games_id,
            activity_type: activity_type,
            user_id: user_id
          })
          .delete()
        const userId = auth.user.id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })
        return 'Deleted'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
          method: 'remove_schedule_game_individual_attendees'
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async shuffle(array) {
    try {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 != currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'shuffle'
      })
    }
  }
}

module.exports = CommonController
