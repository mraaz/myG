'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserMonthlyQuests extends Model {
  static get table() {
    return 'user_monthly_quests'
  }
}

module.exports = UserMonthlyQuests
