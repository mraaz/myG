'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectionsSchema extends Schema {
  up () {
    this.create('connections', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('other_user_id').unsigned().notNullable()
      table.foreign('other_user_id').references('users.id').onDelete('cascade')
      table.integer('score').unsigned().notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('connections')
  }
}

module.exports = ConnectionsSchema
