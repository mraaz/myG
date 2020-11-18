'use strict'

const Database = use('Database')

const ScheduleGame = use('App/Models/ScheduleGame')
const ScheduleGamesTransaction = use('App/Models/ScheduleGamesTransaction')
const CoHost = use('App/Models/CoHost')
const GameTags = use('App/Models/GameTag')
const ScheduleGamesTags = use('App/Models/ScheduleGamesTag')
const Attendee = use('App/Models/Attendee')

const GameNameController = use('./GameNameController')
const InGame_fieldsController = use('./InGame_fieldsController')
const GameTagController = use('./GameTagController')
const AttendeeController = use('./AttendeeController')
const LoggingRepository = require('../../Repositories/Logging')

const MAX_GAME_TAGS = 9
const MAX_CO_HOSTS = 5

class ScheduleGameController {
  async store({ auth, request, response }) {
    if (request.input('start_date_time') == undefined || request.input('game_name_box') == undefined) {
      return
    }

    if (request.input('start_date_time') == null || request.input('game_name_box') == null) {
      return
    }

    let myTime = new Date(new Date(Date.now()).getTime() - 60 * 60 * 1000)

    let newStartdate = new Date(request.input('start_date_time'))
    if (myTime > newStartdate) {
      return
    }

    let end_date_time

    if (request.input('end_date_time') != undefined && request.input('end_date_time') != null) {
      end_date_time = new Date(request.input('end_date_time')).toISOString().replace('T', ' ')

      let newEnddate = new Date(request.input('end_date_time'))
      let extendedDate = new Date(new Date(request.input('start_date_time')).getTime() + 15 * 60 * 60 * 24 * 1000)
      if (newEnddate > extendedDate) {
        return
      }
      end_date_time = request.input('end_date_time')
    } else {
      end_date_time = new Date(new Date(request.input('start_date_time')).getTime() + 60 * 60 * 18 * 1000)
    }

    if (auth.user) {
      try {
        let gameNameID = null
        const getGameName = await Database.from('game_names').where({
          game_name: request.input('game_name_box'),
        })
        let gameface = new GameNameController()

        if (getGameName.length == 0) {
          let tmp = await gameface.createGame({ auth }, request.input('game_name_box'))
          if (tmp == false) {
            return
          }
          gameNameID = tmp.id
        } else {
          gameNameID = getGameName[0].id
          gameface.incrementGameCounter({ auth }, request.input('game_names_id'))
        }

        const newScheduleGame = await ScheduleGame.create({
          game_names_id: parseInt(gameNameID, 10),
          user_id: auth.user.id,
          region: request.input('selected_region'),
          experience: request.input('selected_experience'),
          start_date_time: request.input('start_date_time'),
          end_date_time: end_date_time,
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
          cron: request.input('cron'),
          occurrence: request.input('occurrence'),
          repeatEvery: request.input('repeatEvery'),
          autoJoinHost: request.input('autoJoinHost'),
          mic: request.input('mic'),
          eighteen_plus: request.input('eighteen_plus'),
          game_languages: request.input('game_languages'),
        })

        if (
          getGameName.length != 0 &&
          ((request.input('value_one') != null && JSON.stringify(request.input('value_one')) != '{}') ||
            (request.input('value_two') != null && JSON.stringify(request.input('value_two')) != '{}') ||
            (request.input('value_three') != null && JSON.stringify(request.input('value_three')) != '{}') ||
            (request.input('value_four') != null && JSON.stringify(request.input('value_four')) != '{}') ||
            (request.input('value_five') != null && JSON.stringify(request.input('value_five')) != '{}'))
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
        if (request.input('autoJoinHost') == true) {
          const autoJoining = Attendee.create({
            schedule_games_id: newScheduleGame.id,
            user_id: auth.user.id,
            type: 1,
          })
        }
        if (request.input('co_hosts') != undefined && request.input('co_hosts') != null) {
          var arrCo_hosts = request.input('co_hosts').split(',')

          if (arrCo_hosts != '') {
            for (var i = 0; i < arrCo_hosts.length && i < MAX_CO_HOSTS; i++) {
              const create_co_hosts = await CoHost.create({
                schedule_games_id: newScheduleGame.id,
                user_id: arrCo_hosts[i],
              })
            }
          }
        }

        if (request.input('tags') != undefined && request.input('tags') != null && request.input('tags').length > 0) {
          var arrTags = JSON.parse(request.input('tags'))
          for (var i = 0; i < MAX_GAME_TAGS && i < arrTags.length; i++) {
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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async update({ auth, request, response }) {
    if (request.input('start_date_time') == undefined || request.input('game_name_box') == undefined) {
      return
    }

    if (request.input('start_date_time') == null || request.input('game_name_box') == null) {
      return
    }

    let myTime = new Date(new Date(Date.now()).getTime() - 60 * 60 * 1000)

    let newStartdate = new Date(request.input('start_date_time'))
    // if (myTime > newStartdate) {
    //   return
    // }

    let end_date_time

    if (request.input('end_date_time') != undefined && request.input('end_date_time') != null) {
      end_date_time = new Date(request.input('end_date_time')).toISOString().replace('T', ' ')

      let newEnddate = new Date(request.input('end_date_time'))
      let extendedDate = new Date(new Date(request.input('start_date_time')).getTime() + 15 * 60 * 60 * 24 * 1000)
      // if (newEnddate > extendedDate) {
      //   return
      // }
      end_date_time = request.input('end_date_time')
    } else {
      end_date_time = new Date(new Date(request.input('start_date_time')).getTime() + 60 * 60 * 18 * 1000)
    }

    if (auth.user) {
      try {
        var gameNameID = null

        if (request.input('id') == undefined || request.input('id') == null) {
          return
        }

        const getOne = await Database.from('schedule_games')
          .where({
            id: request.input('id'),
          })
          .first()

        if (getOne == undefined) {
          return
        }

        const getGameName = await Database.from('game_names').where({
          game_name: request.input('game_name_box'),
        })
        let gameface = new GameNameController()

        if (getGameName.length == 0) {
          let tmp = await gameface.createGame({ auth }, request.input('game_name_box'))
          if (tmp == false) {
            return
          }
          gameNameID = tmp.id
        } else {
          gameNameID = getGameName[0].id
          if (getOne.game_name != getGameName.game_name) {
            gameface.incrementGameCounter({ auth }, request.input('game_name_box'))
          }
        }

        const updateScheduleGame = await ScheduleGame.query()
          .where({ id: request.input('id') })
          .update({
            game_names_id: parseInt(gameNameID, 10),
            user_id: auth.user.id,
            region: request.input('selected_region'),
            experience: request.input('selected_experience'),
            start_date_time: request.input('start_date_time'),
            end_date_time: end_date_time,
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
            cron: request.input('cron'),
            occurrence: request.input('occurrence'),
            repeatEvery: request.input('repeatEvery'),
            autoJoinHost: request.input('autoJoinHost'),
            mic: request.input('mic'),
            eighteen_plus: request.input('eighteen_plus'),
            game_languages: request.input('game_languages'),
          })

        if (
          getGameName.length != 0 &&
          ((request.input('value_one') != null && JSON.stringify(request.input('value_one')) != '{}') ||
            (request.input('value_two') != null && JSON.stringify(request.input('value_two')) != '{}') ||
            (request.input('value_three') != null && JSON.stringify(request.input('value_three')) != '{}') ||
            (request.input('value_four') != null && JSON.stringify(request.input('value_four')) != '{}') ||
            (request.input('value_five') != null && JSON.stringify(request.input('value_five')) != '{}'))
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
              const updateScheduleGamesTransaction = await ScheduleGamesTransaction.query()
                .where({ schedule_games_id: request.input('id') })
                .update({
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

        if (request.input('autoJoinHost') == true && !getOne.autoJoinHost) {
          const autoJoining = Attendee.create({
            schedule_games_id: request.input('id'),
            user_id: auth.user.id,
            type: 1,
          })
        }
        if (request.input('co_hosts') != null) {
          const delete_co_hosts = await Database.table('co_hosts')
            .where({
              schedule_games_id: request.input('id'),
            })
            .delete()

          var arrCo_hosts = request.input('co_hosts').split(',')

          if (arrCo_hosts != '') {
            for (var i = 0; i < arrCo_hosts.length; i++) {
              const create_co_hosts = await CoHost.create({
                schedule_games_id: request.input('id'),
                user_id: arrCo_hosts[i],
              })
            }
          }
        }

        //Delete all Tags
        const delete_schedule_games_tags = await Database.table('schedule_games_tags')
          .where({
            schedule_games_id: request.input('id'),
          })
          .delete()

        if (request.input('tags') != null && request.input('tags').length > 0) {
          var arrTags = JSON.parse(request.input('tags'))
          //Create tags
          for (var i = 0; i < arrTags.length; i++) {
            if (arrTags[i].game_tag_id == null) {
              if (/['/.%#$;`\\]/.test(arrTags[i].value)) {
                continue
              }
              let game_tags_Controller = new GameTagController()
              const game_tag_id = await game_tags_Controller.store({ auth }, arrTags[i].value)

              const create_arrTags = await ScheduleGamesTags.create({
                schedule_games_id: request.input('id'),
                game_tag_id: game_tag_id,
              })
            } else {
              const create_arrTags = await ScheduleGamesTags.create({
                schedule_games_id: request.input('id'),
                game_tag_id: arrTags[i].game_tag_id,
              })

              const update_counter = await GameTags.query()
                .where({ id: arrTags[i].game_tag_id })
                .increment('counter', 1)
            }
          }
        }
        return updateScheduleGame
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const gameface = new GameNameController()

        let schedule_game_id = request.params.id

        const getOne = await Database.from('schedule_games')
          .where({
            id: request.params.id,
          })
          .first()

        if (getOne == undefined) {
          return
        }

        gameface.decrementGameCounter({ auth }, getOne.game_names_id)

        let reason = null

        switch (request.params.reason) {
          case 1:
            reason = 'Real life issues, sorry all'
            break
          case 2:
            reason = 'Technical issues, sorry all'
            break
          case 3:
            reason = 'Totally forgot about this, my bad'
            break
          case 4:
            reason = 'Not enuf players'
            break
          case 5:
            reason = 'Decided not to play anymore, sorry all'
            break
          case 6:
            reason = 'meh, bite me!'
            break
          default:
            reason = null
        }

        const update_sch = await ScheduleGame.query()
          .where({ id: request.params.id })
          .update({ marked_as_deleted: true, deleted_date: Database.fn.now(), reason_for_deletion: reason })

        return 'Deleted successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async myScheduledGames({ auth, request, response }) {
    var myScheduledGames = '',
      subquery = '',
      filter = 0,
      number_of_records = 0,
      count_myScheduledGames = ''

    // All myGames: 0
    // my Hosted Games: 1
    // myGames (Participating): 2
    // myGames (Awaiting Approval): 3

    if (request.input('filter')) {
      filter = request.input('filter')
    }

    try {
      switch (filter) {
        case 0:
          subquery = await Database.from('attendees')
            .select('schedule_games_id')
            .where({ user_id: auth.user.id })

          myScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .where('schedule_games.user_id', '=', auth.user.id)
            .where('schedule_games.marked_as_deleted', '=', 0)
            .orWhereIn('schedule_games.id', subquery)
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
            .orderBy('schedule_games.start_date_time', 'desc')
            .paginate(request.input('counter'), 10)

          count_myScheduledGames = await Database.from('schedule_games')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .where('schedule_games.user_id', '=', auth.user.id)
            .where('schedule_games.marked_as_deleted', '=', 0)
            .orWhereIn('schedule_games.id', subquery)
            .count('* as no_of_records')

          number_of_records = count_myScheduledGames[0].no_of_records
          break
        case 1:
          myScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .where('schedule_games.user_id', '=', auth.user.id)
            .where('schedule_games.marked_as_deleted', '=', 0)
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

          count_myScheduledGames = await Database.from('schedule_games')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .where('schedule_games.user_id', '=', auth.user.id)
            .where('schedule_games.marked_as_deleted', '=', 0)
            .count('* as no_of_records')

          number_of_records = count_myScheduledGames[0].no_of_records
          break
        case 2:
          subquery = Database.from('attendees')
            .select('schedule_games_id')
            .where({ user_id: auth.user.id, type: 1 })

          myScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .whereIn('schedule_games.id', subquery)
            .where('schedule_games.marked_as_deleted', '=', 0)
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

          count_myScheduledGames = await Database.from('schedule_games')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .whereIn('schedule_games.id', subquery)
            .where('schedule_games.marked_as_deleted', '=', 0)
            .count('* as no_of_records')

          number_of_records = count_myScheduledGames[0].no_of_records
          break
        case 3:
          subquery = Database.from('attendees')
            .select('schedule_games_id')
            .where({ user_id: auth.user.id, type: 3 })

          myScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .whereIn('schedule_games.id', subquery)
            .where('schedule_games.marked_as_deleted', '=', 0)
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

          count_myScheduledGames = await Database.from('schedule_games')
            .where((builder) => {
              if (request.input('exclude_expired') == 'true') builder.where('expiry', '>', Database.fn.now())
            })
            .whereIn('schedule_games.id', subquery)
            .where('schedule_games.marked_as_deleted', '=', 0)
            .count('* as no_of_records')

          number_of_records = count_myScheduledGames[0].no_of_records
          break
      }

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

        //if we're the host
        if (myScheduledGames.data[i].user_id == auth.user.id) {
          let getAllpendings = await Database.from('attendees')
            .where({ schedule_games_id: myScheduledGames.data[i].id, type: 3 })
            .count('* as no_of_Approval_Pending')

          myScheduledGames.data[i].no_of_Approval_Pending = getAllpendings[0].no_of_Approval_Pending
        }

        let getstatus = await Database.from('attendees')
          .where({ schedule_games_id: myScheduledGames.data[i].id, user_id: auth.user.id })
          .select('type')
          .first()

        if (getstatus != undefined) {
          myScheduledGames.data[i].myStatus = getstatus.type
        } else {
          myScheduledGames.data[i].myStatus = 0
        }
      }
      myScheduledGames = myScheduledGames.data

      return {
        myScheduledGames,
        number_of_records,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
      myScheduledGames = []
      return { myScheduledGames, number_of_records }
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
        .where('schedule_games.marked_as_deleted', '=', 0)
        .where('schedule_games.start_date_time', '<', next24hours)
        .where('schedule_games.start_date_time', '>', last4hours)
        .orWhereIn('schedule_games.id', subquery)
        .select(
          'users.alias',
          'game_names.game_name',
          'game_names.game_artwork',
          'schedule_games.*',
          'schedule_games.id',
          'schedule_games.user_id'
        )
        .orderBy('schedule_games.start_date_time', 'desc')
        .paginate(request.input('counter'), 10)

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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }

    return {
      myScheduledGames,
    }
  }

  async myScheduledGamesCount({ auth, request, response }) {
    try {
      //const latestScheduledGames = await ScheduleGame.query().innerJoin('users', 'user_id', 'schedule_games.user_id').options({nestTables:true}).fetch()
      const myScheduledGamesCount = await Database.from('schedule_games')
        .where({ id: request.params.id, user_id: auth.user.id, marked_as_deleted: 0 })
        .count('* as no_of_my_posts')

      return {
        myScheduledGamesCount,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async scheduleSearchResults({ auth, request, response }) {
    try {
      let arrTags = '',
        latestScheduledGames

      let value_one = null,
        value_two = null,
        value_three = null,
        value_four = null,
        value_five = null

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

      if (request.input('tags') != null && request.input('tags').length != 0) {
        arrTags = request.input('tags').split(',')
        if (arrTags != '') {
          latestScheduledGames = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .innerJoin('schedule_games_tags', 'schedule_games.id', 'schedule_games_tags.schedule_games_id')
            .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
            .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
            .where({ visibility: 1, marked_as_deleted: 0 })
            .whereIn('schedule_games_tags.game_tag_id', arrTags)
            .where((builder) => {
              if (request.input('game_name') != null) builder.where('game_names.game_name', request.input('game_name'))

              if (request.input('region') != null) builder.where('schedule_games.region', request.input('region'))

              if (request.input('experience') != null) builder.where('experience', request.input('experience'))

              if (request.input('mic') != null) builder.where('mic', request.input('mic'))

              if (request.input('eighteen_plus') != null) builder.where('eighteen_plus', request.input('eighteen_plus'))

              if (request.input('game_languages') != null) builder.where('game_languages', request.input('game_languages'))

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
          .where({ visibility: 1, marked_as_deleted: 0 })
          .where((builder) => {
            if (request.input('game_name') != null) builder.where('game_names.game_name', request.input('game_name'))

            if (request.input('region') != null) builder.where('schedule_games.region', request.input('region'))

            if (request.input('experience') != null) builder.where('experience', request.input('experience'))

            if (request.input('mic') != null) builder.where('mic', request.input('mic'))

            if (request.input('eighteen_plus') != null) builder.where('eighteen_plus', request.input('eighteen_plus'))

            if (request.input('game_languages') != null) builder.where('game_languages', request.input('game_languages'))

            //if (request.input('start_date_time') != null)
            //builder.where('schedule_games.start_date_time', '<=', request.input('start_date_time'))

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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async get_labels_for_game_fields({ auth }, game_id) {
    let additional_submit_info_fields = [],
      additional_game_info = []

    try {
      additional_game_info = await Database.from('schedule_games')
        .where('schedule_games.id', '=', game_id)
        .first()

      if (additional_game_info == undefined) {
        return
      }

      //Figure out what fields to return, create the key value pair.
      const getGameFields = await Database.from('game_name_fields')
        .where({ game_names_id: additional_game_info.game_names_id })
        .first()

      if (getGameFields == undefined) {
        return
      }

      let obj = '',
        obj4 = ''

      if (getGameFields.in_game_fields != undefined) {
        obj = JSON.parse(getGameFields.in_game_fields)
      }

      if (getGameFields.in_game_field_labels != undefined) {
        obj4 = JSON.parse(getGameFields.in_game_field_labels)
      }

      //Maximum of 5 in each loop so Nested is OK :)
      for (let key2 in obj4) {
        for (let key in obj) {
          if (obj[key] == key2) {
            obj[key] = obj4[key2]
          }
        }
      }
      delete obj['value_six']

      return {
        obj,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async additional_game_info({ auth, request, response }) {
    // '0': 'Join',
    // '1': 'Joined',
    // '3': 'Pending',
    // '4': 'Co-Hosting',
    // '5': 'Hosting',

    let join_status = 0,
      myStatus = 0,
      approved_gamers = [],
      additional_submit_info = false,
      additional_submit_info_fields = [],
      additional_game_info = [],
      edit_status = false,
      button_text = ''

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
          myStatus = my_attendance.type
        }

        if (additional_game_info.user_id == auth.user.id) {
          edit_status = true
          join_status = 5
        } else {
          const checkCo_host = await Database.from('co_hosts')
            .where({ schedule_games_id: request.params.id, user_id: auth.user.id })
            .select('id')
            .first()
          if (checkCo_host != undefined) {
            edit_status = true
            join_status = 4
          }
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
              if (key == 'stats_link') {
                continue
              }
              let tmp_tmp = { [key]: tmp_array[key], label: obj4[key], placeholder: obj2[key], type: obj3[key] }
              additional_submit_info_fields.push([tmp_tmp, obj2[key], obj3[key]])
            }
          }
        }
      }

      if (additional_submit_info_fields.length > 0) {
        additional_submit_info = true
      }

      if (join_status == 0 || join_status == 3) {
        additional_game_info.accept_msg = ''
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
        edit_status,
        button_text,
        myStatus,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async filtered_by_one({ auth, request, response }) {
    let join_status = 0,
      myStatus = 0,
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
        .select(
          'schedule_games.*',
          'game_names.*',
          'schedule_games_transactions.*',
          'users.profile_img',
          'users.alias',
          'users.id as user_id',
          'schedule_games.id as id',
          'schedule_games.created_at',
          'schedule_games.updated_at'
        )
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
        myStatus = my_attendance.type
      }

      if (latestScheduledGames[0].user_id == auth.user.id) {
        join_status = 5
      } else {
        const checkCo_host = await Database.from('co_hosts')
          .where({ schedule_games_id: latestScheduledGames[0].id, user_id: auth.user.id })
          .select('id')
          .first()
        if (checkCo_host != undefined) {
          join_status = 4
        }
      }

      //Figure out what fields to return, create the key value pair.
      const getGameFields = await Database.from('game_name_fields')
        .where({ game_names_id: latestScheduledGames[0].game_names_id })
        .first()

      if (getGameFields != undefined) {
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
            if (key == 'stats_link') {
              continue
            }
            let tmp_tmp = { [key]: tmp_array[key] }
            additional_submit_info_fields.push([tmp_tmp, obj2[key], obj3[key]])
          }
        }
      }

      if (additional_submit_info_fields.length > 0) {
        additional_submit_info = true
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
        myStatus,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async edit_game({ auth, request, response }) {
    let latestScheduledGames = [],
      additional_submit_info = false,
      additional_submit_info_fields = []

    try {
      latestScheduledGames = await Database.from('schedule_games')
        .innerJoin('users', 'users.id', 'schedule_games.user_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .leftJoin('schedule_games_transactions', 'schedule_games_transactions.schedule_games_id', 'schedule_games.id')
        .where('schedule_games.id', '=', request.params.id)
        .select('*', 'users.id as user_id', 'schedule_games.id as id', 'schedule_games.created_at', 'schedule_games.updated_at')

      if (!latestScheduledGames.length) {
        return
      }

      latestScheduledGames = await InGame_fieldsController.find_InGame_Fields_NOT_paginate(latestScheduledGames)

      let getAllTags = await Database.from('schedule_games_tags')
        .innerJoin('game_tags', 'game_tags.id', 'schedule_games_tags.game_tag_id')
        .where({ schedule_games_id: latestScheduledGames[0].id })
        .select('content', 'game_tags.id as game_tags_coming_down')

      latestScheduledGames[0].tags = getAllTags

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

      if (additional_submit_info_fields.length > 0) {
        additional_submit_info = true
      }

      const allAttendees = await Database.from('attendees')
        .where({
          schedule_games_id: request.params.id,
          type: 1,
        })
        .first()

      let hasAttendees = 0

      if (allAttendees != undefined) {
        hasAttendees = 1
      }

      let getAllCo_hosts = await Database.from('co_hosts')
        .innerJoin('users', 'users.id', 'co_hosts.user_id')
        .where({ schedule_games_id: latestScheduledGames[0].id })
        .select('alias', 'co_hosts.user_id as co_hosts_coming_down')

      latestScheduledGames[0].co_hosts = getAllCo_hosts

      return {
        latestScheduledGames,
        additional_submit_info,
        additional_submit_info_fields,
        hasAttendees,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async update_vacany({ auth }, schedule_game_id, vacancy) {
    try {
      const update_vacany = await ScheduleGame.query()
        .where({ id: schedule_game_id })
        .update({ vacancy: vacancy })
      return
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
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
          additional_info_data[obj[key]] = {
            label: obj2[obj[key]],
            type: obj3[obj[key]],
            placeholder: obj4[obj[key]],
            value: obj5[obj[key]],
          }
        }
      }

      if (JSON.stringify(additional_info_data) != '{}') {
        additional_info = true
      }

      delete additional_info_data['stats_link']

      return {
        additional_info,
        additional_info_data,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }
}

module.exports = ScheduleGameController
