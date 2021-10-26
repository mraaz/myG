'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserWeeklyQuests extends Model {
  static get table() {
    return 'user_weekly_quests'
  }
}

module.exports = UserWeeklyQuests
