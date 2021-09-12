'use strict'
const InvitedUsersForScheduleGame = use('App/Models/InvitedUsersForScheduleGame')
const LoggingRepository = require('../../Repositories/Logging')

class InvitedUsersForScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const addEntry = await InvitedUsersForScheduleGame.create({
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
          chat_id: request.input('chat_id'),
          group_id: request.input('group_id')
        })
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

  async invite({ auth, request }) {
    if (auth.user) {
      try {
        const schedule_games_id = request.input('schedule_games_id')
        const user_id = request.input('user_id')
        return InvitedUsersForScheduleGame.create({ schedule_games_id, user_id })
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
}

module.exports = InvitedUsersForScheduleGameController
