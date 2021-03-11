'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExtraSeatsCodesTransSchema extends Schema {
  up () {
    this.create('extra_seats_codes_trans', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('extra_seats_codes_id').unsigned().notNullable()
      table.foreign('extra_seats_codes_id').references('extra_seats_codes.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('extra_seats_codes_trans')
  }
}

module.exports = ExtraSeatsCodesTransSchema
