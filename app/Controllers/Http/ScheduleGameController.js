'use strict'

const Database = use('Database')
const ScheduleGame = use('App/Models/ScheduleGame')
const ScheduleGamesTransaction = use('App/Models/ScheduleGamesTransaction')

const NotificationController = use('./NotificationController')
const Archive_AttendeeController = use('./Archive_AttendeeController')
const Archive_ScheduleGameController = use('./Archive_ScheduleGameController')
const Archive_CommentController = use('./Archive_CommentController')
const Archive_ReplyController = use('./Archive_ReplyController')
const GameNameController = use('./GameNameController')

class ScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        var gameNameID = null

        const getGameName = await Database.from('game_names').where({
          game_name: request.input('game_name_box'),
        })
        let gameface = new GameNameController()

        if (getGameName.length == 0) {
          request.params.game_name = request.input('game_name_box')
          let tmp = await gameface.createGame({ auth, request, response })
          gameNameID = tmp.id
        } else {
          gameNameID = getGameName[0].id
          request.params.game_names_id = getGameName[0].id
          gameface.incrementGameCounter({ auth, request, response })
        }

        const newScheduleGame = await ScheduleGame.create({
          game_names_id: parseInt(gameNameID, 10),
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
          schedule_games_GUID: request.input('schedule_games_GUID'),
        })

        if (getGameName.length != 0) {
          const getGameNameFields = await Database.from('game_name_fields').where({
            game_names_id: gameNameID,
          })
          var tmpValues = ''
          for (var i = 0; i < getGameNameFields.length; i++) {
            tmpValues = ''
            switch (getGameNameFields[i].in_game_field) {
              case 'dota2_medal_ranks':
                if (request.input('dota2_medal_ranks') != '') {
                  tmpValues = request.input('dota2_medal_ranks')
                }
                break
              case 'dota2_server_regions':
                if (request.input('dota2_server_regions') != '') {
                  tmpValues = request.input('dota2_server_regions')
                }
                break
              case 'dota2_roles':
                if (request.input('dota2_roles') != '') {
                  tmpValues = request.input('dota2_roles')
                }
                break
              case 'clash_royale_trophies':
                if (request.input('clash_royale_trophies') != '') {
                  tmpValues = request.input('clash_royale_trophies')
                }
                break
            }
            if (tmpValues != '') {
              const newSchedule_games_transactions = await ScheduleGamesTransaction.create({
                schedule_games_id: newScheduleGame.id,
                game_name_fields_id: getGameNameFields[i].id,
                values: tmpValues,
              })
            }
          }
        }

        if (parseInt(request.input('visibility'), 10) == 2) {
          const getFriends = await Database.from('friends')
            .where({ user_id: auth.user.id })
            .select('friend_id')
          let noti = new NotificationController()
          for (var i = 0; i < getFriends.length; i++) {
            request.params.other_user_id = getFriends[i].friend_id
            request.params.schedule_games_id = newScheduleGame.id
            noti.addScheduleGame({ auth, request, response })
          }
        }

        return newScheduleGame
      } catch (error) {
        console.log(error)
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        let noti = new NotificationController()
        let archive_attendees = new Archive_AttendeeController()
        let archive_schedule_games = new Archive_ScheduleGameController()
        let archive_comments = new Archive_CommentController()
        let archive_replies = new Archive_ReplyController()
        let gameface = new GameNameController()

        var schedule_game_id = request.params.id

        const getOne = await Database.from('schedule_games').where({
          id: request.params.id,
        })

        request.params.game_names_id = getOne[0].game_names_id
        gameface.decrementGameCounter({ auth, request, response })

        request.params.id = getOne[0].id
        request.params.game_names_id = getOne[0].game_names_id
        request.params.user_id = getOne[0].user_id
        request.params.region = getOne[0].region
        request.params.experience = getOne[0].experience
        request.params.start_date_time = getOne[0].start_date_time
        request.params.end_date_time = getOne[0].end_date_time
        request.params.platform = getOne[0].platform
        request.params.description = getOne[0].description
        request.params.other = getOne[0].other
        request.params.expiry = getOne[0].expiry
        request.params.visibility = getOne[0].visibility
        request.params.limit = getOne[0].limit
        request.params.accept_msg = getOne[0].accept_msg
        request.params.schedule_games_GUID = getOne[0].schedule_games_GUID
        request.params.vacancy = getOne[0].vacancy
        request.params.og_created_at = getOne[0].created_at
        request.params.reason_for_cancel = request.params.reason

        /*
        request.params.dota2_medal_ranks = getOne[0].dota2_medal_ranks
        request.params.dota2_server_regions = getOne[0].dota2_server_regions
        request.params.dota2_roles = getOne[0].dota2_roles
        request.params.clash_royale_trophies = getOne[0].clash_royale_trophies

        */

        await archive_schedule_games.store({ auth, request, response })

        const allAttendees = await Database.from('attendees').where({
          schedule_games_id: request.params.id,
          type: 1,
        })

        for (var i = 0; i < allAttendees.length; i++) {
          request.params.archive_schedule_game_id = allAttendees[i].schedule_games_id
          request.params.user_id = allAttendees[i].user_id
          request.params.type = allAttendees[i].type
          request.params.dota_2_position_one = allAttendees[i].dota_2_position_one
          request.params.dota_2_position_two = allAttendees[i].dota_2_position_two
          request.params.dota_2_position_three = allAttendees[i].dota_2_position_three
          request.params.dota_2_position_four = allAttendees[i].dota_2_position_four
          request.params.dota_2_position_five = allAttendees[i].dota_2_position_five
          request.params.og_created_at = allAttendees[i].created_at

          archive_attendees.savemySpot({ auth, request, response })

          if (auth.user.id != allAttendees[i].user_id) {
            request.params.id = allAttendees[i].user_id
            request.params.archive_schedule_game_id = schedule_game_id
            noti.addGameDeleted({ auth, request, response })
            //request.params.payload = `${getOne[0].game_name} was deleted! This game was scheduled to start ${getOne[0].start_date_time}`
          }
        }

        const getComments = await Database.from('comments').where({
          schedule_games_id: schedule_game_id,
        })
        var getReplies

        for (var i = 0; i < getComments.length; i++) {
          request.params.id = getComments[i].id
          request.params.content = getComments[i].content
          request.params.archive_schedule_game_id = schedule_game_id
          request.params.user_id = getComments[i].user_id
          request.params.og_created_at = getComments[i].created_at
          request.params.og_updated_at = getComments[i].updated_at

          archive_comments.store({ auth, request, response })

          getReplies = await Database.from('replies').where({
            comment_id: getComments[i].id,
          })

          for (var x = 0; x < getReplies.length; x++) {
            request.params.content = getReplies[x].content
            request.params.archive_comment_id = getComments[i].id
            request.params.user_id = getReplies[x].user_id
            request.params.og_created_at = getReplies[x].created_at
            request.params.og_updated_at = getReplies[x].updated_at

            archive_replies.store({ auth, request, response })
          }
        }

        const delete_sch = await Database.table('schedule_games')
          .where({
            id: schedule_game_id,
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

  // async show({ auth, request, response }) {
  //   try {
  //     //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
  //     const latestScheduledGames = await Database.from('schedule_games')
  //       .innerJoin('users', 'users.id', 'schedule_games.user_id')
  //       .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
  //       .select('schedule_games.id', 'game_names.game_name')
  //       .limit(88)
  //
  //     return {
  //       latestScheduledGames,
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async myScheduledGames({ auth, request, response }) {
    var myScheduledGames = ''
    try {
      //   //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const subquery = Database.select('schedule_games_id')
        .from('attendees')
        .where({ user_id: auth.user.id })

      myScheduledGames = await Database.from('schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where((builder) => {
          if (request.params.exclude_expired == 'true') builder.where('expiry', '>', Database.fn.now())
        })
        .where({ user_id: auth.user.id })
        .orWhereIn('schedule_games.id', subquery)

        .select('*', 'schedule_games.id')
        .orderBy('schedule_games.created_at', 'desc')
        .paginate(request.params.limitstr, 10)

      for (var i = 0; i < myScheduledGames.data.length; i++) {
        var myScheduledTrans = await Database.from('schedule_games_transactions')
          .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
          .where({ schedule_games_id: myScheduledGames.data[i].id })

        for (var x = 0; x < myScheduledTrans.length; x++) {
          switch (myScheduledTrans[x].in_game_field) {
            case 'dota2_medal_ranks':
              myScheduledGames.data[i].dota2_medal_ranks = myScheduledTrans[x].values
              break
            case 'dota2_server_regions':
              myScheduledGames.data[i].dota2_server_regions = myScheduledTrans[x].values
              break
            case 'dota2_roles':
              myScheduledGames.data[i].dota2_roles = myScheduledTrans[x].values
              break
            case 'clash_royale_trophies':
              myScheduledGames.data[i].clash_royale_trophies = myScheduledTrans[x].values
              break
          }
        }
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
      //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const myScheduledGamesCount = await Database.from('schedule_games')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_posts')
      return {
        myScheduledGamesCount,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async scheduleSearchResults({ auth, request, response }) {
    //WHEN PUTTING IN TRY AND CATCH, WE GET 500 ERROR :(, WHEREAS REMOVING IT WORKS? WTF!!!!

    console.log(request.input('region'))

    const latestScheduledGames = await Database.from('schedule_games')
      .innerJoin('users', 'users.id', 'schedule_games.user_id')
      .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
      .where((builder) => {
        if (request.input('game_name') != null) builder.where('game_names.game_name', request.input('game_name'))

        if (request.input('region') != null) builder.where('schedule_games.region', request.input('region'))

        if (request.input('experience') != null) builder.where('experience', request.input('experience'))

        if (request.input('start_date_time') != null) builder.where('start_date_time', '<=', request.input('start_date_time'))

        if (request.input('end_date_time') != null) builder.where('end_date_time', '>=', request.input('end_date_time'))

        if (request.input('platform') != null) builder.where('platform', request.input('platform'))

        if (request.input('description') != null) builder.where('description', request.input('description'))

        if (request.input('other') != null) builder.where('other', request.input('other'))

        if (request.input('visibility') != null) builder.where('visibility', request.input('visibility'))

        // .where((builder) => {
        //   if (request.input('region') != null) builder.where('region', request.input('region'))
        // })
        // .where((builder) => {
        //   if (request.input('experience') != null) builder.where('experience', request.input('experience'))
        // })
        // .where((builder) => {
        //   if (request.input('start_date_time') != null) builder.where('start_date_time', '<=', request.input('start_date_time'))
        // })
        // .where((builder) => {
        //   if (request.input('platform') != null) builder.where('platform', request.input('platform'))
        // })
        // .where((builder) => {
        //   if (request.input('description') != null) builder.where('description', request.input('description'))
        // })
        // .where((builder) => {
        //   if (request.input('other') != null) builder.where('other', request.input('other'))
        // })
        // .where((builder) => {
        //   if (request.input('visibility') != null) builder.where('visibility', request.input('visibility'))
        // })

        //Dota 2
        // if (request.input('dota2_medal_ranks') != null)
        //   builder.where('values', 'like', '%' + request.input('dota2_medal_ranks') + '%').where('in_game_field', '=', 'dota2_medal_ranks')
        //
        // if (request.input('dota2_server_regions') != null)
        //   builder.where('dota2_server_regions', 'like', '%' + request.input('dota2_server_regions') + '%')
        //
        // if (request.input('dota2_roles') != null) builder.where('dota2_roles', 'like', '%' + request.input('dota2_roles') + '%')
        //
        // //Clash Royale
        // if (request.input('clash_royale_trophies') != null)
        //   builder.where('clash_royale_trophies', 'like', '%' + request.input('clash_royale_trophies') + '%')
      })
      .limit(11)
      .offset(parseInt(request.input('limit_clause'), 10))
      .orderBy('schedule_games.created_at', 'desc')
      .select('*', 'schedule_games.id', 'users.id as user_id')

    console.log('step 1')

    //RAAAZ BROKEN!!!!! https://github.com/mraaz/myGame/issues/157
    //NEED TO REVIST ONCE paginate is implemented.
    //console.log(latestScheduledGames.length)

    for (var i = 0; i < latestScheduledGames.length; i++) {
      console.log('step 2')
      var myScheduledTrans = await Database.from('schedule_games_transactions')
        .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
        .where({ schedule_games_id: latestScheduledGames[i].id })
        .where((builder) => {
          //Dota 2
          if (request.input('dota2_medal_ranks') != null)
            builder.where('values', 'like', '%' + request.input('dota2_medal_ranks') + '%').where('in_game_field', '=', 'dota2_medal_ranks')

          if (request.input('dota2_server_regions') != null)
            builder
              .where('values', 'like', '%' + request.input('dota2_server_regions') + '%')
              .where('in_game_field', '=', 'dota2_server_regions')

          if (request.input('dota2_roles') != null)
            builder.where('values', 'like', '%' + request.input('dota2_roles') + '%').where('in_game_field', '=', 'dota2_roles')

          //Clash Royale
          if (request.input('clash_royale_trophies') != null)
            builder
              .where('values', 'like', '%' + request.input('clash_royale_trophies') + '%')
              .where('in_game_field', '=', 'clash_royale_trophies')
        })

      for (var x = 0; x < myScheduledTrans.length; x++) {
        console.log('step 3')
        switch (myScheduledTrans[x].in_game_field) {
          case 'dota2_medal_ranks':
            latestScheduledGames[i].dota2_medal_ranks = myScheduledTrans[x].values
            break
          case 'dota2_server_regions':
            latestScheduledGames[i].dota2_server_regions = myScheduledTrans[x].values
            break
          case 'dota2_roles':
            latestScheduledGames[i].dota2_roles = myScheduledTrans[x].values
            break
          case 'clash_royale_trophies':
            latestScheduledGames[i].clash_royale_trophies = myScheduledTrans[x].values
            break
        }
      }
    }
    console.log(latestScheduledGames)

    return {
      latestScheduledGames,
    }
  }

  // async scheduleSearchResults({auth, request, response}){
  //   try{
  //     var counter = 0
  //     var mySQL = ""
  //
  //     var inputValueGameName = request.params.gameNamestr.replace(/1981%60%5E/g,"")
  //     if (inputValueGameName != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.game_name Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.game_name Like "
  //       }
  //       counter = counter + 1
  //       inputValueGameName = inputValueGameName.replace(/%20/g,"\%")
  //       inputValueGameName = inputValueGameName.replace(/%25/g,"\\")
  //       inputValueGameName = "'%" + inputValueGameName + "%'"
  //       mySQL = mySQL + inputValueGameName
  //     }
  //
  //     var inputValueRegion = request.params.regionstr.replace(/1981%60%5E/g,"")
  //     if (inputValueRegion != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.region Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.region Like "
  //       }
  //       counter = counter + 1
  //       inputValueRegion = inputValueRegion.replace(/%20/g,"\%")
  //       inputValueRegion = inputValueRegion.replace(/%25/g,"\\")
  //       inputValueRegion = "'%" + inputValueRegion + "%'"
  //       mySQL = mySQL + inputValueRegion
  //     }
  //
  //     var inputValueExp = request.params.expstr.replace(/1981%60%5E/g,"")
  //     if (inputValueExp != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.experience Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.experience Like "
  //       }
  //       counter = counter + 1
  //       inputValueExp = inputValueExp.replace(/%20/g,"\%")
  //       inputValueExp = inputValueExp.replace(/%25/g,"\\")
  //       inputValueExp = "'%" + inputValueExp + "%'"
  //       mySQL = mySQL + inputValueExp
  //     }
  //
  //     var inputValuePlatform = request.params.platformstr.replace(/1981%60%5E/g,"")
  //     if (inputValuePlatform != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.platform Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.platform Like "
  //       }
  //       counter = counter + 1
  //       inputValuePlatform = inputValuePlatform.replace(/%20/g,"\%")
  //       inputValuePlatform = inputValuePlatform.replace(/%25/g,"\\")
  //       inputValuePlatform = "'%" + inputValuePlatform + "%'"
  //       mySQL = mySQL + inputValuePlatform
  //     }
  //
  //     var inputValueDesc = request.params.descstr.replace(/1981%60%5E/g,"")
  //     if (inputValueDesc != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.description Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.description Like "
  //       }
  //       counter = counter + 1
  //       inputValueDesc = inputValueDesc.replace(/%20/g,"\%")
  //       inputValueDesc = inputValueDesc.replace(/%25/g,"\\")
  //       inputValueDesc = "'%" + inputValueDesc + "%'"
  //       mySQL = mySQL + inputValueDesc
  //     }
  //
  //     var inputValueOther = request.params.otherstr.replace(/1981%60%5E/g,"")
  //     if (inputValueOther != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.other Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.other Like "
  //       }
  //       counter = counter + 1
  //       inputValueOther = inputValueOther.replace(/%20/g,"\%")
  //       inputValueOther = inputValueOther.replace(/%25/g,"\\")
  //       inputValueOther = "'%" + inputValueOther + "%'"
  //       mySQL = mySQL + inputValueOther
  //     }
  //
  //     var inputValueStartDate = request.params.startDate
  //     if (inputValueStartDate != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.end_date_time >= "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.end_date_time >= "
  //       }
  //       counter = counter + 1
  //       inputValueStartDate = "'" + inputValueStartDate + "'"
  //       mySQL = mySQL + inputValueStartDate
  //     }
  //
  //     // var inputValueEndDate = request.params.endDate
  //     // if (inputValueEndDate != ""){
  //     //   if (counter == 0){
  //     //     mySQL = mySQL + " WHERE schedule_games.end_date_time <= "
  //     //   }
  //     //   else {
  //     //     mySQL = mySQL + " AND schedule_games.end_date_time <= "
  //     //   }
  //     //   counter = counter + 1
  //     //   inputValueEndDate = "'" + inputValueEndDate + "'"
  //     //   mySQL = mySQL + inputValueEndDate
  //     // }
  //
  //     var inputValueWhenDate = request.params.whenDate.replace(/1981%60%5E/g,"")
  //     if (inputValueWhenDate != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.start_date_time <= "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.start_date_time <= "
  //       }
  //       counter = counter + 1
  //       inputValueWhenDate = "'" + inputValueWhenDate + "'"
  //       mySQL = mySQL + inputValueWhenDate
  //     }
  //
  //     var inputValueVisibility = request.params.visibility.replace(/1981%60%5E/g,"")
  //     if (inputValueVisibility != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.visibility = "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.visibility = "
  //       }
  //       counter = counter + 1
  //       mySQL = mySQL + inputValueVisibility
  //
  //       if (inputValueVisibility == '2'){
  //         mySQL = mySQL + " AND schedule_games.user_id in (select friend_id from friends where user_id = "
  //         inputValueVisibility = auth.user.id + ")"
  //         mySQL = mySQL + inputValueVisibility
  //       }
  //     }
  //
  //     var inputValuedota2_medal_ranks = request.params.dota2_medal_ranks.replace(/1981%60%5E/g,"")
  //     if (inputValuedota2_medal_ranks != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.dota2_medal_ranks Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.dota2_medal_ranks Like "
  //       }
  //       counter = counter + 1
  //       inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(/%20/g,"\%")
  //       inputValuedota2_medal_ranks = inputValuedota2_medal_ranks.replace(/%25/g,"\\")
  //       inputValuedota2_medal_ranks = "'%" + inputValuedota2_medal_ranks + "%'"
  //       mySQL = mySQL + inputValuedota2_medal_ranks
  //     }
  //
  //     var inputValuedota2_server_regions = request.params.dota2_server_regions.replace(/1981%60%5E/g,"")
  //     if (inputValuedota2_server_regions != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.dota2_server_regions Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.dota2_server_regions Like "
  //       }
  //       counter = counter + 1
  //       inputValuedota2_server_regions = inputValuedota2_server_regions.replace(/%20/g,"\%")
  //       inputValuedota2_server_regions = inputValuedota2_server_regions.replace(/%25/g,"\\")
  //       inputValuedota2_server_regions = "'%" + inputValuedota2_server_regions + "%'"
  //       mySQL = mySQL + inputValuedota2_server_regions
  //     }
  //
  //     var inputValuedota2_roles = request.params.dota2_roles.replace(/1981%60%5E/g,"")
  //     if (inputValuedota2_roles != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.dota2_roles Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.dota2_roles Like "
  //       }
  //       counter = counter + 1
  //       inputValuedota2_roles = inputValuedota2_roles.replace(/%20/g,"\%")
  //       inputValuedota2_roles = inputValuedota2_roles.replace(/%25/g,"\\")
  //       inputValuedota2_roles = "'%" + inputValuedota2_roles + "%'"
  //       mySQL = mySQL + inputValuedota2_roles
  //     }
  //
  //     var inputValueclashroyale_trophies = request.params.clash_royale_trophies.replace(/1981%60%5E/g,"")
  //     if (inputValueclashroyale_trophies != ""){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.clash_royale_trophies Like "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.clash_royale_trophies Like "
  //       }
  //       counter = counter + 1
  //       inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(/%20/g,"\%")
  //       inputValueclashroyale_trophies = inputValueclashroyale_trophies.replace(/%25/g,"\\")
  //       inputValueclashroyale_trophies = "'%" + inputValueclashroyale_trophies + "%'"
  //       mySQL = mySQL + inputValueclashroyale_trophies
  //     }
  //
  //     var inputValueVacancy = request.params.check_full_games
  //     if (inputValueVacancy == "true"){
  //       if (counter == 0){
  //         mySQL = mySQL + " WHERE schedule_games.vacancy = "
  //       }
  //       else {
  //         mySQL = mySQL + " AND schedule_games.vacancy = "
  //       }
  //       counter = counter + 1
  //       mySQL = mySQL + inputValueVacancy
  //     }
  //
  //     //THIS code will excute all the time, regardless of fields
  //     if (counter == 0){
  //       mySQL = mySQL + " WHERE schedule_games.expiry >= NOW() "
  //     }
  //     else {
  //       mySQL = mySQL + " AND schedule_games.expiry >= NOW()"
  //     }
  //     counter = counter + 1
  //
  //     var inputLimit = request.params.limitstr
  //     mySQL = mySQL + " Limit " + inputLimit + ",11"
  //
  //     //console.log(mySQL);
  //
  //     const latestScheduledGames = await Database.schema.raw("select users.alias, users.id as user_id, users.profile_img, schedule_games.id, schedule_games.game_name, schedule_games.region, schedule_games.experience, schedule_games.start_date_time, schedule_games.end_date_time, schedule_games.platform, schedule_games.description, schedule_games.other, schedule_games.expiry, schedule_games.limit, schedule_games.dota2_medal_ranks, schedule_games.dota2_server_regions, schedule_games.dota2_roles, schedule_games.schedule_games_GUID, schedule_games.clash_royale_trophies, schedule_games.created_at, schedule_games.updated_at from schedule_games Inner Join users ON schedule_games.user_id = users.id" + mySQL)
  //
  //     // WORKS!!!! const gameSearchResults = await Database.schema.raw("select * from game_names WHERE game_name LIKE " + "'%the\%Alien%'")
  //     return {
  //       latestScheduledGames
  //     }
  //
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  async filtered_by_one({ auth, request, response }) {
    try {
      const latestScheduledGames = await Database.from('schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where('schedule_games.id', '=', request.params.id)
        .select('*', 'users.id as user_id', 'schedule_games.id', 'schedule_games.created_at', 'schedule_games.updated_at')

      for (var i = 0; i < latestScheduledGames.length; i++) {
        var myScheduledTrans = await Database.from('schedule_games_transactions')
          .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
          .where({ schedule_games_id: latestScheduledGames[i].id })

        for (var x = 0; x < myScheduledTrans.length; x++) {
          switch (myScheduledTrans[x].in_game_field) {
            case 'dota2_medal_ranks':
              latestScheduledGames[i].dota2_medal_ranks = myScheduledTrans[x].values
              break
            case 'dota2_server_regions':
              latestScheduledGames[i].dota2_server_regions = myScheduledTrans[x].values
              break
            case 'dota2_roles':
              latestScheduledGames[i].dota2_roles = myScheduledTrans[x].values
              break
            case 'clash_royale_trophies':
              latestScheduledGames[i].clash_royale_trophies = myScheduledTrans[x].values
              break
          }
        }
      }
      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_one({ auth, request, response }) {
    try {
      const getOne = await Database.from('schedule_games')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .select('*', 'schedule_games.id', 'schedule_games.created_at', 'schedule_games.updated_at')
        .where({
          id: request.params.id,
        })

      for (var i = 0; i < getOne.length; i++) {
        var myScheduledTrans = await Database.from('schedule_games_transactions')
          .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
          .where({ schedule_games_id: getOne[i].id })

        for (var x = 0; x < myScheduledTrans.length; x++) {
          switch (myScheduledTrans[x].in_game_field) {
            case 'dota2_medal_ranks':
              getOne[i].dota2_medal_ranks = myScheduledTrans[x].values
              break
            case 'dota2_server_regions':
              getOne[i].dota2_server_regions = myScheduledTrans[x].values
              break
            case 'dota2_roles':
              getOne[i].dota2_roles = myScheduledTrans[x].values
              break
            case 'clash_royale_trophies':
              getOne[i].clash_royale_trophies = myScheduledTrans[x].values
              break
          }
        }
      }

      return {
        getOne,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update_vacany({ auth, request, response }) {
    try {
      const update_vacany = await ScheduleGame.query()
        .where({ id: request.input('id') })
        .update({ vacancy: request.input('vacancy') })
      return 'Saved successfully'
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ScheduleGameController
