'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExtraSeatsCodesSchema extends Schema {
  up () {
    this.create('extra_seats_codes', (table) => {
      table.increments()
      table.string('code', 88)
      table.string('content', 254)
      table.timestamp('expiry').notNullable().defaultTo("2028-08-08 08:00:00")
      table.integer('counter').unsigned().defaultTo(0)
      table.integer('max_counter').unsigned().defaultTo(1)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('extra_seats_codes')
  }
}

module.exports = ExtraSeatsCodesSchema
