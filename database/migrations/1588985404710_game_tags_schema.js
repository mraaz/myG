'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameTagsSchema extends Schema {
  up () {
    this.create('game_tags', (table) => {
      table.increments()
      table.string('content', 250).notNullable().unique().index()
      table.integer('verified').unsigned().notNullable().defaultTo(0)
      table.integer('counter').unsigned().nullable().defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('game_tags')
  }
}

module.exports = GameTagsSchema
