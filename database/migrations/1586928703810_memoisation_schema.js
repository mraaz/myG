'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemoisationSchema extends Schema {
  up () {
    this.create('memoisations', (table) => {
      table.increments()
      table.string('memoisation', 254).unique()
      table.json('value').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('memoisations')
  }
}

module.exports = MemoisationSchema
