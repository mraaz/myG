'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserLanguageSchema extends Schema {
  up () {
    this.create('user_languages', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('language').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_languages')
  }
}

module.exports = UserLanguageSchema
