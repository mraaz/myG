'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WatchersSchema extends Schema {
  up () {
    this.create('watchers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('schedule_games_id').unsigned().references('id').inTable('schedule_games')
      table.timestamps()
    })
  }

  down () {
    this.drop('watchers')
  }
}

module.exports = WatchersSchema
