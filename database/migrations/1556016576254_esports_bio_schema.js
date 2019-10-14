'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EsportsBioSchema extends Schema {
  up () {
    this.create('esports_bios', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('status', 254).notNullable()
      table.string('email_visibility', 254).notNullable()
      table.string('games_of_ardour', 254).nullable()
      table.string('career_highlights', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('esports_bios')
  }
}

module.exports = EsportsBioSchema
