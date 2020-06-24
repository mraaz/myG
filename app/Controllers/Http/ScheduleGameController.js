'use strict'

const Database = use('Database')

const ScheduleGame = use('App/Models/ScheduleGame')
const ScheduleGamesTransaction = use('App/Models/ScheduleGamesTransaction')
const CoHost = use('App/Models/CoHost')
const GameTags = use('App/Models/GameTag')
const ScheduleGamesTags = use('App/Models/ScheduleGamesTag')
const Attendee = use('App/Models/Attendee')

const NotificationController = use('./NotificationController')
const Archive_AttendeeController = use('./Archive_AttendeeController')
const Archive_ScheduleGameController = use('./Archive_ScheduleGameController')
const Archive_CommentController = use('./Archive_CommentController')
const Archive_ReplyController = use('./Archive_ReplyController')
const Archive_schedule_games_transController = use('./Archive_schedule_games_transController')
const GameNameController = use('./GameNameController')
const InGame_fieldsController = use('./InGame_fieldsController')
const GameTagController = use('./GameTagController')
const AttendeeController = use('./AttendeeController')

class ScheduleGameController {
  async store({ auth, request, response }) {
    let myTime = new Date(new Date(Date.now()).getTime() - 60 * 60 * 1000)

    let newStartdate = new Date(request.input('start_date_time'))
    if (myTime > newStartdate) {
      return
    }

    let end_date_time

    if (request.input('end_date_time') != undefined) {
      end_date_time = new Date(request.input('end_date_time')).toISOString().replace('T', ' ')

      let newEnddate = new Date(request.input('end_date_time'))
      let extendedDate = new Date(new Date(request.input('start_date_time')).getTime() + 15 * 60 * 60 * 24 * 1000)
      if (newEnddate > extendedDate) {
        return
      }
    }

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
          if (tmp == false) {
            return
          }
          gameNameID = tmp.id
        } else {
          gameNameID = getGameName[0].id
          request.params.game_names_id = getGameName[0].id
          gameface.incrementGameCounter({ auth, request, response })
        }

        let end_date_time

        if (request.input('end_date_time') != undefined) {
          end_date_time = new Date(request.input('end_date_time')).toISOString().replace('T', ' ')
          let extendedDate = new Date(new Date(request.input('start_date_time')).getTime() + 15 * 60 * 60 * 24 * 1000)
          if (end_date_time > extendedDate) {
            return
          }
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
          allow_comments: request.input('allow_comments'),
          autoJoin: request.input('autoJoin'),
        })

        if (
          getGameName.length != 0 &&
          ((request.input('value_one') != null && JSON.stringify(request.input('value_one')) !== '{}') ||
            (request.input('value_two') != null && JSON.stringify(request.input('value_two')) !== '{}') ||
            (request.input('value_three') != null && JSON.stringify(request.input('value_three')) !== '{}') ||
            (request.input('value_four') != null && JSON.stringify(request.input('value_four')) !== '{}') ||
            (request.input('value_five') != null && JSON.stringify(request.input('value_five')) !== '{}'))
        ) {
          const getGameFields = await Database.from('game_name_fields')
            .where({
              game_names_id: gameNameID,
            })
            .first()

          if (getGameFields != undefined) {
            let db_obj = ''

            let db_save_value_array = new Array(5).fill(null)

            let attendeeController = new AttendeeController()

            if (getGameFields.in_game_fields != undefined) {
              db_obj = JSON.parse(getGameFields.in_game_fields)
            }

            if (request.input('value_one') != undefined && request.input('value_one') != null && db_obj != '') {
              db_save_value_array = await attendeeController.process_game_name_fields(
                db_obj,
                request.input('value_one'),
                db_save_value_array
              )
            }

            if (request.input('value_two') != undefined && request.input('value_two') != null && db_obj != '') {
              db_save_value_array = await attendeeController.process_game_name_fields(
                db_obj,
                request.input('value_two'),
                db_save_value_array
              )
            }
            if (request.input('value_three') != undefined && request.input('value_three') != null && db_obj != '') {
              db_save_value_array = await attendeeController.process_game_name_fields(
                db_obj,
                request.input('value_three'),
                db_save_value_array
              )
            }
            if (request.input('value_four') != undefined && request.input('value_four') != null && db_obj != '') {
              db_save_value_array = await attendeeController.process_game_name_fields(
                db_obj,
                request.input('value_four'),
                db_save_value_array
              )
            }
            if (request.input('value_five') != undefined && request.input('value_five') != null && db_obj != '') {
              db_save_value_array = await attendeeController.process_game_name_fields(
                db_obj,
                request.input('value_five'),
                db_save_value_array
              )
            }
            let counter = 0

            for (var i = 0; i < db_save_value_array.length; i++) {
              if (db_save_value_array[i] == null) {
                counter = counter + 1
              }
            }

            if (counter != 5) {
              await ScheduleGamesTransaction.create({
                schedule_games_id: newScheduleGame.id,
                game_name_fields_id: getGameFields.id,
                value_one: db_save_value_array[0],
                value_two: db_save_value_array[1],
                value_three: db_save_value_array[2],
                value_four: db_save_value_array[3],
                value_five: db_save_value_array[4],
              })
            }
          }
        }
        if (request.input('autoJoin') == true) {
          const autoJoining = Attendee.create({
            schedule_games_id: newScheduleGame.id,
            user_id: auth.user.id,
            type: 1,
          })
        }
        if (request.input('co_hosts') != null) {
          var arrCo_hosts = request.input('co_hosts').split(',')

          if (arrCo_hosts != '') {
            for (var i = 0; i < arrCo_hosts.length; i++) {
              const create_co_hosts = await CoHost.create({
                schedule_games_id: newScheduleGame.id,
                user_id: arrCo_hosts[i],
              })
            }
          }
        }

        if (request.input('tags') != null && request.input('tags').length > 0) {
          var arrTags = JSON.parse(request.input('tags'))
          for (var i = 0; i < arrTags.length; i++) {
            if (arrTags[i].game_tag_id == null) {
              if (/['/.%#$;`\\]/.test(arrTags[i].value)) {
                continue
              }
              let game_tags_Controller = new GameTagController()
              const game_tag_id = await game_tags_Controller.store({ auth }, arrTags[i].value)

              const create_arrTags = await ScheduleGamesTags.create({
                schedule_games_id: newScheduleGame.id,
                game_tag_id: game_tag_id,
              })
            } else {
              const create_arrTags = await ScheduleGamesTags.create({
                schedule_games_id: newScheduleGame.id,
                game_tag_id: arrTags[i].game_tag_id,
              })

              const update_counter = await GameTags.query()
                .where({ id: arrTags[i].game_tag_id })
                .increment('counter', 1)
            }
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

        let archive_schedule_games_trans = new Archive_schedule_games_transController()

        var schedule_game_id = request.params.id

        const getOne = await Database.from('schedule_games').where({
          id: request.params.id,
        })

        //archive_GameNameField.store({ auth, request, response })
        request.params.game_names_id = getOne[0].game_names_id

        gameface.decrementGameCounter({ auth, request, response })
        //If game is deleted then return, we're not storing this if no1 has it in their profile or has scheduled games for it

        request.params.id = getOne[0].id
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

        var archived_schedule_game = await archive_schedule_games.store({ auth, request, response })

        request.params.archive_schedule_games_id = archived_schedule_game.id

        archive_schedule_games_trans.store({ auth, request, response })

        const allAttendees = await Database.from('attendees').where({
          schedule_games_id: request.params.id,
          type: 1,
        })

        // for (var i = 0; i < allAttendees.length; i++) {
        //   request.params.archive_schedule_game_id = allAttendees[i].schedule_games_id
        //   request.params.user_id = allAttendees[i].user_id
        //   request.params.type = allAttendees[i].type
        //   request.params.dota_2_position_one = allAttendees[i].dota_2_position_one
        //   request.params.dota_2_position_two = allAttendees[i].dota_2_position_two
        //   request.params.dota_2_position_three = allAttendees[i].dota_2_position_three
        //   request.params.dota_2_position_four = allAttendees[i].dota_2_position_four
        //   request.params.dota_2_position_five = allAttendees[i].dota_2_position_five
        //   request.params.og_created_at = allAttendees[i].created_at
        //
        //   archive_attendees.savemySpot({ auth, request, response })
        //
        //   if (auth.user.id != allAttendees[i].user_id) {
        //     request.params.id = allAttendees[i].user_id
        //     request.params.archive_schedule_game_id = schedule_game_id
        //     noti.addGameDeleted({ auth, request, response })
        //     //request.params.payload = `${getOne[0].game_name} was deleted! This game was scheduled to start ${getOne[0].start_date_time}`
        //   }
        // }

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
        .where('schedule_games.user_id', '=', auth.user.id)
        .orWhereIn('schedule_games.id', subquery)

        .select('*', 'schedule_games.id', 'schedule_games.user_id')
        .orderBy('schedule_games.created_at', 'desc')
        .paginate(request.params.limitstr, 10)

      myScheduledGames = await InGame_fieldsController.find_InGame_Fields(myScheduledGames)
    } catch (error) {
      console.log(error)
    }

    return {
      myScheduledGames,
    }
  }

  async myScheduledGames_Upcoming_Games({ auth, request, response }) {
    var myScheduledGames = ''

    let next24hours = new Date(new Date(Date.now()).getTime() + 60 * 60 * 24 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    let last4hours = new Date(new Date(Date.now()).getTime() - 60 * 60 * 4 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    try {
      const subquery = Database.from('attendees')
        .innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id')
        .select('attendees.schedule_games_id')
        .where('attendees.user_id', '=', auth.user.id)
        .where('attendees.type', '=', 1)
        .where('schedule_games.expiry', '>', Database.fn.now())
        .where('schedule_games.start_date_time', '<', next24hours)
        .where('schedule_games.start_date_time', '>', last4hours)

      myScheduledGames = await Database.from('schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where('expiry', '>', Database.fn.now())
        .where('schedule_games.user_id', '=', auth.user.id)
        .where('schedule_games.start_date_time', '<', next24hours)
        .where('schedule_games.start_date_time', '>', last4hours)
        .orWhereIn('schedule_games.id', subquery)
        .select(
          'users.alias',
          'game_names.game_name',
          'game_names.game_img',
          'schedule_games.*',
          'schedule_games.id',
          'schedule_games.user_id'
        )
        .orderBy('schedule_games.start_date_time', 'desc')
        .paginate(request.params.limitstr, 10)

      myScheduledGames = await InGame_fieldsController.find_InGame_Fields(myScheduledGames)

      for (var i = 0; i < myScheduledGames.data.length; i++) {
        let getAllGamers = await Database.from('attendees')
          .where({ schedule_games_id: myScheduledGames.data[i].id, type: 1 })
          .count('* as no_of_gamers')

        let getAllTags = await Database.from('schedule_games_tags')
          .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
          .where({ schedule_games_id: myScheduledGames.data[i].id })
          .select('content')

        myScheduledGames.data[i].tags = getAllTags

        myScheduledGames.data[i].no_of_gamers = getAllGamers[0].no_of_gamers
      }
      myScheduledGames = myScheduledGames.data
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
    // WTF is goin on with ancient games??

    try {
      let arrTags = '',
        latestScheduledGames

      let value_one = null,
        value_two = null,
        value_three = null,
        value_four = null,
        value_five = null

      // let tmp = { dota2_medal_ranks: 'Herald' },
      //   tmp2 = { dota2_roles: 'Pos 1' }
      if (
        request.input('value_one') != null ||
        request.input('value_two') != null ||
        request.input('value_three') != null ||
        request.input('value_four') != null ||
        request.input('value_five') != null
      ) {
        let myKey
        const result = {}

        for (myKey in request.input('value_one')) {
          if (request.input('value_one').hasOwnProperty(myKey)) {
            result[myKey] = request.input('value_one')[myKey]
          }
        }

        for (myKey in request.input('value_two')) {
          if (request.input('value_two').hasOwnProperty(myKey)) {
            result[myKey] = request.input('value_two')[myKey]
          }
        }

        for (myKey in request.input('value_three')) {
          if (request.input('value_three').hasOwnProperty(myKey)) {
            result[myKey] = request.input('value_three')[myKey]
          }
        }

        for (myKey in request.input('value_four')) {
          if (request.input('value_four').hasOwnProperty(myKey)) {
            result[myKey] = request.input('value_four')[myKey]
          }
        }

        for (myKey in request.input('value_five')) {
          if (request.input('value_five').hasOwnProperty(myKey)) {
            result[myKey] = request.input('value_five')[myKey]
          }
        }

        // for (myKey in tmp) {
        //   if (tmp.hasOwnProperty(myKey)) {
        //     result[myKey] = tmp[myKey]
        //   }
        // }
        //
        // for (myKey in tmp2) {
        //   if (tmp2.hasOwnProperty(myKey)) {
        //     result[myKey] = tmp2[myKey]
        //   }
        // }

        const getGameFields = await Database.table('game_names')
          .innerJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
          .where('game_name', '=', request.input('game_name'))
          .select('game_name_fields.*')
          .first()

        if (getGameFields != undefined) {
          let obj = ''

          if (getGameFields.in_game_fields != undefined) {
            obj = JSON.parse(getGameFields.in_game_fields)
          }

          for (let key in obj) {
            if (result[obj[key]] == undefined) {
              continue
            }
            switch (key) {
              case 'value_one':
                value_one = result[obj[key]]
                break
              case 'value_two':
                value_two = result[obj[key]]
                break
              case 'value_three':
                value_three = result[obj[key]]
                break
              case 'value_four':
                value_four = result[obj[key]]
                break
              case 'value_five':
                value_five = result[obj[key]]
                break
            }
          }
        }
      }
      console.log('dasd')
      console.log(value_one)
      console.log(value_two)
      console.log(value_three)
      console.log(value_four)
      console.log(value_five)

      if (request.input('tags') != null && request.input('tags').length != 0) {
        arrTags = request.input('tags').split(',')
        if (arrTags != '') {
          latestScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .innerJoin('schedule_games_tags', 'schedule_games.id', 'schedule_games_tags.schedule_games_id')
            .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
            .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
            .where({ visibility: 1 })
            .whereIn('schedule_games_tags.game_tag_id', arrTags)
            .where((builder) => {
              if (request.input('game_name') != null) builder.where('game_names.game_name', request.input('game_name'))

              if (request.input('region') != null) builder.where('schedule_games.region', request.input('region'))

              if (request.input('experience') != null) builder.where('experience', request.input('experience'))

              //RAAZ UNDO THIS AFTER VIEW GAME IS COMPLETED BY NITIN!!!! https://github.com/mraaz/myGame/issues/274
              //if (request.input('start_date_time') != null) builder.where('start_date_time', '<=', request.input('start_date_time'))

              if (request.input('end_date_time') != null) builder.where('end_date_time', '>=', request.input('end_date_time'))

              if (request.input('platform') != null) builder.where('platform', request.input('platform'))

              if (request.input('description') != null) builder.where('description', request.input('description'))

              if (request.input('vacancy') == false) builder.where('vacancy', 0)

              if (value_one != null) builder.where('schedule_games_transactions.value_one', 'like', '%' + value_one + '%')

              if (value_two != null) builder.where('schedule_games_transactions.value_two', 'like', '%' + value_two + '%')

              if (value_three != null) builder.where('schedule_games_transactions.value_three', 'like', '%' + value_three + '%')

              if (value_four != null) builder.where('schedule_games_transactions.value_four', 'like', '%' + value_four + '%')

              if (value_five != null) builder.where('schedule_games_transactions.value_five', 'like', '%' + value_five + '%')
            })
            .orderBy('schedule_games.created_at', 'desc')
            .select(
              'game_names.game_artwork',
              'game_names.game_name_fields_img',
              'game_names.game_name',
              'schedule_games.start_date_time',
              'users.alias',
              'users.profile_img',
              'schedule_games.experience',
              'schedule_games.schedule_games_GUID',
              'schedule_games.limit',
              'schedule_games.id',
              'users.id as user_id',
              'schedule_games.game_names_id'
            )
            .paginate(request.input('counter'), 10)
        }
      } else {
        latestScheduledGames = await Database.from('schedule_games')
          .innerJoin('users', 'users.id', 'schedule_games.user_id')
          .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
          .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
          .where({ visibility: 1 })
          .where((builder) => {
            if (request.input('game_name') != null) builder.where('game_names.game_name', request.input('game_name'))

            if (request.input('region') != null) builder.where('schedule_games.region', request.input('region'))

            if (request.input('experience') != null) builder.where('experience', request.input('experience'))

            //RAAZ UNDO THIS AFTER VIEW GAME IS COMPLETED BY NITIN!!!! https://github.com/mraaz/myGame/issues/274
            // if (request.input('start_date_time') != null)
            //   builder.where('schedule_games.start_date_time', '<=', request.input('start_date_time'))

            if (request.input('end_date_time') != null) builder.where('schedule_games.end_date_time', '>=', request.input('end_date_time'))

            if (request.input('platform') != null) builder.where('platform', request.input('platform'))

            if (request.input('description') != null) builder.where('description', 'like', '%' + request.input('description') + '%')

            if (request.input('vacancy') == false) builder.where('vacancy', 0)

            if (value_one != null) builder.where('schedule_games_transactions.value_one', 'like', '%' + value_one + '%')

            if (value_two != null) builder.where('schedule_games_transactions.value_two', 'like', '%' + value_two + '%')

            if (value_three != null) builder.where('schedule_games_transactions.value_three', 'like', '%' + value_three + '%')

            if (value_four != null) builder.where('schedule_games_transactions.value_four', 'like', '%' + value_four + '%')

            if (value_five != null) builder.where('schedule_games_transactions.value_five', 'like', '%' + value_five + '%')
          })
          .orderBy('schedule_games.created_at', 'desc')
          .select(
            'game_names.game_artwork',
            'game_names.game_name_fields_img',
            'game_names.game_name',
            'schedule_games.start_date_time',
            'users.alias',
            'users.profile_img',
            'schedule_games.experience',
            'schedule_games.schedule_games_GUID',
            'schedule_games.limit',
            'schedule_games.id',
            'users.id as user_id',
            'schedule_games.game_names_id'
          )
          .paginate(request.input('counter'), 10)
        // .toSQL()
        // .toNative()
      }
      for (var i = 0; i < latestScheduledGames.data.length; i++) {
        let getAllTags = await Database.from('schedule_games_tags')
          .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
          .where({ schedule_games_id: latestScheduledGames.data[i].id })
          .select('content')

        latestScheduledGames.data[i].tags = getAllTags

        let getAllGamers = await Database.from('attendees')
          .where({ schedule_games_id: latestScheduledGames.data[i].id, type: 1 })
          .count('* as no_of_gamers')

        latestScheduledGames.data[i].no_of_gamers = getAllGamers[0].no_of_gamers
      }
      latestScheduledGames = latestScheduledGames.data
      return {
        latestScheduledGames,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async additional_game_info({ auth, request, response }) {
    let join_status = 0,
      approved_gamers = [],
      additional_submit_info = false,
      additional_submit_info_fields = [],
      additional_game_info = []

    try {
      additional_game_info = await Database.from('schedule_games')
        .where('schedule_games.id', '=', request.params.id)
        .first()
      if (additional_game_info != undefined) {
        approved_gamers = await Database.from('attendees')
          .innerJoin('users', 'users.id', 'attendees.user_id')
          .where({ schedule_games_id: request.params.id, type: 1 })
          .select('attendees.*', 'users.id as user_id', 'users.profile_img', 'users.alias')
          .limit(4)

        const my_attendance = await Database.from('attendees')
          .where({ schedule_games_id: request.params.id, user_id: auth.user.id })
          .select('type')
          .first()

        if (my_attendance != undefined) {
          join_status = my_attendance.type
        }
        //Figure out what fields to return, create the key value pair.
        const getGameFields = await Database.from('game_name_fields')
          .where({ game_names_id: additional_game_info.game_names_id })
          .first()

        if (getGameFields != undefined) {
          let obj = '',
            obj2 = '',
            obj3 = '',
            obj4 = ''

          if (getGameFields.in_game_fields != undefined) {
            obj = JSON.parse(getGameFields.in_game_fields)
          }
          if (getGameFields.in_game_field_placeholders != undefined) {
            obj2 = JSON.parse(getGameFields.in_game_field_placeholders)
          }
          if (getGameFields.in_game_field_types != undefined) {
            obj3 = JSON.parse(getGameFields.in_game_field_types)
          }

          if (getGameFields.in_game_field_labels != undefined) {
            obj4 = JSON.parse(getGameFields.in_game_field_labels)
          }

          const getGameTransactions = await Database.from('schedule_games_transactions')
            .where({ schedule_games_id: request.params.id })
            .first()

          if (getGameTransactions != undefined) {
            let arr_game_fields = [],
              arr_game_fields_data = []

            for (let key in obj) {
              arr_game_fields.push(obj[key])
            }
            let tmp_array = []
            switch (arr_game_fields.length - 1) {
              case 4:
                tmp_array[arr_game_fields[4]] = getGameTransactions.value_five
              case 3:
                tmp_array[arr_game_fields[3]] = getGameTransactions.value_four
              case 2:
                tmp_array[arr_game_fields[2]] = getGameTransactions.value_three
              case 1:
                tmp_array[arr_game_fields[1]] = getGameTransactions.value_two
              case 0:
                tmp_array[arr_game_fields[0]] = getGameTransactions.value_one
            }
            for (let key in tmp_array) {
              let tmp_tmp = { [key]: tmp_array[key], label: obj4[key], placeholder: obj2[key], type: obj3[key] }
              additional_submit_info_fields.push([tmp_tmp, obj2[key], obj3[key]])
            }
          }
        }
      }

      if (additional_submit_info_fields.length > 0) {
        additional_submit_info = true
      }

      let getAllGamers = await Database.from('attendees')
        .where({ schedule_games_id: request.params.id, type: 1 })
        .count('* as no_of_gamers')

      return {
        additional_game_info,
        approved_gamers,
        join_status,
        additional_submit_info,
        additional_submit_info_fields,
        getAllGamers,
      }
    } catch (error) {
      console.log(error)
    }
  }

  //trying to figure out position or clash_royale_trophies

  async filtered_by_one({ auth, request, response }) {
    let join_status = 0,
      latestScheduledGames = [],
      approved_gamers = [],
      additional_submit_info = false,
      additional_submit_info_fields = [],
      getAllGamers = 0

    try {
      latestScheduledGames = await Database.from('schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
        .where('schedule_games.schedule_games_GUID', '=', request.params.schedule_games_GUID)
        .select('*', 'users.id as user_id', 'schedule_games.id as id', 'schedule_games.created_at', 'schedule_games.updated_at')

      if (!latestScheduledGames.length) {
        return
      }

      latestScheduledGames = await InGame_fieldsController.find_InGame_Fields_NOT_paginate(latestScheduledGames)

      let getAllTags = await Database.from('schedule_games_tags')
        .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
        .where({ schedule_games_id: latestScheduledGames[0].id })
        .select('content')

      latestScheduledGames[0].tags = getAllTags

      approved_gamers = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .where({ schedule_games_id: latestScheduledGames[0].id, type: 1 })
        .select('attendees.*', 'users.id as user_id', 'users.profile_img', 'users.alias')
        .limit(4)

      const my_attendance = await Database.from('attendees')
        .where({ schedule_games_id: latestScheduledGames[0].id, user_id: auth.user.id })
        .select('type')
        .first()

      if (my_attendance != undefined) {
        join_status = my_attendance.type
      }

      //Figure out what fields to return, create the key value pair.
      const getGameFields = await Database.from('game_name_fields')
        .where({ game_names_id: latestScheduledGames[0].game_names_id })
        .first()

      if (getGameFields != undefined) {
        additional_submit_info = true
        let obj = '',
          obj2 = '',
          obj3 = ''

        if (getGameFields.in_game_fields != undefined) {
          obj = JSON.parse(getGameFields.in_game_fields)
        }
        if (getGameFields.in_game_field_placeholders != undefined) {
          obj2 = JSON.parse(getGameFields.in_game_field_placeholders)
        }
        if (getGameFields.in_game_field_types != undefined) {
          obj3 = JSON.parse(getGameFields.in_game_field_types)
        }

        const getGameTransactions = await Database.from('schedule_games_transactions')
          .where({ schedule_games_id: latestScheduledGames[0].id })
          .first()

        if (getGameTransactions != undefined) {
          let arr_game_fields = [],
            arr_game_fields_data = []

          for (let key in obj) {
            arr_game_fields.push(obj[key])
          }
          let tmp_array = []
          switch (arr_game_fields.length - 1) {
            case 4:
              tmp_array[arr_game_fields[4]] = getGameTransactions.value_five
            case 3:
              tmp_array[arr_game_fields[3]] = getGameTransactions.value_four
            case 2:
              tmp_array[arr_game_fields[2]] = getGameTransactions.value_three
            case 1:
              tmp_array[arr_game_fields[1]] = getGameTransactions.value_two
            case 0:
              tmp_array[arr_game_fields[0]] = getGameTransactions.value_one
          }
          for (let key in tmp_array) {
            let tmp_tmp = { [key]: tmp_array[key] }
            additional_submit_info_fields.push([tmp_tmp, obj2[key], obj3[key]])
          }
        }
      }

      getAllGamers = await Database.from('attendees')
        .where({ schedule_games_id: latestScheduledGames[0].id, type: 1 })
        .count('* as no_of_gamers')

      return {
        latestScheduledGames,
        approved_gamers,
        join_status,
        additional_submit_info,
        additional_submit_info_fields,
        getAllGamers,
      }
    } catch (error) {
      console.log(error)
    }
  }

  // async show_one({ auth, request, response }) {
  //   try {
  //     var getOne = await Database.from('schedule_games')
  //       .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
  //       .select('*', 'schedule_games.id as id', 'schedule_games.created_at', 'schedule_games.updated_at')
  //       .where('schedule_games.id', '=', request.params.id)
  //
  //     getOne = await InGame_fieldsController.find_InGame_Fields_NOT_paginate(getOne)
  //
  //     return {
  //       getOne,
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async update_vacany({ auth }, schedule_game_id, vacancy) {
    try {
      const update_vacany = await ScheduleGame.query()
        .where({ id: schedule_game_id })
        .update({ vacancy: vacancy })
      return
    } catch (error) {
      console.log(error)
    }
  }

  async getAdmin({ auth, request, response }) {
    let isAdmin = false
    try {
      const getAdmin = await Database.from('schedule_games')
        .where({ schedule_games_GUID: request.input('schedule_games_GUID'), user_id: auth.user.id })
        .select('id')

      if (getAdmin.length == 0) {
        const getID = await Database.from('schedule_games')
          .where({ schedule_games_GUID: request.input('schedule_games_GUID') })
          .select('id')
          .first()

        if (getID == undefined) {
          return isAdmin
        }

        const checkCo_host = await Database.from('co_hosts')
          .where({ schedule_games_id: getID.id, user_id: auth.user.id })
          .select('id')

        if (checkCo_host.length > 0) {
          isAdmin = true
        }
      } else {
        isAdmin = true
      }

      return isAdmin
    } catch (error) {
      console.log(error)
    }
  }

  async getHeader_ALL({ auth, request, response }) {
    let additional_info = false,
      additional_info_data = {}
    // additional_info_fields = {},
    // additional_info_types = {},
    // additional_info_placeholder = {},
    // additional_info_values = {}

    try {
      const game_info = await Database.from('game_names')
        .where({ id: request.params.game_names_id })
        .first()

      if (game_info == undefined) {
        return
      }
      const getGameFields = await Database.from('game_name_fields')
        .where({ game_names_id: game_info.id })
        .first()

      if (getGameFields != undefined) {
        let obj = '',
          obj2 = '',
          obj3 = '',
          obj4 = '',
          obj5 = ''

        if (getGameFields.in_game_fields != undefined) {
          obj = JSON.parse(getGameFields.in_game_fields)
        }
        if (getGameFields.in_game_field_labels != undefined) {
          obj2 = JSON.parse(getGameFields.in_game_field_labels)
        }
        if (getGameFields.in_game_field_types != undefined) {
          obj3 = JSON.parse(getGameFields.in_game_field_types)
        }
        if (getGameFields.in_game_field_placeholders != undefined) {
          obj4 = JSON.parse(getGameFields.in_game_field_placeholders)
        }
        if (getGameFields.in_game_field_values != undefined) {
          obj5 = JSON.parse(getGameFields.in_game_field_values)
        }

        for (let key in obj) {
          // let tmp_tmp = { [key]: obj[key] }
          // additional_info_fields[obj[key]] = obj4[obj[key]]
          // additional_info_types[obj[key]] = obj3[obj[key]]
          // additional_info_placeholder[obj[key]] = obj2[obj[key]]
          // additional_info_values[obj[key]] = obj5[obj[key]]

          additional_info_data[obj[key]] = {
            label: obj2[obj[key]],
            type: obj3[obj[key]],
            placeholder: obj4[obj[key]],
            value: obj5[obj[key]],
          }
        }
      }

      if (JSON.stringify(additional_info_data) !== '{}') {
        additional_info = true
      }

      return {
        additional_info,
        additional_info_data,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ScheduleGameController
