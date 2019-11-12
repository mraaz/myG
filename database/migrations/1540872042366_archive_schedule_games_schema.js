'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArchiveScheduleGamesSchema extends Schema {
  up () {
    this.create('archive_schedule_games', (table) => {
      table.integer('id').unsigned().notNullable().unique().primary()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('game_name', 254).notNullable()
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
      table.string('dota2_medal_ranks', 254).nullable()
      table.string('dota2_server_regions', 254).nullable()
      table.string('dota2_roles', 254).nullable()
      table.string('schedule_games_GUID', 254).notNullable().unique()
      table.string('clash_royale_trophies', 254).nullable()
      table.boolean('vacancy').defaultTo(1)
      table.timestamp('og_created_at').notNullable()
      table.string('reason_for_cancel', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('archive_schedule_games')
  }
}

module.exports = ArchiveScheduleGamesSchema
