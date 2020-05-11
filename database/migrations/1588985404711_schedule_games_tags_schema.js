'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleGamesTagsSchema extends Schema {
  up () {
    this.create('schedule_games_tags', (table) => {
      table.increments()
      table.integer('schedule_games_id').unsigned().notNullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('game_tag_id').unsigned().notNullable()
      table.foreign('game_tag_id').references('game_tags.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('schedule_games_tags')
  }
}

module.exports = ScheduleGamesTagsSchema
