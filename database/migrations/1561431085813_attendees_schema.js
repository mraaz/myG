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
      table.boolean('value_one')
      table.boolean('value_two')
      table.boolean('value_three')
      table.boolean('value_four')
      table.boolean('value_five')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('attendees')
  }
}

module.exports = AttendeesSchema
