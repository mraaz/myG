'use strict'

const Database = use('Database')
const Archive_schedule_games_trans = use('App/Models/Archive_schedule_games_trans')

class Archive_schedule_games_transController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        console.log('got here')

        const schedule_games_tranaction = await Database.from('schedule_games_transactions').where({
          schedule_games_id: request.params.id,
        })

        console.log(schedule_games_tranaction.length)

        for (var i = 0; i < schedule_games_tranaction.length; i++) {
          console.log('inside')
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

// const allGameNameFields = await Database.from('game_name_fields').where({
//   game_names_id: request.params.game_names_id,
// })
//
// var insert_archive_GameNameFields, create_archive_GameNameField
// for (var i = 0; i < allGameNameFields.length; i++) {
//   check_archive_GameNameFields = await Database.from('archive_game_name_fields').where({
//     game_names_id: allGameNameFields[i].id,
//     in_game_field: allGameNameFields[i].in_game_field,
//   })
//
//   if (check_archive_GameNameFields.length == 0) {
//     create_archive_GameNameField = await Archive_GameNameField.create({
//       game_names_id: allGameNameFields[i].game_names_id,
//       in_game_field: allGameNameFields[i].in_game_field,
//     })
//   }
// }
