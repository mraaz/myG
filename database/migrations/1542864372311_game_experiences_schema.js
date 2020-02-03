'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameExperiencesSchema extends Schema {
  up () {
    this.create('game_experiences', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.string('experience', 254).nullable()
      table.string('comments', 254).nullable().defaultTo("")
      table.integer('played').unsigned().nullable().defaultTo(1)
      table.string('commendation', 254).nullable().defaultTo("Apprentice")
      table.string('status', 50).nullable()
      table.string('media', 254).nullable()
      table.string('link', 254).nullable().defaultTo("")
      table.text('tags').nullable()
      table.integer('ratings').unsigned().nullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('game_experiences')
  }
}

module.exports = GameExperiencesSchema
