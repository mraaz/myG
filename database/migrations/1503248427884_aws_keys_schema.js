'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AwsKeysSchema extends Schema {
  up () {
    this.create('aws_keys', (table) => {
      table.increments()
      table.string('aws_key', 1024).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('aws_keys')
  }
}

module.exports = AwsKeysSchema
