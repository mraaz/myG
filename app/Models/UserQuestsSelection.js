'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserQuestsSelection extends Model {
  static get table() {
    return 'user_quests_selection'
  }
}

module.exports = UserQuestsSelection
