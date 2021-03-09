'use strict'

const GameNames = use('App/Models/GameName')
const Database = use('Database')
const ApiController = use('./ApiController')

const ElasticsearchRepository = require('../../Repositories/Elasticsearch')
const LoggingRepository = require('../../Repositories/Logging')

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

        const gameSearchResults = await Database.table('game_names')
          .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
          .where('game_names.id', newGameName.id)
          .select('game_names.*', 'game_name_fields.game_names_id as more_data')
        await ElasticsearchRepository.storeGameName(gameSearchResults[0])

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

        const gameSearchResults = await Database.table('game_names')
          .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
          .where('game_names.id', createGame.id)
          .select('game_names.*', 'game_name_fields.game_names_id as more_data')
        await ElasticsearchRepository.storeGameName(gameSearchResults[0])

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
        const gameSearchResults = await Database.table('game_names')
          .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
          .where('game_names.id', game_name)
          .select('game_names.*', 'game_name_fields.game_names_id as more_data')
        await ElasticsearchRepository.storeGameName(gameSearchResults[0])

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
          await ElasticsearchRepository.removeGameName({ id: game_name.id })
        } else {
          const gameSearchResults = await Database.table('game_names')
            .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
            .where('game_names.id', game_id)
            .select('game_names.*', 'game_name_fields.game_names_id as more_data')
          await ElasticsearchRepository.storeGameName(gameSearchResults[0])
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
      const getOne = await Database.select('id')
        .from('game_names')
        .where({ game_name: decodeURIComponent(request.params.name) })

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

  async gameSearchResults({ request }) {
    try {
      const gameName = decodeURIComponent(request.params.int)
      const gameSearchResults = await ElasticsearchRepository.searchGameNames(gameName)
      for (const game of gameSearchResults) {
        game.game_headers = this.getGameHeaders(game.game_name)
      }
      return { gameSearchResults }
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

  async getTopGames() {
    try {
      const gameSearchResults = await ElasticsearchRepository.fetchTopGameNames()
      for (const game of gameSearchResults) {
        game.game_headers = this.getGameHeaders(game.game_name)
      }
      return { gameSearchResults }
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

  syncToElasticsearch = async () => {
    const gameSearchResults = await Database.table('game_names')
      .leftJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
      .select('game_names.*', 'game_name_fields.game_names_id as more_data')
    for await (let gameName of gameSearchResults) {
      await ElasticsearchRepository.storeGameName(gameName)
    }
    const elasticsearchGameNameIds = await ElasticsearchRepository.fetchAllGameNameIds()
    const mysqlGameNameIds = gameSearchResults.map((game) => `${game.id}`)
    await Promise.all(
      elasticsearchGameNameIds.map((gameNameId) => {
        if (mysqlGameNameIds.includes(gameNameId)) return
        return ElasticsearchRepository.removeGameName({ id: gameNameId })
      })
    )
  }

  // Delete games with counter as 0 if 24hrs have passed.
  async deleteUnusedGames() {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    const gamesToDelete = await Database.from('game_names')
      .where('counter', '=', 0)
      .andWhere('verified', '=', 0)
      .andWhere('created_at', '<', oneDayAgo)

    if (!gamesToDelete.length) return
    const apiController = new ApiController()
    const auth = { user: { id: 'myg' } }
    for await (let gameToDelete of gamesToDelete) {
      await apiController.internal_deleteFile({ auth }, '9', gameToDelete.id)
      await ElasticsearchRepository.removeGameName({ id: gameToDelete.id })
      await Database.table('game_names')
        .where({ id: gameToDelete.id })
        .delete()
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

  getGameHeaders(game_name) {
    switch (game_name) {
      case 'Dota 2':
        return {
          experience: true,
          platform: false,
          region: false,
        }
      case 'League of Legends':
        return {
          experience: true,
          platform: false,
          region: false,
        }
      case 'Mobile Legends: Bang Bang':
        return {
          experience: true,
          platform: false,
          region: true,
        }
      case 'Overwatch':
        return {
          experience: true,
          platform: true,
          region: false,
        }
      case 'Call of Duty: Warzone':
        return {
          experience: true,
          platform: true,
          region: false,
        }
      case 'CSGO':
        return {
          experience: true,
          platform: true,
          region: false,
        }
      case 'Fortnite':
        return {
          experience: true,
          platform: true,
          region: false,
        }
      case 'PUBG':
        return {
          experience: true,
          platform: false,
          region: false,
        }
      case 'Rocket League':
        return {
          experience: true,
          platform: true,
          region: false,
        }
    }
    return {
      experience: true,
      platform: true,
      region: true,
    }
  }
}

module.exports = GameNameController
