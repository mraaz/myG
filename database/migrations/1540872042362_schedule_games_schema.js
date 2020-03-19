'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleGamesSchema extends Schema {
  up () {
    this.create('schedule_games', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.string('region', 254).nullable()
      table.string('experience', 254).nullable()
      table.timestamp('start_date_time').notNullable()
      table.timestamp('end_date_time').notNullable()
      table.string('platform', 25).nullable()
      table.string('description', 254).nullable()
      table.string('other', 254).nullable()
      table.timestamp('expiry').notNullable()
      table.integer('visibility').unsigned().nullable().defaultTo(1)
      table.integer('limit').unsigned().nullable().defaultTo(42)
      table.string('accept_msg', 254).nullable()
      table.boolean('vacancy').defaultTo(1)
      table.string('schedule_games_GUID', 254).notNullable().unique()
      table.boolean('allow_comments').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedule_games')
  }
}

module.exports = ScheduleGamesSchema
