'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')

class ConnectionController {
  async gamers_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        //pull data from table, limit to 8
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async master_controller({ auth, request, response }) {
    if (auth.user) {
      try {
        //run all checks and update the score

      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async check_if_same_profile({ auth, request, response }) {
    //with the same gamess as your in your profile
    if (auth.user) {
      try {


      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = ConnectionController
