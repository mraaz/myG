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
      table.integer('type').unsigned().notNullable().index()
      table.string('value_one', 254).nullable()
      table.string('value_two', 254).nullable()
      table.string('value_three', 254).nullable()
      table.string('value_four', 254).nullable()
      table.string('value_five', 254).nullable()
      table.unique(['user_id', 'schedule_games_id']);
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('attendees')
  }
}

module.exports = AttendeesSchema
