'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArchiveScheduleGamesTransSchema extends Schema {
  up () {
    this.create('archive_schedule_games_trans', (table) => {
      table.increments()
      table.integer('archive_schedule_games_id').unsigned()
      table.foreign('archive_schedule_games_id').references('archive_schedule_games.id').onDelete('cascade')
      table.integer('game_name_fields_id').unsigned()
      table.foreign('game_name_fields_id').references('game_name_fields.id').onDelete('cascade')
      table.string('values', 254).nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('archive_schedule_games_trans')
  }
}

module.exports = ArchiveScheduleGamesTransSchema
