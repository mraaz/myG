'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExtraSeatsCodesSchema extends Schema {
  up () {
    this.create('extra_seats_codes', (table) => {
      table.increments()
      table.string('code', 6)
      table.integer('user_id').unsigned()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('extra_seats_codes')
  }
}

module.exports = ExtraSeatsCodesSchema
