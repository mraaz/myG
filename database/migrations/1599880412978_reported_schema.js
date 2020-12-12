'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportedSchema extends Schema {
  up () {
    this.create('reported', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().unique()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('counter').notNullable().defaultTo(1)
      table.string('first_offence', 254).nullable()
      table.string('second_offence', 254).nullable()
      table.string('third_offence', 254).nullable()
      table.datetime('first_offence_date').nullable()
      table.datetime('second_offence_date').nullable()
      table.datetime('third_offence_date').nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('reported')
  }
}

module.exports = ReportedSchema
