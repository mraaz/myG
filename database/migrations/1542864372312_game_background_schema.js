'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameBackgroundSchema extends Schema {
  up () {
    this.create('game_background', (table) => {
      table.increments()

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')

      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      
      table.integer('experience_id').unsigned().notNullable()
      table.foreign('experience_id').references('game_experiences.id').onDelete('cascade')

      table.string('team', 254).nullable()
      table.string('role', 254).nullable()
      table.string('experience', 254).nullable()
      table.text('skills').nullable()

      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('game_background')
  }
}

module.exports = GameBackgroundSchema
