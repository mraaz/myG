'use strict'

const Commendation = use('App/Models/Commendation')
const Database = use('Database')

class CommendationController {
  async store({ auth, request, response }) {
    try {
      const newCommendation = await Commendation.create({
        game_experiences_id: request.input('game_experiences_id'),
        user_id: auth.user.id,
      })
      return newCommendation
    } catch (error) {
      console.log(error)
    }
  }
  async showUser({ auth, request, response }) {
    try {
      const getCommend = await Database.from('commendations')
        .where({
          game_experiences_id: request.params.id,
          user_id: auth.user.id,
        })
        .count('* as no_of_commends')

      return {
        getCommend,
      }
    } catch (error) {
      console.log(error)
    }
  }
  async show({ auth, request, response }) {
    try {
      const getAllCommend = await Database.from('commendations')
        .where({ game_experiences_id: request.params.id })
        .count('* as no_of_commends')

      return {
        getAllCommend,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = CommendationController
