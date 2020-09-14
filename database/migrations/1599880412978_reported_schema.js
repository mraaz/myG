'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportedSchema extends Schema {
  up () {
    this.create('reported', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned().notNullable().index()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('reported')
  }
}

module.exports = ReportedSchema
