'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMostPlayedGameSchema extends Schema {
  up () {
    this.create('user_most_played_games', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('game_name_id').unsigned().notNullable().index()
      table.foreign('game_name_id').references('id').inTable('game_names').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_most_played_games')
  }
}

module.exports = UserMostPlayedGameSchema
