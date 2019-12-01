'use strict'

const GameNames = use('App/Models/GameName')
const Database = use('Database')

class GameNameController {
  async store({ auth, request, response }) {
    try {
      const newGameName = await GameNames.create({
        game_name: request.input('game_name'),
        created_by: auth.user.id,
      })
      return newGameName
    } catch (error) {
      console.log(error)
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

      const gameSearchResults = await Database.schema.raw(
        'select * from game_names WHERE game_name LIKE ' + inputValue
      )

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
