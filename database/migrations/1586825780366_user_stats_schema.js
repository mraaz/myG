'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserStatsSchema extends Schema {
  up () {
    this.create('user_stats', (table) => {
      table.increments()
      table.string('criteria', 1024).notNullable()
      table.integer('xp_per_tick').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_stats')
  }
}

module.exports = UserStatsSchema
