'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GameBackground extends Model {
  static get table() {
    return 'game_background'
  }
}

module.exports = GameBackground
