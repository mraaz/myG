'use strict'

const Database = use('Database')
const ScheduleGame = use('App/Models/ScheduleGame')
const ScheduleGamesTransaction = use('App/Models/ScheduleGamesTransaction')
const CoHost = use('App/Models/CoHost')
const GameTags = use('App/Models/GameTag')
const ScheduleGamesTags = use('App/Models/ScheduleGamesTag')

const NotificationController = use('./NotificationController')
const Archive_AttendeeController = use('./Archive_AttendeeController')
const Archive_ScheduleGameController = use('./Archive_ScheduleGameController')
const Archive_CommentController = use('./Archive_CommentController')
const Archive_ReplyController = use('./Archive_ReplyController')
const Archive_schedule_games_transController = use('./Archive_schedule_games_transController')
const GameNameController = use('./GameNameController')
const Attendee = use('App/Models/Attendee')
const InGame_fieldsController = use('./InGame_fieldsController')
const GameTagController = use('./GameTagController')

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
        })

        if (
          getGameName.length != 0 &&
          (request.input('dota2_medal_ranks') != null ||
            request.input('dota2_server_regions') != null ||
            request.input('dota2_roles') != null ||
            request.input('clash_royale_trophies') != null)
        ) {
          const getGameNameFields = await Database.from('game_name_fields')
            .where({
              game_names_id: 998,
            })
            .first()
          if (getGameNameFields != undefined) {
            let obj = JSON.parse(getGameNameFields.in_game_fields)
            let value_one = null,
              value_two = null,
              value_three = null

            if (request.input('dota2_medal_ranks') != null && obj.value_one == 'dota2_medal_ranks') {
              value_one = request.input('dota2_medal_ranks')
            }

            if (request.input('dota2_server_regions') != null && obj.value_two == 'dota2_server_regions') {
              value_two = request.input('dota2_server_regions')
            }

            if (request.input('dota2_roles') != null && obj.value_three == 'dota2_roles') {
              value_three = request.input('dota2_roles')
            }

            if (request.input('clash_royale_trophies') != null && obj.value_one == 'clash_royale_trophies') {
              value_one = request.input('clash_royale_trophies')
            }
            await ScheduleGamesTransaction.create({
              schedule_games_id: newScheduleGame.id,
              game_name_fields_id: getGameNameFields.id,
              value_one: value_one,
              value_two: value_two,
              value_three: value_three,
            })
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
      if (request.input('tags') != null) {
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

              if (request.input('start_date_time') != null) builder.where('start_date_time', '<=', request.input('start_date_time'))

              if (request.input('end_date_time') != null) builder.where('end_date_time', '>=', request.input('end_date_time'))

              if (request.input('platform') != null) builder.where('platform', request.input('platform'))

              if (request.input('description') != null) builder.where('description', request.input('description'))

              if (request.input('vacancy') == false) builder.where('vacancy', 0)

              if (request.input('dota2_medal_ranks') != null)
                builder.where('schedule_games_transactions.value_one', 'like', '%' + request.input('dota2_medal_ranks') + '%')

              if (request.input('dota2_server_regions') != null)
                builder.where('schedule_games_transactions.value_two', 'like', '%' + request.input('dota2_server_regions') + '%')

              if (request.input('dota2_roles') != null)
                builder.where('schedule_games_transactions.value_three', 'like', '%' + request.input('dota2_roles') + '%')

              if (request.input('clash_royale_trophies') != null)
                builder.where('schedule_games_transactions.value_one', 'like', '%' + request.input('clash_royale_trophies') + '%')
            })
            .orderBy('schedule_games.created_at', 'desc')
            .select(
              'game_names.game_artwork',
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

            if (request.input('dota2_medal_ranks') != null)
              builder.where('schedule_games_transactions.value_one', 'like', '%' + request.input('dota2_medal_ranks') + '%')
            // .andWhere('game_name_fields.in_game_field', '=', 'dota2_medal_ranks')
            // .andWhere((qB) => qB.where('game_name_fields.in_game_field', '=', 'dota2_medal_ranks'))

            if (request.input('dota2_server_regions') != null)
              builder.where('schedule_games_transactions.value_two', 'like', '%' + request.input('dota2_server_regions') + '%')

            if (request.input('dota2_roles') != null)
              builder.where('schedule_games_transactions.value_three', 'like', '%' + request.input('dota2_roles') + '%')
            //.andWhere('game_name_fields.in_game_field', '=', 'dota2_roles')

            //Clash Royale
            if (request.input('clash_royale_trophies') != null)
              builder.where('schedule_games_transactions.value_one', 'like', '%' + request.input('clash_royale_trophies') + '%')
          })
          .orderBy('schedule_games.created_at', 'desc')
          .select(
            'game_names.game_artwork',
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
    let join_status = 0
    try {
      var additional_game_info = await Database.from('schedule_games')
        .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
        .where('schedule_games.id', '=', request.params.id)
        .select(
          'schedule_games.*',
          'schedule_games_transactions.value_one',
          'schedule_games_transactions.value_two',
          'schedule_games_transactions.value_three',
          'schedule_games_transactions.value_four',
          'schedule_games_transactions.value_five'
        )

      const approved_gamers = await Database.from('attendees')
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

      return {
        additional_game_info,
        approved_gamers,
        join_status,
      }
    } catch (error) {
      console.log(error)
    }
  }

  //trying to figure out position or clash_royale_trophies

  async filtered_by_one({ auth, request, response }) {
    let join_status = 0
    try {
      var latestScheduledGames = await Database.from('schedule_games')
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

      const approved_gamers = await Database.from('attendees')
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

      return {
        latestScheduledGames,
        approved_gamers,
        join_status,
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
}

module.exports = ScheduleGameController
