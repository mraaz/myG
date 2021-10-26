'use strict'

const GameTags = use('App/Models/GameTag')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class GameTagController {
  async store({ auth }, content, gameId) {
    if (auth.user) {
      // if (/['/.%#$,;`\\]/.test(request.input('content'))) {
      //   return false
      // }
      if (content.trim().length > 88) {
        return
      }

      try {
        const newGameTag = await GameTags.create({
          content: content.trim(),
          user_id: auth.user.id,
          game_names_id: gameId
        })
        return newGameTag.id
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          const newGameTag = await Database.table('game_tags').where({ content: content.trim() }).first()

          return newGameTag.id
        }
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

  async getGameTags({ auth, request, response }) {
    let gameId = null

    if (request.input('content') == undefined || request.input('content').trim() == '') return
    if (request.input('game_names_id') != undefined && request.input('game_names_id').trim() != '') {
      gameId = request.input('game_names_id')
    }

    try {
      const allTags = await Database.table('game_tags')
        .where('content', 'like', '%' + request.input('content') + '%')
        .andWhere('game_names_id', gameId)
        .limit(88)

      return {
        allTags
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

  async getTopGameTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('game_tags').orderBy('counter', 'desc').limit(18)

      return {
        allTags
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

module.exports = GameTagController
