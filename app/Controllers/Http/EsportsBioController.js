'use strict'

const EsportsBio = use('App/Models/EsportsBio')
const LoggingRepository = require('../../Repositories/Logging')

class EsportsBioController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newBio = await EsportsBio.create({
          user_id: auth.user.id,
          status: request.input('status'),
          email_visibility: request.input('email_visibility'),
          games_of_ardour: request.input('games_of_ardour'),
          career_highlights: request.input('career_highlights')
        })
        return 'Saved item'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async show({ auth, request, response }) {
    try {
      const myProfile = await EsportsBio.query().where('user_id', '=', auth.user.id).fetch()

      return {
        myProfile
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async show_bio({ auth, request, response }) {
    try {
      const myProfile = await EsportsBio.query().where('user_id', '=', request.params.id).fetch()

      return {
        myProfile
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async update({ auth, request, response }) {
    try {
      const updateEsports_Exp = await EsportsBio.query()
        .where({ user_id: auth.user.id })
        .update({
          status: request.input('status'),
          email_visibility: request.input('email_visibility'),
          games_of_ardour: request.input('games_of_ardour'),
          career_highlights: request.input('career_highlights')
        })
      return 'Saved successfully'
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }
}

module.exports = EsportsBioController
