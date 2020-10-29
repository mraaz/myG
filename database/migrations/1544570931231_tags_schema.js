'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagsSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.string('tag', 250).notNullable().index()
      table.integer('counter').nullable().defaultTo(1)
      table.integer('verified').unsigned().notNullable().defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagsSchema
