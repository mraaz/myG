'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserWeeklyQuestsSchema extends Schema {
  up () {
    this.create('user_weekly_quests', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('type').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_weekly_quests')
  }
}

module.exports = UserWeeklyQuestsSchema
