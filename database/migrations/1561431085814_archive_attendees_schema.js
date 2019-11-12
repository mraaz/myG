'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArchiveAttendeesSchema extends Schema {
  up () {
    this.create('archive_attendees', (table) => {
      table.integer('id').unsigned().notNullable().unique().primary()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('archive_schedule_games_id').unsigned().notNullable()
      table.foreign('archive_schedule_games_id').references('archive_schedule_games.id').onDelete('cascade')
      table.integer('type').unsigned().notNullable()
      table.boolean('dota_2_position_one').defaultTo(0)
      table.boolean('dota_2_position_two').defaultTo(0)
      table.boolean('dota_2_position_three').defaultTo(0)
      table.boolean('dota_2_position_four').defaultTo(0)
      table.boolean('dota_2_position_five').defaultTo(0)
      table.timestamp('og_created_at').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('archive_attendees')
  }
}

module.exports = ArchiveAttendeesSchema
