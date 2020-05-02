'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectionCriteriasSchema extends Schema {
  up () {
    this.create('connection_criterias', (table) => {
      table.increments()
      table.string('criteria', 1024).notNullable()
      table.integer('score').defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('connection_criterias')
  }
}

module.exports = ConnectionCriteriasSchema
