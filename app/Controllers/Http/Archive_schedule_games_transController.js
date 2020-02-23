'use strict'

const Database = use('Database')
const Archive_schedule_games_trans = use('App/Models/Archive_schedule_games_trans')

class Archive_schedule_games_transController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const schedule_games_tranaction = await Database.from('schedule_games_transactions').where({
          schedule_games_id: request.params.id,
        })

        for (var i = 0; i < schedule_games_tranaction.length; i++) {
          await Archive_schedule_games_trans.create({
            archive_schedule_games_id: request.params.archive_schedule_games_id,
            game_name_fields_id: schedule_games_tranaction[i].game_name_fields_id,
            values: schedule_games_tranaction[i].values,
          })
        }
      } catch (error) {
        console.log(error)
      }
      return 'All Done'
    }
  }
}

module.exports = Archive_schedule_games_transController
