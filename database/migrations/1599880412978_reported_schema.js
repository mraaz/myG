'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportedSchema extends Schema {
  up () {
    this.create('reported', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('counter').notNullable().defaultTo(1)
      table.boolean('first_warning').notNullable().defaultTo(0)
      table.boolean('second_warning').notNullable().defaultTo(0)
      table.boolean('third_warning').notNullable().defaultTo(0)
      table.datetime('first_warning_date').nullable()
      table.datetime('second_warning_date').nullable()
      table.datetime('third_warning_date').nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('reported')
  }
}

module.exports = ReportedSchema
