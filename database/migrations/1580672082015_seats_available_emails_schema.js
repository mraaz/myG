'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeatsAvailableEmailsSchema extends Schema {
  up () {
    this.create('seats_available_emails', (table) => {
      table.increments()
      table.text('email')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('seats_available_emails')
  }
}

module.exports = SeatsAvailableEmailsSchema
