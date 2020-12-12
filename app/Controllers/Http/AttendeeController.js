'use strict'

const Database = use('Database')
const Attendee = use('App/Models/Attendee')
const ScheduleGame = use('App/Models/ScheduleGame')

const UserStatTransactionController = use('./UserStatTransactionController')
const ScheduleGameController = use('./ScheduleGameController')
const LoggingRepository = require('../../Repositories/Logging')
const ElasticsearchRepository = require('../../Repositories/Elasticsearch')

const CommonController = use('./CommonController')

class AttendeeController {
  async savemySpot({ auth, request, response }) {
    if (auth.user) {
      //TODO: Future version can check the game to see which fields were the host looking for. To ensure we're not accepting any extra fields
      // Currently we get any field that matchs so the front end can send extra values which was not selected in Add Game

      let db_save_value_array = new Array(5).fill(null),
        myType = 3,
        return_msg = 'Pending'

      try {
        const get_game_info = await Database.from('schedule_games')
          .where('schedule_games.id', '=', request.input('schedule_games_id'))
          .select('game_names_id', 'user_id', 'limit', 'autoJoin')
          .first()

        if (get_game_info == undefined) {
          return false
        }

        const getGameFields = await Database.from('game_name_fields').where({ game_names_id: get_game_info.game_names_id }).first()

        if (getGameFields != undefined) {
          let db_obj = ''

          if (getGameFields.in_game_fields != undefined) {
            db_obj = JSON.parse(getGameFields.in_game_fields)
          }

          if (request.input('value_one') != undefined && request.input('value_one') != null && db_obj != '') {
            db_save_value_array = await this.process_game_name_fields(db_obj, request.input('value_one'), db_save_value_array)
          }
          if (request.input('value_two') != undefined && request.input('value_two') != null && db_obj != '') {
            db_save_value_array = await this.process_game_name_fields(db_obj, request.input('value_two'), db_save_value_array)
          }
          if (request.input('value_three') != undefined && request.input('value_three') != null && db_obj != '') {
            db_save_value_array = await this.process_game_name_fields(db_obj, request.input('value_three'), db_save_value_array)
          }
          if (request.input('value_four') != undefined && request.input('value_four') != null && db_obj != '') {
            db_save_value_array = await this.process_game_name_fields(db_obj, request.input('value_four'), db_save_value_array)
          }
          if (request.input('value_five') != undefined && request.input('value_five') != null && db_obj != '') {
            db_save_value_array = await this.process_game_name_fields(db_obj, request.input('value_five'), db_save_value_array)
          }
        }

        //Need to see if we're not over the limit b4 doing this.
        if (get_game_info.limit != 0) {
          const allAttendees = await Database.from('attendees')
            .where({ schedule_games_id: request.input('schedule_games_id'), type: 1 })
            .count('* as no_of_allAttendees')
            .first()

          if (allAttendees.no_of_allAttendees >= get_game_info.limit) {
            return 'Limit Reached'
          }
        }

        let activity_type = 11

        if (get_game_info.autoJoin == 1) {
          myType = 1
          return_msg = 'Joined'
          activity_type = 21
        }

        const savemySpot = await Attendee.create({
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
          type: myType,
          value_one: db_save_value_array[0],
          value_two: db_save_value_array[1],
          value_three: db_save_value_array[2],
          value_four: db_save_value_array[3],
          value_five: db_save_value_array[4],
        })

        const no_of_gamers = (await Database.from('attendees')
        .where({ schedule_games_id: request.input('schedule_games_id'), type: 1 })
        .count('* as no_of_gamers'))[0].no_of_gamers
        await ElasticsearchRepository.updateAttendees({ id: request.input('schedule_games_id'), no_of_gamers })

        const noti = new CommonController()

        if (myType == 1) {
          const userStatController = new UserStatTransactionController()
          userStatController.update_total_number_of(get_game_info.user_id, 'total_number_of_games_hosted')
          userStatController.update_total_number_of(auth.user.id, 'total_number_of_games_played')

          await noti.remove_schedule_game_attendees({ auth }, request.input('schedule_games_id'), activity_type)
          noti.addScheduleGame_attendance({ auth }, request.input('schedule_games_id'), get_game_info.user_id, activity_type)
        } else {
          noti.addScheduleGame_attendance({ auth }, request.input('schedule_games_id'), get_game_info.user_id, activity_type)

          const co_hosts = await Database.from('co_hosts')
            .where({ schedule_games_id: request.input('schedule_games_id') })
            .select('user_id')

          for (var i = 0; i < co_hosts.length; i++) {
            noti.addScheduleGame_attendance({ auth }, request.input('schedule_games_id'), co_hosts[i].user_id, activity_type)
          }
        }

        return return_msg
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
  async process_game_name_fields(db_obj, user_entered_data, db_save_value_array) {
    try {
      for (let key in db_obj) {
        let match = user_entered_data[db_obj[key]]
        if (match != undefined && match != null && match.length > 0) {
          switch (key) {
            case 'value_one':
              db_save_value_array[0] = match
              break
            case 'value_two':
              db_save_value_array[1] = match
              break
            case 'value_three':
              db_save_value_array[2] = match
              break
            case 'value_four':
              db_save_value_array[3] = match
              break
            case 'value_five':
              db_save_value_array[4] = match
              break
          }
        }
      }

      return db_save_value_array
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

  async show_attending({ auth, request, response }) {
    try {
      const allAttendees = await Database.from('attendees')
        .where({ schedule_games_id: request.params.id, type: 1 })
        .count('* as no_of_allAttendees')

      return {
        allAttendees,
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

  async show_all_pending_attendance({ auth, request, response }) {
    try {
      const allAttendees = await Database.from('attendees').where({
        schedule_games_id: request.params.id,
        type: 3,
      })

      return {
        allAttendees,
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

  async show_myattendance({ auth, request, response }) {
    try {
      //const allAttendees = await Database.select('*').from('attendees').where({schedule_games_id: request.params.id})
      // const myattendance = await Database.from('attendees').where({schedule_games_id: request.params.id, user_id: auth.user.id, type: 1}).count('* as no_of_myAttendance')
      // const myattendance_pending = await Database.from('attendees').where({schedule_games_id: request.params.id, user_id: auth.user.id, type: 3}).count('* as no_of_myAttendance_pending')
      //
      // return {
      //   myattendance,
      //   myattendance_pending
      // }

      const myattendance = await Database.from('attendees')
        .where({ schedule_games_id: request.params.id, user_id: auth.user.id })
        .select('type')

      return {
        myattendance,
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

  async show_game_positions({ auth, request, response }) {
    // try {
    //   const game_position_of_dota_2_position_ones = await Database.from('attendees')
    //     .where({
    //       schedule_games_id: request.params.id,
    //       type: 1,
    //       dota_2_position_one: 1,
    //     })
    //     .count('* as no_of_dota_2_position_ones')
    //   const game_position_of_dota_2_position_twos = await Database.from('attendees')
    //     .where({
    //       schedule_games_id: request.params.id,
    //       type: 1,
    //       dota_2_position_two: 1,
    //     })
    //     .count('* as no_of_dota_2_position_twos')
    //   const game_position_of_dota_2_position_threes = await Database.from('attendees')
    //     .where({
    //       schedule_games_id: request.params.id,
    //       type: 1,
    //       dota_2_position_three: 1,
    //     })
    //     .count('* as no_of_dota_2_position_threes')
    //   const game_position_of_dota_2_position_fours = await Database.from('attendees')
    //     .where({
    //       schedule_games_id: request.params.id,
    //       type: 1,
    //       dota_2_position_four: 1,
    //     })
    //     .count('* as no_of_dota_2_position_fours')
    //   const game_position_of_dota_2_position_fives = await Database.from('attendees')
    //     .where({
    //       schedule_games_id: request.params.id,
    //       type: 1,
    //       dota_2_position_five: 1,
    //     })
    //     .count('* as no_of_dota_2_position_fives')
    //
    //   return {
    //     game_position_of_dota_2_position_ones,
    //     game_position_of_dota_2_position_twos,
    //     game_position_of_dota_2_position_threes,
    //     game_position_of_dota_2_position_fours,
    //     game_position_of_dota_2_position_fives,
    //   }
    // } catch (error) {
    //   LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
    // }
  }

  async role_call({ auth, request, response }) {
    try {
      const role_call = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .select('users.id as user_id', 'users.profile_img', 'users.alias')
        .where({ schedule_games_id: request.params.id, type: 1 })
        .limit(6)

      return {
        role_call,
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

  async role_call_ALL({ auth, request, response }) {
    try {
      const role_call_ALL = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .where({ schedule_games_id: request.input('schedule_games_id'), type: 1 })
        .select('attendees.*', 'users.id as user_id', 'users.profile_img', 'users.alias', 'users.level')
        .paginate(request.input('counter'), 10)

      return {
        role_call_ALL,
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

  async getHeader({ auth, request, response }) {
    let additional_submit_info = false,
      additional_submit_info_fields = {}

    try {
      const additional_game_info = await Database.from('schedule_games').where('schedule_games.id', '=', request.params.id).first()

      if (additional_game_info == undefined) {
        return
      }
      //Figure out what fields to return, create the key value pair.
      const getGameFields = await Database.from('game_name_fields').where({ game_names_id: additional_game_info.game_names_id }).first()

      if (getGameFields != undefined) {
        let obj = '',
          obj4 = ''

        if (getGameFields.in_game_fields != undefined) {
          obj = JSON.parse(getGameFields.in_game_fields)
        }

        if (getGameFields.in_game_field_labels != undefined) {
          obj4 = JSON.parse(getGameFields.in_game_field_labels)
        }

        for (let key in obj) {
          additional_submit_info_fields[key] = obj4[obj[key]]
        }
      }

      if (JSON.stringify(additional_submit_info_fields) != '{}') {
        additional_submit_info = true
      }

      delete additional_submit_info_fields['value_six']

      return {
        additional_submit_info,
        additional_submit_info_fields,
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

  async remove_myattendance({ auth, request, response }) {
    if (auth.user) {
      try {
        const attendees = await Database.from('attendees')
          .innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id')
          .where({ schedule_games_id: request.params.id, type: 1 })
          .where('attendees.user_id', '=', auth.user.id)
          .select('schedule_games.user_id')

        if (attendees.length == 0) {
          return
        }

        const noti_v2 = new CommonController()
        const userStatController = new UserStatTransactionController()

        noti_v2.add_approved_attendee_left({ auth }, request.params.id, attendees[0].user_id)

        //look up co hosts and notify aswell
        const co_hosts = await Database.from('co_hosts').where({ schedule_games_id: request.params.id }).select('user_id')

        for (let i = 0; i < co_hosts.length; i++) {
          request.params.other_user_id = co_hosts[i].user_id
          noti.add_approved_attendee_left({ auth }, request.params.id, co_hosts[i].user_id)
        }

        // Getting: TypeError: ScheduleGameController is not a constructor, No idea why so created the string here instead
        const update_vacany = await ScheduleGame.query().where({ id: request.params.id }).update({ vacancy: true })

        const delete_attendance = await Database.table('attendees')
          .where({
            schedule_games_id: request.params.id,
            user_id: auth.user.id,
          })
          .delete()

        userStatController.update_total_number_of(attendees[0].user_id, 'total_number_of_games_hosted')
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_games_played')

        return 'Remove entry'
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

  async getScheduleGameInvites({ auth, request, response }) {
    try {
      var getScheduleGameInvites = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id')
        .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where({ schedule_games_GUID: request.params.id, type: 3 })
        .select('*', 'schedule_games.id')
        .options({ nestTables: true })

      if (getScheduleGameInvites.length == 0) {
        getScheduleGameInvites = await Database.from('schedule_games')
          .where({ schedule_games_GUID: request.params.id })
          .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
          .select('*', 'schedule_games.id')
          .options({ nestTables: true })
      }

      return {
        getScheduleGameInvites,
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
  async check_permission({ auth }, schedule_game_id) {
    let approved = false

    const co_hosts = await Database.from('co_hosts')
      .where({ schedule_games_id: schedule_game_id })
      .select('user_id')

    const get_host = await Database.from('schedule_games')
      .select('user_id')
      .where({ id: schedule_game_id })

    if (get_host[0].user_id == auth.user.id) {
      approved = true
    } else {
      for (let i = 0; i < co_hosts.length; i++) {
        if (co_hosts[i].user_id == auth.user.id) {
          approved = true
          break
        }
      }
    }

    return approved
  }

  //If the host/co_host decided to deny the approval
  async delete_invite({ auth, request, response }) {
    let approved = false
    if (auth.user) {
      try {
        approved = await this.check_permission({ auth }, request.params.schedule_game_id)

        if (!approved) {
          return
        }

        const delete_invite = await Database.table('attendees')
          .where({
            schedule_games_id: request.params.schedule_game_id,
            user_id: request.params.id,
          })
          .delete()

        return 'Remove entry'
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

  async up_invite({ auth, request, response }) {
    let approved = false
    if (auth.user) {
      const co_hosts = await Database.from('co_hosts')
        .where({ schedule_games_id: request.input('schedule_game_id') })
        .select('user_id')

      const get_host = await Database.from('schedule_games')
        .select('user_id', 'limit')
        .where({ id: request.input('schedule_game_id') })

      //check this user can approve 1st. Either host or co host
      if (get_host[0].user_id == auth.user.id) {
        approved = true
      } else {
        for (let i = 0; i < co_hosts.length; i++) {
          if (co_hosts[i].user_id == auth.user.id) {
            approved = true
            break
          }
        }
      }

      const userStatController = new UserStatTransactionController()

      try {
        if (!approved) {
          return
        }
        const up_invite = await Attendee.query()
          .where({
            schedule_games_id: request.input('schedule_game_id'),
            user_id: request.input('user_id'),
          })
          .update({
            type: 1,
          })

        const get_all_attendees = await Database.from('attendees')
          .select('user_id')
          .where({ schedule_games_id: request.input('schedule_game_id'), type: 1 })

        if (get_all_attendees.length > 1) {
          userStatController.update_total_number_of(get_host[0].user_id, 'total_number_of_games_hosted')

          if (get_host[0].limit != 0) {
            let scheduleGameController = new ScheduleGameController()

            if (get_all_attendees.length >= get_host[0].limit) {
              scheduleGameController.update_vacany({ auth }, request.params.id, false)
            } else {
              //This is a way to clean up this field incase its incorrectly placed false
              scheduleGameController.update_vacany({ auth }, request.params.id, true)
            }
          }
        }

        for (let i = 0; i < get_all_attendees.length; i++) {
          userStatController.update_total_number_of(get_all_attendees[i].user_id, 'total_number_of_games_played')
        }
        let noti = new CommonController()
        noti.addGameApproved({ auth }, request.input('schedule_game_id'), request.input('user_id'))

        for (let i = 0; i < co_hosts.length; i++) {
          noti.addGameApproved({ auth }, request.input('schedule_game_id'), co_hosts[i].user_id)
        }

        return up_invite
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
}

module.exports = AttendeeController
