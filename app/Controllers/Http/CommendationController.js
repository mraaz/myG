'use strict'

const Commendation = use('App/Models/Commendation')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class CommendationController {
  async store({ auth, request, response }) {
    try {
      const newCommendation = await Commendation.create({
        game_experiences_id: request.input('game_experiences_id'),
        user_id: auth.user.id
      })
      return newCommendation
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
  async showUser({ auth, request, response }) {
    try {
      const getCommend = await Database.from('commendations')
        .where({
          game_experiences_id: request.params.id,
          user_id: auth.user.id
        })
        .count('* as no_of_commends')

      return {
        getCommend
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
  async show({ auth, request, response }) {
    try {
      const getAllCommend = await Database.from('commendations')
        .where({ game_experiences_id: request.params.id })
        .count('* as no_of_commends')

      return {
        getAllCommend
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
}

module.exports = CommendationController
