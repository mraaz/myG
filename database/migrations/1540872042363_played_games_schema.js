'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlayedGamesSchema extends Schema {
  up () {
    this.create('played_games', (table) => {
      table.increments()
      table.integer('schedule_games_id').unsigned().notNullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('played_games')
  }
}

module.exports = PlayedGamesSchema
