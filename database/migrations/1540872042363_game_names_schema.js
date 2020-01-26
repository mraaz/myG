'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameNamesSchema extends Schema {
  up () {
    this.create('game_names', (table) => {
      table.increments()
      table.string('game_name', 254).notNullable().unique().index()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('counter').unsigned().notNullable().defaultTo(0)
      table.integer('verified').unsigned().notNullable().defaultTo(0)
      table.string('game_img', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('game_names')
  }
}

module.exports = GameNamesSchema
