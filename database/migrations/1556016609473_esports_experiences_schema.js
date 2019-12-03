'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EsportsExperiencesSchema extends Schema {
  up () {
    this.create('esports_experiences', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('role_title', 254).notNullable()
      table.string('game_name', 254).notNullable().index()
      table.string('team_name', 254).nullable()
      table.integer('duration').unsigned().nullable().defaultTo(1)
      table.string('achievements', 254).nullable()
      table.string('skills', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('esports_experiences')
  }
}

module.exports = EsportsExperiencesSchema
