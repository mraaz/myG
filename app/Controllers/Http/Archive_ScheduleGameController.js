'use strict'

const Database = use('Database')
const Archive_ScheduleGame = use('App/Models/Archive_ScheduleGame')
const NotificationController = use('./NotificationController')

class Archive_ScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      const newScheduleGame = await Archive_ScheduleGame.create({
        archive_schedule_game_id: request.params.id,
        game_name: request.params.game_name,
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
        dota2_medal_ranks: request.params.dota2_medal_ranks,
        dota2_server_regions: request.params.dota2_server_regions,
        dota2_roles: request.params.dota2_roles,
        schedule_games_GUID: request.params.schedule_games_GUID,
        clash_royale_trophies: request.params.clash_royale_trophies,
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

  async show({ auth, request, response }) {
    try {
      //const latestScheduledGames = await Archive_ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const latestScheduledGames = await Database.from('archive_schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .select('schedule_games.id', 'schedule_games.game_name')
        .limit(88)

      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myScheduledGames({ auth, request, response }) {
    var myScheduledGames = ''
    try {
      //   //const latestScheduledGames = await Archive_ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const subquery = Database.select('schedule_games_id')
        .from('archive_attendees')
        .where({ user_id: auth.user.id })
      //
      if (request.params.exclude_expired == 'true') {
        myScheduledGames = await Database.from('archive_schedule_games')
          .innerJoin('users', 'users.id', 'schedule_games.user_id')
          .where({ user_id: auth.user.id })
          .where('expiry', '>', Database.fn.now())
          .orWhereIn('schedule_games.id', subquery)
          .select('*', 'schedule_games.id')
          .orderBy('schedule_games.created_at', 'desc')
          .paginate(request.params.limitstr, 11)
      } else {
        myScheduledGames = await Database.from('archive_schedule_games')
          .innerJoin('users', 'users.id', 'schedule_games.user_id')
          .where({ user_id: auth.user.id })
          .orWhereIn('schedule_games.id', subquery)
          .select('*', 'schedule_games.id')
          .orderBy('schedule_games.created_at', 'desc')
          .paginate(request.params.limitstr, 11)
      }
    } catch (error) {
      console.log(error)
    }

    return {
      myScheduledGames,
    }
  }

  async myScheduledGamesCount({ auth, request, response }) {
    try {
      //const latestScheduledGames = await Archive_ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const myScheduledGamesCount = await Database.from(
        'archive_schedule_games'
      )
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

  async scheduleSearchResults({ auth, request, response }) {
    try {
      var counter = 0
      var mySQL = ''

      var inputValueGameName = request.params.gameNamestr.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValueGameName != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.game_name Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.game_name Like '
        }
        counter = counter + 1
        inputValueGameName = inputValueGameName.replace(/%20/g, '%')
        inputValueGameName = inputValueGameName.replace(/%25/g, '\\')
        inputValueGameName = "'%" + inputValueGameName + "%'"
        mySQL = mySQL + inputValueGameName
      }

      var inputValueRegion = request.params.regionstr.replace(/1981%60%5E/g, '')
      if (inputValueRegion != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.region Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.region Like '
        }
        counter = counter + 1
        inputValueRegion = inputValueRegion.replace(/%20/g, '%')
        inputValueRegion = inputValueRegion.replace(/%25/g, '\\')
        inputValueRegion = "'%" + inputValueRegion + "%'"
        mySQL = mySQL + inputValueRegion
      }

      var inputValueExp = request.params.expstr.replace(/1981%60%5E/g, '')
      if (inputValueExp != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.experience Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.experience Like '
        }
        counter = counter + 1
        inputValueExp = inputValueExp.replace(/%20/g, '%')
        inputValueExp = inputValueExp.replace(/%25/g, '\\')
        inputValueExp = "'%" + inputValueExp + "%'"
        mySQL = mySQL + inputValueExp
      }

      var inputValuePlatform = request.params.platformstr.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValuePlatform != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.platform Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.platform Like '
        }
        counter = counter + 1
        inputValuePlatform = inputValuePlatform.replace(/%20/g, '%')
        inputValuePlatform = inputValuePlatform.replace(/%25/g, '\\')
        inputValuePlatform = "'%" + inputValuePlatform + "%'"
        mySQL = mySQL + inputValuePlatform
      }

      var inputValueDesc = request.params.descstr.replace(/1981%60%5E/g, '')
      if (inputValueDesc != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.description Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.description Like '
        }
        counter = counter + 1
        inputValueDesc = inputValueDesc.replace(/%20/g, '%')
        inputValueDesc = inputValueDesc.replace(/%25/g, '\\')
        inputValueDesc = "'%" + inputValueDesc + "%'"
        mySQL = mySQL + inputValueDesc
      }

      var inputValueOther = request.params.otherstr.replace(/1981%60%5E/g, '')
      if (inputValueOther != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.other Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.other Like '
        }
        counter = counter + 1
        inputValueOther = inputValueOther.replace(/%20/g, '%')
        inputValueOther = inputValueOther.replace(/%25/g, '\\')
        inputValueOther = "'%" + inputValueOther + "%'"
        mySQL = mySQL + inputValueOther
      }

      var inputValueStartDate = request.params.startDate
      if (inputValueStartDate != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.end_date_time >= '
        } else {
          mySQL = mySQL + ' AND schedule_games.end_date_time >= '
        }
        counter = counter + 1
        inputValueStartDate = "'" + inputValueStartDate + "'"
        mySQL = mySQL + inputValueStartDate
      }

      // var inputValueEndDate = request.params.endDate
      // if (inputValueEndDate != ""){
      //   if (counter == 0){
      //     mySQL = mySQL + " WHERE schedule_games.end_date_time <= "
      //   }
      //   else {
      //     mySQL = mySQL + " AND schedule_games.end_date_time <= "
      //   }
      //   counter = counter + 1
      //   inputValueEndDate = "'" + inputValueEndDate + "'"
      //   mySQL = mySQL + inputValueEndDate
      // }

      var inputValueWhenDate = request.params.whenDate.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValueWhenDate != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.start_date_time <= '
        } else {
          mySQL = mySQL + ' AND schedule_games.start_date_time <= '
        }
        counter = counter + 1
        inputValueWhenDate = "'" + inputValueWhenDate + "'"
        mySQL = mySQL + inputValueWhenDate
      }

      var inputValueVisibility = request.params.visibility.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValueVisibility != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.visibility = '
        } else {
          mySQL = mySQL + ' AND schedule_games.visibility = '
        }
        counter = counter + 1
        mySQL = mySQL + inputValueVisibility

        if (inputValueVisibility == '2') {
          mySQL =
            mySQL +
            ' AND schedule_games.user_id in (select friend_id from friends where user_id = '
          inputValueVisibility = auth.user.id + ')'
          mySQL = mySQL + inputValueVisibility
        }
      }

      var inputValuedota2_medal_ranks = request.params.dota2_medal_ranks.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValuedota2_medal_ranks != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.dota2_medal_ranks Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.dota2_medal_ranks Like '
        }
        counter = counter + 1
        inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(
          /%20/g,
          '%'
        )
        inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(
          /%25/g,
          '\\'
        )
        inputValuedota2_medal_ranks = "'%" + inputValuedota2_medal_ranks + "%'"
        mySQL = mySQL + inputValuedota2_medal_ranks
      }

      var inputValuedota2_server_regions = request.params.dota2_server_regions.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValuedota2_server_regions != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.dota2_server_regions Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.dota2_server_regions Like '
        }
        counter = counter + 1
        inputValuedota2_server_regions = inputValuedota2_server_regions.replace(
          /%20/g,
          '%'
        )
        inputValuedota2_server_regions = inputValuedota2_server_regions.replace(
          /%25/g,
          '\\'
        )
        inputValuedota2_server_regions =
          "'%" + inputValuedota2_server_regions + "%'"
        mySQL = mySQL + inputValuedota2_server_regions
      }

      var inputValuedota2_roles = request.params.dota2_roles.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValuedota2_roles != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.dota2_roles Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.dota2_roles Like '
        }
        counter = counter + 1
        inputValuedota2_roles = inputValuedota2_roles.replace(/%20/g, '%')
        inputValuedota2_roles = inputValuedota2_roles.replace(/%25/g, '\\')
        inputValuedota2_roles = "'%" + inputValuedota2_roles + "%'"
        mySQL = mySQL + inputValuedota2_roles
      }

      var inputValueclashroyale_trophies = request.params.clash_royale_trophies.replace(
        /1981%60%5E/g,
        ''
      )
      if (inputValueclashroyale_trophies != '') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.clash_royale_trophies Like '
        } else {
          mySQL = mySQL + ' AND schedule_games.clash_royale_trophies Like '
        }
        counter = counter + 1
        inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(
          /%20/g,
          '%'
        )
        inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(
          /%25/g,
          '\\'
        )
        inputValueclashroyale_trophies =
          "'%" + inputValueclashroyale_trophies + "%'"
        mySQL = mySQL + inputValueclashroyale_trophies
      }

      var inputValueVacancy = request.params.check_full_games
      if (inputValueVacancy == 'true') {
        if (counter == 0) {
          mySQL = mySQL + ' WHERE schedule_games.vacancy = '
        } else {
          mySQL = mySQL + ' AND schedule_games.vacancy = '
        }
        counter = counter + 1
        mySQL = mySQL + inputValueVacancy
      }

      if (counter == 0) {
        mySQL = mySQL + ' WHERE schedule_games.expiry >= NOW() '
      } else {
        mySQL = mySQL + ' AND schedule_games.expiry >= NOW()'
      }
      counter = counter + 1

      var inputLimit = request.params.limitstr
      mySQL = mySQL + ' Limit ' + inputLimit + ',11'

      //console.log(mySQL);

      const latestScheduledGames = await Database.schema.raw(
        'select users.alias, users.id as user_id, users.profile_img, schedule_games.id, schedule_games.game_name, schedule_games.region, schedule_games.experience, schedule_games.start_date_time, schedule_games.end_date_time, schedule_games.platform, schedule_games.description, schedule_games.other, schedule_games.expiry, schedule_games.limit, schedule_games.dota2_medal_ranks, schedule_games.dota2_server_regions, schedule_games.dota2_roles, schedule_games.schedule_games_GUID, schedule_games.clash_royale_trophies, schedule_games.created_at, schedule_games.updated_at from archive_schedule_games Inner Join users ON schedule_games.user_id = users.id' +
          mySQL
      )

      // WORKS!!!! const gameSearchResults = await Database.schema.raw("select * from game_names WHERE game_name LIKE " + "'%the\%Alien%'")
      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async filtered_by_one({ auth, request, response }) {
    try {
      const latestScheduledGames = await Database.from('archive_schedule_games')
        .innerJoin('users', 'users.id', 'archive_schedule_games.user_id')
        .where(
          'archive_schedule_games.archive_schedule_game_id',
          '=',
          request.params.id
        )
        .select('*', 'users.id as user_id')
      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_one({ auth, request, response }) {
    try {
      const getOne = await Database.from('archive_schedule_games').where({
        archive_schedule_game_id: request.params.id,
      })

      return {
        getOne,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update_vacany({ auth, request, response }) {
    try {
      const update_vacany = await Archive_ScheduleGame.query()
        .where({ id: request.input('id') })
        .update({ vacancy: request.input('vacancy') })
      return 'Saved successfully'
    } catch (error) {
      console.log(update_vacany)
    }
  }
}

module.exports = Archive_ScheduleGameController
