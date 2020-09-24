'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommendationsSchema extends Schema {
  up () {
    this.create('commendations', (table) => {
      table.increments()
      table.integer('game_experiences_id').unsigned().notNullable()
      table.foreign('game_experiences_id').references('game_experiences.id').onDelete('cascade')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('commender_id').unsigned().notNullable()
      table.foreign('commender_id').references('users.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('commendations')
  }
}

module.exports = CommendationsSchema
