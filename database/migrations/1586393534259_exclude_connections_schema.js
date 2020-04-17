'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExcludeConnectionsSchema extends Schema {
  up () {
    this.create('exclude_connections', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('other_user_id').unsigned().notNullable()
      table.foreign('other_user_id').references('users.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('exclude_connections')
  }
}

module.exports = ExcludeConnectionsSchema
