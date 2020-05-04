'use strict'
const Database = use('Database')
const InvitedUsersForScheduleGame = use('App/Models/InvitedUsersForScheduleGame')

class InvitedUsersForScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      console.log("i'm here")
      return
      try {
        const addEntry = await InvitedUsersForScheduleGame.create({
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
          chat_id: request.input('chat_id'),
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
}

module.exports = InvitedUsersForScheduleGameController
