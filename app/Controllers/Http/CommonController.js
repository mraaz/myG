'use strict'

const Database = use('Database')
const Notification = use('App/Models/Notification')

const LoggingRepository = require('../../Repositories/Logging')

//Noti methods in this component....fuck a duck!!! - mraaz

class CommonController {
  //current_user_permission:
  //-1: Not a member of this group, 0: Owner, 1: Admin of group, 2: Moderator, 3: User, 42:Pending approval
  async get_permission({ auth }, group_id) {
    let current_user_permission = -1
    try {
      const permission_query_current_user = await Database.from('usergroups').where({
        user_id: auth.user.id,
        group_id: group_id,
      })

      if (permission_query_current_user.length > 0) {
        current_user_permission = permission_query_current_user[0].permission_level
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: group_id,
        })

        if (owner_query.length > 0) {
          current_user_permission = 0
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
      })
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
}

module.exports = CommonController
