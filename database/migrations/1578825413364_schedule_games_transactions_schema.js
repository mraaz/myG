'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleGamesTransactionsSchema extends Schema {
  up () {
    this.create('schedule_games_transactions', (table) => {
      table.increments()
      table.integer('schedule_games_id').unsigned()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('game_name_fields_id').unsigned()
      table.foreign('game_name_fields_id').references('game_name_fields.id').onDelete('cascade')
      table.string('values', 254).nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('schedule_games_transactions')
  }
}

module.exports = ScheduleGamesTransactionsSchema
