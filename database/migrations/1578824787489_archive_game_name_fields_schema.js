'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArchiveGameNameFieldsSchema extends Schema {
  up () {
    this.create('archive_game_name_fields', (table) => {
      table.increments()
      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.json('in_game_fields').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('archive_game_name_fields')
  }
}

module.exports = ArchiveGameNameFieldsSchema
