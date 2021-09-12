'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserDailyQuests extends Model {
  static get table() {
    return 'user_daily_quests'
  }
}

module.exports = UserDailyQuests
