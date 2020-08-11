'use strict'

const GameNames = use('App/Models/GameName')
const Database = use('Database')

const Schedule_games_logix = use('./Schedule_games_logix')

class GameNameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('game_name'))) {
        return false
      }
      try {
        const newGameName = await GameNames.create({
          game_name: request.input('game_name').trim(),
          user_id: auth.user.id,
        })

        return newGameName
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }

  async createGame({ auth, request, response }) {
    if (auth.user) {
      try {
        if (/['/.%#$,;`\\]/.test(request.params.game_name)) {
          return false
        }

        const createGame = await GameNames.create({
          game_name: request.params.game_name,
          user_id: auth.user.id,
        })

        return createGame
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async incrementGameCounter({ auth, request, response }) {
    if (auth.user) {
      try {
        const incrementGameCounter = await GameNames.query()
          .where({ id: request.params.game_names_id })
          .increment('counter', 1)
        return 'Updated successfully'
      } catch (error) {
        console.log(error)
        return false
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async decrementGameCounter({ auth, request, response }) {
    if (auth.user) {
      try {
        const decrementGameCounter = await GameNames.query()
          .where({ id: request.params.game_names_id })
          .decrement('counter', 1)

        const game_names = await Database.table('game_names').where({
          id: request.params.game_names_id,
        })

        if (game_names[0].verified == 0 && game_names[0].counter == 0) {
          const delete_game = await Database.table('game_names')
            .where({
              id: request.params.game_names_id,
            })
            .delete()
        }

        return 'Updated successfully'
      } catch (error) {
        console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }
}

module.exports = GameNameController
