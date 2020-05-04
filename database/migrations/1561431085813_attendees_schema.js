'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendeesSchema extends Schema {
  up () {
    this.create('attendees', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned().notNullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('type').unsigned().notNullable()
      table.boolean('dota_2_position_one').defaultTo(0)
      table.boolean('dota_2_position_two').defaultTo(0)
      table.boolean('dota_2_position_three').defaultTo(0)
      table.boolean('dota_2_position_four').defaultTo(0)
      table.boolean('dota_2_position_five').defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('attendees')
  }
}

module.exports = AttendeesSchema
