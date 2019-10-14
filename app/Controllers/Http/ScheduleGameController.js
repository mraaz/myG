'use strict'
const Database = use('Database')
const ScheduleGame = use("App/Models/ScheduleGame")

class ScheduleGameController {
  async store({auth, request, response}){
    const newScheduleGame = await ScheduleGame.create({
      game_name: request.input('game_name_box'),
      user_id: auth.user.id,
      region: request.input('selected_region'),
      experience: request.input('selected_experience'),
      start_date_time: request.input('start_date_time'),
      end_date_time: request.input('end_date_time'),
      platform: request.input('selected_platform'),
      description: request.input('description_box'),
      other: request.input('other_box'),
      expiry: request.input('selected_expiry'),
      visibility: request.input('visibility'),
      limit: request.input('limit'),
      accept_msg: request.input('accept_msg'),
      dota2_medal_ranks: request.input('dota2_medal_ranks'),
      dota2_server_regions: request.input('dota2_server_regions'),
      dota2_roles: request.input('dota2_roles'),
      schedule_games_GUID: request.input('schedule_games_GUID'),
      clash_royale_trophies: request.input('clash_royale_trophies')
    })
    return newScheduleGame
  }

  async destroy({auth, request, response}){
    if(auth.user){
      try{
        const delete_sch = await Database.table('schedule_games').where({
          id: request.params.id,
        }).delete()

        return 'Deleted successfully'

      } catch(error){
        console.log(error)
      }
    } else{
      return 'You are not Logged In!'
    }
  }

  async show({auth, request, response}){
    try{
      //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const latestScheduledGames = await Database.from('schedule_games').innerJoin('users', 'users.id', 'schedule_games.user_id').select('schedule_games.id', 'schedule_games.game_name').limit(88)

      return {
        latestScheduledGames
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async myScheduledGames({auth, request, response}){
    try{
      //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const subquery = Database.select('schedule_games_id').from('attendees').where({user_id: auth.user.id})
      const myScheduledGames = await Database.from('schedule_games').innerJoin('users', 'users.id', 'schedule_games.user_id').where({user_id: auth.user.id}).orWhereIn('schedule_games.id', subquery).select('*', 'schedule_games.id').orderBy('schedule_games.created_at', 'desc').paginate(request.params.limitstr, 11)
      return {
        myScheduledGames
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async myScheduledGamesCount({auth, request, response}){
    try{
      //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const myScheduledGamesCount = await Database.from('schedule_games').where({id: request.params.id, user_id: auth.user.id}).count('* as no_of_my_posts')
      return {
        myScheduledGamesCount
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async scheduleSearchResults({auth, request, response}){
    try{
      var counter = 0
      var mySQL = ""

      var inputValueGameName = request.params.gameNamestr.replace(/1981%60%5E/g,"")
      if (inputValueGameName != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.game_name Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.game_name Like "
        }
        counter = counter + 1
        inputValueGameName = inputValueGameName.replace(/%20/g,"\%")
        inputValueGameName = inputValueGameName.replace(/%25/g,"\\")
        inputValueGameName = "'%" + inputValueGameName + "%'"
        mySQL = mySQL + inputValueGameName
      }

      var inputValueRegion = request.params.regionstr.replace(/1981%60%5E/g,"")
      if (inputValueRegion != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.region Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.region Like "
        }
        counter = counter + 1
        inputValueRegion = inputValueRegion.replace(/%20/g,"\%")
        inputValueRegion = inputValueRegion.replace(/%25/g,"\\")
        inputValueRegion = "'%" + inputValueRegion + "%'"
        mySQL = mySQL + inputValueRegion
      }

      var inputValueExp = request.params.expstr.replace(/1981%60%5E/g,"")
      if (inputValueExp != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.experience Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.experience Like "
        }
        counter = counter + 1
        inputValueExp = inputValueExp.replace(/%20/g,"\%")
        inputValueExp = inputValueExp.replace(/%25/g,"\\")
        inputValueExp = "'%" + inputValueExp + "%'"
        mySQL = mySQL + inputValueExp
      }

      var inputValuePlatform = request.params.platformstr.replace(/1981%60%5E/g,"")
      if (inputValuePlatform != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.platform Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.platform Like "
        }
        counter = counter + 1
        inputValuePlatform = inputValuePlatform.replace(/%20/g,"\%")
        inputValuePlatform = inputValuePlatform.replace(/%25/g,"\\")
        inputValuePlatform = "'%" + inputValuePlatform + "%'"
        mySQL = mySQL + inputValuePlatform
      }

      var inputValueDesc = request.params.descstr.replace(/1981%60%5E/g,"")
      if (inputValueDesc != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.description Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.description Like "
        }
        counter = counter + 1
        inputValueDesc = inputValueDesc.replace(/%20/g,"\%")
        inputValueDesc = inputValueDesc.replace(/%25/g,"\\")
        inputValueDesc = "'%" + inputValueDesc + "%'"
        mySQL = mySQL + inputValueDesc
      }

      var inputValueOther = request.params.otherstr.replace(/1981%60%5E/g,"")
      if (inputValueOther != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.other Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.other Like "
        }
        counter = counter + 1
        inputValueOther = inputValueOther.replace(/%20/g,"\%")
        inputValueOther = inputValueOther.replace(/%25/g,"\\")
        inputValueOther = "'%" + inputValueOther + "%'"
        mySQL = mySQL + inputValueOther
      }

      var inputValueStartDate = request.params.startDate
      if (inputValueStartDate != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.end_date_time >= "
        }
        else {
          mySQL = mySQL + " AND schedule_games.end_date_time >= "
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

      var inputValueWhenDate = request.params.whenDate.replace(/1981%60%5E/g,"")
      if (inputValueWhenDate != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.start_date_time <= "
        }
        else {
          mySQL = mySQL + " AND schedule_games.start_date_time <= "
        }
        counter = counter + 1
        inputValueWhenDate = "'" + inputValueWhenDate + "'"
        mySQL = mySQL + inputValueWhenDate
      }

      var inputValueVisibility = request.params.visibility.replace(/1981%60%5E/g,"")
      if (inputValueVisibility != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.visibility = "
        }
        else {
          mySQL = mySQL + " AND schedule_games.visibility = "
        }
        counter = counter + 1
        mySQL = mySQL + inputValueVisibility

        if (inputValueVisibility == '2'){
          mySQL = mySQL + " AND schedule_games.user_id in (select friend_id from friends where user_id = "
          inputValueVisibility = auth.user.id + ")"
          mySQL = mySQL + inputValueVisibility
        }
      }

      var inputValuedota2_medal_ranks = request.params.dota2_medal_ranks.replace(/1981%60%5E/g,"")
      if (inputValuedota2_medal_ranks != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.dota2_medal_ranks Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.dota2_medal_ranks Like "
        }
        counter = counter + 1
        inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(/%20/g,"\%")
        inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(/%25/g,"\\")
        inputValuedota2_medal_ranks = "'%" + inputValuedota2_medal_ranks + "%'"
        mySQL = mySQL + inputValuedota2_medal_ranks
      }

      var inputValuedota2_server_regions = request.params.dota2_server_regions.replace(/1981%60%5E/g,"")
      if (inputValuedota2_server_regions != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.dota2_server_regions Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.dota2_server_regions Like "
        }
        counter = counter + 1
        inputValuedota2_server_regions = inputValuedota2_server_regions.replace(/%20/g,"\%")
        inputValuedota2_server_regions = inputValuedota2_server_regions.replace(/%25/g,"\\")
        inputValuedota2_server_regions = "'%" + inputValuedota2_server_regions + "%'"
        mySQL = mySQL + inputValuedota2_server_regions
      }

      var inputValuedota2_roles = request.params.dota2_roles.replace(/1981%60%5E/g,"")
      if (inputValuedota2_roles != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.dota2_roles Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.dota2_roles Like "
        }
        counter = counter + 1
        inputValuedota2_roles = inputValuedota2_roles.replace(/%20/g,"\%")
        inputValuedota2_roles = inputValuedota2_roles.replace(/%25/g,"\\")
        inputValuedota2_roles = "'%" + inputValuedota2_roles + "%'"
        mySQL = mySQL + inputValuedota2_roles
      }

      var inputValueclashroyale_trophies = request.params.clash_royale_trophies.replace(/1981%60%5E/g,"")
      if (inputValueclashroyale_trophies != ""){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.clash_royale_trophies Like "
        }
        else {
          mySQL = mySQL + " AND schedule_games.clash_royale_trophies Like "
        }
        counter = counter + 1
        inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(/%20/g,"\%")
        inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(/%25/g,"\\")
        inputValueclashroyale_trophies = "'%" + inputValueclashroyale_trophies + "%'"
        mySQL = mySQL + inputValueclashroyale_trophies
      }

      var inputValueVacancy = request.params.check_full_games
      if (inputValueVacancy == "true"){
        if (counter == 0){
          mySQL = mySQL + " WHERE schedule_games.vacancy = "
        }
        else {
          mySQL = mySQL + " AND schedule_games.vacancy = "
        }
        counter = counter + 1
        mySQL = mySQL + inputValueVacancy
      }

      var inputLimit = request.params.limitstr
      mySQL = mySQL + " Limit " + inputLimit + ",11"

      const latestScheduledGames = await Database.schema.raw("select users.alias, users.id as user_id, users.profile_img, schedule_games.id, schedule_games.game_name, schedule_games.region, schedule_games.experience, schedule_games.start_date_time, schedule_games.end_date_time, schedule_games.platform, schedule_games.description, schedule_games.other, schedule_games.expiry, schedule_games.limit, schedule_games.dota2_medal_ranks, schedule_games.dota2_server_regions, schedule_games.dota2_roles, schedule_games.schedule_games_GUID, schedule_games.clash_royale_trophies, schedule_games.created_at, schedule_games.updated_at from schedule_games Inner Join users ON schedule_games.user_id = users.id" + mySQL)

      // WORKS!!!! const gameSearchResults = await Database.schema.raw("select * from game_names WHERE game_name LIKE " + "'%the\%Alien%'")
      return {
        latestScheduledGames
      }

    } catch(error){
      console.log(error)
    }
  }

  async filtered_by_one({auth, request, response}){
    try{
      const latestScheduledGames = await Database.from('schedule_games').innerJoin('users', 'users.id', 'schedule_games.user_id').where('schedule_games.id', '=', request.params.id).select('users.id as user_id', 'users.alias', 'users.profile_img', 'schedule_games.id', 'schedule_games.game_name', 'schedule_games.region', 'schedule_games.experience', 'schedule_games.start_date_time', 'schedule_games.end_date_time', 'schedule_games.platform', 'schedule_games.description', 'schedule_games.other', 'schedule_games.expiry', 'schedule_games.limit', 'schedule_games.created_at', 'schedule_games.updated_at')
      return {
        latestScheduledGames
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show_one({auth, request, response}){
    try{
      const getOne = await Database.from('schedule_games').where({id: request.params.id})

      return {
        getOne
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async update_vacany({auth, request, response}){
    try{
      const update_vacany = await ScheduleGame.query().where({id: request.input('id')}).update({vacancy: request.input('vacancy') })
      return 'Saved successfully'

    } catch(error){
      console.log(update_vacany)
    }
  }
}

module.exports = ScheduleGameController
