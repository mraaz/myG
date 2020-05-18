'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SavedFiltersScheduleGamesSchema extends Schema {
  up () {
    this.create('saved_filters_schedule_games', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('name', 250).notNullable()
      table.json('payload').nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('saved_filters_schedule_games')
  }
}

module.exports = SavedFiltersScheduleGamesSchema
