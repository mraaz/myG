'use strict'

const GameNames = use('App/Models/GameName')
const Database = use('Database')
const ApiController = use('./ApiController')

const LoggingRepository = require('../../Repositories/Logging')

const Schedule_games_logix = use('./Schedule_games_logix')

class GameNameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('game_name'))) {
        return false
      }

      if (request.input('game_name').length > 88) {
        return false
      }

      try {
        const newGameName = await GameNames.create({
          game_name: request.input('game_name').trim(),
          user_id: auth.user.id,
        })

        return newGameName
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return false
      }
    }
  }

  async createGame({ auth }, game_name) {
    if (auth.user) {
      try {
        if (/['/.%#$,;`\\]/.test(game_name)) {
          return false
        }

        if (game_name.length > 88) {
          return false
        }

        const createGame = await GameNames.create({
          game_name: game_name,
          user_id: auth.user.id,
        })

        return createGame
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return false
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async incrementGameCounter({ auth }, game_name) {
    if (auth.user) {
      try {
        const incrementGameCounter = await GameNames.query()
          .where({ id: game_name })
          .increment('counter', 1)

        return 'Updated successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return false
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async decrementGameCounter({ auth }, game_id) {
    if (auth.user) {
      try {
        const decrementGameCounter = await GameNames.query()
          .where({ id: game_id })
          .decrement('counter', 1)

        const game_name = await Database.table('game_names')
          .where({
            id: game_id,
          })
          .first()

        if (game_name == undefined) {
          return
        }

        if (game_name.verified == 0 && game_name.counter < 1) {
          const apiController = new ApiController()
          await apiController.internal_deleteFile({ auth }, '9', game_name.id)

          const delete_game = await Database.table('game_names')
            .where({
              id: game_name.id,
            })
            .delete()
        }

        return 'Updated successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return false
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async show({ auth, request, response }) {
    try {
      const allGameNames = await GameNames.query().fetch()
      return {
        allGameNames,
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

  async show_one({ auth, request, response }) {
    try {
      var inputValue = request.params.name.replace(/%20/g, ' ')

      const getOne = await Database.select('id')
        .from('game_names')
        .where({ game_name: inputValue })

      return {
        getOne,
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

  async gameSearchResults({ auth, request, response }) {
    try {
      var inputValue = request.params.int.replace(/%20/g, '%')
      inputValue = inputValue.replace(/%25/g, '\\')
      // inputValue = "'%" + inputValue + "%'"
      //
      // const gameSearchResults = await Database.schema.raw('select * from game_names WHERE game_name LIKE ' + inputValue)
      const gameSearchResults = await Database.table('game_names')
        .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
        .where('game_name', 'like', '%' + inputValue + '%')
        .select('game_names.*', 'game_name_fields.game_names_id as more_data')
        .limit(25)

      let gameHeader_logix = new Schedule_games_logix()

      for (var i = 0; i < gameSearchResults.length; i++) {
        gameSearchResults[i].game_headers = await gameHeader_logix.getGameHeaders(gameSearchResults[i].game_name)
      }

      // WORKS!!!! const gameSearchResults = await Database.schema.raw("select * from game_names WHERE game_name LIKE " + "'%the\%Alien%'")

      return {
        gameSearchResults,
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

  async getTopGames({ auth, request, response }) {
    try {
      const gameSearchResults = await Database.table('game_names')
        .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
        .select('game_names.*', 'game_name_fields.game_names_id as more_data')
        .orderBy('counter', 'desc')
        .limit(18)

      let gameHeader_logix = new Schedule_games_logix()

      for (var i = 0; i < gameSearchResults.length; i++) {
        gameSearchResults[i].game_headers = await gameHeader_logix.getGameHeaders(gameSearchResults[i].game_name)
      }

      return {
        gameSearchResults,
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

  // Delete games with counter as 0 if 24hrs have passed.
  async deleteUnusedGames() {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    const gamesToDelete = await Database.from('game_names').where('counter', '=', 0).andWhere('created_at', '<', oneDayAgo)
    if (!gamesToDelete.length) return
    const apiController = new ApiController()
    const auth = { user: { id: 'myg' } }
    for await (let gameToDelete of gamesToDelete) {
      await apiController.internal_deleteFile({ auth }, '9', gameToDelete.id)
      await Database.table('game_names').where({ id: gameToDelete.id }).delete()
    }
    const report = gamesToDelete.map((gameToDelete) => ({
      id: gameToDelete.id,
      userId: gameToDelete.user_id,
      name: gameToDelete.game_name,
    }))
    LoggingRepository.log({
      environment: process.env.NODE_ENV,
      type: 'task',
      source: 'backend',
      context: 'delete unused games',
      message: JSON.stringify(report),
    })
  }
}

module.exports = GameNameController
