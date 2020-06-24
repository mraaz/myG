'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameNameFieldsSchema extends Schema {
  up () {
    this.create('game_name_fields', (table) => {
      table.increments()
      table.integer('game_names_id').unsigned().notNullable()
      table.foreign('game_names_id').references('game_names.id').onDelete('cascade')
      table.json('in_game_fields').notNullable()
      table.json('in_game_field_placeholders')
      table.json('in_game_field_types')
      table.json('in_game_field_labels')
      table.json('in_game_field_values')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('game_name_fields')
  }
}

module.exports = GameNameFieldsSchema
