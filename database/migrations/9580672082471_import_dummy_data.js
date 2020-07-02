'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_data_Schema extends Schema {
  up () {
    this
    .raw("INSERT INTO seats_available (seats_available) values (5)")
  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
