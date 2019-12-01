'use strict'

const Database = use('Database')
const Attendee = use('App/Models/Attendee')
const NotificationController = use('./NotificationController')

class AttendeeController {
  async savemySpot({ auth, request, response }) {
    try {
      const savemySpot = await Attendee.create({
        schedule_games_id: request.input('schedule_games_id'),
        user_id: auth.user.id,
        type: 3,
        dota_2_position_one: request.input('dota_2_position_one'),
        dota_2_position_two: request.input('dota_2_position_two'),
        dota_2_position_three: request.input('dota_2_position_three'),
        dota_2_position_four: request.input('dota_2_position_four'),
        dota_2_position_five: request.input('dota_2_position_five'),
      })

      if (request.input('notify') == true) {
        const all_pending_attendees = await Database.from('attendees')
          .innerJoin(
            'schedule_games',
            'schedule_games.id',
            'attendees.schedule_games_id'
          )
          .select('schedule_games.user_id')
          .where({
            schedule_games_id: request.input('schedule_games_id'),
            type: 3,
          })
          .limit(1)

        if (all_pending_attendees.length > 0) {
          let noti = new NotificationController()
          request.params.id = request.input('schedule_games_id')
          await noti.remove_schedule_game_attendees({ auth, request, response })
          request.params.other_user_id = all_pending_attendees[0].user_id
          request.params.schedule_games_id = request.input('schedule_games_id')

          noti.addScheduleGame_attendance({ auth, request, response })
        }
      }

      return 'Saved successfully'
    } catch (error) {
      console.log(error)
    }
  }

  async show_attending({ auth, request, response }) {
    try {
      //const allAttendees = await Database.select('*').from('attendees').where({schedule_games_id: request.params.id})
      const allAttendees = await Database.from('attendees')
        .where({ schedule_games_id: request.params.id, type: 1 })
        .count('* as no_of_allAttendees')

      return {
        allAttendees,
      }
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }

  async show_game_positions({ auth, request, response }) {
    try {
      const game_position_of_dota_2_position_ones = await Database.from(
        'attendees'
      )
        .where({
          schedule_games_id: request.params.id,
          type: 1,
          dota_2_position_one: 1,
        })
        .count('* as no_of_dota_2_position_ones')
      const game_position_of_dota_2_position_twos = await Database.from(
        'attendees'
      )
        .where({
          schedule_games_id: request.params.id,
          type: 1,
          dota_2_position_two: 1,
        })
        .count('* as no_of_dota_2_position_twos')
      const game_position_of_dota_2_position_threes = await Database.from(
        'attendees'
      )
        .where({
          schedule_games_id: request.params.id,
          type: 1,
          dota_2_position_three: 1,
        })
        .count('* as no_of_dota_2_position_threes')
      const game_position_of_dota_2_position_fours = await Database.from(
        'attendees'
      )
        .where({
          schedule_games_id: request.params.id,
          type: 1,
          dota_2_position_four: 1,
        })
        .count('* as no_of_dota_2_position_fours')
      const game_position_of_dota_2_position_fives = await Database.from(
        'attendees'
      )
        .where({
          schedule_games_id: request.params.id,
          type: 1,
          dota_2_position_five: 1,
        })
        .count('* as no_of_dota_2_position_fives')

      return {
        game_position_of_dota_2_position_ones,
        game_position_of_dota_2_position_twos,
        game_position_of_dota_2_position_threes,
        game_position_of_dota_2_position_fours,
        game_position_of_dota_2_position_fives,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async role_call({ auth, request, response }) {
    try {
      const role_call = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .select('users.id as user_id', 'users.profile_img')
        .where({ schedule_games_id: request.params.id, type: 1 })
        .limit(6)

      return {
        role_call,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async role_call_ALL({ auth, request, response }) {
    try {
      const role_call_ALL = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .select(
          'users.id as user_id',
          'users.profile_img',
          'users.first_name',
          'users.last_name'
        )
        .where({ schedule_games_id: request.params.id, type: 1 })

      return {
        role_call_ALL,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async remove_myattendance({ auth, request, response }) {
    if (auth.user) {
      try {
        const attendees = await Database.from('attendees')
          .innerJoin(
            'schedule_games',
            'schedule_games.id',
            'attendees.schedule_games_id'
          )
          .innerJoin('users', 'users.id', 'schedule_games.user_id')
          .where({ schedule_games_id: request.params.id, type: 1 })
          .where('attendees.user_id', '=', auth.user.id)
          .select('users.id')

        if (attendees.length > 0) {
          let noti = new NotificationController()
          request.params.schedule_games_id = request.params.id
          request.params.other_user_id = attendees[0].id
          noti.add_approved_attendee_left({ auth, request, response })
        }

        const delete_attendance = await Database.table('attendees')
          .where({
            schedule_games_id: request.params.id,
            user_id: auth.user.id,
          })
          .delete()

        return 'Remove entry'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async getScheduleGameInvites({ auth, request, response }) {
    try {
      var getScheduleGameInvites = await Database.from('attendees')
        .innerJoin('users', 'users.id', 'attendees.user_id')
        .innerJoin(
          'schedule_games',
          'schedule_games.id',
          'attendees.schedule_games_id'
        )
        .where({ schedule_games_GUID: request.params.id, type: 3 })
        .options({ nestTables: true })

      if (getScheduleGameInvites.length == 0) {
        getScheduleGameInvites = await Database.from('schedule_games')
          .where({ schedule_games_GUID: request.params.id })
          .options({ nestTables: true })
      }

      return {
        getScheduleGameInvites,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async delete_invite({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_invite = await Database.table('attendees')
          .where({
            schedule_games_id: request.params.schedule_game_id,
            user_id: request.params.id,
          })
          .delete()

        return 'Remove entry'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async up_invite({ auth, request, response }) {
    try {
      const up_invite = await Attendee.query()
        .where({
          schedule_games_id: request.params.schedule_game_id,
          user_id: request.params.id,
        })
        .update({
          type: 1,
          dota_2_position_one: request.input('dota_2_position_one'),
          dota_2_position_two: request.input('dota_2_position_two'),
          dota_2_position_three: request.input('dota_2_position_three'),
          dota_2_position_four: request.input('dota_2_position_four'),
          dota_2_position_five: request.input('dota_2_position_five'),
        })
      return up_invite
    } catch (error) {
      console.log(up_invite)
    }
  }
}

module.exports = AttendeeController
