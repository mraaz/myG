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
      table.timestamp('start_date_time').notNullable().index()
      table.timestamp('end_date_time').notNullable()
      table.string('platform', 254).nullable()
      table.string('description', 254).nullable()
      table.string('other', 254).nullable()
      table.timestamp('expiry').notNullable()
      table.integer('visibility').unsigned().nullable().defaultTo(1)
      table.integer('limit').nullable().defaultTo(0)
      table.string('accept_msg', 254).nullable()
      table.boolean('vacancy').defaultTo(1)
      table.boolean('autoJoin').defaultTo(1)
      table.string('schedule_games_GUID', 254).notNullable().unique()
      table.boolean('allow_comments').defaultTo(1)
      table.string('cron', 254).nullable()
      table.integer('occurrence').nullable().defaultTo(0)
      table.integer('repeatEvery').nullable().defaultTo(0)
      table.boolean('autoJoinHost').defaultTo(1)
      table.boolean('mic').defaultTo(0)
      table.boolean('eighteen_plus').defaultTo(0)
      table.string('game_languages', 254).nullable()
      table.boolean('marked_as_deleted').defaultTo(0).notNullable().index()
      table.timestamp('deleted_date').nullable()
      table.string('reason_for_deletion', 254).nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('schedule_games')
  }
}

module.exports = ScheduleGamesSchema
