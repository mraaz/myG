'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')

class ConnectionController {
  async gamers_you_might_know({ auth, request, response }) {
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
