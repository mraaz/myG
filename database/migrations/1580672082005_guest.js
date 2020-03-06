'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuestSchema extends Schema {
  up () {
    this.create('guests', (table) => {
      table.increments()
      table.string('public_key', 172).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('guests')
  }
}

module.exports = GuestSchema
