'use strict'

const Database = use('Database')
const Archive_Attendee = use("App/Models/Archive_Attendee")

class Archive_AttendeeController {

  async savemySpot({auth, request, response}){
    if(auth.user){
      try{
        const savemySpot = await Archive_Attendee.create({
          id: request.params.id,
          archive_schedule_games_id: request.params.archive_schedule_games_id,
          user_id: request.params.user_id,
          type: request.params.type,
          dota_2_position_one: request.params.dota_2_position_one,
          dota_2_position_two: request.params.dota_2_position_two,
          dota_2_position_three: request.params.dota_2_position_three,
          dota_2_position_four: request.params.dota_2_position_four,
          dota_2_position_five: request.params.dota_2_position_five,
          og_created_at: request.params.og_created_at
        })
        return 'Saved successfully'
      }
      catch(error){
        console.log(error);
      }
    }
  }

  async show_attending({auth, request, response}){
    try{

      //const allAttendees = await Database.select('*').from('archive_attendees').where({schedule_games_id: request.params.id})
      const allAttendees = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1}).count('* as no_of_allAttendees')

      return {
        allAttendees
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show_Allattending({auth, request, response}){
    try{

      const allAttendees = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1})

      return {
        allAttendees
      }
    }
    catch(error){
      console.log(error)
    }
  }


  async show_myattendance({auth, request, response}){
    try{

      //const allAttendees = await Database.select('*').from('archive_attendees').where({schedule_games_id: request.params.id})
      const myattendance = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, user_id: auth.user.id, type: 1}).count('* as no_of_myAttendance')
      const myattendance_pending = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, user_id: auth.user.id, type: 3}).count('* as no_of_myAttendance_pending')

      return {
        myattendance,
        myattendance_pending
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show_game_positions({auth, request, response}){
    try{

      const game_position_of_dota_2_position_ones = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1, dota_2_position_one:1}).count('* as no_of_dota_2_position_ones')
      const game_position_of_dota_2_position_twos = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1, dota_2_position_two:1}).count('* as no_of_dota_2_position_twos')
      const game_position_of_dota_2_position_threes = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1, dota_2_position_three:1}).count('* as no_of_dota_2_position_threes')
      const game_position_of_dota_2_position_fours = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1, dota_2_position_four:1}).count('* as no_of_dota_2_position_fours')
      const game_position_of_dota_2_position_fives = await Database.from('archive_attendees').where({schedule_games_id: request.params.id, type: 1, dota_2_position_five:1}).count('* as no_of_dota_2_position_fives')

      return {
        game_position_of_dota_2_position_ones,
        game_position_of_dota_2_position_twos,
        game_position_of_dota_2_position_threes,
        game_position_of_dota_2_position_fours,
        game_position_of_dota_2_position_fives
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async role_call({auth, request, response}){
    try{

      const role_call = await Database.from('archive_attendees').innerJoin('users', 'users.id', 'attendees.user_id').select('users.id as user_id', 'users.profile_img').where({schedule_games_id: request.params.id, type: 1}).limit(6)

      return {
        role_call
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async role_call_ALL({auth, request, response}){
    try{

      const role_call_ALL = await Database.from('archive_attendees').innerJoin('users', 'users.id', 'attendees.user_id').select('users.id as user_id', 'users.profile_img', 'users.first_name', 'users.last_name').where({schedule_games_id: request.params.id, type: 1})

      return {
        role_call_ALL
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async remove_myattendance({auth, request, response}){
    if(auth.user){
      try{
        const delete_attendance = await Database.table('archive_attendees').where({
          schedule_games_id: request.params.id,
          user_id: auth.user.id
        }).delete()

        return "Remove entry"

      } catch(error){
        console.log(error)
      }
    } else{
      return 'You are not Logged In!'
    }
  }

  async getScheduleGameInvites({auth, request, response}){
    try{

      const getScheduleGameInvites = await Database.from('archive_attendees').innerJoin('users', 'users.id', 'attendees.user_id').innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id').where({schedule_games_GUID: request.params.id, type: 3}).options({nestTables:true})

      return {
        getScheduleGameInvites
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async delete_invite({auth, request, response}){
    if(auth.user){
      try{
        const delete_invite = await Database.table('archive_attendees').where({
          schedule_games_id: request.params.schedule_game_id,
          user_id: request.params.id
        }).delete()

        return "Remove entry"

      } catch(error){
        console.log(error)
      }
    } else{
      return 'You are not Logged In!'
    }
  }

  async up_invite({auth, request, response}){
    try{
      const up_invite = await Archive_Attendee.query().where({schedule_games_id: request.params.schedule_game_id ,user_id: request.params.id}).update({type: 1, dota_2_position_one: request.input('dota_2_position_one'), dota_2_position_two: request.input('dota_2_position_two'), dota_2_position_three: request.input('dota_2_position_three'), dota_2_position_four: request.input('dota_2_position_four'), dota_2_position_five: request.input('dota_2_position_five') })
      return up_invite

    } catch(error){
      console.log(up_invite)
    }
  }

}

module.exports = Archive_AttendeeController
