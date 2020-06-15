'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeatsAvailableSchema extends Schema {
  up () {
    this.create('seats_available', (table) => {
      table.increments()
      table.integer('seats_available')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('seats_available')
  }
}

module.exports = SeatsAvailableSchema
