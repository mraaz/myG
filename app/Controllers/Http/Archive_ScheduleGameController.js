'use strict'

const Database = use('Database')
const Archive_ScheduleGame = use('App/Models/Archive_ScheduleGame')
const NotificationController = use('./NotificationController')

const InGame_fieldsController = use('./InGame_fieldsController')

class Archive_ScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      const newScheduleGame = await Archive_ScheduleGame.create({
        archive_schedule_game_id: request.params.id,
        game_names_id: request.params.game_names_id,
        user_id: request.params.user_id,
        region: request.params.region,
        experience: request.params.experience,
        start_date_time: request.params.start_date_time,
        end_date_time: request.params.end_date_time,
        platform: request.params.platform,
        description: request.params.description,
        other: request.params.other,
        expiry: request.params.expiry,
        visibility: request.params.visibility,
        limit: request.params.limit,
        accept_msg: request.params.accept_msg,
        schedule_games_GUID: request.params.schedule_games_GUID,
        vacancy: request.params.vacancy,
        og_created_at: request.params.og_created_at,
        reason_for_cancel: decodeURI(request.params.reason_for_cancel),
      })
      return newScheduleGame
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_sch = await Database.table('archive_schedule_games')
          .where({
            id: request.params.id,
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async myScheduledGamesCount({ auth, request, response }) {
    try {
      //const latestScheduledGames = await Archive_ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const myScheduledGamesCount = await Database.from('archive_schedule_games')
        .where({
          archive_schedule_game_id: request.params.id,
          user_id: auth.user.id,
        })
        .count('* as no_of_my_posts')
      return {
        myScheduledGamesCount,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async filtered_by_one({ auth, request, response }) {
    try {
      var latestScheduledGames = await Database.from('archive_schedule_games')
        .innerJoin('users', 'users.id', 'archive_schedule_games.user_id')
        .where('archive_schedule_games.archive_schedule_game_id', '=', request.params.id)
        .select('*', 'users.id as user_id')

      latestScheduledGames = await InGame_fieldsController.find_Archived_InGame_Fields(latestScheduledGames)

      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_one({ auth, request, response }) {
    try {
      var getOne = await Database.from('archive_schedule_games')
        .innerJoin('game_names', 'game_names.id', 'archive_schedule_games.game_names_id')
        .select('*', 'archive_schedule_games.id', 'archive_schedule_games.created_at', 'archive_schedule_games.updated_at')
        .where({
          archive_schedule_game_id: request.params.id,
        })

      getOne = await InGame_fieldsController.find_Archived_InGame_Fields(getOne)

      return {
        getOne,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Archive_ScheduleGameController
