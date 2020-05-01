'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectionTransactionsSchema extends Schema {
  up () {
    this.create('connection_transactions', (table) => {
      table.increments()
      table.integer('connections_id').unsigned().notNullable()
      table.foreign('connections_id').references('connections.id').onDelete('cascade')
      table.integer('connection_criterias_id').unsigned().notNullable()
      table.foreign('connection_criterias_id').references('connection_criterias.id').onDelete('cascade')
      table.string('values', 1024)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('connection_transactions')
  }
}

module.exports = ConnectionTransactionsSchema
