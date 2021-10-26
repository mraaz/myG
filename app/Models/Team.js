'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  static get table() {
    return 'teams'
  }
}

module.exports = Team
