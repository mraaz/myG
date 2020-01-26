'use strict'

const GameNames = use('App/Models/GameName')
const Database = use('Database')

class GameNameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('game_name'))) {
        return false
      }
      try {
        const newGameName = await GameNames.create({
          game_name: request.input('game_name'),
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
        return 'Updated successfully'
      } catch (error) {
        console.log(error)
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
      inputValue = "'%" + inputValue + "%'"

      const gameSearchResults = await Database.schema.raw('select * from game_names WHERE game_name LIKE ' + inputValue)

      // WORKS!!!! const gameSearchResults = await Database.schema.raw("select * from game_names WHERE game_name LIKE " + "'%the\%Alien%'")

      return {
        gameSearchResults,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = GameNameController
