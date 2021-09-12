'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlayedGames extends Model {
  static get table() {
    return 'played_games'
  }
}

module.exports = PlayedGames
