'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavoriteGameSchema extends Schema {
  up () {
    this.create('favorite_games', (table) => {
      table.increments()
      table.integer('game_names_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('favorite_games')
  }
}

module.exports = FavoriteGameSchema
